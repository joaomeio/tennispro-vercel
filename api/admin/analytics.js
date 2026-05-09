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
  return supabase
}

// ── source=stripe_summary ─────────────────────────────────────────────────────
async function handleStripeSummary(req, res, supabaseAdmin) {
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
}

// ── source=stripe_transactions ────────────────────────────────────────────────
async function handleStripeTransactions(req, res) {
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
}

// ── source=funnel ─────────────────────────────────────────────────────────────
async function getPostHogEventCount(eventName, after) {
  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY
  const host = process.env.POSTHOG_HOST
  if (!apiKey || !host) return null

  try {
    const url = `${host}/api/projects/@current/events/?event=${encodeURIComponent(eventName)}&after=${after}&limit=1`
    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
    })
    if (!resp.ok) return null
    const data = await resp.json()
    return data?.count ?? null
  } catch {
    return null
  }
}

async function handleFunnel(req, res, supabaseAdmin) {
  const range = Math.min(parseInt(req.query.range) || 30, 90)
  const nowMs = Date.now()
  const rangeStart = Math.floor(nowMs / 1000) - range * 86400
  const afterIso = new Date(rangeStart * 1000).toISOString()

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  // Checkout sessions in range (all statuses = checkout started, paid = purchases)
  const sessions = await stripe.checkout.sessions.list({
    limit: 100,
    created: { gte: rangeStart },
  })
  const checkoutStarted = sessions.data.length
  const purchases = sessions.data.filter(s => s.payment_status === 'paid').length

  // New user signups in range from Supabase (proxy for leads)
  let leads = 0
  const { data: { users } = {} } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 })
  leads = (users || []).filter(u => new Date(u.created_at).getTime() >= rangeStart * 1000).length

  // Visitors: try PostHog personal API key, fall back to pageview estimate
  let visitors = await getPostHogEventCount('$pageview', afterIso)
  if (visitors === null) {
    // rough estimate: checkout started visitors needed at least X sessions
    visitors = checkoutStarted > 0 ? checkoutStarted * 8 : 0
  }

  return res.status(200).json({
    steps: [
      { name: 'Visitors', count: visitors },
      { name: 'Leads', count: leads },
      { name: 'Checkout Started', count: checkoutStarted },
      { name: 'Purchases', count: purchases },
    ],
  })
}

// ── source=meta_campaigns ─────────────────────────────────────────────────────
async function fetchMetaCampaigns(range) {
  const accessToken = process.env.META_ACCESS_TOKEN
  const adAccountId = process.env.META_AD_ACCOUNT_ID
  if (!accessToken || !adAccountId) return null

  const since = new Date(Date.now() - range * 86400000).toISOString().split('T')[0]
  const until = new Date().toISOString().split('T')[0]
  const fields = 'campaign_name,spend,impressions,clicks,actions'
  const url = `https://graph.facebook.com/v19.0/${adAccountId}/insights?fields=${fields}&time_range={"since":"${since}","until":"${until}"}&level=campaign&access_token=${accessToken}`

  const resp = await fetch(url)
  if (!resp.ok) return null
  const json = await resp.json()
  if (json.error) return null

  return (json.data || []).map(row => {
    const purchases = (row.actions || []).find(a => a.action_type === 'purchase')?.value || 0
    return {
      name: row.campaign_name,
      spend: parseFloat(row.spend || 0),
      impressions: parseInt(row.impressions || 0, 10),
      clicks: parseInt(row.clicks || 0, 10),
      purchases: parseInt(purchases, 10),
    }
  })
}

async function handleMetaCampaigns(req, res) {
  const range = Math.min(parseInt(req.query.range) || 30, 90)
  const campaigns = await fetchMetaCampaigns(range)

  // Meta not configured — return empty with a hint
  if (campaigns === null) {
    return res.status(200).json({
      campaigns: [],
      note: 'Set META_ACCESS_TOKEN and META_AD_ACCOUNT_ID env vars to enable Meta Ads data.',
    })
  }

  return res.status(200).json({ campaigns })
}

// ── Router ────────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  try {
    const supabaseAdmin = await verifyAdmin(req)
    const { source } = req.query

    switch (source) {
      case 'stripe_summary':      return await handleStripeSummary(req, res, supabaseAdmin)
      case 'stripe_transactions': return await handleStripeTransactions(req, res)
      case 'funnel':              return await handleFunnel(req, res, supabaseAdmin)
      case 'meta_campaigns':      return await handleMetaCampaigns(req, res)
      default:
        return res.status(400).json({ error: 'Missing or unknown ?source= parameter. Valid values: stripe_summary, stripe_transactions, funnel, meta_campaigns' })
    }
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message })
    console.error('admin/analytics error:', err)
    return res.status(500).json({ error: err.message })
  }
}
