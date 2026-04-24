// PT-BR checkout links (Cakto)
export const PT_LINKS = {
  BASIC: 'https://pay.cakto.com.br/39qheuy_709366',
  PREMIUM: 'https://pay.cakto.com.br/rstkey8_709380',
  PREMIUM_DISCOUNT: 'https://pay.cakto.com.br/zddro2t',
}

// EN checkout — Stripe price IDs
export const EN_PRICE_IDS = {
  BASIC: 'price_1TPlNcEFtoy3ZjcSuiAd8tve',
  PREMIUM: 'price_1TPlO1EFtoy3ZjcSwKmNbokV',
  DOWNSELL: 'price_1TPlONEFtoy3ZjcSc40OwjdO',
  ORDER_BUMP: 'price_1TPlOhEFtoy3ZjcStPtthqZQ',
  ADDON_GYM: 'price_1TPlP6EFtoy3ZjcS8uH4dKg7',
  ADDON_SERVE: 'price_1TPlPFEFtoy3ZjcSQxuxPygO',
  ADDON_DOUBLES: 'price_1TPlPNEFtoy3ZjcSaIG4dIGp',
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
export async function createCheckoutSession(priceId, orderBump = false, isAddon = false, customerEmail = null) {
  const res = await fetch('/api/create-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId, orderBump, isAddon, customerEmail }),
  })

  if (!res.ok) {
    const { error } = await res.json()
    throw new Error(error || 'Failed to create checkout session')
  }

  const { url } = await res.json()
  window.location.href = url
}
