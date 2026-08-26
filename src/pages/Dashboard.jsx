import { useState, useRef, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { LogOut, User, ChevronDown, Settings as SettingsIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { initPixelWithUser, trackPixelEvent } from '../lib/meta'

function TopNav() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3 bg-gradient-to-b from-ink-950 via-ink-950/85 to-transparent pointer-events-none">
      {/* Logo — clickable, goes to home */}
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2.5 pointer-events-auto cursor-pointer"
      >
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/20">
          <span className="text-ink-950 text-xs font-extrabold">TP</span>
        </div>
        <span className="text-white font-extrabold text-[17px] tracking-tight hidden sm:block">TennisPro</span>
      </button>

      {/* Profile menu */}
      <div ref={menuRef} className="relative pointer-events-auto">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-2 py-1.5 px-2 rounded-full border border-transparent hover:border-white/[0.1] hover:bg-white/[0.06] transition-colors cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
            <span className="text-green-400 text-xs font-bold uppercase">
              {user?.email?.[0] ?? '?'}
            </span>
          </div>
          <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-150 ${menuOpen ? 'rotate-180' : ''}`} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-ink-850 border border-white/[0.1] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
            <div className="px-4 py-3 border-b border-white/[0.07]">
              <p className="text-xs text-gray-500 font-medium truncate">{user?.email}</p>
            </div>
            <button
              onClick={() => { setMenuOpen(false); navigate('/dashboard/settings') }}
              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer"
            >
              <SettingsIcon className="w-4 h-4" />
              Settings
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-white/[0.06] hover:text-red-400 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sessionId = params.get('session_id')
    if (!sessionId) return

    // Clean the URL immediately so a refresh doesn't re-fire
    navigate('/dashboard', { replace: true })

    fetch('/api/provision-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    })
      .then((r) => r.json())
      .then(async ({ amount_total, currency, email }) => {
        const value = amount_total != null ? amount_total / 100 : undefined
        if (email) await initPixelWithUser({ email })
        trackPixelEvent(
          'Purchase',
          {
            currency: (currency || 'USD').toUpperCase(),
            ...(value != null && { value }),
            content_type: 'product',
            content_ids: [sessionId],
          },
          sessionId // event_id — matches the webhook CAPI call
        )
      })
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-ink-950 font-app antialiased">
      <TopNav />
      {/* pt-0 — top nav is transparent/overlay so hero can go full-bleed */}
      <main className="min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}
