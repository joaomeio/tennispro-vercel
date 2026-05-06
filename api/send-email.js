import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const ADMIN_EMAIL = 'joaopintobakermeio@gmail.com'
const FROM = 'Support <support@tennispro.site>'

function makeDB() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

async function verifyAdmin(req) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) return null
    const db = makeDB()
    const { data, error } = await db.auth.getUser(token)
    if (error || !data?.user || data.user.email !== ADMIN_EMAIL) return null
    return db
  } catch {
    return null
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const db = await verifyAdmin(req)
    if (!db) return res.status(403).json({ error: 'Forbidden' })

    const { to, subject, body_html, body_text, in_reply_to, references, thread_id } = req.body || {}

    if (!to || !subject || !body_text?.trim()) {
      return res.status(400).json({ error: 'Missing required fields: to, subject, body_text' })
    }

    const toArr = Array.isArray(to) ? to : [to]
    const html = body_html || `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#111;">${body_text.replace(/\n/g, '<br>')}</div>`

    const emailPayload = { from: FROM, to: toArr, subject, html, text: body_text }
    if (in_reply_to || references) {
      emailPayload.headers = {}
      if (in_reply_to) emailPayload.headers['In-Reply-To'] = in_reply_to
      if (references) emailPayload.headers['References'] = references
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { data: sent, error: sendError } = await resend.emails.send(emailPayload)
    if (sendError) return res.status(500).json({ error: sendError.message })

    const { error: insertError } = await db.from('emails').insert({
      resend_email_id: sent?.id || null,
      thread_id: thread_id || sent?.id || null,
      from_address: 'support@tennispro.site',
      from_name: 'Tennis Pro',
      to_address: toArr,
      subject,
      body_html: html,
      body_text: body_text,
      direction: 'outbound',
      is_read: true,
      is_sent: true,
      received_at: new Date().toISOString(),
    })

    if (insertError) console.error('Failed to insert sent email:', insertError)

    return res.status(200).json({ ok: true, id: sent?.id })

  } catch (err) {
    console.error('send-email unhandled error:', err)
    return res.status(500).json({ error: err.message || 'Internal server error' })
  }
}
