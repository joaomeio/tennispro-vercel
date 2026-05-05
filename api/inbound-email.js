import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  // Optional secret check — set INBOUND_EMAIL_SECRET env var in Vercel and append ?secret=... to your Resend webhook URL
  const secret = req.query.secret || req.headers['x-webhook-secret']
  if (process.env.INBOUND_EMAIL_SECRET && secret !== process.env.INBOUND_EMAIL_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const body = req.body || {}

  // Resend inbound email payload — handle both flat and nested formats
  const rawFrom = body.from || body.sender || ''
  const subject = body.subject || '(No Subject)'
  const textBody = body.text || body.plain_text || ''
  const htmlBody = body.html || ''

  // Parse "Display Name <email@example.com>" format
  let fromEmail = rawFrom
  let fromName = ''
  const nameEmailMatch = rawFrom.match(/^(.+?)\s*<([^>]+)>$/)
  if (nameEmailMatch) {
    fromName = nameEmailMatch[1].trim()
    fromEmail = nameEmailMatch[2].trim()
  }

  const { error } = await supabaseAdmin.from('support_emails').insert({
    from_email: fromEmail,
    from_name: fromName,
    subject,
    text_body: textBody,
    html_body: htmlBody,
    received_at: new Date().toISOString(),
    raw_payload: JSON.stringify(body),
    replied: false,
  })

  if (error) {
    console.error('Failed to store inbound email:', error)
    return res.status(500).json({ error: 'Failed to store email' })
  }

  return res.status(200).json({ ok: true })
}
