import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import posthog from 'posthog-js'
import {
  plansFor,
  getPlan as getPlanBase,
  separateTotal as separateTotalBase,
  betterPlanFor as betterPlanForBase,
} from '../config/plans'
import { setActiveVariant } from '../config/checkout'
import { resolveAssignment } from '../lib/priceAssignment'
import { isVariant, DEFAULT_VARIANT } from '../../stripe.config'

// ─────────────────────────────────────────────────────────────────────────────
// WHICH PRICE LADDER THIS VISITOR SEES
//
// The allocation (variant A, variant B, % to B) is set from the admin panel
// and served by /api/pricing-config. This resolves it into one variant for
// this visitor and hands the matching plans down the tree.
//
// Three properties matter, in this order:
//
//   Sticky    A visitor must never watch the price change under them. The
//             assignment is written to localStorage on first bucket and reused
//             on every later visit.
//
//   Prompt    An admin moving the slider expects it to take effect, including
//             for people who have been here before. So the assignment is
//             stored with the config `version` it was made under; when the
//             admin saves, the version bumps and everyone re-buckets. That is
//             a deliberate trade against stickiness — a manual change wins.
//
//   Quiet     No price flicker. A returning visitor resolves synchronously
//             from localStorage during the first render and never waits on the
//             network. Only a genuinely new visitor has to wait for the
//             allocation, and for them `ready` is false so the pricing cards
//             can hold a skeleton instead of flashing the wrong number.
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'tp_price_assignment'
const CONFIG_URL = '/api/pricing-config'

const PricingContext = createContext(null)

function readStored() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!isVariant(parsed?.variant)) return null
    return { variant: parsed.variant, version: Number(parsed.version) || 0 }
  } catch {
    // Private mode, disabled storage, corrupted value — all just mean "no
    // assignment yet". Never let this throw into a render.
    return null
  }
}

function writeStored(assignment) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(assignment))
  } catch {
    // Non-fatal: the visitor is simply re-bucketed next visit. A coin flip
    // they can't feel is better than a crash they can.
  }
}

export function PricingProvider({ children }) {
  // Seed synchronously so returning visitors render their real price on the
  // very first paint. `ready` is what gates the skeleton, not `variant`.
  const [stored, setStored] = useState(() =>
    typeof window === 'undefined' ? null : readStored()
  )
  const [ready, setReady] = useState(() => stored !== null)
  const reported = useRef(null)

  const variant = stored?.variant ?? DEFAULT_VARIANT

  useEffect(() => {
    let cancelled = false

    fetch(CONFIG_URL)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((config) => {
        if (cancelled) return

        // Keeps the stored assignment unless the admin has saved since it was
        // made, in which case the visitor is re-drawn.
        const { variant: next, version, changed } = resolveAssignment(readStored(), config)
        const assignment = { variant: next, version }

        if (changed) writeStored(assignment)
        setStored(assignment)
        setReady(true)
      })
      .catch(() => {
        if (cancelled) return
        // Endpoint down: fall back to control and let the page render. Not
        // being able to run an experiment is not a reason to sell nothing.
        if (!stored) setStored({ variant: DEFAULT_VARIANT, version: 0 })
        setReady(true)
      })

    return () => {
      cancelled = true
    }
    // Runs once per page load. The admin's changes are picked up on the next
    // navigation, which is soon enough for a weeks-long experiment.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Tell the rest of the app which ladder won, so a checkout started from
  // anywhere — tier card, add-on step, dashboard paywall — stamps the cohort
  // onto its Stripe session.
  useEffect(() => {
    if (ready) setActiveVariant(variant)
  }, [ready, variant])

  // Register the cohort with PostHog once resolved, so every later event in
  // the session can be broken down by it without joining through Stripe.
  useEffect(() => {
    if (!ready || reported.current === variant) return
    reported.current = variant
    try {
      posthog.register?.({ price_variant: variant })
      posthog.capture?.('price_variant_assigned', { price_variant: variant })
    } catch {
      // PostHog not initialised (no key in this environment) — ignore.
    }
  }, [ready, variant])

  const value = useMemo(() => {
    const plans = plansFor(variant)
    return {
      variant,
      ready,
      plans,
      getPlan: (id) => getPlanBase(plans, id),
      separateTotal: (plan) => separateTotalBase(plans, plan),
      betterPlanFor: (plan, selectedIds) => betterPlanForBase(plans, plan, selectedIds),
    }
  }, [variant, ready])

  return <PricingContext.Provider value={value}>{children}</PricingContext.Provider>
}

export function usePricing() {
  const ctx = useContext(PricingContext)
  if (!ctx) throw new Error('usePricing must be used inside <PricingProvider>')
  return ctx
}
