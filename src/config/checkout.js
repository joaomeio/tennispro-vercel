import { generateEventId, getFbp, getFbc, initPixelWithUser, trackPixelEvent } from '../lib/meta'
import { priceIdsFor, isPlaceholderPriceId, isVariant, DEFAULT_VARIANT } from '../../stripe.config'

// PT-BR checkout links (Cakto)
export const PT_LINKS = {
  BASIC: 'https://pay.cakto.com.br/39qheuy_709366',
  PREMIUM: 'https://pay.cakto.com.br/rstkey8_709380',
  PREMIUM_DISCOUNT: 'https://pay.cakto.com.br/zddro2t',
}

// Dev builds transact against Stripe's sandbox, production against live keys.
export const PRICE_MODE = import.meta.env.DEV ? 'test' : 'live'

// ── Which ladder this visitor was shown ─────────────────────────────────────
// Set once per page load by PricingProvider as soon as the visitor is bucketed
// (src/context/PricingContext.jsx). Module-level rather than threaded through
// every call site because there is exactly one visitor per page load, and
// because add-on and paywall checkouts — which know nothing about tiers —
// still need to stamp the cohort onto their Stripe session. Without it, an
// add-on bought by someone in the cheap cohort would be filed under control
// and quietly skew the revenue comparison.
let activeVariant = DEFAULT_VARIANT

export function setActiveVariant(variant) {
  activeVariant = isVariant(variant) ? variant : DEFAULT_VARIANT
}

export function getActiveVariant() {
  return activeVariant
}

// Stripe ids, amounts and module grants all live in /stripe.config.js — the
// same file the webhook reads, so the browser and the server can never
// disagree about what a price unlocks. Add or edit prices there, not here.
//
// These are the CONTROL ids. Only the three tier prices vary by variant, and
// those are resolved per-visitor in config/plans.js; every add-on price is the
// same in every variant, so modules.js can keep reading them from here.
export const EN_PRICE_IDS = priceIdsFor(PRICE_MODE)

export const isPlaceholderPrice = isPlaceholderPriceId

export function handlePtCheckout(url) {
  const targetUrl = new URL(url)
  const currentParams = new URLSearchParams(window.location.search)
  currentParams.forEach((value, key) => {
    targetUrl.searchParams.set(key, value)
  })
  window.location.href = targetUrl.toString()
}

// Calls /api/create-checkout and redirects to the returned Stripe session URL.
// Returns a cleanup-friendly promise so callers can handle loading/error state.
export async function createCheckoutSession(priceId, orderBumpIds = [], isAddon = false, customerEmail = null) {
  // Gather click-tracking fingerprint before the redirect wipes the page.
  const fbEventId = generateEventId()
  const fbp = getFbp()
  const fbc = getFbc()

  // Re-init pixel with advanced matching when we have an email (addon / returning user).
  if (customerEmail) {
    await initPixelWithUser({ email: customerEmail })
  }

  const res = await fetch('/api/create-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      priceId,
      orderBumpIds,
      isAddon,
      customerEmail,
      // Which ladder this buyer was shown. Ridden through to Stripe session
      // metadata so the purchase event can be attributed without inferring the
      // variant back from the price id.
      priceVariant: activeVariant,
      // Passed to backend so CAPI can fire a matching InitiateCheckout event.
      fbEventId,
      fbp,
      fbc,
      userAgent: navigator.userAgent,
    }),
  })

  if (!res.ok) {
    // The body isn't always JSON (a proxy 404, an HTML error page), and the
    // message now renders on the sales page — don't let a parse failure
    // replace a readable error with "Unexpected end of JSON input".
    const { error } = await res.json().catch(() => ({}))
    throw new Error(error || "We couldn't start the checkout. Please try again.")
  }

  const { url } = await res.json()

  // Fire client-side pixel event with deduplication ID.
  trackPixelEvent('InitiateCheckout', {}, fbEventId)

  window.location.href = url
}
