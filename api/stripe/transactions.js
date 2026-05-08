import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const ADMIN_EMAIL = 'joaopintobakermeio@gmail.com'

async function verifyAdmin(req) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) throw Object.assign(new Error('Unauthorized'), { status: 401 })
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
  const { data, error } = await supabase.auth.getUser(token)
  if (error || data?.user?.email !== ADMIN_EMAIL) {
    throw Object.assign(new Error('Forbidden'), { status: 403 })
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  try {
    await verifyAdmin(req)

    const range = Math.min(parseInt(req.query.range) || 30, 90)
    const rangeStart = Math.floor(Date.now() / 1000) - range * 86400

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const charges = await stripe.charges.list({
      limit: 20,
      created: { gte: rangeStart },
    })

    const transactions = charges.data.map(c => ({
      date: new Date(c.created * 1000).toISOString(),
      email: c.billing_details?.email || c.receipt_email || '',
      amount: Math.round((c.amount || 0)) / 100,
      status: c.refunded ? 'refunded' : c.status === 'succeeded' ? 'succeeded' : 'failed',
    }))

    return res.status(200).json({ transactions })
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message })
    console.error('stripe/transactions error:', err)
    return res.status(500).json({ error: err.message })
  }
}
