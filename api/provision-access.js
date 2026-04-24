import Stripe from 'stripe'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const resend = new Resend(process.env.RESEND_API_KEY)

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

function buildEmail(accessLink, packages, siteUrl) {
  const packageList = packages
    .map((p) => `<li style="margin:6px 0;font-size:14px;color:#0f172a;">✓ &nbsp;${p.name}</li>`)
    .join('')

  return `<!DOCTYPE html>
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
                Set My Password &amp; Enter →
              </a>
              <p style="margin:12px 0 0;font-size:12px;color:#94a3b8;">This link expires in 24 hours.</p>
            </div>
            <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;">
              <p style="margin:0;font-size:13px;color:#92400e;line-height:1.6;">
                After setting your password, you can always log in at
                <a href="${siteUrl}/welcome" style="color:#d97706;font-weight:600;">${siteUrl.replace('https://', '')}/welcome</a>.
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

  // For new users, generate a recovery link and send the welcome email via Resend
  if (isNew) {
    try {
      const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
        type: 'recovery',
        email,
        options: { redirectTo: `${siteUrl}/welcome` },
      })
      if (linkError) throw linkError

      const hashedToken = linkData?.properties?.hashed_token
      const redirectTo = encodeURIComponent(`${siteUrl}/welcome`)
      const accessLink = `${process.env.SUPABASE_URL}/auth/v1/verify?token=${hashedToken}&type=recovery&redirect_to=${redirectTo}`

      const moduleNames = [...grantedModules].map((m) => ({ name: m.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) }))
      await resend.emails.send({
        from: 'Tennis Pro <contato@tennispro.site>',
        to: email,
        subject: 'Your TennisPro platform is ready — set your password',
        html: buildEmail(accessLink, moduleNames, siteUrl),
      })
    } catch (err) {
      // Email failure is non-fatal — modules are already provisioned
      console.error('Failed to send welcome email:', err)
    }
  }

  return res.status(200).json({ success: true, modules: [...grantedModules], email, isNew })
}
