import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { createPostHogClient } from './lib/posthog.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

const PRICE_TO_MODULES = {
  // Production
  'price_1T1s5JCz3W9Jpqrl8CV9AGqW': ['drills'],
  'price_1T1s4cCz3W9Jpqrlwjyfat0e': ['drills', 'tennis-kids', 'mental-game'],
  'price_1T1s5oCz3W9JpqrlGiQZSZIS': ['drills', 'tennis-kids', 'mental-game'],
  'price_1T1sCECz3W9JpqrlOgQRiPot': ['lesson-templates'],
  'price_1TPlP6EFtoy3ZjcS8uH4dKg7': ['gym-training'],
  'price_1TPlPFEFtoy3ZjcSQxuxPygO': ['serve-masterclass'],
  'price_1TPlPNEFtoy3ZjcSaIG4dIGp': ['doubles-tactics'],
  'price_1TPoiVCz3W9Jpqrl5vuHA6RN': ['gym-training'],
  'price_1TPoihCz3W9Jpqrlf7oUs2J3': ['serve-masterclass'],
  'price_1TPojKCz3W9JpqrltTSes10O': ['doubles-tactics'],
  // Test
  'price_1T1spNCz3W9JpqrliooB8TI0': ['drills', 'tennis-kids', 'mental-game'],
  'price_1T1spVCz3W9JpqrlD1BisICz': ['lesson-templates'],
  'price_1TVBymCz3W9JpqrlS6HkXQFF': ['gym-training'],
  'price_1TVBz3Cz3W9JpqrlmSXsPExo': ['serve-masterclass'],
  'price_1TVBzNCz3W9Jpqrlh0fK9lMq': ['doubles-tactics'],
}

async function getOrCreateUser(email) {
  const { data: createData } = await supabaseAdmin.auth.admin.createUser({
    email,
    email_confirm: true,
  })
  if (createData?.user) return { user: createData.user, isNew: true }

  // User exists — page through until found
  let page = 1
  while (true) {
    const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 1000 })
    if (error) throw error
    const found = users.find((u) => u.email === email)
    if (found) return { user: found, isNew: false }
    if (users.length < 1000) throw new Error(`User not found: ${email}`)
    page++
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { sessionId } = req.body
  if (!sessionId) return res.status(400).json({ error: 'sessionId is required' })

  // Verify the Stripe session actually completed
  let session
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    })
  } catch (err) {
    return res.status(400).json({ error: 'Invalid session ID' })
  }

  if (session.payment_status !== 'paid') {
    return res.status(400).json({ error: 'Payment not completed' })
  }

  const email = session.customer_details?.email
  if (!email) return res.status(400).json({ error: 'No email on session' })

  // Collect modules from line items
  const lineItems = session.line_items?.data?.length
    ? session.line_items.data
    : (await stripe.checkout.sessions.listLineItems(sessionId, { limit: 10 })).data

  const grantedModules = new Set()
  for (const item of lineItems) {
    const priceId = item.price?.id
    if (priceId && PRICE_TO_MODULES[priceId]) {
      PRICE_TO_MODULES[priceId].forEach((m) => grantedModules.add(m))
    }
  }
  if (grantedModules.size === 0) grantedModules.add('drills')

  // Find or create the Supabase user
  let user, isNew
  try {
    ;({ user, isNew } = await getOrCreateUser(email))
  } catch (err) {
    return res.status(500).json({ error: `User lookup failed: ${err.message}` })
  }

  // Write user_modules rows
  for (const moduleId of grantedModules) {
    const { error } = await supabaseAdmin
      .from('user_modules')
      .upsert({ user_id: user.id, module_id: moduleId }, { onConflict: 'user_id,module_id' })
    if (error) return res.status(500).json({ error: `DB write failed for ${moduleId}: ${error.message}` })
  }

  if (process.env.POSTHOG_API_KEY) {
    const posthog = createPostHogClient()
    posthog.capture({
      distinctId: email,
      event: 'access_provisioned',
      properties: {
        stripe_session_id: sessionId,
        modules: [...grantedModules],
        is_new_user: isNew,
      },
    })
    if (isNew) {
      posthog.capture({
        distinctId: email,
        event: 'user_signed_up',
        properties: { source: 'stripe_checkout' },
      })
    }
    await posthog.shutdown()
  }

  return res.status(200).json({
    success: true,
    modules: [...grantedModules],
    email,
    isNew,
    amount_total: session.amount_total,
    currency: session.currency,
  })
}
