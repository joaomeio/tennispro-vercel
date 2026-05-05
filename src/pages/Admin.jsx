import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import {
  BarChart3, Mail, Users, DollarSign, TrendingUp, RefreshCw,
  Send, Inbox, Loader2, ShieldAlert, CheckCircle2, AlertCircle,
  PenSquare, X, Star, Trash2, Reply, ArrowLeft, Minus,
} from 'lucide-react'

const ADMIN_EMAIL = 'joaopintobakermeio@gmail.com'

async function getToken() {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.access_token || null
}

async function apiFetch(path, options = {}) {
  const token = await getToken()
  const res = await fetch(path, {
    ...options,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...(options.headers || {}) },
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(json?.error || `API error ${res.status}`)
  return json
}

// ─── Analytics ───────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, sub, color = 'green' }) {
  const colors = { green: 'bg-green-900/30 text-green-400', blue: 'bg-blue-900/30 text-blue-400', yellow: 'bg-yellow-900/30 text-yellow-400', purple: 'bg-purple-900/30 text-purple-400' }
  return (
    <div className="bg-gray-900 rounded-2xl p-4 flex items-start gap-3">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${colors[color]}`}>
        <Icon className="w-[18px] h-[18px]" />
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-xl font-bold text-white leading-tight">{value ?? '—'}</p>
        {sub && <p className="text-xs text-gray-600 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

function AnalyticsTab() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const load = useCallback(async () => {
    setLoading(true); setError(null)
    try { setStats(await apiFetch('/api/admin-stats')) }
    catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { load() }, [load])

  const MODULE_LABELS = { 'drills': 'Drill Library', 'tennis-kids': 'Tennis Kids', 'mental-game': 'Mental Game', 'lesson-templates': 'Lesson Templates', 'gym-training': 'Gym Training', 'serve-masterclass': 'Serve Masterclass', 'doubles-tactics': 'Doubles Tactics' }

  if (loading) return <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 text-green-400 animate-spin" /></div>
  if (error) return <div className="flex flex-col items-center gap-3 py-12 text-center"><AlertCircle className="w-8 h-8 text-red-400" /><p className="text-gray-400 text-sm">{error}</p><button onClick={load} className="text-xs text-green-400 underline">Retry</button></div>

  const total = Object.values(stats?.moduleCounts || {}).reduce((a, b) => a + b, 0)
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={Users} label="Total Users" value={stats?.totalUsers?.toLocaleString()} sub={`+${stats?.recentUsers ?? 0} last 7 days`} color="blue" />
        <StatCard icon={Mail} label="Unread Emails" value={stats?.unreadEmails} sub="awaiting reply" color="yellow" />
        <StatCard icon={DollarSign} label="Revenue (30d)" value={stats?.revenue30d != null ? `$${stats.revenue30d.toFixed(2)}` : '—'} sub="last 30 days" color="green" />
        <StatCard icon={TrendingUp} label="Total Revenue" value={stats?.totalRevenue != null ? `$${stats.totalRevenue.toFixed(2)}` : '—'} sub="all-time (last 100)" color="purple" />
      </div>
      <div>
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Module Access</h2>
        <div className="bg-gray-900 rounded-2xl overflow-hidden divide-y divide-gray-800">
          {Object.entries(MODULE_LABELS).map(([id, label]) => {
            const count = stats?.moduleCounts?.[id] || 0
            const pct = total > 0 ? Math.round((count / total) * 100) : 0
            return (
              <div key={id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium">{label}</p>
                  <div className="mt-1.5 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <span className="text-white font-bold text-sm">{count}</span>
                  <span className="text-gray-600 text-xs ml-1">users</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <button onClick={load} className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors mx-auto">
        <RefreshCw className="w-3.5 h-3.5" /> Refresh
      </button>
    </div>
  )
}

// ─── Email helpers ────────────────────────────────────────────────────────────

function fmtDate(dateStr) {
  const d = new Date(dateStr)
  const now = new Date()
  const isToday = d.toDateString() === now.toDateString()
  if (isToday) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const isThisYear = d.getFullYear() === now.getFullYear()
  return d.toLocaleDateString([], { month: 'short', day: 'numeric', ...(!isThisYear && { year: 'numeric' }) })
}

function preview(text) {
  if (!text) return ''
  return text.replace(/\s+/g, ' ').trim().slice(0, 120)
}

// ─── Compose Window ───────────────────────────────────────────────────────────

function ComposeWindow({ initial = {}, onClose, onSent }) {
  const [to, setTo] = useState(initial.to || '')
  const [subject, setSubject] = useState(initial.subject || '')
  const [body, setBody] = useState(initial.body || '')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const [minimized, setMinimized] = useState(false)
  const action = initial.replyToId ? 'reply' : 'send'

  async function handleSend(e) {
    e.preventDefault()
    if (!to.trim() || !subject.trim() || !body.trim()) return
    setSending(true); setError(null)
    try {
      await apiFetch('/api/admin-emails', {
        method: 'POST',
        body: JSON.stringify(
          action === 'reply'
            ? { action: 'reply', emailId: initial.replyToId, body: body.trim() }
            : { action: 'send', to: to.trim(), subject: subject.trim(), body: body.trim() }
        ),
      })
      onSent?.()
      onClose()
    } catch (e) {
      setError(e.message)
      setSending(false)
    }
  }

  return (
    <div className={`fixed bottom-0 right-6 z-50 w-[480px] max-w-[calc(100vw-24px)] bg-gray-900 rounded-t-2xl shadow-2xl border border-gray-700 border-b-0 flex flex-col transition-all duration-200 ${minimized ? 'h-11' : 'h-[480px]'}`}>
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 h-11 shrink-0 cursor-pointer select-none" onClick={() => setMinimized(m => !m)}>
        <span className="text-sm font-medium text-white truncate">{action === 'reply' ? `Re: ${subject}` : 'New Message'}</span>
        <div className="flex items-center gap-1 ml-2" onClick={e => e.stopPropagation()}>
          <button onClick={() => setMinimized(m => !m)} className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button onClick={onClose} className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {!minimized && (
        <form onSubmit={handleSend} className="flex flex-col flex-1 min-h-0">
          {/* Fields */}
          <div className="border-t border-gray-700 divide-y divide-gray-800">
            {action === 'send' && (
              <input
                value={to} onChange={e => setTo(e.target.value)}
                placeholder="To"
                required
                className="w-full bg-transparent text-white text-sm px-4 py-2.5 focus:outline-none placeholder-gray-600"
              />
            )}
            <input
              value={subject} onChange={e => setSubject(e.target.value)}
              placeholder="Subject"
              required={action === 'send'}
              readOnly={action === 'reply'}
              className="w-full bg-transparent text-white text-sm px-4 py-2.5 focus:outline-none placeholder-gray-600 disabled:text-gray-500"
            />
          </div>
          <textarea
            value={body} onChange={e => setBody(e.target.value)}
            placeholder="Write your message..."
            required
            className="flex-1 bg-transparent text-white text-sm px-4 py-3 focus:outline-none placeholder-gray-600 resize-none"
          />
          {error && <p className="text-red-400 text-xs px-4 pb-1">{error}</p>}
          <div className="flex items-center gap-3 px-4 py-3 border-t border-gray-700">
            <button
              type="submit" disabled={sending}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold text-sm px-5 py-2 rounded-full disabled:opacity-50 transition-colors"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Send
            </button>
            <button type="button" onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

// ─── Email Row ────────────────────────────────────────────────────────────────

function EmailRow({ email, selected, onSelect, onStar }) {
  const unread = !email.read
  return (
    <button
      onClick={onSelect}
      className={`group w-full text-left flex items-start gap-2 px-3 py-2.5 border-b border-gray-800/60 transition-colors ${selected ? 'bg-blue-950/40' : unread ? 'bg-gray-900/60 hover:bg-gray-800/60' : 'hover:bg-gray-900/40'}`}
    >
      {/* Star */}
      <button
        onClick={e => { e.stopPropagation(); onStar(email.id, !email.starred) }}
        className="mt-0.5 shrink-0 text-gray-700 hover:text-yellow-400 transition-colors"
      >
        <Star className={`w-3.5 h-3.5 ${email.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <span className={`text-sm truncate ${unread ? 'font-bold text-white' : 'font-medium text-gray-400'}`}>
            {email.folder === 'sent' ? `To: ${email.to_email}` : (email.from_name || email.from_email)}
          </span>
          <span className="text-[10px] text-gray-600 shrink-0">{fmtDate(email.created_at)}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          {unread && <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />}
          {email.replied && <CheckCircle2 className="w-3 h-3 text-green-600 shrink-0" />}
          <p className={`text-xs truncate ${unread ? 'text-gray-300' : 'text-gray-600'}`}>
            <span className={unread ? 'font-semibold text-gray-200' : ''}>{email.subject}</span>
            {email.text_body && <span className="text-gray-600"> — {preview(email.text_body)}</span>}
          </p>
        </div>
      </div>
    </button>
  )
}

// ─── Email Detail ─────────────────────────────────────────────────────────────

function EmailDetail({ emailId, onBack, onDelete, onStarChange, onReplied, onCompose }) {
  const [email, setEmail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [replying, setReplying] = useState(false)

  useEffect(() => {
    setLoading(true); setEmail(null); setError(null); setReplying(false)
    apiFetch(`/api/admin-emails?id=${emailId}`)
      .then(({ email: e }) => setEmail(e))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [emailId])

  async function handleStar() {
    const next = !email.starred
    setEmail(e => ({ ...e, starred: next }))
    await apiFetch('/api/admin-emails', { method: 'POST', body: JSON.stringify({ action: 'star', emailId, starred: next }) })
    onStarChange(emailId, next)
  }

  async function handleDelete() {
    await apiFetch('/api/admin-emails', { method: 'POST', body: JSON.stringify({ action: 'delete', emailId }) })
    onDelete(emailId)
  }

  if (loading) return <div className="flex-1 flex items-center justify-center"><Loader2 className="w-6 h-6 text-green-400 animate-spin" /></div>
  if (error) return <div className="flex-1 flex items-center justify-center"><p className="text-red-400 text-sm">{error}</p></div>
  if (!email) return null

  const body = email.html_body || email.text_body?.replace(/\n/g, '<br>') || ''

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="shrink-0 px-6 py-4 border-b border-gray-800">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="md:hidden text-gray-500 hover:text-white transition-colors mr-1">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h2 className="text-base font-bold text-white leading-tight">{email.subject}</h2>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button onClick={handleStar} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-800 transition-colors">
              <Star className={`w-4 h-4 ${email.starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
            </button>
            <button
              onClick={() => onCompose({ to: email.from_email, subject: email.subject?.startsWith('Re:') ? email.subject : `Re: ${email.subject}`, body: '', replyToId: emailId })}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-800 transition-colors text-gray-500 hover:text-white"
            >
              <Reply className="w-4 h-4" />
            </button>
            <button onClick={handleDelete} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-800 transition-colors text-gray-600 hover:text-red-400">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-2 space-y-0.5">
          <p className="text-xs text-gray-500">
            <span className="text-gray-600">From:</span>{' '}
            <span className="text-gray-300">{email.from_name ? `${email.from_name} <${email.from_email}>` : email.from_email}</span>
          </p>
          {email.to_email && (
            <p className="text-xs text-gray-500">
              <span className="text-gray-600">To:</span> <span className="text-gray-400">{email.to_email}</span>
            </p>
          )}
          <p className="text-xs text-gray-600">{new Date(email.created_at).toLocaleString()}</p>
        </div>

        {email.replied && (
          <span className="inline-flex items-center gap-1 mt-2 text-[10px] bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full font-semibold">
            <CheckCircle2 className="w-3 h-3" /> Replied
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        {body ? (
          <div
            className="text-sm text-gray-200 leading-relaxed max-w-none"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        ) : (
          <p className="text-gray-600 text-sm italic">(no content)</p>
        )}
      </div>

      {/* Reply bar */}
      {email.folder === 'inbox' && (
        <div className="shrink-0 px-6 py-4 border-t border-gray-800">
          <button
            onClick={() => onCompose({ to: email.from_email, subject: email.subject?.startsWith('Re:') ? email.subject : `Re: ${email.subject}`, body: '', replyToId: emailId })}
            className="flex items-center gap-2 text-sm text-gray-400 border border-gray-700 hover:border-green-600 hover:text-white rounded-full px-4 py-2 transition-colors w-full"
          >
            <Reply className="w-4 h-4" />
            Reply to {email.from_name || email.from_email}...
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Email App (3-pane Gmail layout) ─────────────────────────────────────────

const FOLDERS = [
  { id: 'inbox', label: 'Inbox', icon: Inbox },
  { id: 'sent', label: 'Sent', icon: Send },
  { id: 'starred', label: 'Starred', icon: Star },
]

function EmailApp() {
  const [folder, setFolder] = useState('inbox')
  const [emails, setEmails] = useState([])
  const [counts, setCounts] = useState({ inbox: 0, inboxUnread: 0, starred: 0 })
  const [selectedId, setSelectedId] = useState(null)
  const [loadingList, setLoadingList] = useState(true)
  const [listError, setListError] = useState(null)
  const [compose, setCompose] = useState(null) // null | { to, subject, body, replyToId? }
  const [mobilePane, setMobilePane] = useState('list') // 'list' | 'detail'

  const loadList = useCallback(async () => {
    setLoadingList(true); setListError(null)
    try {
      const { emails: data } = await apiFetch(`/api/admin-emails?folder=${folder}`)
      setEmails(data || [])
    } catch (e) {
      setListError(e.message)
    } finally {
      setLoadingList(false)
    }
  }, [folder])

  const loadCounts = useCallback(async () => {
    try {
      const data = await apiFetch('/api/admin-emails?counts=1')
      setCounts(data)
    } catch {}
  }, [])

  useEffect(() => { loadList() }, [loadList])
  useEffect(() => { loadCounts() }, [loadCounts])

  function openEmail(id) {
    setSelectedId(id)
    setMobilePane('detail')
    // Optimistically mark as read in the list
    setEmails(prev => prev.map(e => e.id === id ? { ...e, read: true } : e))
    // Update unread count
    setCounts(c => ({ ...c, inboxUnread: Math.max(0, c.inboxUnread - 1) }))
  }

  function handleBack() {
    setMobilePane('list')
    setSelectedId(null)
  }

  function handleDelete(id) {
    setEmails(prev => prev.filter(e => e.id !== id))
    setSelectedId(null)
    setMobilePane('list')
    loadCounts()
  }

  function handleStarChange(id, starred) {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, starred } : e))
    loadCounts()
  }

  function handleReplied() {
    setEmails(prev => prev.map(e => e.id === selectedId ? { ...e, replied: true } : e))
  }

  function handleSent() {
    if (folder === 'sent') loadList()
    loadCounts()
  }

  async function handleStar(id, starred) {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, starred } : e))
    await apiFetch('/api/admin-emails', { method: 'POST', body: JSON.stringify({ action: 'star', emailId: id, starred }) })
    loadCounts()
  }

  const HEADER_H = 96 // px — admin header height

  return (
    <>
      {/* Compose window */}
      {compose && (
        <ComposeWindow
          initial={compose}
          onClose={() => setCompose(null)}
          onSent={handleSent}
        />
      )}

      <div className="flex" style={{ height: `calc(100vh - ${HEADER_H}px)` }}>

        {/* ── Sidebar ── */}
        <div className="hidden md:flex flex-col w-[200px] shrink-0 border-r border-gray-800 bg-gray-950 py-3 px-2">
          <button
            onClick={() => setCompose({ to: '', subject: '', body: '' })}
            className="flex items-center gap-2 mx-2 mb-4 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-2xl text-sm font-medium transition-colors shadow-sm"
          >
            <PenSquare className="w-4 h-4" /> Compose
          </button>

          {FOLDERS.map(({ id, label, icon: Icon }) => {
            const badge = id === 'inbox' ? counts.inboxUnread : id === 'starred' ? counts.starred : 0
            return (
              <button
                key={id}
                onClick={() => { setFolder(id); setSelectedId(null); setMobilePane('list') }}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors mb-0.5 ${folder === id ? 'bg-green-900/30 text-green-300' : 'text-gray-400 hover:bg-gray-900 hover:text-white'}`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  {label}
                </div>
                {badge > 0 && (
                  <span className="text-[10px] font-bold bg-green-500 text-white rounded-full w-4 h-4 flex items-center justify-center">{badge > 9 ? '9+' : badge}</span>
                )}
              </button>
            )
          })}

          <div className="mt-auto px-2">
            <button onClick={() => { loadList(); loadCounts() }} className="flex items-center gap-1.5 text-xs text-gray-700 hover:text-gray-400 transition-colors">
              <RefreshCw className="w-3 h-3" /> Refresh
            </button>
          </div>
        </div>

        {/* ── Mobile folder bar ── */}
        <div className="md:hidden absolute top-0 left-0 right-0 flex items-center gap-1 px-3 py-2 bg-gray-950 border-b border-gray-800 z-10" style={{ display: mobilePane === 'detail' ? 'none' : 'flex' }}>
          {FOLDERS.map(({ id, label }) => (
            <button key={id} onClick={() => setFolder(id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${folder === id ? 'bg-green-600 text-white' : 'text-gray-500 hover:text-white'}`}>
              {label}
            </button>
          ))}
          <button onClick={() => setCompose({ to: '', subject: '', body: '' })} className="ml-auto text-green-400">
            <PenSquare className="w-4 h-4" />
          </button>
        </div>

        {/* ── Email List ── */}
        <div className={`${selectedId && mobilePane === 'detail' ? 'hidden md:flex' : 'flex'} flex-col md:w-[300px] w-full shrink-0 border-r border-gray-800 overflow-hidden`}>
          {/* List header */}
          <div className="shrink-0 px-4 py-2.5 border-b border-gray-800 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider capitalize">
              {folder}
              {folder === 'inbox' && counts.inboxUnread > 0 && (
                <span className="text-green-400 ml-1">({counts.inboxUnread})</span>
              )}
            </span>
            <button onClick={loadList} className="text-gray-700 hover:text-white transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loadingList ? (
              <div className="flex items-center justify-center py-16"><Loader2 className="w-5 h-5 text-green-400 animate-spin" /></div>
            ) : listError ? (
              <div className="flex flex-col items-center gap-2 py-12 text-center px-4">
                <AlertCircle className="w-6 h-6 text-red-400" />
                <p className="text-gray-500 text-sm">{listError}</p>
                <button onClick={loadList} className="text-xs text-green-400 underline">Retry</button>
              </div>
            ) : emails.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                <Inbox className="w-8 h-8 text-gray-800 mb-2" />
                <p className="text-gray-600 text-sm">No emails in {folder}</p>
              </div>
            ) : (
              emails.map(email => (
                <EmailRow
                  key={email.id}
                  email={email}
                  selected={selectedId === email.id}
                  onSelect={() => openEmail(email.id)}
                  onStar={handleStar}
                />
              ))
            )}
          </div>
        </div>

        {/* ── Email Detail ── */}
        <div className={`${!selectedId ? 'hidden md:flex' : 'flex'} flex-col flex-1 min-w-0 overflow-hidden bg-gray-950`}>
          {selectedId ? (
            <EmailDetail
              key={selectedId}
              emailId={selectedId}
              onBack={handleBack}
              onDelete={handleDelete}
              onStarChange={handleStarChange}
              onReplied={handleReplied}
              onCompose={setCompose}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
              <Mail className="w-12 h-12 text-gray-800 mb-3" />
              <p className="text-gray-600 text-sm">Select an email to read</p>
              <button
                onClick={() => setCompose({ to: '', subject: '', body: '' })}
                className="mt-4 flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                <PenSquare className="w-4 h-4" /> Or compose a new email
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// ─── Admin Page ───────────────────────────────────────────────────────────────

export default function Admin() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('mail')

  useEffect(() => {
    if (loading) return
    if (!user) { navigate('/', { replace: true }); return }
    if (user.email !== ADMIN_EMAIL) { navigate('/dashboard', { replace: true }); return }
  }, [user, loading, navigate])

  if (loading || !user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        {loading
          ? <Loader2 className="w-6 h-6 text-green-400 animate-spin" />
          : <div className="text-center"><ShieldAlert className="w-10 h-10 text-red-400 mx-auto mb-3" /><p className="text-gray-400 text-sm">Access denied</p></div>
        }
      </div>
    )
  }

  const TABS = [
    { id: 'mail', label: 'Mail', icon: Mail },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header — fixed ~96px */}
      <div className="shrink-0 bg-gray-950/95 backdrop-blur border-b border-gray-800">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-green-900/50 flex items-center justify-center">
              <ShieldAlert className="w-3.5 h-3.5 text-green-400" />
            </div>
            <span className="font-bold text-sm text-white">Admin Panel</span>
          </div>
          <span className="text-xs text-gray-600 hidden sm:block">{user.email}</span>
        </div>
        <div className="px-4 flex gap-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${tab === id ? 'border-green-500 text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {tab === 'mail' && <EmailApp />}
      {tab === 'analytics' && (
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-4 py-6">
            <AnalyticsTab />
          </div>
        </div>
      )}
    </div>
  )
}
