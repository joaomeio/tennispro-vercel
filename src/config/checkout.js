// PT-BR checkout links (Cakto)
export const PT_LINKS = {
  BASIC: 'https://pay.cakto.com.br/39qheuy_709366',
  PREMIUM: 'https://pay.cakto.com.br/rstkey8_709380',
  PREMIUM_DISCOUNT: 'https://pay.cakto.com.br/zddro2t',
}

// EN checkout (Stripe via redirect)
export const EN_PRICE_IDS = {
  BASIC: 'price_1T1s5JCz3W9Jpqrl8CV9AGqW',
  PREMIUM: 'price_1T1s4cCz3W9Jpqrlwjyfat0e',
  PREMIUM_DISCOUNT: 'price_1T1s5oCz3W9JpqrlGiQZSZIS',
}

function getUtms() {
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'src']
  const result = {}
  const searchParams = new URLSearchParams(window.location.search)
  utmKeys.forEach((k) => {
    const val = searchParams.get(k) || localStorage.getItem(k) || ''
    if (val) result[k] = val
  })
  return result
}

export function handlePtCheckout(url) {
  const targetUrl = new URL(url)
  const currentParams = new URLSearchParams(window.location.search)
  currentParams.forEach((value, key) => {
    targetUrl.searchParams.set(key, value)
  })
  window.location.href = targetUrl.toString()
}

export function handleEnCheckout(priceId) {
  const utms = getUtms()
  const base = 'https://stripe-redirect-opal.vercel.app/api/checkout'
  const params = new URLSearchParams({ price_id: priceId, ...utms })
  window.location.href = `${base}?${params.toString()}`
}
