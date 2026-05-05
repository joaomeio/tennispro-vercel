import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const ADMIN_EMAIL = 'joaopintobakermeio@gmail.com'

async function verifyAdmin(req) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return null

  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
  if (error || !user || user.email !== ADMIN_EMAIL) return null
  return supabaseAdmin
}

export default async function handler(req, res) {
  const supabaseAdmin = await verifyAdmin(req)
  if (!supabaseAdmin) return res.status(403).json({ error: 'Forbidden' })

  if (req.method === 'GET') {
    const { data, error } = await supabaseAdmin
      .from('support_emails')
      .select('id, from_email, from_name, subject, text_body, html_body, received_at, replied, reply_body, replied_at')
      .order('received_at', { ascending: false })
      .limit(100)

    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ emails: data })
  }

  if (req.method === 'POST') {
    const { emailId, replyBody } = req.body || {}
    if (!emailId || !replyBody?.trim()) {
      return res.status(400).json({ error: 'Missing emailId or replyBody' })
    }

    const { data: original, error: fetchError } = await supabaseAdmin
      .from('support_emails')
      .select('*')
      .eq('id', emailId)
      .single()

    if (fetchError || !original) return res.status(404).json({ error: 'Email not found' })

    const resend = new Resend(process.env.RESEND_API_KEY)
    const replySubject = original.subject?.startsWith('Re:')
      ? original.subject
      : `Re: ${original.subject}`

    const escapedReply = replyBody.replace(/\n/g, '<br>')
    const quotedOriginal = (original.html_body || original.text_body || '')
      .replace(/<[^>]*>/g, ' ')
      .trim()

    const replyHtml = `
      <div style="font-family:Arial,sans-serif;font-size:14px;color:#0f172a;line-height:1.6;">
        ${escapedReply}
        <br><br>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;">
        <p style="color:#64748b;font-size:12px;margin:0 0 6px;">
          <strong>From:</strong> ${original.from_name || original.from_email} &lt;${original.from_email}&gt;<br>
          <strong>Subject:</strong> ${original.subject}
        </p>
        <blockquote style="margin:0;padding:0 0 0 12px;border-left:3px solid #cbd5e1;color:#64748b;font-size:13px;">
          ${quotedOriginal || '(no content)'}
        </blockquote>
      </div>
    `

    const { error: sendError } = await resend.emails.send({
      from: 'Tennis Pro Support <support@tennispro.site>',
      to: original.from_email,
      subject: replySubject,
      html: replyHtml,
      text: replyBody,
    })

    if (sendError) {
      console.error('Resend send error:', sendError)
      return res.status(500).json({ error: sendError.message || 'Failed to send reply' })
    }

    await supabaseAdmin
      .from('support_emails')
      .update({ replied: true, reply_body: replyBody, replied_at: new Date().toISOString() })
      .eq('id', emailId)

    return res.status(200).json({ ok: true })
  }

  return res.status(405).end()
}
