import { useEffect, useState } from 'react'
import { X, Check, Lock, Zap, ShieldCheck, Loader2 } from 'lucide-react'
import { createCheckoutSession } from '../config/checkout'
import { useAuth } from '../context/AuthContext'

const MODULE_VISUALS = {
  'lesson-templates': { color: '#2563eb', icon: '📋' },
  'gym-training':     { color: '#0d9488', icon: '🏋️' },
  'serve-masterclass':{ color: '#e11d48', icon: '🎾' },
  'doubles-tactics':  { color: '#4f46e5', icon: '🏆' },
}

const DEFAULT_VISUAL = { color: '#22c55e', icon: '📚' }

export default function AddonPaywallModal({ module, onClose }) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const visual = MODULE_VISUALS[module?.id] ?? DEFAULT_VISUAL
  const price = module?.price ?? 9

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
      await createCheckoutSession(module.priceId, [], true, user?.email ?? null)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (!module) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop — click closes */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full sm:max-w-md bg-gray-900 sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden border border-gray-800 flex flex-col"
        style={{ maxHeight: 'min(92vh, 640px)' }}
      >
        {/* Header */}
        <div
          className="px-6 pt-6 pb-7 relative overflow-hidden shrink-0"
          style={{ background: `linear-gradient(135deg, ${visual.color}22 0%, ${visual.color}08 100%)` }}
        >
          {/* Accent top border */}
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: visual.color }} />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors border border-gray-700"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>

          <div className="flex items-start gap-4 pr-10">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
              style={{ background: `${visual.color}20` }}
            >
              {visual.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-widest"
                  style={{ background: `${visual.color}25`, color: visual.color }}
                >
                  Add-on
                </span>
                {module.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 uppercase tracking-wide border border-gray-700">
                    {module.badge}
                  </span>
                )}
              </div>
              <h2 className="text-white text-lg font-extrabold leading-tight">
                {module.title}
              </h2>
              <p className="text-gray-400 text-xs leading-relaxed mt-1">
                {module.description}
              </p>
            </div>
          </div>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 min-h-0 overflow-y-auto px-6 py-5 flex flex-col gap-5">
          {/* Benefits */}
          {(module.paywallBenefits || []).length > 0 && (
            <div>
              <p className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-3">
                What's inside
              </p>
              <ul className="space-y-2.5">
                {module.paywallBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${visual.color}20` }}
                    >
                      <Check className="w-3 h-3" style={{ color: visual.color }} strokeWidth={3} />
                    </div>
                    <p className="text-sm text-gray-300 leading-snug">{benefit}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer — price + CTA */}
        <div className="shrink-0 px-6 pb-6 pt-4 border-t border-gray-800 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white">${price}</span>
                <span className="text-sm font-semibold text-gray-500 line-through">$27</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">One-time · Instant access</p>
            </div>
            <div
              className="text-xs font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wide"
              style={{ background: `${visual.color}20`, color: visual.color }}
            >
              Save {Math.round((1 - price / 27) * 100)}%
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {isPlaceholder ? (
            <div className="w-full bg-gray-800 text-gray-500 font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 cursor-not-allowed border border-gray-700">
              <Lock className="w-4 h-4" />
              Coming Soon
            </div>
          ) : (
            <button
              onClick={handleUnlock}
              disabled={loading}
              className="w-full text-white font-extrabold py-3.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: loading ? `${visual.color}80` : visual.color,
                boxShadow: `0 4px 20px ${visual.color}40`,
              }}
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
              ) : (
                <><Zap className="w-4 h-4" /> Unlock {module.title} — ${price}</>
              )}
            </button>
          )}

          <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>7-day money-back guarantee</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-700" />
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
