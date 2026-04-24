import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, Mail, CheckCircle2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Welcome() {
  const navigate = useNavigate()
  const [session, setSession] = useState(null)
  const [initializing, setInitializing] = useState(true)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [requestingNew, setRequestingNew] = useState(false)
  const [email, setEmail] = useState('')
  const [resendSent, setResendSent] = useState(false)
  const [autoEmail, setAutoEmail] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setInitializing(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      if (event === 'SIGNED_IN') setInitializing(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sessionId = params.get('session_id')
    if (!sessionId) return

    // Provision modules immediately — don't wait for the webhook
    fetch('/api/provision-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    })
      .then((r) => r.json())
      .then(({ email: provisionedEmail }) => {
        if (!provisionedEmail) return
        setAutoEmail(provisionedEmail)
        return supabase.auth.resetPasswordForEmail(provisionedEmail, {
          redirectTo: `${window.location.origin}/welcome`,
        })
      })
      .then(() => setResendSent(true))
      .catch(() => {})
  }, [])

  async function handleSetPassword(e) {
    e.preventDefault()
    setError('')
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (password !== confirm) { setError("Passwords don't match."); return }

    setSubmitting(true)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) { setError(error.message); setSubmitting(false); return }
    navigate('/dashboard')
  }

  async function handleResendLink(e) {
    e.preventDefault()
    if (!email) return
    setRequestingNew(true)
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/welcome`,
    })
    setRequestingNew(false)
    setResendSent(true)
  }

  if (initializing) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-400" />
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-green-500/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-green-500/5 blur-3xl" />
        </div>

        <div className="relative w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">T</span>
              </div>
              <span className="text-white font-extrabold text-lg tracking-tight">TennisPro</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mb-2">Check your inbox</h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Enter your purchase email and we'll send you a secure link to activate your account.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            {resendSent ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7 text-green-400" />
                </div>
                <p className="text-white font-bold mb-1">Link sent!</p>
                <p className="text-slate-400 text-sm">
                  {autoEmail
                    ? `We sent your access link to ${autoEmail}.`
                    : 'Your access link is on its way.'}
                  {' '}Check your inbox (and spam folder).
                </p>
              </div>
            ) : (
              <form onSubmit={handleResendLink} className="flex flex-col gap-3">
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    placeholder="Your purchase email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={requestingNew}
                  className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 rounded-xl text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {requestingNew && <Loader2 className="w-4 h-4 animate-spin" />}
                  Send Access Link
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-green-500/8 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-green-500/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-500/3 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">T</span>
            </div>
            <span className="text-white font-extrabold text-lg tracking-tight">TennisPro</span>
          </div>

          {/* Welcome badge */}
          <h1 className="text-3xl font-extrabold text-white mb-2 leading-tight">
            Welcome aboard,<br />Coach.
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Your platform is ready. Set a password to access your drills, plans, and modules.
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <form onSubmit={handleSetPassword} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 pr-11 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
                Confirm Password
              </label>
              <input
                type={showPw ? 'text' : 'password'}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat your password"
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="bg-green-500 hover:bg-green-400 text-white font-extrabold py-3.5 rounded-xl text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {submitting ? 'Setting up your account…' : 'Enter the Platform →'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-600 mt-4">
          Secure login · Your data is protected
        </p>
      </div>
    </div>
  )
}
