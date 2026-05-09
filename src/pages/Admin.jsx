import { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import {
  BarChart3, Mail, Users, DollarSign, TrendingUp, RefreshCw,
  Send, Inbox, Loader2, ShieldAlert, AlertCircle,
  PenSquare, X, Star, Trash2, Reply, ArrowLeft, Minus,
  Archive, ChevronDown, ChevronUp, RotateCcw,
} from 'lucide-react'
import DateRangeSelector from '../components/admin/tracking/DateRangeSelector'
import KpiCard from '../components/admin/tracking/KpiCard'
import RevenueChart from '../components/admin/tracking/RevenueChart'
import FunnelChart from '../components/admin/tracking/FunnelChart'
import CampaignsTable from '../components/admin/tracking/CampaignsTable'
import TransactionsTable from '../components/admin/tracking/TransactionsTable'

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

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtDate(dateStr) {
  const d = new Date(dateStr)
  const now = new Date()
  const diffMs = now - d
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  const isThisYear = d.getFullYear() === now.getFullYear()
  return d.toLocaleDateString([], { month: 'short', day: 'numeric', ...(!isThisYear && { year: 'numeric' }) })
}

function fmtFull(dateStr) {
  return new Date(dateStr).toLocaleString([], {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function textPreview(text, len = 100) {
  if (!text) return ''
  return text.replace(/\s+/g, ' ').trim().slice(0, len)
}

// ── Analytics ─────────────────────────────────────────────────────────────────

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

  const MODULE_LABELS = {
    drills: 'Drill Library',
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

// ── Compose Window ────────────────────────────────────────────────────────────

function Compose({ initial = {}, onClose, onSent }) {
  const [to, setTo] = useState(initial.to || '')
  const [subject, setSubject] = useState(initial.subject || '')
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const [minimized, setMinimized] = useState(false)
  const isReply = !!initial.in_reply_to

  async function handleSend(e) {
    e.preventDefault()
    if (!to.trim() || !subject.trim() || !body.trim()) return
    setSending(true); setError(null)
    try {
      await apiFetch('/api/send-email', {
        method: 'POST',
        body: JSON.stringify({
          to: to.trim(),
          subject: subject.trim(),
          body_text: body.trim(),
          ...(initial.in_reply_to && { in_reply_to: initial.in_reply_to }),
          ...(initial.references && { references: initial.references }),
          ...(initial.thread_id && { thread_id: initial.thread_id }),
        }),
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
      <div
        className="flex items-center justify-between px-4 h-11 shrink-0 cursor-pointer select-none"
        onClick={() => setMinimized(m => !m)}
      >
        <span className="text-sm font-medium text-white truncate">
          {isReply ? `Re: ${subject}` : 'New Message'}
        </span>
        <div className="flex items-center gap-1 ml-2" onClick={e => e.stopPropagation()}>
          <button
            onClick={() => setMinimized(m => !m)}
            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {!minimized && (
        <form onSubmit={handleSend} className="flex flex-col flex-1 min-h-0">
          <div className="border-t border-gray-700 divide-y divide-gray-800">
            <input
              value={to}
              onChange={e => setTo(e.target.value)}
              placeholder="To"
              required
              readOnly={isReply}
              className={`w-full bg-transparent text-sm px-4 py-2.5 focus:outline-none placeholder-gray-600 ${isReply ? 'text-gray-400' : 'text-white'}`}
            />
            <input
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="Subject"
              required
              readOnly={isReply}
              className={`w-full bg-transparent text-sm px-4 py-2.5 focus:outline-none placeholder-gray-600 ${isReply ? 'text-gray-400' : 'text-white'}`}
            />
          </div>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Write your message..."
            required
            autoFocus
            className="flex-1 bg-transparent text-white text-sm px-4 py-3 focus:outline-none placeholder-gray-600 resize-none"
          />
          {error && <p className="text-red-400 text-xs px-4 pb-1">{error}</p>}
          <div className="flex items-center gap-3 px-4 py-3 border-t border-gray-700">
            <button
              type="submit"
              disabled={sending}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold text-sm px-5 py-2 rounded-full disabled:opacity-50 transition-colors"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Send
            </button>
            <button type="button" onClick={onClose} className="text-gray-500 hover:text-red-400 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

// ── Thread Row (email list) ───────────────────────────────────────────────────

function ThreadRow({ thread, selected, onSelect, onStar }) {
  const { latest, count, hasUnread } = thread
  const senderDisplay = latest.direction === 'outbound'
    ? `To: ${Array.isArray(latest.to_address) ? latest.to_address[0] : latest.to_address || ''}`
    : (latest.from_name || latest.from_address || '(unknown)')

  return (
    <button
      onClick={onSelect}
      className={`group w-full text-left flex items-start gap-2 px-3 py-3 border-b border-gray-800/50 transition-colors ${
        selected ? 'bg-blue-950/40' : hasUnread ? 'bg-gray-900/50 hover:bg-gray-800/50' : 'hover:bg-gray-900/30'
      }`}
    >
      <button
        onClick={e => { e.stopPropagation(); onStar(latest.id, !latest.is_starred) }}
        className="mt-0.5 shrink-0 text-gray-700 hover:text-yellow-400 transition-colors"
      >
        <Star className={`w-3.5 h-3.5 ${latest.is_starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            {hasUnread && <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />}
            <span className={`text-sm truncate ${hasUnread ? 'font-bold text-white' : 'font-medium text-gray-400'}`}>
              {senderDisplay}
            </span>
            {count > 1 && (
              <span className="text-[10px] text-gray-600 bg-gray-800 rounded px-1 shrink-0">{count}</span>
            )}
          </div>
          <span className="text-[10px] text-gray-600 shrink-0">{fmtDate(latest.received_at)}</span>
        </div>
        <p className={`text-xs mt-0.5 truncate ${hasUnread ? 'text-gray-200' : 'text-gray-600'}`}>
          <span className={hasUnread ? 'font-semibold' : ''}>{latest.subject || '(no subject)'}</span>
          {latest.body_text && (
            <span className="text-gray-600"> — {textPreview(latest.body_text)}</span>
          )}
        </p>
      </div>
    </button>
  )
}

// ── Email Bubble (inside thread view) ────────────────────────────────────────

function EmailBubble({ email, defaultExpanded, onReply, onAction }) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const body = email.body_html || email.body_text?.replace(/\n/g, '<br>') || ''
  const fromDisplay = email.direction === 'outbound'
    ? 'support@tennispro.site'
    : (email.from_name ? `${email.from_name} <${email.from_address}>` : email.from_address)

  return (
    <div className={`border rounded-xl overflow-hidden transition-colors ${
      expanded ? 'border-gray-700 bg-gray-900' : 'border-gray-800 bg-gray-900/30 hover:bg-gray-900/60 cursor-pointer'
    }`}>
      <div
        className="flex items-start justify-between gap-3 px-4 py-3 select-none"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${email.direction === 'outbound' ? 'text-green-400' : 'text-white'}`}>
              {email.direction === 'outbound' ? 'You' : (email.from_name || email.from_address)}
            </span>
            {!email.is_read && email.direction === 'inbound' && (
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
            )}
          </div>
          {expanded
            ? <p className="text-xs text-gray-500 mt-0.5">{fromDisplay}</p>
            : <p className="text-xs text-gray-600 truncate mt-0.5">{textPreview(email.body_text)}</p>
          }
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] text-gray-600">{fmtDate(email.received_at)}</span>
          {expanded
            ? <ChevronUp className="w-3.5 h-3.5 text-gray-600" />
            : <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
          }
        </div>
      </div>

      {expanded && (
        <>
          <div className="px-4 pb-4 border-t border-gray-800/50 pt-3">
            {body
              ? <div className="text-sm text-gray-200 leading-relaxed" dangerouslySetInnerHTML={{ __html: body }} />
              : <p className="text-gray-600 text-sm italic">(no content)</p>
            }
          </div>
          <div className="flex items-center gap-1 px-4 pb-3">
            {email.direction === 'inbound' && (
              <button
                onClick={() => onReply(email)}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white border border-gray-700 hover:border-gray-500 rounded-full px-3 py-1.5 transition-colors"
              >
                <Reply className="w-3 h-3" /> Reply
              </button>
            )}
            <button
              onClick={() => onAction('star', email.id, !email.is_starred)}
              className={`w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-800 transition-colors ${
                email.is_starred ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-400'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${email.is_starred ? 'fill-yellow-400' : ''}`} />
            </button>
            <button
              onClick={() => onAction('archive', email.id)}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-800 text-gray-600 hover:text-white transition-colors"
              title="Archive"
            >
              <Archive className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onAction('trash', email.id)}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-800 text-gray-600 hover:text-red-400 transition-colors"
              title="Move to trash"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// ── Thread Detail ─────────────────────────────────────────────────────────────

function ThreadDetail({ threadId, folder, onBack, onRefresh, onCompose, onThreadAction }) {
  const [emails, setEmails] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(() => {
    setLoading(true); setError(null)
    apiFetch(`/api/emails?thread_id=${encodeURIComponent(threadId)}`)
      .then(({ emails: data }) => setEmails(data || []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [threadId])

  useEffect(() => { load() }, [load])

  function handleReply(email) {
    const allMsgIds = emails.map(e => e.message_id).filter(Boolean)
    onCompose({
      to: email.from_address,
      subject: email.subject?.startsWith('Re:') ? email.subject : `Re: ${email.subject || ''}`,
      in_reply_to: email.message_id || null,
      references: allMsgIds.length ? allMsgIds.join(' ') : null,
      thread_id: threadId,
    })
  }

  async function handleEmailAction(action, emailId, value) {
    setEmails(prev => prev.map(e => {
      if (e.id !== emailId) return e
      if (action === 'star') return { ...e, is_starred: value }
      if (action === 'archive') return { ...e, is_archived: true }
      if (action === 'trash') return { ...e, is_trash: true }
      return e
    }))
    await apiFetch('/api/emails', {
      method: 'POST',
      body: JSON.stringify(
        action === 'star'
          ? { action, emailId, starred: value }
          : { action, emailId }
      ),
    }).catch(() => {})
    onRefresh()
  }

  const subject = emails[0]?.subject || '(no subject)'
  const visibleEmails = emails.filter(e => !e.is_trash && !e.is_archived)
  const lastInbound = [...visibleEmails].reverse().find(e => e.direction === 'inbound')

  if (loading) return (
    <div className="flex-1 flex items-center justify-center">
      <Loader2 className="w-6 h-6 text-green-400 animate-spin" />
    </div>
  )
  if (error) return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3">
      <AlertCircle className="w-6 h-6 text-red-400" />
      <p className="text-sm text-gray-400">{error}</p>
      <button onClick={load} className="text-xs text-green-400 underline">Retry</button>
    </div>
  )

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="shrink-0 px-5 py-3.5 border-b border-gray-800 flex items-center gap-3">
        <button onClick={onBack} className="md:hidden text-gray-500 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-bold text-white truncate">{subject}</h2>
          <p className="text-xs text-gray-600 mt-0.5">
            {emails.length} message{emails.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          {folder === 'trash' ? (
            <button
              onClick={() => onThreadAction('restore', threadId)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-800 text-gray-600 hover:text-green-400 transition-colors"
              title="Restore thread"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          ) : (
            <>
              {folder !== 'archive' && (
                <button
                  onClick={() => onThreadAction('archive', threadId)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-800 text-gray-600 hover:text-white transition-colors"
                  title="Archive thread"
                >
                  <Archive className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => onThreadAction('trash', threadId)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-800 text-gray-600 hover:text-red-400 transition-colors"
                title="Move to trash"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Emails */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2">
        {visibleEmails.length === 0 ? (
          <p className="text-gray-600 text-sm text-center py-8">No messages in this thread</p>
        ) : (
          visibleEmails.map((email, i) => (
            <EmailBubble
              key={email.id}
              email={email}
              defaultExpanded={i === visibleEmails.length - 1}
              onReply={handleReply}
              onAction={handleEmailAction}
            />
          ))
        )}
      </div>

      {/* Quick reply bar — only if last visible is inbound */}
      {folder !== 'trash' && lastInbound && (
        <div className="shrink-0 px-5 py-4 border-t border-gray-800">
          <button
            onClick={() => handleReply(lastInbound)}
            className="flex items-center gap-2 w-full text-sm text-gray-500 border border-gray-700 hover:border-green-600 hover:text-white rounded-full px-4 py-2.5 transition-colors"
          >
            <Reply className="w-4 h-4" />
            Reply to {lastInbound.from_name || lastInbound.from_address}...
          </button>
        </div>
      )}
    </div>
  )
}

// ── Email App (3-pane layout) ─────────────────────────────────────────────────

const FOLDERS_CONFIG = [
  { id: 'inbox',   label: 'Inbox',   icon: Inbox   },
  { id: 'sent',    label: 'Sent',    icon: Send    },
  { id: 'starred', label: 'Starred', icon: Star    },
  { id: 'archive', label: 'Archive', icon: Archive },
  { id: 'trash',   label: 'Trash',   icon: Trash2  },
]

function EmailApp() {
  const [folder, setFolder] = useState('inbox')
  const [emails, setEmails] = useState([])
  const [counts, setCounts] = useState({ inbox: 0, inboxUnread: 0, starred: 0, archived: 0, trash: 0 })
  const [selectedThread, setSelectedThread] = useState(null)
  const [loadingList, setLoadingList] = useState(true)
  const [listError, setListError] = useState(null)
  const [compose, setCompose] = useState(null)
  const [mobilePane, setMobilePane] = useState('list')

  const loadList = useCallback(async () => {
    setLoadingList(true); setListError(null)
    try {
      const { emails: data } = await apiFetch(`/api/emails?folder=${folder}`)
      setEmails(data || [])
    } catch (e) {
      setListError(e.message)
    } finally {
      setLoadingList(false)
    }
  }, [folder])

  const loadCounts = useCallback(async () => {
    try {
      const data = await apiFetch('/api/emails?view=counts')
      setCounts(data)
    } catch {}
  }, [])

  useEffect(() => { loadList() }, [loadList])
  useEffect(() => { loadCounts() }, [loadCounts])

  // Group individual emails into threads
  const threads = useMemo(() => {
    const map = new Map()
    for (const email of emails) {
      const key = email.thread_id || email.id
      const existing = map.get(key)
      if (!existing) {
        map.set(key, { thread_id: key, latest: email, count: 1, hasUnread: !email.is_read })
      } else {
        const isNewer = new Date(email.received_at) > new Date(existing.latest.received_at)
        map.set(key, {
          ...existing,
          latest: isNewer ? email : existing.latest,
          count: existing.count + 1,
          hasUnread: existing.hasUnread || !email.is_read,
        })
      }
    }
    return Array.from(map.values()).sort(
      (a, b) => new Date(b.latest.received_at) - new Date(a.latest.received_at)
    )
  }, [emails])

  function openThread(threadId) {
    setSelectedThread(threadId)
    setMobilePane('detail')
    setEmails(prev => prev.map(e => (e.thread_id || e.id) === threadId ? { ...e, is_read: true } : e))
    apiFetch('/api/emails', {
      method: 'POST',
      body: JSON.stringify({ action: 'mark_read', threadId }),
    }).then(() => loadCounts()).catch(() => {})
  }

  async function handleStar(emailId, starred) {
    setEmails(prev => prev.map(e => e.id === emailId ? { ...e, is_starred: starred } : e))
    await apiFetch('/api/emails', {
      method: 'POST',
      body: JSON.stringify({ action: 'star', emailId, starred }),
    }).catch(() => {})
    loadCounts()
  }

  async function handleThreadAction(action, threadId) {
    setSelectedThread(null)
    setMobilePane('list')
    setEmails(prev => prev.filter(e => (e.thread_id || e.id) !== threadId))
    await apiFetch('/api/emails', {
      method: 'POST',
      body: JSON.stringify({ action, threadId }),
    }).catch(() => {})
    loadCounts()
  }

  function handleSent() {
    if (folder === 'sent') loadList()
    loadCounts()
  }

  const badgeFor = (id) => ({
    inbox: counts.inboxUnread,
    starred: counts.starred,
    archive: counts.archived,
    trash: counts.trash,
  }[id] || 0)

  const HEADER_H = 96

  return (
    <>
      {compose && (
        <Compose
          initial={compose}
          onClose={() => setCompose(null)}
          onSent={handleSent}
        />
      )}

      <div className="flex" style={{ height: `calc(100vh - ${HEADER_H}px)` }}>

        {/* ── Sidebar (desktop) ── */}
        <div className="hidden md:flex flex-col w-[200px] shrink-0 border-r border-gray-800 bg-gray-950 py-3 px-2">
          <button
            onClick={() => setCompose({ to: '', subject: '' })}
            className="flex items-center gap-2 mx-2 mb-4 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-2xl text-sm font-medium transition-colors"
          >
            <PenSquare className="w-4 h-4" /> Compose
          </button>

          {FOLDERS_CONFIG.map(({ id, label, icon: Icon }) => {
            const badge = badgeFor(id)
            return (
              <button
                key={id}
                onClick={() => { setFolder(id); setSelectedThread(null); setMobilePane('list') }}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors mb-0.5 ${
                  folder === id ? 'bg-green-900/30 text-green-300' : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  {label}
                </div>
                {badge > 0 && (
                  <span className="text-[10px] font-bold bg-green-500 text-white rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                    {badge > 99 ? '99+' : badge}
                  </span>
                )}
              </button>
            )
          })}

          <div className="mt-auto px-2">
            <button
              onClick={() => { loadList(); loadCounts() }}
              className="flex items-center gap-1.5 text-xs text-gray-700 hover:text-gray-400 transition-colors"
            >
              <RefreshCw className="w-3 h-3" /> Refresh
            </button>
          </div>
        </div>

        {/* ── Mobile folder bar ── */}
        {mobilePane === 'list' && (
          <div className="md:hidden absolute top-0 left-0 right-0 flex items-center gap-1 px-3 py-2 bg-gray-950 border-b border-gray-800 z-10 overflow-x-auto">
            {FOLDERS_CONFIG.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setFolder(id)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  folder === id ? 'bg-green-600 text-white' : 'text-gray-500 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => setCompose({ to: '', subject: '' })}
              className="ml-auto shrink-0 text-green-400"
            >
              <PenSquare className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── Email List ── */}
        <div className={`${selectedThread && mobilePane === 'detail' ? 'hidden md:flex' : 'flex'} flex-col md:w-[320px] w-full shrink-0 border-r border-gray-800 overflow-hidden`}>
          <div className="shrink-0 px-4 py-2.5 border-b border-gray-800 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {FOLDERS_CONFIG.find(f => f.id === folder)?.label}
              {folder === 'inbox' && counts.inboxUnread > 0 && (
                <span className="text-green-400 ml-1 normal-case font-normal">({counts.inboxUnread} unread)</span>
              )}
            </span>
            <button onClick={loadList} className="text-gray-700 hover:text-white transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loadingList ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-5 h-5 text-green-400 animate-spin" />
              </div>
            ) : listError ? (
              <div className="flex flex-col items-center gap-2 py-12 text-center px-4">
                <AlertCircle className="w-6 h-6 text-red-400" />
                <p className="text-gray-500 text-sm">{listError}</p>
                <button onClick={loadList} className="text-xs text-green-400 underline">Retry</button>
              </div>
            ) : threads.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                <Inbox className="w-8 h-8 text-gray-800 mb-2" />
                <p className="text-gray-600 text-sm">No emails in {folder}</p>
              </div>
            ) : (
              threads.map(thread => (
                <ThreadRow
                  key={thread.thread_id}
                  thread={thread}
                  selected={selectedThread === thread.thread_id}
                  onSelect={() => openThread(thread.thread_id)}
                  onStar={handleStar}
                />
              ))
            )}
          </div>
        </div>

        {/* ── Thread Detail ── */}
        <div className={`${!selectedThread ? 'hidden md:flex' : 'flex'} flex-col flex-1 min-w-0 overflow-hidden bg-gray-950`}>
          {selectedThread ? (
            <ThreadDetail
              key={selectedThread}
              threadId={selectedThread}
              folder={folder}
              onBack={() => { setSelectedThread(null); setMobilePane('list') }}
              onRefresh={() => { loadList(); loadCounts() }}
              onCompose={setCompose}
              onThreadAction={handleThreadAction}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
              <Mail className="w-12 h-12 text-gray-800 mb-3" />
              <p className="text-gray-600 text-sm">Select a conversation to read</p>
              <button
                onClick={() => setCompose({ to: '', subject: '' })}
                className="mt-4 flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                <PenSquare className="w-4 h-4" /> Compose a new email
              </button>
            </div>
          )}
        </div>

      </div>
    </>
  )
}

// ── Tracking & Analytics Section ─────────────────────────────────────────────

function TrackingSection() {
  const [range, setRange] = useState(30)
  const [summary, setSummary] = useState(null)
  const [summaryLoading, setSummaryLoading] = useState(true)

  useEffect(() => {
    setSummaryLoading(true)
    apiFetch(`/api/admin/analytics?source=stripe_summary&range=${range}`)
      .then(data => setSummary(data))
      .catch(() => setSummary(null))
      .finally(() => setSummaryLoading(false))
  }, [range])

  return (
    <section
      id="tracking-analytics"
      className="max-w-5xl mx-auto px-4 pb-10"
      style={{ borderTop: '1px solid #1f2937', paddingTop: '2rem', marginTop: '0.5rem' }}
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-white">Tracking &amp; Analytics</h2>
        <DateRangeSelector value={range} onChange={setRange} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <KpiCard
          title="Revenue (30d)"
          value={summary?.revenue30d != null ? `$${Number(summary.revenue30d).toFixed(2)}` : null}
          change={summary?.revenueChange}
          loading={summaryLoading}
        />
        <KpiCard
          title="Ad Spend"
          value={summary?.adSpend != null ? `$${Number(summary.adSpend).toFixed(2)}` : null}
          change={summary?.adSpendChange}
          loading={summaryLoading}
        />
        <KpiCard
          title="ROAS"
          value={summary?.roas != null ? `${Number(summary.roas).toFixed(2)}x` : null}
          change={summary?.roasChange}
          loading={summaryLoading}
        />
        <KpiCard
          title="New Customers"
          value={summary?.newCustomers ?? null}
          change={summary?.newCustomersChange}
          loading={summaryLoading}
        />
      </div>

      <div className="space-y-4">
        <RevenueChart range={range} />
        <FunnelChart range={range} />
        <CampaignsTable range={range} />
        <TransactionsTable range={range} />
      </div>
    </section>
  )
}

// ── Admin Page ────────────────────────────────────────────────────────────────

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

  const TABS = [
    { id: 'mail',      label: 'Mail',      icon: Mail      },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
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
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                tab === id ? 'border-green-500 text-white' : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'mail' && <EmailApp />}
      {tab === 'analytics' && (
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-4 py-6">
            <AnalyticsTab />
          </div>
          <TrackingSection />
        </div>
      )}
    </div>
  )
}
