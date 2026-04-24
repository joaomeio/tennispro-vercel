import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const ORDER_BUMP_PRICE_ID = 'price_1T1spVCz3W9JpqrlD1BisICz'

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
      customer_creation: 'always',
    }

    // For addon purchases by logged-in users, look up their existing Stripe customer
    // so email and saved payment methods are pre-filled at checkout.
    if (isAddon && customerEmail) {
      const existing = await stripe.customers.list({ email: customerEmail, limit: 1 })
      if (existing.data.length > 0) {
        sessionParams.customer = existing.data[0].id
        delete sessionParams.customer_creation
      } else {
        sessionParams.customer_email = customerEmail
      }
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    return res.status(200).json({ url: session.url })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
