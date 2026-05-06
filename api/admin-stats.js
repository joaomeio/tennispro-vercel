import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const ADMIN_EMAIL = 'joaopintobakermeio@gmail.com'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) return res.status(401).json({ error: 'Unauthorized' })

    const supabaseAdmin = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    // Verify admin — safe destructure (no nested data.user)
    const { data: authData, error: authError } = await supabaseAdmin.auth.getUser(token)
    if (authError || !authData?.user || authData.user.email !== ADMIN_EMAIL) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    // User count — paginate to get accurate total
    let totalUsers = 0
    let recentUsers = 0
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    let page = 1
    while (true) {
      const { data: pageData, error: listError } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 1000 })
      if (listError) throw listError
      const users = pageData?.users || []
      totalUsers += users.length
      recentUsers += users.filter(u => u.created_at >= sevenDaysAgo).length
      if (users.length < 1000) break
      page++
    }

    // Module distribution
    const { data: moduleRows, error: modError } = await supabaseAdmin
      .from('user_modules')
      .select('module_id')
    if (modError) throw modError

    const moduleCounts = {}
    for (const row of moduleRows || []) {
      moduleCounts[row.module_id] = (moduleCounts[row.module_id] || 0) + 1
    }

    // Stripe revenue
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const thirtyDaysAgo = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60

    const [recent, allTime] = await Promise.all([
      stripe.checkout.sessions.list({ limit: 100, created: { gte: thirtyDaysAgo } }),
      stripe.checkout.sessions.list({ limit: 100 }),
    ])

    const revenue30d = recent.data
      .filter(s => s.payment_status === 'paid')
      .reduce((sum, s) => sum + (s.amount_total || 0), 0) / 100

    const totalRevenue = allTime.data
      .filter(s => s.payment_status === 'paid')
      .reduce((sum, s) => sum + (s.amount_total || 0), 0) / 100

    // Unread inbound emails
    const { count: unreadEmails } = await supabaseAdmin
      .from('emails')
      .select('id', { count: 'exact', head: true })
      .eq('direction', 'inbound')
      .eq('is_read', false)
      .eq('is_trash', false)

    return res.status(200).json({
      totalUsers,
      recentUsers,
      moduleCounts,
      revenue30d,
      totalRevenue,
      unreadEmails: unreadEmails || 0,
    })

  } catch (err) {
    console.error('admin-stats error:', err)
    return res.status(500).json({ error: err.message || 'Internal server error' })
  }
}
