import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const ADMIN_EMAIL = 'joaopintobakermeio@gmail.com'
const FROM = 'Tennis Pro <support@tennispro.site>'

function makeDB() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

async function verifyAdmin(req) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return null
  const db = makeDB()
  const { data: { user }, error } = await db.auth.getUser(token)
  if (error || !user || user.email !== ADMIN_EMAIL) return null
  return db
}

export default async function handler(req, res) {
  const db = await verifyAdmin(req)
  if (!db) return res.status(403).json({ error: 'Forbidden' })

  // ── GET ──────────────────────────────────────────────────────────────────
  if (req.method === 'GET') {
    const { folder, id, counts } = req.query

    // Sidebar badge counts
    if (counts) {
      const [inboxRes, starredRes] = await Promise.all([
        db.from('emails').select('read').eq('folder', 'inbox'),
        db.from('emails').select('id', { count: 'exact', head: true }).eq('starred', true),
      ])
      const inboxEmails = inboxRes.data || []
      return res.status(200).json({
        inbox: inboxEmails.length,
        inboxUnread: inboxEmails.filter(e => !e.read).length,
        starred: starredRes.count || 0,
      })
    }

    // Single email — also marks it as read
    if (id) {
      const { data, error } = await db.from('emails').select('*').eq('id', id).single()
      if (error || !data) return res.status(404).json({ error: 'Not found' })
      if (!data.read) await db.from('emails').update({ read: true }).eq('id', id)
      return res.status(200).json({ email: { ...data, read: true } })
    }

    // Email list by folder
    const LIST_COLS = 'id, folder, from_email, from_name, to_email, subject, text_body, created_at, read, starred, replied'
    let query = db.from('emails').select(LIST_COLS).order('created_at', { ascending: false }).limit(200)
    query = folder === 'starred' ? query.eq('starred', true) : query.eq('folder', folder || 'inbox')

    const { data, error } = await query
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ emails: data || [] })
  }

  // ── POST ─────────────────────────────────────────────────────────────────
  if (req.method === 'POST') {
    const { action, emailId, to, subject, body, starred } = req.body || {}
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Compose new email
    if (action === 'send') {
      if (!to || !subject || !body?.trim()) return res.status(400).json({ error: 'Missing to, subject, or body' })
      const html = `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#111;">${body.replace(/\n/g, '<br>')}</div>`
      const { data: sent, error: err } = await resend.emails.send({ from: FROM, to, subject, html, text: body })
      if (err) return res.status(500).json({ error: err.message })
      await db.from('emails').insert({
        folder: 'sent', from_email: 'support@tennispro.site', from_name: 'Tennis Pro',
        to_email: to, subject, html_body: html, text_body: body,
        resend_id: sent?.id, read: true, starred: false, replied: false,
      })
      return res.status(200).json({ ok: true })
    }

    // Reply to an inbox email
    if (action === 'reply') {
      if (!emailId || !body?.trim()) return res.status(400).json({ error: 'Missing emailId or body' })
      const { data: orig, error: fetchErr } = await db.from('emails').select('*').eq('id', emailId).single()
      if (fetchErr || !orig) return res.status(404).json({ error: 'Email not found' })

      const replySubject = orig.subject?.startsWith('Re:') ? orig.subject : `Re: ${orig.subject}`
      const quotedHtml = orig.html_body || orig.text_body?.replace(/\n/g, '<br>') || ''
      const html = `
        <div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#111;">
          ${body.replace(/\n/g, '<br>')}
          <br><br>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;">
          <p style="color:#888;font-size:12px;margin:0 0 8px;">
            On ${new Date(orig.created_at).toLocaleString()}, ${orig.from_name || orig.from_email} wrote:
          </p>
          <blockquote style="margin:0;padding:0 0 0 14px;border-left:3px solid #ddd;color:#888;font-size:13px;">
            ${quotedHtml}
          </blockquote>
        </div>`

      const { data: sent, error: err } = await resend.emails.send({
        from: FROM, to: orig.from_email, subject: replySubject, html, text: body,
      })
      if (err) return res.status(500).json({ error: err.message })

      await Promise.all([
        db.from('emails').insert({
          folder: 'sent', from_email: 'support@tennispro.site', from_name: 'Tennis Pro',
          to_email: orig.from_email, subject: replySubject,
          html_body: body.replace(/\n/g, '<br>'), text_body: body,
          resend_id: sent?.id, reply_to_id: emailId, read: true, starred: false, replied: false,
        }),
        db.from('emails').update({ replied: true }).eq('id', emailId),
      ])
      return res.status(200).json({ ok: true })
    }

    // Star / unstar
    if (action === 'star') {
      if (!emailId) return res.status(400).json({ error: 'Missing emailId' })
      await db.from('emails').update({ starred: !!starred }).eq('id', emailId)
      return res.status(200).json({ ok: true })
    }

    // Delete
    if (action === 'delete') {
      if (!emailId) return res.status(400).json({ error: 'Missing emailId' })
      await db.from('emails').delete().eq('id', emailId)
      return res.status(200).json({ ok: true })
    }

    return res.status(400).json({ error: `Unknown action: ${action}` })
  }

  return res.status(405).end()
}
