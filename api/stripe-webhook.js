import Stripe from 'stripe'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import { createPostHogClient } from './lib/posthog.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const resend = new Resend(process.env.RESEND_API_KEY)

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

const PRICE_TO_MODULES = {
  'price_1T1s5JCz3W9Jpqrl8CV9AGqW': ['drills'],
  'price_1T1s4cCz3W9Jpqrlwjyfat0e': ['drills', 'tennis-kids', 'mental-game'],
  'price_1T1s5oCz3W9JpqrlGiQZSZIS': ['drills', 'tennis-kids', 'mental-game'],
  'price_1T1sCECz3W9JpqrlOgQRiPot': ['lesson-templates'],
  'price_1TPlP6EFtoy3ZjcS8uH4dKg7': ['gym-training'],
  'price_1TPlPFEFtoy3ZjcSQxuxPygO': ['serve-masterclass'],
  'price_1TPlPNEFtoy3ZjcSaIG4dIGp': ['doubles-tactics'],
}


export const config = { api: { bodyParser: false } }

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

async function getPurchasedPackages(sessionId) {
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 10 })
  return lineItems.data.filter(item => item.price?.id).map((item) => ({
    name: item.description || 'TennisPro Product',
    price_id: item.price.id
  }))
}

// Returns { user, isNew } — never relies on a single page of listUsers
async function getOrCreateUser(email) {
  const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email,
    email_confirm: true,
  })

  if (createData?.user) {
    return { user: createData.user, isNew: true }
  }

  // User already exists — paginate until found
  let page = 1
  while (true) {
    const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers({
      page,
      perPage: 1000,
    })
    if (listError) throw listError
    const found = users.find((u) => u.email === email)
    if (found) return { user: found, isNew: false }
    if (users.length < 1000) throw new Error(`User not found after creation attempt: ${email}`)
    page++
  }
}

async function provisionAccess(email, packages, siteUrl) {
  const { user, isNew } = await getOrCreateUser(email)

  // Write module access rows
  const grantedModules = new Set()
  for (const pkg of packages) {
    if (PRICE_TO_MODULES[pkg.price_id]) {
      PRICE_TO_MODULES[pkg.price_id].forEach((m) => grantedModules.add(m))
    } else {
      grantedModules.add('drills')
    }
  }

  for (const moduleId of grantedModules) {
    const { error: upsertError } = await supabaseAdmin.from('user_modules').upsert(
      { user_id: user.id, module_id: moduleId },
      { onConflict: 'user_id,module_id' }
    )
    if (upsertError) throw upsertError
  }

  // Only generate a "set your password" link for brand-new users
  if (!isNew) return null

  const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
    type: 'recovery',
    email,
    options: { redirectTo: `${siteUrl}/welcome` },
  })
  if (linkError) throw linkError

  const hashedToken = linkData?.properties?.hashed_token
  const redirectTo = encodeURIComponent(`${siteUrl}/welcome`)
  return `${process.env.SUPABASE_URL}/auth/v1/verify?token=${hashedToken}&type=recovery&redirect_to=${redirectTo}`
}

function buildEmail(accessLink, packages, siteUrl) {
  const packageList = packages
    .map((p) => `<li style="margin:6px 0;font-size:14px;color:#0f172a;">✓ &nbsp;${p.name}</li>`)
    .join('')

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

        <tr><td style="height:5px;background:linear-gradient(90deg,#16a34a,#2563eb);"></td></tr>

        <tr>
          <td style="padding:36px 32px 20px;text-align:center;">
            <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#16a34a;text-transform:uppercase;letter-spacing:1.2px;">Tennis Pro Platform</p>
            <h1 style="margin:0;font-size:24px;font-weight:800;color:#0f172a;line-height:1.3;">Your platform access is ready</h1>
            <p style="margin:10px 0 0;font-size:15px;color:#64748b;">Click below to set your password and start using your drill library.</p>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 32px;">
            <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
              <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#15803d;text-transform:uppercase;letter-spacing:0.8px;">Your plan${packages.length > 1 ? 's' : ''}:</p>
              <ul style="margin:0;padding:0;list-style:none;">${packageList}</ul>
            </div>

            <div style="text-align:center;margin-bottom:20px;">
              <a href="${accessLink}" style="display:inline-block;background:#16a34a;color:#ffffff;font-weight:700;font-size:15px;padding:15px 32px;border-radius:10px;text-decoration:none;">
                Access My Drill Platform →
              </a>
              <p style="margin:12px 0 0;font-size:12px;color:#94a3b8;">This link expires in 24 hours.</p>
            </div>

            <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;">
              <p style="margin:0;font-size:13px;color:#92400e;line-height:1.6;">
                After setting your password, you can always log in at
                <a href="${siteUrl}/dashboard" style="color:#d97706;font-weight:600;">${siteUrl.replace('https://', '')}/dashboard</a>.
                Need help? <a href="mailto:support@tennispro.site" style="color:#d97706;font-weight:600;">support@tennispro.site</a>
              </p>
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding:16px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
            <p style="margin:0;font-size:12px;color:#94a3b8;">© ${new Date().getFullYear()} Tennis Pro · All rights reserved</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

  return {
    subject: 'Your TennisPro platform is ready — set your password',
    html,
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const sig = req.headers['stripe-signature']
  const rawBody = await getRawBody(req)

  let event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return res.status(400).json({ error: `Webhook signature verification failed: ${err.message}` })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const email = session.customer_details?.email
    const rawSiteUrl = process.env.SITE_URL || ''
    const siteUrl = rawSiteUrl && !rawSiteUrl.includes('localhost')
      ? rawSiteUrl
      : 'https://tennispro.site'

    if (email) {
      try {
        const packages = await getPurchasedPackages(session.id)

        if (packages.length > 0) {
          const accessLink = await provisionAccess(email, packages, siteUrl)

          const posthog = createPostHogClient()
          posthog.capture({
            distinctId: email,
            event: 'purchase_completed',
            properties: {
              stripe_session_id: session.id,
              packages: packages.map((p) => p.price_id),
              package_names: packages.map((p) => p.name),
              is_new_user: accessLink !== null,
              amount_total: session.amount_total,
              currency: session.currency,
            },
          })
          await posthog.shutdown()

          // Only send the "set your password" email to brand-new users
          if (accessLink) {
            const { subject, html } = buildEmail(accessLink, packages, siteUrl)
            await resend.emails.send({
              from: 'Tennis Pro <contato@tennispro.site>',
              to: email,
              subject,
              html,
            })
          }
        }
      } catch (err) {
        console.error('Failed to provision access:', err)
      }
    }
  }

  return res.status(200).json({ received: true })
}
