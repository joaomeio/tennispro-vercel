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

// Try PostHog query API if a personal API key is configured
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
    // PostHog returns count in the next cursor or we sum results — use total_count if available
    return data?.count ?? null
  } catch {
    return null
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  try {
    const supabaseAdmin = await verifyAdmin(req)

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
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message })
    console.error('posthog/funnel error:', err)
    return res.status(500).json({ error: err.message })
  }
}
