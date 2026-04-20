import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutGrid, Users, FileText, Brain, LogOut, Menu, X, ChevronRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const NAV_ITEMS = [
  { to: 'drills', label: 'Drills', icon: LayoutGrid },
  { to: 'tennis-kids', label: 'Tennis Kids Manual', icon: Users },
  { to: 'lesson-templates', label: 'Lesson Templates', icon: FileText },
  { to: 'mental-game', label: 'Mental Game Mastery', icon: Brain },
]

function Sidebar({ mobile, onClose }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <aside
      className={`
        flex flex-col h-full bg-white border-r border-slate-100
        ${mobile ? 'w-72' : 'w-64'}
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-green-600 flex items-center justify-center">
            <span className="text-white text-xs font-extrabold">TP</span>
          </div>
          <span className="font-extrabold text-slate-900 tracking-tight text-lg">TennisPro</span>
        </div>
        {mobile && (
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-3">
          Content
        </p>
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={mobile ? onClose : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                isActive
                  ? 'bg-green-600 text-white shadow-sm shadow-green-600/30'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <span className="flex-1">{label}</span>
                {!isActive && <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User + sign out */}
      <div className="px-4 py-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-2 py-2 mb-2 rounded-xl bg-slate-50">
          <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <span className="text-green-700 text-xs font-bold uppercase">
              {user?.email?.[0] ?? '?'}
            </span>
          </div>
          <p className="text-xs text-slate-500 truncate font-medium">{user?.email}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  )
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-10 flex h-full">
            <Sidebar mobile onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-100 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-green-600 flex items-center justify-center">
              <span className="text-white text-[10px] font-extrabold">TP</span>
            </div>
            <span className="font-extrabold text-slate-900 text-base">TennisPro</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
