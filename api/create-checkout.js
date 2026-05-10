import Stripe from 'stripe'
import { createPostHogClient } from './lib/posthog.js'
import { sendCapiEvent } from './lib/meta-capi.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const {
    priceId,
    orderBumpIds = [],
    isAddon = false,
    customerEmail = null,
    // Attribution fingerprint from the browser
    fbEventId = null,
    fbp = null,
    fbc = null,
    userAgent = null,
  } = req.body

  if (!priceId) {
    return res.status(400).json({ error: 'priceId is required' })
  }

  const siteUrl = process.env.SITE_URL || 'https://tennispro.site'
  const clientIp =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    null

  const lineItems = [{ price: priceId, quantity: 1 }]

  if (Array.isArray(orderBumpIds) && orderBumpIds.length > 0) {
    for (const bumpId of orderBumpIds) {
      lineItems.push({ price: bumpId, quantity: 1 })
    }
  }

  try {
    const sessionParams = {
      mode: 'payment',
      line_items: lineItems,
      success_url: isAddon
        ? `${siteUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`
        : `${siteUrl}/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/`,
      allow_promotion_codes: true,
      after_expiration: {
        recovery: { enabled: true, allow_promotion_codes: true },
      },
      // Store attribution data so the webhook can include it in the CAPI
      // Purchase event without relying on the browser being present.
      metadata: {
        ...(fbEventId && { fb_initiate_event_id: fbEventId }),
        ...(fbp && { fbp }),
        ...(fbc && { fbc }),
        ...(clientIp && { client_ip: clientIp }),
        ...(userAgent && { user_agent: userAgent }),
      },
    }

    // For addon purchases, look up the existing Stripe customer to pre-fill
    // email and saved payment methods. Otherwise always create a customer so
    // future addon purchases can find them.
    if (isAddon && customerEmail) {
      const existing = await stripe.customers.list({ email: customerEmail, limit: 1 })
      if (existing.data.length > 0) {
        sessionParams.customer = existing.data[0].id
      } else {
        sessionParams.customer_creation = 'always'
      }
    } else {
      sessionParams.customer_creation = 'always'
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    // ── Server-side CAPI: InitiateCheckout ───────────────────────────────────
    // Fires in parallel with session creation — non-blocking.
    // Uses the same fbEventId the browser pixel sent so Meta can deduplicate.
    if (fbEventId) {
      sendCapiEvent({
        eventName: 'InitiateCheckout',
        eventId: fbEventId,
        userData: {
          email: customerEmail,
          ip: clientIp,
          userAgent: userAgent || req.headers['user-agent'],
          fbp,
          fbc,
        },
      }).catch((err) => console.error('[Meta CAPI] InitiateCheckout failed:', err.message))
    }

    if (process.env.POSTHOG_API_KEY) {
      const posthog = createPostHogClient()
      posthog.capture({
        distinctId: customerEmail || session.id,
        event: 'checkout_started',
        properties: {
          price_id: priceId,
          order_bump_ids: orderBumpIds,
          is_addon: isAddon,
          stripe_session_id: session.id,
        },
      })
      await posthog.shutdown()
    }

    return res.status(200).json({ url: session.url })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
