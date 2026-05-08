import { createClient } from '@supabase/supabase-js'

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

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  try {
    await verifyAdmin(req)

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
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message })
    console.error('meta/campaigns error:', err)
    return res.status(500).json({ error: err.message })
  }
}
