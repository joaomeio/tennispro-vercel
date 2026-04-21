// PT-BR checkout links (Cakto)
export const PT_LINKS = {
  BASIC: 'https://pay.cakto.com.br/39qheuy_709366',
  PREMIUM: 'https://pay.cakto.com.br/rstkey8_709380',
  PREMIUM_DISCOUNT: 'https://pay.cakto.com.br/zddro2t',
}

// EN checkout — Stripe price IDs
export const EN_PRICE_IDS = {
  BASIC: 'price_1TONBjCz3W9JpqrlXyirmBW7',
  PREMIUM: 'price_1T1spNCz3W9JpqrliooB8TI0',
  DOWNSELL: 'price_1TONAaCz3W9Jpqrl938ERDdk',
  ORDER_BUMP: 'price_1T1spVCz3W9JpqrlD1BisICz',
}

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
export async function createCheckoutSession(priceId, orderBump = false) {
  const res = await fetch('/api/create-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId, orderBump }),
  })

  if (!res.ok) {
    const { error } = await res.json()
    throw new Error(error || 'Failed to create checkout session')
  }

  const { url } = await res.json()
  window.location.href = url
}
