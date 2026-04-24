import { useEffect, useState } from 'react'
import { X, Check, Lock, Zap, ShieldCheck } from 'lucide-react'
import { createCheckoutSession } from '../config/checkout'
import { useAuth } from '../context/AuthContext'

const MODULE_VISUALS = {
  'gym-training': {
    gradient: 'from-teal-950 via-teal-900 to-teal-800',
    accent: 'text-teal-400',
    accentBg: 'bg-teal-500',
    accentBorder: 'border-teal-500',
    accentLight: 'bg-teal-50 text-teal-800',
    ctaColor: 'bg-teal-600 hover:bg-teal-500',
    icon: '🏋️',
  },
  'serve-masterclass': {
    gradient: 'from-rose-950 via-rose-900 to-rose-800',
    accent: 'text-rose-400',
    accentBg: 'bg-rose-500',
    accentBorder: 'border-rose-500',
    accentLight: 'bg-rose-50 text-rose-800',
    ctaColor: 'bg-rose-600 hover:bg-rose-500',
    icon: '🎾',
  },
  'doubles-tactics': {
    gradient: 'from-indigo-950 via-indigo-900 to-indigo-800',
    accent: 'text-indigo-400',
    accentBg: 'bg-indigo-500',
    accentBorder: 'border-indigo-500',
    accentLight: 'bg-indigo-50 text-indigo-800',
    ctaColor: 'bg-indigo-600 hover:bg-indigo-500',
    icon: '🏆',
  },
}

const DEFAULT_VISUAL = {
  gradient: 'from-gray-900 via-gray-800 to-gray-700',
  accent: 'text-green-400',
  accentBg: 'bg-green-500',
  accentBorder: 'border-green-500',
  accentLight: 'bg-green-50 text-green-800',
  ctaColor: 'bg-green-600 hover:bg-green-500',
  icon: '📚',
}

export default function AddonPaywallModal({ module, onClose }) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const visual = MODULE_VISUALS[module?.id] || DEFAULT_VISUAL
  const price = module?.price ?? 17
  const originalPrice = price * 2 + 12

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const isPlaceholder = !module?.priceId || module.priceId.includes('placeholder')

  async function handleUnlock() {
    if (isPlaceholder) return
    setLoading(true)
    setError(null)
    try {
      await createCheckoutSession(module.priceId, false, true, user?.email ?? null)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (!module) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
        {/* Header */}
        <div className={`bg-gradient-to-br ${visual.gradient} px-6 pt-6 pb-8 relative overflow-hidden`}>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              <circle cx="350" cy="50" r="120" fill="white" />
              <circle cx="50" cy="180" r="80" fill="white" />
            </svg>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-white/20 text-white text-[9px] font-black px-2 py-0.5 rounded tracking-widest uppercase">Add-on Module</span>
              <span className={`${visual.accentBg} text-white text-[9px] font-black px-2 py-0.5 rounded tracking-widest uppercase`}>
                {module.badge}
              </span>
            </div>

            <div className="text-4xl mb-3">{visual.icon}</div>

            <h2 className="text-white text-2xl font-extrabold leading-tight mb-2">
              {module.title}
            </h2>
            <p className="text-white/70 text-sm leading-relaxed">
              {module.description}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {/* Benefits */}
          <div className="mb-5">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">What's inside</p>
            <ul className="space-y-2.5">
              {(module.paywallBenefits || []).map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full ${visual.accentBg} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <p className="text-sm text-slate-700 leading-snug">{benefit}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Price + CTA */}
          <div className={`bg-slate-50 rounded-xl p-4 border ${visual.accentBorder} border-opacity-30 mb-4`}>
            <div className="flex items-center justify-between gap-4 mb-3">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900">${price}</span>
                  <span className="text-sm font-semibold text-slate-400 line-through">${originalPrice}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">One-time payment · Instant access</p>
              </div>
              <div className={`${visual.accentLight} px-3 py-1.5 rounded-lg text-center`}>
                <p className="text-xs font-black uppercase tracking-wide">Save</p>
                <p className="text-lg font-extrabold">{Math.round((1 - price / originalPrice) * 100)}%</p>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-600 mb-3 bg-red-50 rounded-lg px-3 py-2">{error}</p>
            )}

            {isPlaceholder ? (
              <div className="w-full bg-slate-200 text-slate-500 font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 cursor-not-allowed">
                <Lock className="w-4 h-4" />
                Coming Soon — Price not yet configured
              </div>
            ) : (
              <button
                onClick={handleUnlock}
                disabled={loading}
                className={`w-full ${visual.ctaColor} text-white font-extrabold py-3.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Unlock {module.title} — ${price}
                  </>
                )}
              </button>
            )}
          </div>

          {/* Trust signals */}
          <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
