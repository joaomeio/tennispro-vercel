import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

const PRICE_TO_MODULES = {
  'price_1TONBjCz3W9JpqrlXyirmBW7': ['drills'],
  'price_1T1spNCz3W9JpqrliooB8TI0': ['drills', 'tennis-kids', 'mental-game'],
  'price_1TONAaCz3W9Jpqrl938ERDdk': ['drills', 'tennis-kids', 'mental-game'],
  'price_1T1spVCz3W9JpqrlD1BisICz': ['lesson-templates'],
  'price_1TP8eICz3W9Jpqrl3CFU1A1E': ['gym-training'],
  'price_1TP8edCz3W9JpqrlGX4clzHo': ['serve-masterclass'],
  'price_1TP8epCz3W9JpqrlyP9EDMDt': ['doubles-tactics'],
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

  const siteUrl = (process.env.SITE_URL || 'https://tennispro.site').replace(/\/$/, '')

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

  // For new users, generate a recovery link the browser can navigate to directly
  let accessLink = null
  if (isNew) {
    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email,
      options: { redirectTo: `${siteUrl}/welcome` },
    })
    if (!linkError && linkData?.properties?.hashed_token) {
      const hashedToken = linkData.properties.hashed_token
      const redirectTo = encodeURIComponent(`${siteUrl}/welcome`)
      accessLink = `${process.env.SUPABASE_URL}/auth/v1/verify?token=${hashedToken}&type=recovery&redirect_to=${redirectTo}`
    }
  }

  return res.status(200).json({ success: true, modules: [...grantedModules], email, isNew, accessLink })
}
