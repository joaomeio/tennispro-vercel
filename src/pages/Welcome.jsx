import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, Mail, CheckCircle2, AlertCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { initPixelWithUser, trackPixelEvent, getFbp, getFbc } from '../lib/meta'

function Logo() {
  return (
    <div className="inline-flex items-center gap-2 mb-6">
      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
        <span className="text-white font-black text-sm">T</span>
      </div>
      <span className="text-white font-extrabold text-lg tracking-tight">TennisPro</span>
    </div>
  )
}

function Glow() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-green-500/5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-green-500/5 blur-3xl" />
    </div>
  )
}

// ─── View: Login (email + password) ──────────────────────────────────────────
function LoginView({ onForgot, provisionMessage }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setSubmitting(false)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="relative w-full max-w-sm">
      <div className="text-center mb-8">
        <Logo />
        <h1 className="text-2xl font-extrabold text-white mb-2">Sign in to TennisPro</h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Welcome back, Coach.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        {provisionMessage && (
          <div className="flex items-start gap-3 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 mb-4">
            <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
            <p className="text-green-300 text-sm">{provisionMessage}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
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
            {submitting ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={onForgot}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            Forgot your password?
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-slate-600 mt-4">
        Secure login · Your data is protected
      </p>
    </div>
  )
}

// ─── View: Forgot password ────────────────────────────────────────────────────
function ForgotView({ onBack }) {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/welcome`,
    })
    setSubmitting(false)
    setSent(true)
  }

  return (
    <div className="relative w-full max-w-sm">
      <div className="text-center mb-8">
        <Logo />
        <h1 className="text-2xl font-extrabold text-white mb-2">Reset your password</h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Enter your email and we'll send you a reset link.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        {sent ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-green-400" />
            </div>
            <p className="text-white font-bold mb-1">Check your inbox</p>
            <p className="text-slate-400 text-sm">We sent a reset link to <span className="text-white">{email}</span>. Check your spam folder too.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 rounded-xl text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              Send Reset Link
            </button>
          </form>
        )}

        <div className="mt-4 text-center">
          <button onClick={onBack} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            ← Back to sign in
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── View: Create account (shown directly after purchase) ────────────────────
function CreateAccountView({ email, sessionId }) {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleCreateAccount(e) {
    e.preventDefault()
    setError('')
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (password !== confirm) { setError("Passwords don't match."); return }
    if (!acceptedTerms || !acceptedPrivacy) { setError('Please accept the Terms of Service and Privacy Policy to continue.'); return }
    setSubmitting(true)
    try {
      if (sessionId) {
        // New user from checkout — set password via admin API, then sign in
        const r = await fetch('/api/activate-account', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, email, password }),
        })
        const data = await r.json()
        if (!r.ok) { setError(data.error || 'Failed to create account.'); setSubmitting(false); return }
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) { setError(signInError.message); setSubmitting(false); return }
      } else {
        // Forgot-password recovery flow — session already established by Supabase
        const { error: updateError } = await supabase.auth.updateUser({ password })
        if (updateError) { setError(updateError.message); setSubmitting(false); return }
      }
      navigate('/dashboard')
    } catch {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="relative w-full max-w-sm">
      <div className="text-center mb-8">
        <Logo />
        <h1 className="text-3xl font-extrabold text-white mb-2 leading-tight">
          Create your account
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Set a password to access your drills, plans, and modules.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <form onSubmit={handleCreateAccount} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input
                type="email"
                value={email || ''}
                disabled
                className="w-full bg-slate-800/40 border border-slate-700/50 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-500 cursor-not-allowed select-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Password</label>
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
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Confirm Password</label>
            <input
              type={showPw ? 'text' : 'password'}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repeat your password"
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col gap-3 pt-1">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-green-500 flex-shrink-0 cursor-pointer"
              />
              <span className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                I agree to the{' '}
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline underline-offset-2">
                  Terms of Service
                </a>
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={acceptedPrivacy}
                onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-green-500 flex-shrink-0 cursor-pointer"
              />
              <span className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                I agree to the{' '}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline underline-offset-2">
                  Privacy Policy
                </a>
              </span>
            </label>
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
            {submitting ? 'Creating your account…' : 'Enter the Platform →'}
          </button>
        </form>
      </div>

      <p className="text-center text-xs text-slate-600 mt-4">
        Secure login · Your data is protected
      </p>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Welcome() {
  const navigate = useNavigate()
  const [session, setSession] = useState(null)
  const [isRecovery, setIsRecovery] = useState(false)
  const [initializing, setInitializing] = useState(true)
  const [view, setView] = useState('login') // 'login' | 'forgot'

  // Post-purchase state
  const [provisioning, setProvisioning] = useState(
    () => !!new URLSearchParams(window.location.search).get('session_id')
  )
  const [newUserEmail, setNewUserEmail] = useState('')
  const [newUserSessionId, setNewUserSessionId] = useState('')
  const [provisionError, setProvisionError] = useState('')
  const [provisionMessage, setProvisionMessage] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setInitializing(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      if (event === 'PASSWORD_RECOVERY') setIsRecovery(true)
      if (event === 'SIGNED_IN') setInitializing(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sessionId = params.get('session_id')
    if (!sessionId) return

    fetch('/api/provision-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    })
      .then((r) => r.json())
      .then(({ error, email, isNew, amount_total, currency }) => {
        if (error) { setProvisionError(error); setProvisioning(false); return }

        // Re-init pixel with advanced matching now that we know the buyer's email,
        // then fire Purchase using the Stripe session ID as the deduplication key.
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

        if (isNew) {
          // New user — show Create Account page directly with email pre-filled
          setNewUserEmail(email)
          setNewUserSessionId(sessionId)
          setProvisioning(false)
        } else {
          // Existing user — modules activated, just sign in
          setProvisionMessage('Your modules have been activated. Sign in to access them.')
          setProvisioning(false)
        }
      })
      .catch(() => {
        setProvisionError('Something went wrong activating your account. Please contact support.')
        setProvisioning(false)
      })
  }, [])

  if (initializing || provisioning) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-green-400" />
        {provisioning && <p className="text-slate-500 text-sm">Setting up your account…</p>}
      </div>
    )
  }

  // New user just came from checkout — show Create Account directly
  if (newUserEmail) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
        <Glow />
        <CreateAccountView email={newUserEmail} sessionId={newUserSessionId} />
      </div>
    )
  }

  // Existing session + password recovery (forgot-password flow)
  if (session && isRecovery) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
        <Glow />
        <CreateAccountView email={session.user.email} sessionId={null} />
      </div>
    )
  }

  // Normal active session — go to dashboard
  if (session) {
    navigate('/dashboard', { replace: true })
    return null
  }

  // Provision error
  if (provisionError) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
        <Glow />
        <div className="relative w-full max-w-sm">
          <div className="text-center mb-8"><Logo /></div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
            <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-7 h-7 text-red-400" />
            </div>
            <p className="text-white font-bold mb-1">Activation failed</p>
            <p className="text-slate-400 text-sm">{provisionError}</p>
            <button onClick={() => setProvisionError('')} className="mt-4 text-xs text-slate-500 hover:text-slate-300 transition-colors">
              ← Back to sign in
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
      <Glow />
      {view === 'forgot'
        ? <ForgotView onBack={() => setView('login')} />
        : <LoginView onForgot={() => setView('forgot')} provisionMessage={provisionMessage} />
      }
    </div>
  )
}
