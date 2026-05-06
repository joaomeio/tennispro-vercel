import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const ADMIN_EMAIL = 'joaopintobakermeio@gmail.com'

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

function applyUpdate(db, emailId, threadId, data) {
  const q = db.from('emails').update(data)
  return emailId ? q.eq('id', emailId) : q.eq('thread_id', threadId)
}

export default async function handler(req, res) {
  try {
    const db = await verifyAdmin(req)
    if (!db) return res.status(403).json({ error: 'Forbidden' })

    // ── GET ──────────────────────────────────────────────────────────────────
    if (req.method === 'GET') {
      const { view, folder, thread_id, id } = req.query

      // Sidebar badge counts
      if (view === 'counts') {
        const [inboxRes, starredRes, archiveRes, trashRes] = await Promise.all([
          db.from('emails').select('is_read').eq('direction', 'inbound').eq('is_archived', false).eq('is_trash', false),
          db.from('emails').select('id', { count: 'exact', head: true }).eq('is_starred', true).eq('is_trash', false),
          db.from('emails').select('id', { count: 'exact', head: true }).eq('is_archived', true).eq('is_trash', false),
          db.from('emails').select('id', { count: 'exact', head: true }).eq('is_trash', true),
        ])
        const inbox = inboxRes.data || []
        return res.status(200).json({
          inbox: inbox.length,
          inboxUnread: inbox.filter(e => !e.is_read).length,
          starred: starredRes.count || 0,
          archived: archiveRes.count || 0,
          trash: trashRes.count || 0,
        })
      }

      // Single email by id (marks as read)
      if (id) {
        const { data: email, error } = await db.from('emails').select('*').eq('id', id).single()
        if (error || !email) return res.status(404).json({ error: 'Not found' })
        if (!email.is_read) await db.from('emails').update({ is_read: true }).eq('id', id)
        return res.status(200).json({ email: { ...email, is_read: true } })
      }

      // All emails in a thread — hydrates missing bodies from Resend, then caches
      if (thread_id) {
        const { data: emails, error } = await db
          .from('emails')
          .select('*')
          .eq('thread_id', thread_id)
          .order('received_at', { ascending: true })
        if (error) return res.status(500).json({ error: error.message })

        // Mark thread as read (fire-and-forget)
        db.from('emails').update({ is_read: true }).eq('thread_id', thread_id).eq('is_read', false).then(() => {})

        // For inbound emails with no body, fetch from Resend and cache
        const resend = new Resend(process.env.RESEND_API_KEY)
        const hydratedEmails = await Promise.all(
          (emails || []).map(async (email) => {
            const needsBody = email.direction === 'inbound' && email.resend_email_id && !email.body_html && !email.body_text
            if (!needsBody) return email
            try {
              const { data: fetched, error: fetchErr } = await resend.emails.receiving.get(email.resend_email_id)
              if (fetchErr || !fetched) return email
              const bodyHtml = fetched.html || null
              const bodyText = fetched.text || null
              // Cache back so future loads are instant
              db.from('emails').update({ body_html: bodyHtml, body_text: bodyText }).eq('id', email.id).then(() => {})
              return { ...email, body_html: bodyHtml, body_text: bodyText }
            } catch {
              return email
            }
          })
        )

        return res.status(200).json({ emails: hydratedEmails })
      }

      // Email list by folder
      let query = db.from('emails').select('*').order('received_at', { ascending: false }).limit(500)
      switch (folder) {
        case 'sent':
          query = query.eq('direction', 'outbound').eq('is_trash', false)
          break
        case 'starred':
          query = query.eq('is_starred', true).eq('is_trash', false)
          break
        case 'archive':
          query = query.eq('is_archived', true).eq('is_trash', false)
          break
        case 'trash':
          query = query.eq('is_trash', true)
          break
        default: // inbox
          query = query.eq('direction', 'inbound').eq('is_archived', false).eq('is_trash', false)
      }

      const { data: emails, error } = await query
      if (error) return res.status(500).json({ error: error.message })
      return res.status(200).json({ emails: emails || [] })
    }

    // ── POST ─────────────────────────────────────────────────────────────────
    if (req.method === 'POST') {
      const { action, emailId, threadId, starred } = req.body || {}
      if (!emailId && !threadId) return res.status(400).json({ error: 'Missing emailId or threadId' })

      switch (action) {
        case 'mark_read':
          await applyUpdate(db, emailId, threadId, { is_read: true })
          return res.status(200).json({ ok: true })
        case 'mark_unread':
          await applyUpdate(db, emailId, threadId, { is_read: false })
          return res.status(200).json({ ok: true })
        case 'star':
          if (!emailId) return res.status(400).json({ error: 'star requires emailId' })
          await db.from('emails').update({ is_starred: !!starred }).eq('id', emailId)
          return res.status(200).json({ ok: true })
        case 'archive':
          await applyUpdate(db, emailId, threadId, { is_archived: true, is_trash: false })
          return res.status(200).json({ ok: true })
        case 'unarchive':
          await applyUpdate(db, emailId, threadId, { is_archived: false })
          return res.status(200).json({ ok: true })
        case 'trash':
          await applyUpdate(db, emailId, threadId, { is_trash: true })
          return res.status(200).json({ ok: true })
        case 'restore':
          await applyUpdate(db, emailId, threadId, { is_trash: false, is_archived: false })
          return res.status(200).json({ ok: true })
        case 'delete':
          if (!emailId) return res.status(400).json({ error: 'delete requires emailId' })
          await db.from('emails').delete().eq('id', emailId)
          return res.status(200).json({ ok: true })
        default:
          return res.status(400).json({ error: `Unknown action: ${action}` })
      }
    }

    return res.status(405).end()

  } catch (err) {
    console.error('emails unhandled error:', err)
    return res.status(500).json({ error: err.message || 'Internal server error' })
  }
}
