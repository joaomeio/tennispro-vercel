import crypto from 'crypto'

const PIXEL_ID = '1549955799631361'
const API_VERSION = 'v21.0'

// ── Hashing helpers ───────────────────────────────────────────────────────────

function sha256(value) {
  if (!value) return undefined
  return crypto.createHash('sha256').update(String(value)).digest('hex')
}

// Normalization matches the client-side rules in src/lib/meta.js
function hashEmail(email) {
  if (!email) return undefined
  return sha256(email.trim().toLowerCase())
}

function hashPhone(phone) {
  if (!phone) return undefined
  return sha256(phone.replace(/\D/g, ''))
}

function hashName(name) {
  if (!name) return undefined
  return sha256(name.trim().toLowerCase().replace(/[^a-z]/g, ''))
}

// ── CAPI sender ───────────────────────────────────────────────────────────────
//
// Parameters
//   eventName   — must exactly match the client-side fbq event name
//   eventId     — same UUID sent by the browser pixel (deduplication key)
//   eventTime   — unix timestamp; defaults to now
//   actionSource — "website" for browser-originated events
//   userData    — { email, phone, firstName, lastName, ip, userAgent, fbc, fbp }
//   customData  — { currency, value, content_type, contents, ... }

export async function sendCapiEvent({
  eventName,
  eventId,
  eventTime,
  actionSource = 'website',
  userData = {},
  customData = {},
}) {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN
  if (!accessToken) {
    console.warn('[Meta CAPI] META_CAPI_ACCESS_TOKEN not set — skipping event:', eventName)
    return
  }

  const userDataPayload = {
    em: hashEmail(userData.email),
    ph: hashPhone(userData.phone),
    fn: hashName(userData.firstName),
    ln: hashName(userData.lastName),
    client_ip_address: userData.ip || undefined,
    client_user_agent: userData.userAgent || undefined,
    fbc: userData.fbc || undefined,
    fbp: userData.fbp || undefined,
  }

  // Strip undefined keys so we don't send nullish fields to the API
  const cleanUserData = Object.fromEntries(
    Object.entries(userDataPayload).filter(([, v]) => v !== undefined)
  )

  const event = {
    event_name: eventName,
    event_id: eventId,
    event_time: eventTime || Math.floor(Date.now() / 1000),
    action_source: actionSource,
    user_data: cleanUserData,
  }

  if (Object.keys(customData).length > 0) {
    event.custom_data = customData
  }

  const url = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${accessToken}`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [event] }),
    })

    if (!response.ok) {
      const body = await response.json().catch(() => ({}))
      console.error('[Meta CAPI] API error for', eventName, body)
    }
  } catch (err) {
    // Non-fatal — log and continue. Never block the main request flow.
    console.error('[Meta CAPI] Network error for', eventName, err.message)
  }
}
