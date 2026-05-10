import { generateEventId, getFbp, getFbc, initPixelWithUser, trackPixelEvent } from '../lib/meta'

// PT-BR checkout links (Cakto)
export const PT_LINKS = {
  BASIC: 'https://pay.cakto.com.br/39qheuy_709366',
  PREMIUM: 'https://pay.cakto.com.br/rstkey8_709380',
  PREMIUM_DISCOUNT: 'https://pay.cakto.com.br/zddro2t',
}

// EN checkout — Stripe price IDs
const PROD_PRICE_IDS = {
  BASIC: 'price_1T1s5JCz3W9Jpqrl8CV9AGqW',
  PREMIUM: 'price_1T1s4cCz3W9Jpqrlwjyfat0e',
  DOWNSELL: 'price_1T1s5oCz3W9JpqrlGiQZSZIS',
  ORDER_BUMP: 'price_1T1sCECz3W9JpqrlOgQRiPot',
  ADDON_GYM: 'price_1TPoiVCz3W9Jpqrl5vuHA6RN',
  ADDON_SERVE: 'price_1TPoihCz3W9Jpqrlf7oUs2J3',
  ADDON_DOUBLES: 'price_1TPojKCz3W9JpqrltTSes10O',
  ADDON_LESSON_TEMPLATES: 'price_1T1sCECz3W9JpqrlOgQRiPot',
}

const TEST_PRICE_IDS = {
  BASIC: 'price_1T1spNCz3W9JpqrliooB8TI0',
  PREMIUM: 'price_1T1spNCz3W9JpqrliooB8TI0',
  DOWNSELL: 'price_1T1spNCz3W9JpqrliooB8TI0',
  ORDER_BUMP: 'price_1T1spVCz3W9JpqrlD1BisICz',
  ADDON_GYM: 'price_1TVBymCz3W9JpqrlS6HkXQFF',
  ADDON_SERVE: 'price_1TVBz3Cz3W9JpqrlmSXsPExo',
  ADDON_DOUBLES: 'price_1TVBzNCz3W9Jpqrlh0fK9lMq',
  ADDON_LESSON_TEMPLATES: 'price_1T1spVCz3W9JpqrlD1BisICz',
}

export const EN_PRICE_IDS = import.meta.env.DEV ? TEST_PRICE_IDS : PROD_PRICE_IDS

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
      // Passed to backend so CAPI can fire a matching InitiateCheckout event.
      fbEventId,
      fbp,
      fbc,
      userAgent: navigator.userAgent,
    }),
  })

  if (!res.ok) {
    const { error } = await res.json()
    throw new Error(error || 'Failed to create checkout session')
  }

  const { url } = await res.json()

  // Fire client-side pixel event with deduplication ID.
  trackPixelEvent('InitiateCheckout', {}, fbEventId)

  window.location.href = url
}
