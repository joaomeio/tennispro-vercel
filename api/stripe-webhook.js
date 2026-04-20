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

// Price IDs — must match src/config/checkout.js
const PRICE_BASIC      = 'price_1T1s5JCz3W9Jpqrl8CV9AGqW'
const PRICE_ADVANCED   = 'price_1T1s4cCz3W9Jpqrlwjyfat0e'
const PRICE_DOWNSELL   = 'price_1T1s5oCz3W9JpqrlGiQZSZIS'
const PRICE_ORDER_BUMP = 'price_1T1sCECz3W9JpqrlOgQRiPot'

export const config = {
  api: { bodyParser: false },
}

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

async function getPurchasedPriceIds(sessionId) {
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 10 })
  return new Set(lineItems.data.map((item) => item.price?.id).filter(Boolean))
}

function resolvePackages(priceIds) {
  const hasBasic    = priceIds.has(PRICE_BASIC)
  const hasAdvanced = priceIds.has(PRICE_ADVANCED) || priceIds.has(PRICE_DOWNSELL)
  const hasPlanner  = priceIds.has(PRICE_ORDER_BUMP)

  const packages = []
  if (hasAdvanced) packages.push({ name: 'Pro Premium Plan', price_id: PRICE_ADVANCED })
  else if (hasBasic) packages.push({ name: 'Basic Plan', price_id: PRICE_BASIC })
  if (hasPlanner) packages.push({ name: 'Coaching Planner Kit', price_id: PRICE_ORDER_BUMP })

  return packages
}

async function provisionPlatformAccess(email, packages, siteUrl) {
  // Check if user already exists
  const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
  const existing = existingUsers?.users?.find((u) => u.email === email)

  if (!existing) {
    await supabaseAdmin.auth.admin.createUser({
      email,
      email_confirm: true,
    })
  }

  // Generate an invite/recovery link so the user can set their password
  const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
    type: 'recovery',
    email,
    options: { redirectTo: `${siteUrl}/welcome` },
  })

  if (linkError) throw linkError

  // Look up the user id for purchase records
  const { data: { users } } = await supabaseAdmin.auth.admin.listUsers()
  const user = users.find((u) => u.email === email)

  if (user) {
    for (const pkg of packages) {
      await supabaseAdmin.from('user_purchases').upsert(
        { user_id: user.id, package_name: pkg.name, price_id: pkg.price_id },
        { onConflict: 'user_id,price_id' }
      )
    }
  }

  return linkData?.properties?.action_link
}

function buildPlatformEmail(accessLink, packages) {
  const isSingle = packages.length === 1
  const subject = isSingle
    ? `Your TennisPro platform access is ready`
    : `Your TennisPro platform access is ready (${packages.length} plans)`

  const packageList = packages
    .map((p) => `<li style="margin:4px 0;color:#0f172a;font-size:14px;">✓ ${p.name}</li>`)
    .join('')

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#f1f5f9;padding:32px 16px;">
        <tr><td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;max-width:580px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
            <tr><td style="height:6px;background:linear-gradient(90deg,#16a34a,#2563eb);"></td></tr>
            <tr>
              <td style="padding:36px 32px 24px;text-align:center;border-bottom:1px solid #f1f5f9;">
                <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#16a34a;text-transform:uppercase;letter-spacing:1px;">Tennis Pro</p>
                <h1 style="margin:0;font-size:26px;font-weight:800;color:#0f172a;line-height:1.3;">Your platform is ready!</h1>
                <p style="margin:12px 0 0;font-size:15px;color:#64748b;">Click the button below to set your password and access your drill library.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px;">
                <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
                  <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#15803d;text-transform:uppercase;letter-spacing:0.8px;">Plans included:</p>
                  <ul style="margin:0;padding:0;list-style:none;">${packageList}</ul>
                </div>
                <div style="text-align:center;">
                  <a href="${accessLink}" style="display:inline-block;background:#16a34a;color:#ffffff;font-weight:700;font-size:16px;padding:16px 36px;border-radius:10px;text-decoration:none;letter-spacing:0.3px;">
                    Access My Drill Platform →
                  </a>
                  <p style="margin:16px 0 0;font-size:12px;color:#94a3b8;">This link expires in 24 hours. Request a new one at tennispro.site/welcome if needed.</p>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 28px;">
                <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;">
                  <p style="margin:0;font-size:13px;color:#92400e;line-height:1.6;">
                    <strong>Bookmark the platform.</strong> After setting your password you can always log in at
                    <a href="${process.env.SITE_URL || 'https://tennispro.site'}/dashboard" style="color:#d97706;font-weight:600;">tennispro.site/dashboard</a>.
                    Need help? Email <a href="mailto:support@tennispro.site" style="color:#d97706;font-weight:600;">support@tennispro.site</a>.
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
                <p style="margin:0;font-size:12px;color:#94a3b8;">© ${new Date().getFullYear()} Tennis Pro · All rights reserved</p>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `

  return { subject, html }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

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
    const siteUrl = process.env.SITE_URL || 'https://tennispro.site'

    if (email) {
      const priceIds = await getPurchasedPriceIds(session.id)
      const packages = resolvePackages(priceIds)

      if (packages.length > 0) {
        try {
          const accessLink = await provisionPlatformAccess(email, packages, siteUrl)

          const { subject, html } = buildPlatformEmail(accessLink, packages)
          await resend.emails.send({
            from: 'Tennis Pro <contato@tennispro.site>',
            to: email,
            subject,
            html,
          })
        } catch (err) {
          console.error('Failed to provision platform access:', err)
          // Don't fail the webhook — Stripe will not retry for non-5xx
        }
      }
    }
  }

  return res.status(200).json({ received: true })
}
