import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const db = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const secret = req.query.secret || req.headers['x-webhook-secret']
  if (process.env.INBOUND_EMAIL_SECRET && secret !== process.env.INBOUND_EMAIL_SECRET) {
    return res.status(401).end()
  }

  const event = req.body || {}
  if (event.type !== 'email.received') return res.status(200).json({ ok: true })

  const emailId = event.data?.email_id
  if (!emailId) {
    console.error('email.received missing data.email_id:', JSON.stringify(event))
    return res.status(200).json({ ok: true })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const { data: email, error } = await resend.emails.retrieve(emailId)

  if (error || !email) {
    console.error('resend.emails.retrieve failed:', emailId, error)
    return res.status(200).json({ ok: true })
  }

  // Parse "Display Name <email@example.com>"
  const rawFrom = email.from || ''
  let fromEmail = rawFrom, fromName = ''
  const m = rawFrom.match(/^(.+?)\s*<([^>]+)>$/)
  if (m) { fromName = m[1].trim(); fromEmail = m[2].trim() }

  const toEmail = Array.isArray(email.to) ? email.to[0] : (email.to || '')

  const { error: insertError } = await db.from('emails').insert({
    folder: 'inbox',
    from_email: fromEmail,
    from_name: fromName,
    to_email: toEmail,
    subject: email.subject || '(No Subject)',
    html_body: email.html || '',
    text_body: email.text || '',
    resend_id: emailId,
    created_at: event.created_at || new Date().toISOString(),
    read: false,
    starred: false,
    replied: false,
  })

  if (insertError) console.error('Failed to insert email:', insertError)

  return res.status(200).json({ ok: true })
}
