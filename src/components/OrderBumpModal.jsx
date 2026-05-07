import { useState } from 'react'
import { ArrowRight, Loader2, X, Zap, Timer, Shield } from 'lucide-react'
import { createCheckoutSession } from '../config/checkout'
import { EN_PRICE_IDS } from '../config/checkout'

const BUMPS = [
  {
    id: 'doubles',
    priceId: EN_PRICE_IDS.ADDON_DOUBLES,
    emoji: '🎾',
    name: 'Doubles Tactics Masterclass',
    shortName: 'Doubles Tactics',
    desc: 'Dominate the net, master communication, and learn winning patterns that most recreational players never figure out.',
    bullets: ['Net dominance strategies', 'Partnership communication drills', '12 match-winning formations'],
    original: '$27',
    price: '$9',
  },
  {
    id: 'serve',
    priceId: EN_PRICE_IDS.ADDON_SERVE,
    emoji: '💥',
    name: 'Serve Masterclass',
    shortName: 'Serve Masterclass',
    desc: 'Turn your serve into a weapon. Step-by-step breakdowns from toss mechanics to kick serves that opponents hate.',
    bullets: ['Flat, slice & kick serve blueprints', 'Toss and trophy position fixes', 'Ace zone targeting system'],
    original: '$27',
    price: '$9',
  },
  {
    id: 'gym',
    priceId: EN_PRICE_IDS.ADDON_GYM,
    emoji: '🏋️',
    name: 'Tennis Gym Training Program',
    shortName: 'Tennis in the Gym',
    desc: 'Court-specific strength and conditioning. Get faster, hit harder, and outlast every opponent in the third set.',
    bullets: ['Explosive movement circuits', 'Injury prevention protocols', '8-week periodized plan'],
    original: '$27',
    price: '$9',
  },
]

export default function OrderBumpModal({ isOpen, priceId, onCancel, lang = 'en' }) {
  const [selected, setSelected] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (!isOpen) return null

  const toggleItem = (id) => {
    if (loading) return
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const selectedBumps = BUMPS.filter((b) => selected[b.id])
  const selectedCount = selectedBumps.length
  const totalAdded = selectedCount * 9
  const savedAmount = selectedCount * 18

  async function handleProceed() {
    setLoading(true)
    setError(null)
    try {
      const orderBumpIds = selectedBumps.map((b) => b.priceId)
      await createCheckoutSession(priceId, orderBumpIds)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm cursor-pointer"
        onClick={!loading ? onCancel : undefined}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-zoom-in flex flex-col max-h-[92vh]">

        {/* Urgency banner */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 flex items-center justify-center gap-2">
          <Timer className="w-4 h-4 text-white shrink-0" />
          <p className="text-white text-xs font-bold tracking-wide uppercase">
            One-time offer — disappears when you close this window
          </p>
        </div>

        {/* Header */}
        <div className="px-6 pt-5 pb-4 flex items-start justify-between border-b border-slate-100 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">Exclusive Upgrade</p>
            </div>
            <h2 className="font-extrabold text-slate-900 text-lg leading-tight">
              Add a premium program for just $9
            </h2>
            <p className="text-slate-500 text-sm mt-0.5">Each normally $27 — yours today for only $9 each.</p>
          </div>
          {!loading && (
            <button
              onClick={onCancel}
              className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600 ml-4 shrink-0 mt-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Product cards */}
        <div className="overflow-y-auto flex-1 px-5 py-4 flex flex-col gap-3">
          {BUMPS.map((bump) => {
            const isChecked = !!selected[bump.id]
            return (
              <button
                key={bump.id}
                onClick={() => toggleItem(bump.id)}
                disabled={loading}
                className="w-full text-left rounded-xl border-2 transition-all duration-150 overflow-hidden disabled:opacity-60"
                style={{
                  borderColor: isChecked ? '#16a34a' : '#e2e8f0',
                  backgroundColor: isChecked ? '#f0fdf4' : '#ffffff',
                }}
              >
                <div className="p-4 flex items-start gap-3">
                  {/* Checkbox */}
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-all"
                    style={{
                      backgroundColor: isChecked ? '#16a34a' : '#ffffff',
                      border: isChecked ? '2px solid #16a34a' : '2px solid #cbd5e1',
                    }}
                  >
                    {isChecked && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>

                  {/* Emoji icon */}
                  <div className="text-2xl leading-none shrink-0 mt-0.5">{bump.emoji}</div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-slate-900 text-sm leading-tight">{bump.name}</p>
                      <div className="text-right shrink-0">
                        <p className="text-slate-400 line-through text-xs">{bump.original}</p>
                        <p className="text-green-600 font-extrabold text-lg leading-tight">{bump.price}</p>
                      </div>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed mt-1">{bump.desc}</p>
                    <ul className="mt-2 flex flex-col gap-0.5">
                      {bump.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-1.5 text-xs text-slate-600">
                          <span className="text-green-500 font-bold mt-px">✓</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {isChecked && (
                  <div className="bg-green-600 px-4 py-1.5 text-center">
                    <p className="text-white text-xs font-bold">✓ Added to your order</p>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Bottom summary + CTA */}
        <div className="px-5 pb-5 pt-3 border-t border-slate-100 shrink-0 flex flex-col gap-3">

          {/* Savings summary */}
          {selectedCount > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-green-800 font-bold text-sm">
                  {selectedCount === 1
                    ? `1 program added`
                    : `${selectedCount} programs added`}
                </p>
                <p className="text-green-600 text-xs mt-0.5">You're saving ${savedAmount} today</p>
              </div>
              <p className="text-green-700 font-extrabold text-xl">+${totalAdded}</p>
            </div>
          )}

          {/* Trust line */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
            <Shield className="w-3.5 h-3.5" />
            <span>Instant access · 30-day money-back guarantee</span>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              Something went wrong: {error}
            </p>
          )}

          {/* CTA */}
          <button
            onClick={handleProceed}
            disabled={loading}
            className="w-full disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-base shadow-lg flex items-center justify-center gap-2 transition-all"
            style={{
              background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
              boxShadow: '0 8px 24px rgba(22, 163, 74, 0.35)',
            }}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Redirecting to checkout...
              </>
            ) : selectedCount > 0 ? (
              <>
                Add {selectedCount === 1 ? '1 program' : `${selectedCount} programs`} & Complete Purchase
                <ArrowRight className="w-5 h-5" />
              </>
            ) : (
              <>
                Continue Without Upgrade
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {selectedCount === 0 && (
            <p className="text-center text-xs text-slate-400">
              You'll never see this offer again at this price.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
