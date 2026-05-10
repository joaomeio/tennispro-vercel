const PIXEL_ID = '1549955799631361'

// ── Cookie readers ─────────────────────────────────────────────────────────────

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[2]) : null
}

export function getFbp() {
  return getCookie('_fbp')
}

// Reads _fbc cookie; if absent, constructs it from fbclid URL param.
export function getFbc() {
  const cookie = getCookie('_fbc')
  if (cookie) return cookie
  const fbclid = new URLSearchParams(window.location.search).get('fbclid')
  if (fbclid) return `fb.1.${Date.now()}.${fbclid}`
  return null
}

// ── Event ID generator (UUIDv4) ───────────────────────────────────────────────

export function generateEventId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

// ── SHA-256 hasher (Web Crypto API) ───────────────────────────────────────────
// Normalization: email → lowercase; phone → digits only; name → lowercase letters only.

export async function hashSHA256(value) {
  if (!value) return null
  const str = String(value).trim()
  const encoded = new TextEncoder().encode(str)
  const buffer = await crypto.subtle.digest('SHA-256', encoded)
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function hashEmail(email) {
  if (!email) return null
  return hashSHA256(email.trim().toLowerCase())
}

export async function hashPhone(phone) {
  if (!phone) return null
  // Keep only digits (country code included, no leading +)
  return hashSHA256(phone.replace(/\D/g, ''))
}

export async function hashName(name) {
  if (!name) return null
  // Lowercase letters only
  return hashSHA256(name.trim().toLowerCase().replace(/[^a-z]/g, ''))
}

// ── Advanced matching re-init ─────────────────────────────────────────────────
// Calls fbq('init') with hashed user data for manual advanced matching.
// Must be called BEFORE any fbq('track') call where this data should apply.

export async function initPixelWithUser({ email, phone, firstName, lastName } = {}) {
  if (typeof window.fbq !== 'function') return
  const params = {}
  if (email) params.em = await hashEmail(email)
  if (phone) params.ph = await hashPhone(phone)
  if (firstName) params.fn = await hashName(firstName)
  if (lastName) params.ln = await hashName(lastName)
  if (Object.keys(params).length > 0) {
    window.fbq('init', PIXEL_ID, params)
  }
}

// ── Track with deduplication ──────────────────────────────────────────────────
// Wraps fbq('track') and always attaches an eventID for server-side dedup.

export function trackPixelEvent(eventName, data = {}, eventId) {
  if (typeof window.fbq !== 'function') return
  window.fbq('track', eventName, data, { eventID: eventId })
}
