import { useState, useRef, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { LogOut, User, ChevronDown, Settings as SettingsIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

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
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3 bg-gradient-to-b from-gray-950 via-gray-950/90 to-transparent pointer-events-none">
      {/* Logo — clickable, goes to home */}
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 pointer-events-auto"
      >
        <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center">
          <span className="text-white text-xs font-extrabold">TP</span>
        </div>
        <span className="text-white font-extrabold text-lg tracking-tight hidden sm:block">TennisPro</span>
      </button>

      {/* Profile menu */}
      <div ref={menuRef} className="relative pointer-events-auto">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-green-900 flex items-center justify-center">
            <span className="text-green-300 text-xs font-bold uppercase">
              {user?.email?.[0] ?? '?'}
            </span>
          </div>
          <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-150 ${menuOpen ? 'rotate-180' : ''}`} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-full mt-2 w-52 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
            <div className="px-3 py-2.5 border-b border-gray-700">
              <p className="text-xs text-gray-500 font-medium truncate">{user?.email}</p>
            </div>
            <button
              onClick={() => { setMenuOpen(false); navigate('/dashboard/settings') }}
              className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
            >
              <SettingsIcon className="w-4 h-4" />
              Settings
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-red-400 transition-colors"
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
  return (
    <div className="min-h-screen bg-gray-950">
      <TopNav />
      {/* pt-0 — top nav is transparent/overlay so hero can go full-bleed */}
      <main className="min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}
