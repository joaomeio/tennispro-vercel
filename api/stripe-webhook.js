import Stripe from 'stripe'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const resend = new Resend(process.env.RESEND_API_KEY)

// Price IDs — must match src/config/checkout.js
const PRICE_BASIC     = 'price_1T1s5JCz3W9Jpqrl8CV9AGqW'
const PRICE_ADVANCED  = 'price_1T1s4cCz3W9Jpqrlwjyfat0e'
const PRICE_DOWNSELL  = 'price_1T1s5oCz3W9JpqrlGiQZSZIS'
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

// Returns the set of price IDs purchased in this session.
async function getPurchasedPriceIds(sessionId) {
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 10 })
  return new Set(lineItems.data.map((item) => item.price?.id).filter(Boolean))
}

// Resolves which download URLs to include and what subject/greeting to use.
function resolveDelivery(priceIds) {
  const hasBasic    = priceIds.has(PRICE_BASIC)
  const hasAdvanced = priceIds.has(PRICE_ADVANCED) || priceIds.has(PRICE_DOWNSELL)
  const hasPlanner  = priceIds.has(PRICE_ORDER_BUMP)

  const products = []

  if (hasAdvanced) {
    products.push({
      name: 'TennisPro Complete Drill Library',
      description: '200+ drills organized by stroke, level, and situation.',
      url: process.env.COMPLETE_EBOOK_URL,
      color: '#16a34a',
      label: 'Download Complete Library',
    })
  } else if (hasBasic) {
    products.push({
      name: 'TennisPro Basic Drill Pack',
      description: '50 essential drills to build your coaching toolkit.',
      url: process.env.BASIC_EBOOK_URL,
      color: '#2563eb',
      label: 'Download Basic Drill Pack',
    })
  }

  if (hasPlanner) {
    products.push({
      name: 'Coaching Planner Kit',
      description: 'Periodization templates, lesson sheets, and student progress tracker.',
      url: process.env.PLANNER_DOWNLOAD_URL,
      color: '#d97706',
      label: 'Download Coaching Planner Kit',
    })
  }

  return products
}

function buildProductBlock(product) {
  return `
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:16px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr>
          <td style="padding-bottom:8px;">
            <p style="margin:0;font-size:17px;font-weight:700;color:#0f172a;">${product.name}</p>
            <p style="margin:4px 0 0;font-size:14px;color:#64748b;">${product.description}</p>
          </td>
        </tr>
        <tr>
          <td style="padding-top:16px;text-align:center;">
            <a href="${product.url}"
               style="display:inline-block;background:${product.color};color:#ffffff;font-weight:700;font-size:15px;padding:13px 28px;border-radius:8px;text-decoration:none;">
              ${product.label}
            </a>
          </td>
        </tr>
      </table>
    </div>
  `
}

function buildEmail(products) {
  const isSingle = products.length === 1
  const subject = isSingle
    ? `Your download is ready — ${products[0].name}`
    : `Your downloads are ready (${products.length} items)`

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#f1f5f9;padding:32px 16px;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;max-width:580px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

              <!-- Top bar -->
              <tr>
                <td style="height:6px;background:linear-gradient(90deg,#16a34a,#2563eb);"></td>
              </tr>

              <!-- Header -->
              <tr>
                <td style="padding:36px 32px 24px;text-align:center;border-bottom:1px solid #f1f5f9;">
                  <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#16a34a;text-transform:uppercase;letter-spacing:1px;">
                    Tennis Pro
                  </p>
                  <h1 style="margin:0;font-size:26px;font-weight:800;color:#0f172a;line-height:1.3;">
                    Thank you for your purchase!
                  </h1>
                  <p style="margin:12px 0 0;font-size:15px;color:#64748b;">
                    ${isSingle ? 'Your material is ready to download.' : `Your ${products.length} items are ready to download.`}
                  </p>
                </td>
              </tr>

              <!-- Products -->
              <tr>
                <td style="padding:28px 32px;">
                  <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;">
                    Your downloads
                  </p>
                  ${products.map(buildProductBlock).join('')}
                </td>
              </tr>

              <!-- Note -->
              <tr>
                <td style="padding:0 32px 28px;">
                  <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;">
                    <p style="margin:0;font-size:13px;color:#92400e;line-height:1.6;">
                      <strong>Save these links.</strong> They give you lifetime access to your materials.
                      If you have any trouble, reply to this email or contact us at
                      <a href="mailto:support@tennispro.site" style="color:#d97706;font-weight:600;">support@tennispro.site</a>.
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:20px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
                  <p style="margin:0;font-size:12px;color:#94a3b8;">
                    © ${new Date().getFullYear()} Tennis Pro · All rights reserved
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
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

    if (email) {
      const priceIds = await getPurchasedPriceIds(session.id)
      const products = resolveDelivery(priceIds)

      if (products.length > 0) {
        const { subject, html } = buildEmail(products)
        await resend.emails.send({
          from: 'Tennis Pro <contato@tennispro.site>',
          to: email,
          subject,
          html,
        })
      }
    }
  }

  return res.status(200).json({ received: true })
}
