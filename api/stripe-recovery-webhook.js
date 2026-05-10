import Stripe from 'stripe'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const resend = new Resend(process.env.RESEND_API_KEY)

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

async function getSessionLineItems(sessionId) {
  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 10 })
    return lineItems.data.map((item) => ({
      name: item.description || 'TennisPro Product',
      price_id: item.price?.id || null,
      amount: item.amount_total,
      currency: item.currency,
    }))
  } catch {
    return []
  }
}

async function getSessionFromPaymentIntent(paymentIntentId) {
  try {
    const sessions = await stripe.checkout.sessions.list({
      payment_intent: paymentIntentId,
      limit: 1,
    })
    return sessions.data[0] || null
  } catch {
    return null
  }
}

function formatCurrency(amount, currency) {
  if (!amount) return ''
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: (currency || 'usd').toUpperCase(),
    minimumFractionDigits: 0,
  }).format(amount / 100)
}

function buildRecoveryEmail({ customerName, products, recoveryUrl, reason, siteUrl }) {
  const firstName = customerName ? customerName.split(' ')[0] : null
  const greeting = firstName ? `Hi ${firstName},` : 'Hi there,'

  const productRows = products.length > 0
    ? products.map((p) => {
        const priceStr = p.amount ? ` — <span style="color:#16a34a;font-weight:700;">${formatCurrency(p.amount, p.currency)}</span>` : ''
        return `<li style="margin:8px 0;font-size:14px;color:#0f172a;display:flex;align-items:center;gap:8px;">
          <span style="color:#16a34a;font-weight:700;font-size:16px;">✓</span>&nbsp;${p.name}${priceStr}
        </li>`
      }).join('')
    : `<li style="margin:8px 0;font-size:14px;color:#0f172a;">✓ &nbsp;TennisPro Platform Access</li>`

  const reasonBanner = reason
    ? `<div style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:12px 16px;margin-bottom:20px;">
        <p style="margin:0;font-size:13px;color:#b91c1c;line-height:1.5;">
          <strong>Payment note:</strong> ${reason}
        </p>
      </div>`
    : ''

  const ctaLabel = reason ? 'Try Again →' : 'Complete My Purchase →'

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
            <h1 style="margin:0;font-size:24px;font-weight:800;color:#0f172a;line-height:1.3;">You left something behind</h1>
            <p style="margin:10px 0 0;font-size:15px;color:#64748b;">${greeting} Your cart is saved — finish your purchase and get instant access.</p>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 32px;">

            ${reasonBanner}

            <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
              <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#15803d;text-transform:uppercase;letter-spacing:0.8px;">Still in your cart:</p>
              <ul style="margin:0;padding:0;list-style:none;">${productRows}</ul>
            </div>

            <div style="background:#fffbeb;border-left:4px solid #f59e0b;border-radius:8px;padding:14px 18px;margin-bottom:24px;">
              <p style="margin:0;font-size:13px;color:#92400e;line-height:1.6;">
                <strong>Hundreds of coaches</strong> are already using TennisPro to save time and deliver better training.
                Don't let this get away.
              </p>
            </div>

            <div style="text-align:center;margin-bottom:20px;">
              <a href="${recoveryUrl}" style="display:inline-block;background:#16a34a;color:#ffffff;font-weight:700;font-size:15px;padding:15px 32px;border-radius:10px;text-decoration:none;">
                ${ctaLabel}
              </a>
              <p style="margin:12px 0 0;font-size:12px;color:#94a3b8;">Secure checkout · Instant access after payment</p>
            </div>

            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px 18px;">
              <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">
                Questions? Reply to this email or reach us at
                <a href="mailto:support@tennispro.site" style="color:#2563eb;font-weight:600;">support@tennispro.site</a>
              </p>
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding:16px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
            <p style="margin:0;font-size:12px;color:#94a3b8;">© ${new Date().getFullYear()} Tennis Pro · All rights reserved</p>
            <p style="margin:4px 0 0;font-size:11px;color:#cbd5e1;">You received this because you started a checkout on tennispro.site.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

  const subjectName = firstName ? `, ${firstName}` : ''
  const subject = reason
    ? `Your payment didn't go through${subjectName} — let's fix that`
    : `You left something in your cart${subjectName}`

  return { subject, html }
}

async function handleExpiredSession(session, siteUrl) {
  const email = session.customer_details?.email
  if (!email) return

  const customerName = session.customer_details?.name || null
  const products = await getSessionLineItems(session.id)

  // Prefer Stripe's built-in recovery URL, fall back to pricing page
  const recoveryUrl = session.after_expiration?.recovery?.url || `${siteUrl}/#pricing`

  const { subject, html } = buildRecoveryEmail({ customerName, products, recoveryUrl, reason: null, siteUrl })

  await resend.emails.send({
    from: 'Tennis Pro <contato@tennispro.site>',
    to: email,
    subject,
    html,
  })

  console.log(`[recovery] sent expired-session email to ${email}`)
}

async function handleFailedPayment(paymentIntent, siteUrl) {
  // Try to find the checkout session for line items and customer details
  const session = await getSessionFromPaymentIntent(paymentIntent.id)

  const email = session?.customer_details?.email
    || paymentIntent.receipt_email
    || null

  if (!email) return

  const customerName = session?.customer_details?.name || null
  const products = session ? await getSessionLineItems(session.id) : []

  const errorMessage = paymentIntent.last_payment_error?.message || null
  const recoveryUrl = session?.after_expiration?.recovery?.url || `${siteUrl}/#pricing`

  const { subject, html } = buildRecoveryEmail({
    customerName,
    products,
    recoveryUrl,
    reason: errorMessage,
    siteUrl,
  })

  await resend.emails.send({
    from: 'Tennis Pro <contato@tennispro.site>',
    to: email,
    subject,
    html,
  })

  console.log(`[recovery] sent failed-payment email to ${email}`)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const sig = req.headers['stripe-signature']
  const rawBody = await getRawBody(req)

  const secret = process.env.STRIPE_RECOVERY_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET

  let event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret)
  } catch (err) {
    return res.status(400).json({ error: `Webhook signature verification failed: ${err.message}` })
  }

  const rawSiteUrl = process.env.SITE_URL || ''
  const siteUrl = rawSiteUrl && !rawSiteUrl.includes('localhost')
    ? rawSiteUrl
    : 'https://tennispro.site'

  try {
    if (event.type === 'checkout.session.expired') {
      await handleExpiredSession(event.data.object, siteUrl)
    }

    if (event.type === 'payment_intent.payment_failed') {
      await handleFailedPayment(event.data.object, siteUrl)
    }
  } catch (err) {
    console.error('[recovery] unhandled error:', err)
  }

  return res.status(200).json({ received: true })
}
