import { useEffect, useState } from 'react'
import { X, Check, Lock, ShieldCheck, Loader2, Clock } from 'lucide-react'
import CardArt from './dashboard/CardArt'
import { createCheckoutSession } from '../config/checkout'
import { ADDON_PRICE, MODULE_REGULAR_PRICE } from '../config/plans'
import { useAuth } from '../context/AuthContext'
import { getModuleContent } from '../content/modules'

// ─────────────────────────────────────────────────────────────────────────────
// Purchase card for a locked add-on module, in the dashboard's ink language:
// drawn CardArt tile (no emoji), the module's accent wash behind the header,
// hairline borders throughout. Art direction mirrors the module screens so the
// paywall previews exactly what unlocking looks like.
// ─────────────────────────────────────────────────────────────────────────────

const MODULE_ART = {
  'lesson-templates': { key: 'paywall-templates', motif: 'plan', palette: { from: '#172554', to: '#1e40af', accent: '#93c5fd' } },
  'gym-training': { key: 'paywall-gym', motif: 'figure', palette: { from: '#042f2e', to: '#0f766e', accent: '#2dd4bf' } },
  'serve-masterclass': { key: 'paywall-serve', motif: 'serve', palette: { from: '#4c0519', to: '#9f1239', accent: '#fb7185' } },
  'doubles-tactics': { key: 'paywall-doubles', motif: 'court', variant: 'doubles', palette: { from: '#1e1b4b', to: '#3730a3', accent: '#a5b4fc' } },
}

const DEFAULT_ART = { key: 'paywall-default', motif: 'court', palette: { from: '#052e16', to: '#15803d', accent: '#4ade80' } }

export default function AddonPaywallModal({ module, onClose }) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const art = MODULE_ART[module?.id] ?? DEFAULT_ART
  const accent = art.palette.accent
  const price = module?.price ?? ADDON_PRICE

  const content = getModuleContent(module?.id)
  const totalMinutes = content?.parts.reduce((n, p) => n + (p.minutes ?? 0), 0) ?? 0

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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Card */}
      <div
        className="relative w-full sm:max-w-md bg-ink-900 sm:rounded-2xl rounded-t-2xl border border-white/[0.1] shadow-2xl shadow-black/60 overflow-hidden flex flex-col"
        style={{ maxHeight: 'min(92vh, 640px)' }}
      >
        {/* Header — art tile over the module's accent wash */}
        <div
          className="px-5 sm:px-6 pt-6 pb-6 relative shrink-0"
          style={{
            background: `radial-gradient(120% 180% at 15% 0%, ${art.palette.from}B3 0%, rgba(8,9,11,0) 70%)`,
          }}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.1] hover:bg-white/[0.12] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>

          <div className="flex items-center gap-4 pr-10">
            <div className="w-[72px] h-[72px] shrink-0 rounded-2xl overflow-hidden bg-ink-800 border border-white/[0.08]">
              <CardArt card={art} />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-[0.16em]"
                  style={{ backgroundColor: `${accent}1f`, color: accent }}
                >
                  Add-on
                </span>
                {module.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/[0.06] text-gray-400 uppercase tracking-wide border border-white/[0.08]">
                    {module.badge}
                  </span>
                )}
              </div>
              <h2 className="text-white text-lg font-extrabold tracking-tight leading-tight truncate">
                {module.title}
              </h2>
              {content ? (
                <p className="flex items-center gap-1.5 text-gray-400 text-xs mt-1 tabular-nums">
                  {content.parts.length} parts
                  {totalMinutes > 0 && (
                    <>
                      <span className="text-gray-600">·</span>
                      <Clock className="w-3 h-3" />
                      {totalMinutes} min
                    </>
                  )}
                </p>
              ) : (
                <p className="text-gray-400 text-xs leading-relaxed mt-1 line-clamp-2">
                  {module.description}
                </p>
              )}
              <span className="block w-8 h-[3px] rounded-full mt-2.5" style={{ backgroundColor: accent }} />
            </div>
          </div>
        </div>

        {/* Body — scrollable benefits */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-6 py-5">
          {(module.paywallBenefits || []).length > 0 && (
            <div>
              <div className="flex items-baseline gap-2.5 mb-3.5">
                <span className="w-1 h-3.5 rounded-full shrink-0 translate-y-[2px]" style={{ backgroundColor: accent }} />
                <p className="text-white font-bold text-[13px] tracking-tight">What's inside</p>
              </div>
              <ul className="space-y-2.5">
                {module.paywallBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-[1px]"
                      style={{ backgroundColor: `${accent}1f` }}
                    >
                      <Check className="w-3 h-3" strokeWidth={3} style={{ color: accent }} />
                    </span>
                    <p className="text-[13px] text-gray-300 leading-relaxed">{benefit}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer — price + CTA */}
        <div className="shrink-0 px-5 sm:px-6 pb-6 pt-4 border-t border-white/[0.06] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2 tabular-nums">
                <span className="text-3xl font-extrabold tracking-tight text-white">${price}</span>
                <span className="text-sm font-semibold text-gray-600 line-through">${MODULE_REGULAR_PRICE}</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">One-time payment · Instant access</p>
            </div>
            <span
              className="text-[11px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide tabular-nums"
              style={{ backgroundColor: `${accent}1f`, color: accent }}
            >
              Save {Math.round((1 - price / MODULE_REGULAR_PRICE) * 100)}%
            </span>
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-950/40 border border-red-900/60 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          {isPlaceholder ? (
            <div className="w-full bg-white/[0.04] border border-white/[0.08] text-gray-500 font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 cursor-not-allowed">
              <Lock className="w-4 h-4" />
              Coming Soon
            </div>
          ) : (
            <button
              onClick={handleUnlock}
              disabled={loading}
              className="w-full text-ink-950 font-extrabold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              style={{ backgroundColor: accent, boxShadow: `0 4px 24px ${accent}33` }}
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
              ) : (
                <>Unlock {module.title} — ${price}</>
              )}
            </button>
          )}

          <div className="flex items-center justify-center gap-4 text-[11px] text-gray-600">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>7-day money-back guarantee</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-white/[0.15]" />
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
