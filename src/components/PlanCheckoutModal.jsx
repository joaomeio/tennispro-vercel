import { useState, useEffect, useMemo } from 'react'
import { X, Check, ArrowRight, Loader2, ShieldCheck, Lock, Sparkles } from 'lucide-react'
import CardArt from './dashboard/CardArt'
import { createCheckoutSession, isPlaceholderPrice } from '../config/checkout'
import { ADDON_PRICE, MODULE_REGULAR_PRICE, addonsForPlan } from '../config/plans'
import { usePricing } from '../context/PricingContext'

// ─────────────────────────────────────────────────────────────────────────────
// The step between a pricing card and Stripe.
//
// A tier that doesn't carry all seven modules offers the rest here at
// $9 apiece, so the buyer assembles their own pack in one payment instead of
// being pushed to the tier above. If their selection ever costs more than a
// higher tier that already includes everything they ticked, we say so — the
// larger payment isn't worth the buyer discovering it later.
// ─────────────────────────────────────────────────────────────────────────────

function AddonRow({ addon, selected, disabled, onToggle }) {
  const unavailable = isPlaceholderPrice(addon.priceId)

  return (
    <button
      type="button"
      onClick={() => !unavailable && onToggle(addon.id)}
      disabled={disabled || unavailable}
      aria-pressed={selected}
      className={`flex w-full items-center gap-3 rounded-2xl border p-2.5 text-left transition-all duration-150 ${
        selected
          ? 'border-green-500 bg-green-50/70 shadow-sm shadow-green-600/10'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
      } ${disabled || unavailable ? 'opacity-55' : 'cursor-pointer'}`}
    >
      {/* The module's own art tile, exactly as it appears in the app */}
      <span className="h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-ink-900">
        {addon.art && <CardArt card={{ ...addon.art, key: `bump-${addon.id}` }} />}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-bold leading-tight text-slate-900">
          {addon.title}
        </span>
        <span className="mt-0.5 block truncate text-[11px] leading-snug text-slate-400">
          {unavailable ? 'Available soon' : addon.tagline}
        </span>
      </span>

      <span className="flex shrink-0 items-center gap-2.5">
        <span className="text-right leading-none tabular-nums">
          <span className="block text-[10px] text-slate-400 line-through">
            ${MODULE_REGULAR_PRICE}
          </span>
          <span className="mt-1 block text-[15px] font-extrabold text-green-600">
            ${addon.price}
          </span>
        </span>
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors ${
            selected ? 'border-green-500 bg-green-500' : 'border-slate-300 bg-white'
          }`}
        >
          {selected && <Check className="h-3 w-3 text-white" strokeWidth={3.5} />}
        </span>
      </span>
    </button>
  )
}

export default function PlanCheckoutModal({ plan, onChangePlan, onClose }) {
  // Above the `if (!plan)` bail-out below — hooks can't sit behind a return.
  const { betterPlanFor } = usePricing()
  const [selected, setSelected] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const extras = useMemo(() => addonsForPlan(plan), [plan])

  // Switching tiers mid-flow (via the upgrade nudge) can make a ticked module
  // part of the plan — drop anything the new plan already covers.
  useEffect(() => {
    setSelected((prev) => prev.filter((id) => extras.some((a) => a.id === id)))
  }, [extras])

  // Only while the modal is actually up — the component stays mounted with a
  // null plan, and locking the body then would freeze the whole sales page.
  useEffect(() => {
    if (!plan) return
    const onKey = (e) => { if (e.key === 'Escape' && !loading) onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [plan, onClose, loading])

  if (!plan) return null

  const total = plan.price + selected.length * ADDON_PRICE
  const upgrade = betterPlanFor(plan, selected)
  const planUnavailable = isPlaceholderPrice(plan.priceId)

  function toggle(id) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  async function handleProceed() {
    if (planUnavailable) return
    setLoading(true)
    setError(null)
    try {
      const bumpIds = extras.filter((a) => selected.includes(a.id)).map((a) => a.priceId)
      await createCheckoutSession(plan.priceId, bumpIds)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center font-app animate-fade-in sm:items-center sm:p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={!loading ? onClose : undefined}
      />

      <div
        className="relative flex w-full flex-col rounded-t-3xl bg-white shadow-2xl animate-zoom-in sm:max-w-lg sm:rounded-3xl"
        style={{ maxHeight: 'min(94vh, 720px)' }}
      >
        {/* Header — what they picked, so the cart is never ambiguous */}
        <div className="shrink-0 rounded-t-3xl border-b border-slate-100 px-5 pb-4 pt-5 sm:px-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="mb-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                Step 2 of 2 · Before checkout
              </p>
              <h2 className="text-lg font-extrabold leading-tight tracking-tight text-slate-900">
                {extras.length > 0
                  ? 'Want to add anything else?'
                  : `You're getting everything`}
              </h2>
              <p className="mt-1 text-[13px] leading-snug text-slate-500">
                {extras.length > 0 ? (
                  <>
                    Add a module to <span className="font-semibold text-slate-700">{plan.name}</span>{' '}
                    for ${ADDON_PRICE} instead of ${MODULE_REGULAR_PRICE} — only at this step.
                  </>
                ) : (
                  <>All seven modules are included in {plan.name}.</>
                )}
              </p>
            </div>
            {!loading && (
              <button
                onClick={onClose}
                aria-label="Close"
                className="-mr-1 -mt-1 shrink-0 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Add-ons. A plan carrying all seven modules normally goes straight to
            Stripe and never opens this step — the guard keeps it from leaving
            an empty gap if it lands here anyway (unconfigured price). */}
        {extras.length > 0 && (
          <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-5 py-3.5 sm:px-6">
            {extras.map((addon) => (
              <AddonRow
                key={addon.id}
                addon={addon}
                selected={selected.includes(addon.id)}
                disabled={loading}
                onToggle={toggle}
              />
            ))}
          </div>
        )}

        {/* Footer — total and checkout. The upgrade nudge lives here rather
            than at the end of the list: it appears once enough modules are
            ticked, which is exactly when the list is scrolled past. */}
        <div className="flex shrink-0 flex-col gap-3 border-t border-slate-100 px-5 pb-5 pt-3.5 sm:px-6">
          {upgrade && (
            <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-bold leading-snug text-amber-900">
                  {upgrade.name} costs less than what you&rsquo;ve picked
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-amber-700">
                  ${upgrade.price} instead of ${total} — same access, ${total - upgrade.price} back
                  in your pocket.
                </p>
              </div>
              <button
                onClick={() => onChangePlan(upgrade.id)}
                disabled={loading}
                className="shrink-0 self-center rounded-lg bg-amber-500 px-3 py-1.5 text-[11px] font-extrabold text-white transition-colors hover:bg-amber-600 disabled:opacity-60 cursor-pointer"
              >
                Switch
              </button>
            </div>
          )}

          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-[13px] font-bold text-slate-900">{plan.name}</p>
              <p className="text-[11px] text-slate-500">
                {selected.length === 0
                  ? 'No extra modules'
                  : `+ ${selected.length} module${selected.length > 1 ? 's' : ''} at $${ADDON_PRICE} each`}
              </p>
            </div>
            <p className="shrink-0 text-2xl font-extrabold tabular-nums tracking-tight text-slate-900">
              ${total}
            </p>
          </div>

          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-[13px] text-red-600">
              {error}
            </p>
          )}

          {planUnavailable ? (
            <div className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 py-4 text-sm font-bold text-slate-500">
              <Lock className="h-4 w-4" />
              Checkout for this plan isn&rsquo;t live yet
            </div>
          ) : (
            <button
              onClick={handleProceed}
              disabled={loading}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-4 text-[15px] font-extrabold text-white shadow-lg shadow-green-600/25 transition-all hover:bg-green-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" />Taking you to checkout…</>
              ) : (
                <>
                  Continue to checkout — ${total}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          )}

          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              7-day guarantee
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" />
              Secure Stripe checkout
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
