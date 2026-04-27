import Stripe from 'stripe'
import { createPostHogClient } from './lib/posthog.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const ORDER_BUMP_PRICE_ID = 'price_1T1sCECz3W9JpqrlOgQRiPot'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { priceId, orderBump = false, isAddon = false, customerEmail = null } = req.body

  if (!priceId) {
    return res.status(400).json({ error: 'priceId is required' })
  }

  const siteUrl = process.env.SITE_URL || 'https://tennispro.site'

  const lineItems = [{ price: priceId, quantity: 1 }]

  if (orderBump) {
    lineItems.push({ price: ORDER_BUMP_PRICE_ID, quantity: 1 })
  }

  try {
    const sessionParams = {
      mode: 'payment',
      line_items: lineItems,
      success_url: isAddon
        ? `${siteUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`
        : `${siteUrl}/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/`,
      allow_promotion_codes: true,
    }

    // For addon purchases, look up the existing Stripe customer to pre-fill
    // email and saved payment methods. Otherwise always create a customer so
    // future addon purchases can find them.
    if (isAddon && customerEmail) {
      const existing = await stripe.customers.list({ email: customerEmail, limit: 1 })
      if (existing.data.length > 0) {
        sessionParams.customer = existing.data[0].id
      } else {
        sessionParams.customer_creation = 'always'
      }
    } else {
      sessionParams.customer_creation = 'always'
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    const posthog = createPostHogClient()
    posthog.capture({
      distinctId: customerEmail || session.id,
      event: 'checkout_started',
      properties: {
        price_id: priceId,
        order_bump: orderBump,
        is_addon: isAddon,
        stripe_session_id: session.id,
      },
    })
    await posthog.shutdown()

    return res.status(200).json({ url: session.url })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
