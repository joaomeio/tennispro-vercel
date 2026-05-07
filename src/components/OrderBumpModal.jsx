import { useState } from 'react'
import { ArrowRight, Loader2, X, Shield, Check } from 'lucide-react'
import { createCheckoutSession, EN_PRICE_IDS } from '../config/checkout'

/* ── Mini icons (dashboard palette) ────────────────────────────────────── */

function GymIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="40" height="40" rx="9" fill="#042f2e" />
      <rect x="3" y="18" width="13" height="4" rx="1.5" fill="rgba(255,255,255,0.15)" />
      <rect x="1" y="15" width="4" height="10" rx="1.5" fill="rgba(255,255,255,0.28)" />
      <rect x="15" y="15" width="4" height="10" rx="1.5" fill="rgba(255,255,255,0.28)" />
      <rect x="24" y="18" width="13" height="4" rx="1.5" fill="rgba(255,255,255,0.15)" />
      <rect x="22" y="15" width="4" height="10" rx="1.5" fill="rgba(255,255,255,0.28)" />
      <rect x="35" y="15" width="4" height="10" rx="1.5" fill="rgba(255,255,255,0.28)" />
      <circle cx="20" cy="20" r="5" fill="rgba(45,212,191,0.25)" />
      <circle cx="20" cy="20" r="2.5" fill="#2dd4bf" opacity="0.95" />
    </svg>
  )
}

function ServeIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="40" height="40" rx="9" fill="#4c0519" />
      <line x1="4" y1="29" x2="36" y2="29" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <path d="M8,34 Q20,6 32,24" stroke="#fca5a5" strokeWidth="2" fill="none" strokeDasharray="4,3" />
      <circle cx="8" cy="31" r="3" fill="#fda4af" stroke="white" strokeWidth="1" />
      <line x1="8" y1="34" x2="15" y2="24" stroke="white" strokeWidth="1.8" opacity="0.85" />
      <rect x="13" y="21" width="5" height="2.5" rx="1" fill="white" opacity="0.85" transform="rotate(-40 13 21)" />
      <circle cx="18" cy="20" r="2.5" fill="#fde047" />
      <rect x="24" y="17" width="9" height="7" rx="1.5" fill="none" stroke="rgba(252,165,165,0.5)" strokeWidth="1" strokeDasharray="3,2" />
    </svg>
  )
}

function DoublesIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="40" height="40" rx="9" fill="#1e1b4b" />
      <rect x="4" y="4" width="32" height="32" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="4" y1="20" x2="36" y2="20" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="3,2" />
      <line x1="20" y1="4" x2="20" y2="36" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <circle cx="13" cy="12" r="3.5" fill="#818cf8" stroke="white" strokeWidth="1" />
      <circle cx="27" cy="12" r="3.5" fill="#818cf8" stroke="white" strokeWidth="1" />
      <circle cx="13" cy="28" r="3.5" fill="#f97316" stroke="white" strokeWidth="1" />
      <circle cx="27" cy="36" r="3.5" fill="#f97316" stroke="white" strokeWidth="1" />
      <line x1="27" y1="36" x2="13" y2="28" stroke="#fde047" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.7" />
      <line x1="13" y1="28" x2="27" y2="12" stroke="#fde047" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.7" />
    </svg>
  )
}

/* ── Data ───────────────────────────────────────────────────────────────── */

const BUMPS = [
  {
    id: 'doubles',
    priceId: EN_PRICE_IDS.ADDON_DOUBLES,
    Icon: DoublesIcon,
    color: '#4338ca',
    name: 'Doubles Tactics Masterclass',
    desc: 'Net formations, communication patterns, and match-winning strategy.',
  },
  {
    id: 'serve',
    priceId: EN_PRICE_IDS.ADDON_SERVE,
    Icon: ServeIcon,
    color: '#e11d48',
    name: 'Serve Masterclass',
    desc: 'Flat, slice, and kick serve mechanics broken down step by step.',
  },
  {
    id: 'gym',
    priceId: EN_PRICE_IDS.ADDON_GYM,
    Icon: GymIcon,
    color: '#0d9488',
    name: 'Tennis Gym Training Program',
    desc: 'Court-specific strength and conditioning built around your game.',
  },
]

/* ── Modal ──────────────────────────────────────────────────────────────── */

export default function OrderBumpModal({ isOpen, priceId, onCancel }) {
  const [selected, setSelected] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (!isOpen) return null

  const toggle = (id) => { if (!loading) setSelected((p) => ({ ...p, [id]: !p[id] })) }

  const selectedBumps = BUMPS.filter((b) => selected[b.id])
  const count = selectedBumps.length
  const total = count * 9

  async function handleProceed() {
    setLoading(true)
    setError(null)
    try {
      await createCheckoutSession(priceId, selectedBumps.map((b) => b.priceId))
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center animate-fade-in">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={!loading ? onCancel : undefined}
      />

      <div className="relative w-full sm:max-w-md sm:mx-4 bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl animate-zoom-in flex flex-col"
        style={{ maxHeight: 'min(92vh, 640px)' }}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-slate-100 flex items-start justify-between flex-shrink-0">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">One-time offer</p>
            <h2 className="text-slate-900 font-extrabold text-lg leading-tight">
              Add a program for <span className="text-green-600">$9</span>
            </h2>
            <p className="text-slate-500 text-sm mt-0.5">Each regularly $27 — only available right now.</p>
          </div>
          {!loading && (
            <button
              onClick={onCancel}
              className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600 mt-0.5 ml-3 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Cards — scrollable if needed */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5 py-3 flex flex-col gap-2.5">
          {BUMPS.map((bump) => {
            const on = !!selected[bump.id]
            const { Icon } = bump
            return (
              <div
                key={bump.id}
                role="button"
                tabIndex={0}
                onClick={() => toggle(bump.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle(bump.id) }}
                className="flex items-center gap-3 px-3.5 py-3 rounded-xl border-2 transition-all duration-150 cursor-pointer select-none"
                style={{
                  borderColor: on ? bump.color : '#e2e8f0',
                  backgroundColor: on ? `${bump.color}0d` : '#fafafa',
                  pointerEvents: loading ? 'none' : 'auto',
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden">
                  <Icon />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 text-sm leading-tight">{bump.name}</p>
                  <p className="text-slate-400 text-xs leading-snug mt-0.5 truncate">{bump.desc}</p>
                </div>

                {/* Price + checkbox */}
                <div className="flex-shrink-0 flex flex-col items-end gap-1.5 ml-1">
                  <div className="text-right leading-none">
                    <p className="text-slate-400 line-through text-xs">$27</p>
                    <p className="font-extrabold text-base" style={{ color: bump.color }}>$9</p>
                  </div>
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center border-2 transition-all"
                    style={{
                      backgroundColor: on ? bump.color : '#ffffff',
                      borderColor: on ? bump.color : '#cbd5e1',
                    }}
                  >
                    {on && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex-shrink-0 flex flex-col gap-2.5">
          {count > 0 && (
            <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
              <p className="text-slate-700 font-semibold text-sm">
                {count === 1 ? '1 program added' : `${count} programs added`}
              </p>
              <p className="text-slate-900 font-extrabold text-base">+${total}</p>
            </div>
          )}

          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-2">
              {error}
            </p>
          )}

          <button
            onClick={handleProceed}
            disabled={loading}
            className="w-full text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            style={{
              background: count > 0
                ? 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)'
                : '#1e293b',
              boxShadow: count > 0 ? '0 6px 18px rgba(22,163,74,0.28)' : 'none',
            }}
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" />Taking you to checkout…</>
            ) : count > 0 ? (
              <>{count === 1 ? 'Add 1 program' : `Add ${count} programs`} & Complete Purchase<ArrowRight className="w-4 h-4" /></>
            ) : (
              <>Continue Without Upgrade<ArrowRight className="w-4 h-4" /></>
            )}
          </button>

          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
              <Shield className="w-3.5 h-3.5" />
              <span>Instant access · 30-day money-back guarantee</span>
            </div>
            {count === 0 && (
              <p className="text-center text-xs text-slate-400">
                This offer won't be available after you close this window.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
