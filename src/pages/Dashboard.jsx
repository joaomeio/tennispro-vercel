import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutGrid, Users, FileText, Brain, LogOut, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const NAV_ITEMS = [
  { to: 'drills',            label: 'Drills',           icon: LayoutGrid },
  { to: 'tennis-kids',       label: 'Kids Manual',      icon: Users },
  { to: 'lesson-templates',  label: 'Templates',        icon: FileText },
  { to: 'mental-game',       label: 'Mental Game',      icon: Brain },
]

function Sidebar({ onClose }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <aside className="flex flex-col h-full w-64 bg-gray-900 border-r border-gray-800">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-gray-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center">
            <span className="text-white text-xs font-extrabold">TP</span>
          </div>
          <span className="font-extrabold text-white tracking-tight text-lg">TennisPro</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300 p-1">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-3 mb-3">Content</p>
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-green-600 text-white shadow-lg shadow-green-900/40'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                <span className="flex-1">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User + sign out */}
      <div className="px-4 py-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-2 py-2 mb-2 rounded-xl bg-gray-800">
          <div className="w-7 h-7 rounded-full bg-green-900 flex items-center justify-center shrink-0">
            <span className="text-green-400 text-xs font-bold uppercase">
              {user?.email?.[0] ?? '?'}
            </span>
          </div>
          <p className="text-xs text-gray-400 truncate font-medium">{user?.email}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded-xl transition-colors font-medium"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  )
}

// Mobile bottom tab bar
function BottomTabs() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-800 flex md:hidden">
      {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors ${
              isActive ? 'text-green-400' : 'text-gray-500'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon className={`w-5 h-5 ${isActive ? 'text-green-400' : 'text-gray-500'}`} />
              <span className="text-[10px] font-semibold leading-none">{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10 flex h-full">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-gray-900 border-b border-gray-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-green-500 flex items-center justify-center">
              <span className="text-white text-[10px] font-extrabold">TP</span>
            </div>
            <span className="font-extrabold text-white text-base">TennisPro</span>
          </div>
        </header>

        {/* Page content — add bottom padding on mobile to clear tab bar */}
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom tabs */}
      <BottomTabs />
    </div>
  )
}
