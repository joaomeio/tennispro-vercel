import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const { id } = req.query
  if (!id) return res.status(400).json({ error: 'Missing session id' })

  try {
    const session = await stripe.checkout.sessions.retrieve(id, { expand: ['customer_details'] })
    const email = session.customer_details?.email
    if (!email) return res.status(404).json({ error: 'No email found' })
    return res.status(200).json({ email })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
