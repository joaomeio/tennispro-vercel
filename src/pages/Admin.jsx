import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import {
  BarChart3, Mail, Users, DollarSign, TrendingUp, RefreshCw,
  Send, Inbox, Loader2, ShieldAlert, CheckCircle2,
  ChevronRight, ArrowLeft, AlertCircle, PenSquare, X,
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
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(json?.error || `API error ${res.status}`)
  return json
}

// ─── Stat Card ──────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, sub, color = 'green' }) {
  const colors = {
    green: 'bg-green-900/30 text-green-400',
    blue: 'bg-blue-900/30 text-blue-400',
    yellow: 'bg-yellow-900/30 text-yellow-400',
    purple: 'bg-purple-900/30 text-purple-400',
  }
  return (
    <div className="bg-gray-900 rounded-2xl p-4 flex items-start gap-3">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${colors[color]}`}>
        <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-xl font-bold text-white leading-tight">{value ?? '—'}</p>
        {sub && <p className="text-xs text-gray-600 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

// ─── Analytics Tab ──────────────────────────────────────────────────────────

function AnalyticsTab() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiFetch('/api/admin-stats')
      setStats(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const MODULE_LABELS = {
    'drills': 'Drill Library',
    'tennis-kids': 'Tennis Kids',
    'mental-game': 'Mental Game',
    'lesson-templates': 'Lesson Templates',
    'gym-training': 'Gym Training',
    'serve-masterclass': 'Serve Masterclass',
    'doubles-tactics': 'Doubles Tactics',
  }

  if (loading) return (
    <div className="flex items-center justify-center py-16">
      <Loader2 className="w-6 h-6 text-green-400 animate-spin" />
    </div>
  )

  if (error) return (
    <div className="flex flex-col items-center gap-3 py-12 text-center">
      <AlertCircle className="w-8 h-8 text-red-400" />
      <p className="text-gray-400 text-sm">{error}</p>
      <button onClick={load} className="text-xs text-green-400 underline">Retry</button>
    </div>
  )

  const totalModuleAccess = Object.values(stats?.moduleCounts || {}).reduce((a, b) => a + b, 0)

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={Users}
          label="Total Users"
          value={stats?.totalUsers?.toLocaleString()}
          sub={`+${stats?.recentUsers ?? 0} last 7 days`}
          color="blue"
        />
        <StatCard
          icon={Mail}
          label="Pending Emails"
          value={stats?.unreadEmails}
          sub="awaiting reply"
          color="yellow"
        />
        <StatCard
          icon={DollarSign}
          label="Revenue (30d)"
          value={stats?.revenue30d != null ? `$${stats.revenue30d.toFixed(2)}` : '—'}
          sub="last 30 days"
          color="green"
        />
        <StatCard
          icon={TrendingUp}
          label="Total Revenue"
          value={stats?.totalRevenue != null ? `$${stats.totalRevenue.toFixed(2)}` : '—'}
          sub="all-time (last 100)"
          color="purple"
        />
      </div>

      {/* Module breakdown */}
      <div>
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Module Access</h2>
        <div className="bg-gray-900 rounded-2xl overflow-hidden divide-y divide-gray-800">
          {Object.entries(MODULE_LABELS).map(([id, label]) => {
            const count = stats?.moduleCounts?.[id] || 0
            const pct = totalModuleAccess > 0 ? Math.round((count / totalModuleAccess) * 100) : 0
            return (
              <div key={id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium">{label}</p>
                  <div className="mt-1.5 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
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

      <button
        onClick={load}
        className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors mx-auto"
      >
        <RefreshCw className="w-3.5 h-3.5" /> Refresh stats
      </button>
    </div>
  )
}

// ─── Mailbox Tab ─────────────────────────────────────────────────────────────

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

function EmailRow({ email, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 border-b border-gray-800 transition-colors ${
        selected ? 'bg-gray-800' : 'hover:bg-gray-800/50'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className={`text-sm truncate font-medium ${email.replied ? 'text-gray-500' : 'text-white'}`}>
            {email.from_name || email.from_email}
          </p>
          <p className={`text-xs truncate mt-0.5 ${email.replied ? 'text-gray-600' : 'text-gray-400'}`}>
            {email.subject}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="text-[10px] text-gray-600">{timeAgo(email.received_at)}</span>
          {!email.replied && (
            <span className="w-2 h-2 rounded-full bg-green-500" />
          )}
          {email.replied && (
            <CheckCircle2 className="w-3.5 h-3.5 text-gray-700" />
          )}
        </div>
      </div>
    </button>
  )
}

// Extract displayable body from all possible locations in the email record
function getBody(email) {
  if (email.html_body) return { type: 'html', content: email.html_body }
  if (email.text_body) return { type: 'text', content: email.text_body }

  // Fallback: dig through raw_payload (Resend may use different field names)
  const raw = email.raw_payload
  if (raw && typeof raw === 'object') {
    const p = raw.data || raw
    const html = p.html || p.html_body || p.body_html || p.htmlBody
    const text = p.text || p.plain || p.plain_text || p.body_text || p.textBody || p.body
    if (html) return { type: 'html', content: html }
    if (text) return { type: 'text', content: text }
  }
  return { type: 'empty', content: '' }
}

function EmailBody({ email }) {
  const { type, content } = getBody(email)
  if (type === 'html') {
    return (
      <div
        className="text-gray-300 text-sm leading-relaxed [&_a]:text-green-400 [&_a]:underline"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }
  if (type === 'text') {
    return (
      <pre className="text-gray-300 text-sm whitespace-pre-wrap font-sans leading-relaxed">
        {content}
      </pre>
    )
  }
  return <p className="text-gray-600 text-sm italic">(no content)</p>
}

// ─── Compose Modal ────────────────────────────────────────────────────────────

function ComposeModal({ onClose, onSent }) {
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)

  async function handleSend(e) {
    e.preventDefault()
    if (!to.trim() || !subject.trim() || !body.trim()) return
    setSending(true)
    setError(null)
    try {
      await apiFetch('/api/admin-emails', {
        method: 'POST',
        body: JSON.stringify({ to: to.trim(), subject: subject.trim(), composeBody: body.trim() }),
      })
      onSent()
      onClose()
    } catch (e) {
      setError(e.message)
      setSending(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
          <span className="font-semibold text-white text-sm">New Email</span>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleSend} className="p-5 space-y-3">
          {[
            { label: 'To', value: to, set: setTo, placeholder: 'recipient@example.com', type: 'email' },
            { label: 'Subject', value: subject, set: setSubject, placeholder: 'Subject', type: 'text' },
          ].map(({ label, value, set, placeholder, type }) => (
            <div key={label}>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">{label}</label>
              <input
                type={type}
                value={value}
                onChange={e => set(e.target.value)}
                placeholder={placeholder}
                required
                className="w-full bg-gray-800 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-600 border border-gray-700"
              />
            </div>
          ))}
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Message</label>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder="Write your message..."
              rows={6}
              required
              className="w-full bg-gray-800 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-600 resize-none border border-gray-700"
            />
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-gray-800 text-gray-400 hover:text-white text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={sending}
              className="flex-1 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function EmailDetail({ email, onReplied }) {
  const [reply, setReply] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)

  async function handleSend(e) {
    e.preventDefault()
    if (!reply.trim()) return
    setSending(true)
    setError(null)
    try {
      await apiFetch('/api/admin-emails', {
        method: 'POST',
        body: JSON.stringify({ emailId: email.id, replyBody: reply }),
      })
      setSent(true)
      setReply('')
      onReplied()
    } catch (e) {
      setError(e.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-800">
        <p className="text-white font-semibold text-sm">{email.subject}</p>
        <p className="text-gray-500 text-xs mt-1">
          From: <span className="text-gray-400">{email.from_name ? `${email.from_name} <${email.from_email}>` : email.from_email}</span>
        </p>
        <p className="text-gray-600 text-xs mt-0.5">{new Date(email.received_at).toLocaleString()}</p>
        {email.replied && (
          <span className="inline-flex items-center gap-1 mt-2 text-[10px] bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full font-semibold">
            <CheckCircle2 className="w-3 h-3" /> Replied
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <EmailBody email={email} />
      </div>

      {/* Previous reply */}
      {email.reply_body && (
        <div className="px-5 py-3 bg-gray-800/50 border-t border-gray-800">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Your Reply</p>
          <p className="text-xs text-gray-400 whitespace-pre-wrap">{email.reply_body}</p>
          <p className="text-[10px] text-gray-600 mt-1">{email.replied_at ? new Date(email.replied_at).toLocaleString() : ''}</p>
        </div>
      )}

      {/* Reply form */}
      <form onSubmit={handleSend} className="px-5 py-4 border-t border-gray-800 bg-gray-950">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
          Reply from support@tennispro.site
        </p>
        <textarea
          value={reply}
          onChange={e => setReply(e.target.value)}
          placeholder="Write your reply..."
          rows={4}
          className="w-full bg-gray-900 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-600 resize-none border border-gray-800"
        />
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        {sent && (
          <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Reply sent!
          </p>
        )}
        <button
          type="submit"
          disabled={sending || !reply.trim()}
          className="mt-2 w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
        >
          {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          Send Reply
        </button>
      </form>
    </div>
  )
}

function MailboxTab() {
  const [emails, setEmails] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState(null)
  const [composing, setComposing] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { emails: data } = await apiFetch('/api/admin-emails')
      setEmails(data || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const selectedEmail = emails.find(e => e.id === selected)

  function handleReplied() {
    setEmails(prev => prev.map(e => e.id === selected ? { ...e, replied: true } : e))
  }

  if (loading) return (
    <div className="flex items-center justify-center py-16">
      <Loader2 className="w-6 h-6 text-green-400 animate-spin" />
    </div>
  )

  if (error) return (
    <div className="flex flex-col items-center gap-3 py-12 text-center">
      <AlertCircle className="w-8 h-8 text-red-400" />
      <p className="text-gray-400 text-sm">{error}</p>
      <button onClick={load} className="text-xs text-green-400 underline">Retry</button>
    </div>
  )

  const unread = emails.filter(e => !e.replied).length

  return (
    <>
      {composing && (
        <ComposeModal
          onClose={() => setComposing(false)}
          onSent={() => {}}
        />
      )}
    <div className="flex gap-0 -mx-4 h-[calc(100vh-180px)] min-h-[400px]">
      {/* Email list */}
      <div className={`flex flex-col border-r border-gray-800 ${selectedEmail ? 'hidden md:flex md:w-72 shrink-0' : 'flex-1'}`}>
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Inbox {unread > 0 && <span className="text-green-400">({unread})</span>}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setComposing(true)}
              className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300 font-medium transition-colors"
            >
              <PenSquare className="w-3.5 h-3.5" /> New
            </button>
            <button onClick={load} className="text-gray-600 hover:text-white transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {emails.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
              <Inbox className="w-8 h-8 text-gray-700 mb-2" />
              <p className="text-gray-600 text-sm">No emails yet</p>
              <p className="text-gray-700 text-xs mt-1">Set up Resend inbound routing to start receiving emails here</p>
            </div>
          ) : (
            emails.map(email => (
              <EmailRow
                key={email.id}
                email={email}
                selected={selected === email.id}
                onClick={() => setSelected(email.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Email detail */}
      {selectedEmail && (
        <div className="flex-1 flex flex-col min-w-0 bg-gray-950">
          <div className="md:hidden flex items-center gap-2 px-4 py-2.5 border-b border-gray-800">
            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-400">Back to inbox</span>
          </div>
          <EmailDetail email={selectedEmail} onReplied={handleReplied} />
        </div>
      )}

      {!selectedEmail && emails.length > 0 && (
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="text-center">
            <Mail className="w-8 h-8 text-gray-700 mx-auto mb-2" />
            <p className="text-gray-600 text-sm">Select an email to read</p>
          </div>
        </div>
      )}
    </div>
    </>
  )
}

// ─── Main Admin Page ─────────────────────────────────────────────────────────

export default function Admin() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('analytics')

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
          : (
            <div className="text-center">
              <ShieldAlert className="w-10 h-10 text-red-400 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Access denied</p>
            </div>
          )
        }
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-gray-950/95 backdrop-blur border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-green-900/50 flex items-center justify-center">
              <ShieldAlert className="w-3.5 h-3.5 text-green-400" />
            </div>
            <span className="font-bold text-sm text-white">Admin Panel</span>
          </div>
          <span className="text-xs text-gray-600 hidden sm:block">{user.email}</span>
        </div>

        {/* Tabs */}
        <div className="max-w-5xl mx-auto px-4 flex gap-1 pb-0">
          {[
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'mailbox', label: 'Mailbox', icon: Mail },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                tab === id
                  ? 'border-green-500 text-white'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {tab === 'analytics' && <AnalyticsTab />}
        {tab === 'mailbox' && <MailboxTab />}
      </div>
    </div>
  )
}
