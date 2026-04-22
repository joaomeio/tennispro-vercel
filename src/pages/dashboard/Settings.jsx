import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, User, Lock, Bell, CreditCard, LogOut, CheckCircle, Loader2, Shield, ChevronRight } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { useUserModules } from '../../hooks/useUserModules'
import { MODULES } from '../../config/modules'

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-4 mb-2">{title}</h2>
      <div className="bg-gray-900 rounded-2xl overflow-hidden divide-y divide-gray-800">
        {children}
      </div>
    </div>
  )
}

function Row({ icon: Icon, label, value, onClick, danger, children }) {
  return (
    <button
      onClick={onClick}
      disabled={!onClick && !children}
      className={`flex items-center gap-3 w-full px-4 py-3.5 text-left transition-colors ${
        onClick ? (danger ? 'hover:bg-red-900/20' : 'hover:bg-gray-800') : 'cursor-default'
      }`}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${danger ? 'bg-red-900/40' : 'bg-gray-800'}`}>
        <Icon className={`w-4 h-4 ${danger ? 'text-red-400' : 'text-gray-400'}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${danger ? 'text-red-400' : 'text-white'}`}>{label}</p>
        {value && <p className="text-xs text-gray-500 truncate mt-0.5">{value}</p>}
        {children}
      </div>
      {onClick && <ChevronRight className="w-4 h-4 text-gray-600 shrink-0" />}
    </button>
  )
}

function ChangePasswordForm({ onDone }) {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (next.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (next !== confirm) { setError("Passwords don't match."); return }
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password: next })
    setLoading(false)
    if (error) { setError(error.message); return }
    setSuccess(true)
    setTimeout(onDone, 1500)
  }

  if (success) return (
    <div className="flex items-center gap-2 text-green-400 text-sm px-4 py-3">
      <CheckCircle className="w-4 h-4" /> Password updated successfully.
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="px-4 py-3 flex flex-col gap-3">
      {[
        { label: 'New password', value: next, set: setNext },
        { label: 'Confirm password', value: confirm, set: setConfirm },
      ].map(({ label, value, set }) => (
        <div key={label}>
          <label className="text-xs text-gray-500 font-medium block mb-1">{label}</label>
          <input
            type="password"
            value={value}
            onChange={(e) => set(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full bg-gray-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-600"
          />
        </div>
      ))}
      {error && <p className="text-red-400 text-xs">{error}</p>}
      <div className="flex gap-2">
        <button type="button" onClick={onDone} className="flex-1 py-2 rounded-lg text-sm text-gray-400 bg-gray-800 hover:bg-gray-700 font-medium transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="flex-1 py-2 rounded-lg text-sm text-white bg-green-600 hover:bg-green-500 font-bold transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
          {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          Save
        </button>
      </div>
    </form>
  )
}

export default function Settings() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const { purchases, hasAccess } = useUserModules()
  const [changingPassword, setChangingPassword] = useState(false)

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  const unlockedModules = MODULES.filter((m) => hasAccess(m))
  const lockedModules = MODULES.filter((m) => !hasAccess(m))

  return (
    <div className="min-h-screen bg-gray-950 pt-14">
      {/* Top bar */}
      <div className="sticky top-14 z-30 bg-gray-950/95 backdrop-blur border-b border-gray-800 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-white font-semibold text-sm">Settings</span>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">

        {/* Account */}
        <Section title="Account">
          <Row icon={User} label="Email" value={user?.email} />
          {changingPassword ? (
            <ChangePasswordForm onDone={() => setChangingPassword(false)} />
          ) : (
            <Row icon={Lock} label="Change Password" onClick={() => setChangingPassword(true)} />
          )}
        </Section>

        {/* My Plan */}
        <Section title="My Plan">
          <Row
            icon={CreditCard}
            label="Active Modules"
            value={`${unlockedModules.length} module${unlockedModules.length !== 1 ? 's' : ''} unlocked`}
          >
            <div className="flex flex-wrap gap-1.5 mt-2">
              {unlockedModules.map((m) => (
                <span key={m.id} className="inline-flex items-center gap-1 text-[10px] bg-green-900/40 text-green-300 px-2 py-0.5 rounded-full font-semibold">
                  <CheckCircle className="w-2.5 h-2.5" /> {m.title}
                </span>
              ))}
              {lockedModules.filter((m) => !m.comingSoon).map((m) => (
                <span key={m.id} className="text-[10px] bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full font-semibold">
                  🔒 {m.title}
                </span>
              ))}
            </div>
          </Row>
        </Section>

        {/* Preferences */}
        <Section title="Preferences">
          <Row icon={Bell} label="Email Notifications" value="On — updates and new content alerts" />
          <Row
            icon={Shield}
            label="Platform Version"
            value="TennisPro v1.0 — Vercel Edition"
          />
        </Section>

        {/* Danger zone */}
        <Section title="Session">
          <Row icon={LogOut} label="Sign Out" onClick={handleSignOut} danger />
        </Section>

        <p className="text-center text-gray-700 text-xs mt-8">
          Need help? <a href="mailto:support@tennispro.site" className="text-gray-500 hover:text-white underline">support@tennispro.site</a>
        </p>
      </div>
    </div>
  )
}
