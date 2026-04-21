import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const ORDER_BUMP_PRICE_ID = 'price_1T1spVCz3W9JpqrlD1BisICz'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { priceId, orderBump = false } = req.body

  if (!priceId) {
    return res.status(400).json({ error: 'priceId is required' })
  }

  const siteUrl = process.env.SITE_URL || 'https://tennispro.site'

  const lineItems = [{ price: priceId, quantity: 1 }]

  if (orderBump) {
    lineItems.push({ price: ORDER_BUMP_PRICE_ID, quantity: 1 })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${siteUrl}/obrigado`,
      cancel_url: `${siteUrl}/`,
      allow_promotion_codes: true,
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
