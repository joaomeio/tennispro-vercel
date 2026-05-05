import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  // Validate secret before processing anything
  const secret = req.query.secret || req.headers['x-webhook-secret']
  if (process.env.INBOUND_EMAIL_SECRET && secret !== process.env.INBOUND_EMAIL_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const event = req.body || {}

  // Only process inbound email events
  if (event.type !== 'email.received') {
    return res.status(200).json({ ok: true })
  }

  const emailId = event.data?.email_id
  if (!emailId) {
    console.error('email.received event missing data.email_id', event)
    return res.status(200).json({ ok: true })
  }

  // Fetch the full email body from Resend — webhook only delivers metadata
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { data: email, error: fetchError } = await resend.emails.retrieve(emailId)

  if (fetchError || !email) {
    console.error('Failed to retrieve email from Resend:', fetchError)
    // Return 200 so Resend does not keep retrying an unrecoverable error
    return res.status(200).json({ ok: true })
  }

  // Parse "Display Name <email@example.com>" format from the from field
  const rawFrom = email.from || ''
  let fromEmail = rawFrom
  let fromName = ''
  const nameEmailMatch = rawFrom.match(/^(.+?)\s*<([^>]+)>$/)
  if (nameEmailMatch) {
    fromName = nameEmailMatch[1].trim()
    fromEmail = nameEmailMatch[2].trim()
  }

  const { error: insertError } = await supabaseAdmin.from('support_emails').insert({
    from_email: fromEmail,
    from_name: fromName,
    subject: email.subject || '(No Subject)',
    html_body: email.html || '',
    text_body: email.text || '',
    received_at: event.created_at || new Date().toISOString(),
    raw_payload: event,
    replied: false,
  })

  if (insertError) {
    console.error('Failed to store inbound email:', insertError)
  }

  return res.status(200).json({ ok: true })
}
