import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const db = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
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
    const { data: email, error } = await resend.emails.get(emailId)

    if (error || !email) {
      console.error('resend.emails.get failed for', emailId, error)
      return res.status(200).json({ ok: true })
    }

    // Parse "Display Name <email@example.com>"
    const rawFrom = email.from || ''
    let fromAddress = rawFrom, fromName = ''
    const m = rawFrom.match(/^(.+?)\s*<([^>]+)>$/)
    if (m) { fromName = m[1].trim(); fromAddress = m[2].trim() }

    // Extract threading headers
    const headers = Array.isArray(email.headers) ? email.headers : []
    const getHeader = (name) => headers.find(h => h.name?.toLowerCase() === name.toLowerCase())?.value || null
    const messageId = getHeader('message-id')?.trim() || null
    const inReplyTo = getHeader('in-reply-to')?.trim() || null

    // Determine thread_id: follow In-Reply-To chain or start a new thread
    let threadId = null
    if (inReplyTo) {
      const { data: parent } = await db
        .from('emails')
        .select('thread_id')
        .eq('message_id', inReplyTo)
        .maybeSingle()
      threadId = parent?.thread_id || inReplyTo
    } else {
      threadId = messageId || emailId
    }

    const toArr = Array.isArray(email.to) ? email.to : (email.to ? [email.to] : [])
    const ccArr = Array.isArray(email.cc) ? email.cc : (email.cc ? [email.cc] : [])
    const bccArr = Array.isArray(email.bcc) ? email.bcc : (email.bcc ? [email.bcc] : [])

    const { error: insertError } = await db.from('emails').insert({
      resend_email_id: emailId,
      message_id: messageId,
      thread_id: threadId,
      from_address: fromAddress,
      from_name: fromName,
      to_address: toArr,
      cc_address: ccArr,
      bcc_address: bccArr,
      subject: email.subject || '(No Subject)',
      body_html: email.html || null,
      body_text: email.text || null,
      direction: 'inbound',
      is_read: false,
      is_sent: false,
      received_at: event.created_at || new Date().toISOString(),
    })

    if (insertError) console.error('Failed to insert email:', insertError)

    return res.status(200).json({ ok: true })

  } catch (err) {
    console.error('inbound-email unhandled error:', err)
    return res.status(200).json({ ok: true })
  }
}
