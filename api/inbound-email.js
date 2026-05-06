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

    // Start with webhook payload data (Resend inbound webhooks include full email)
    let emailData = event.data || {}

    // Try to enhance with full API response — but don't block on failure
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const { data: fetched, error: fetchErr } = await resend.emails.get(emailId)
      if (!fetchErr && fetched) {
        emailData = { ...emailData, ...fetched }
      } else {
        console.log('resend.emails.get failed (using webhook payload):', fetchErr?.message)
      }
    } catch (fetchErr) {
      console.log('resend.emails.get threw (using webhook payload):', fetchErr.message)
    }

    // Parse "Display Name <email@example.com>"
    const rawFrom = emailData.from || ''
    let fromAddress = rawFrom, fromName = ''
    const m = rawFrom.match(/^(.+?)\s*<([^>]+)>$/)
    if (m) { fromName = m[1].trim(); fromAddress = m[2].trim() }

    // Extract threading headers
    const headers = Array.isArray(emailData.headers) ? emailData.headers : []
    const getHeader = (name) => headers.find(h => h.name?.toLowerCase() === name.toLowerCase())?.value || null
    const messageId = getHeader('message-id')?.trim() || null
    const inReplyTo = getHeader('in-reply-to')?.trim() || null

    // Determine thread_id
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

    const toArr = Array.isArray(emailData.to) ? emailData.to : (emailData.to ? [emailData.to] : [])
    const ccArr = Array.isArray(emailData.cc) ? emailData.cc : (emailData.cc ? [emailData.cc] : [])
    const bccArr = Array.isArray(emailData.bcc) ? emailData.bcc : (emailData.bcc ? [emailData.bcc] : [])

    const row = {
      resend_email_id: emailId,
      message_id: messageId,
      thread_id: threadId,
      from_address: fromAddress || emailData.from_address || '',
      from_name: fromName || emailData.from_name || null,
      to_address: toArr,
      cc_address: ccArr,
      bcc_address: bccArr,
      subject: emailData.subject || '(No Subject)',
      body_html: emailData.html || emailData.body_html || null,
      body_text: emailData.text || emailData.body_text || null,
      direction: 'inbound',
      is_read: false,
      is_sent: false,
      received_at: event.created_at || new Date().toISOString(),
    }

    console.log('Inserting email row:', { emailId, subject: row.subject, fromAddress, threadId })

    const { error: insertError } = await db.from('emails').insert(row)

    if (insertError) {
      console.error('Failed to insert email:', insertError)
      // Return error detail in body (still 200 so Resend doesn't retry)
      return res.status(200).json({ ok: false, insertError: insertError.message })
    }

    return res.status(200).json({ ok: true, emailId, subject: row.subject })

  } catch (err) {
    console.error('inbound-email unhandled error:', err)
    return res.status(200).json({ ok: true })
  }
}
