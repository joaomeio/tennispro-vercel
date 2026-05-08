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
    const now = Date.now()
    const rangeStart = Math.floor(now / 1000) - range * 86400
    const prevStart = rangeStart - range * 86400

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    // Current and previous period sessions
    const [currentSessions, prevSessions] = await Promise.all([
      stripe.checkout.sessions.list({ limit: 100, created: { gte: rangeStart }, expand: ['data.customer_details'] }),
      stripe.checkout.sessions.list({ limit: 100, created: { gte: prevStart, lt: rangeStart } }),
    ])

    const paid = currentSessions.data.filter(s => s.payment_status === 'paid')
    const prevPaid = prevSessions.data.filter(s => s.payment_status === 'paid')

    const revenue30d = paid.reduce((sum, s) => sum + (s.amount_total || 0), 0) / 100
    const prevRevenue = prevPaid.reduce((sum, s) => sum + (s.amount_total || 0), 0) / 100

    const revenueChange = prevRevenue > 0
      ? ((revenue30d - prevRevenue) / prevRevenue) * 100
      : null

    // New customers: unique emails in current range
    const emails = new Set(paid.map(s => s.customer_details?.email).filter(Boolean))
    const prevEmails = new Set(prevPaid.map(s => s.customer_details?.email).filter(Boolean))
    const newCustomers = emails.size
    const newCustomersChange = prevEmails.size > 0
      ? ((newCustomers - prevEmails.size) / prevEmails.size) * 100
      : null

    // Daily breakdown
    const byDay = {}
    for (const s of paid) {
      const date = new Date(s.created * 1000).toISOString().split('T')[0]
      byDay[date] = (byDay[date] || 0) + (s.amount_total || 0) / 100
    }

    const daily = []
    for (let i = range - 1; i >= 0; i--) {
      const date = new Date(now - i * 86400000).toISOString().split('T')[0]
      daily.push({ date, revenue: Math.round((byDay[date] || 0) * 100) / 100, adSpend: 0 })
    }

    return res.status(200).json({
      revenue30d: Math.round(revenue30d * 100) / 100,
      adSpend: null,
      roas: null,
      newCustomers,
      revenueChange: revenueChange !== null ? Math.round(revenueChange * 10) / 10 : null,
      adSpendChange: null,
      roasChange: null,
      newCustomersChange: newCustomersChange !== null ? Math.round(newCustomersChange * 10) / 10 : null,
      daily,
    })
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message })
    console.error('stripe/summary error:', err)
    return res.status(500).json({ error: err.message })
  }
}
