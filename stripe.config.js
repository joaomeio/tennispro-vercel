// ─────────────────────────────────────────────────────────────────────────────
// STRIPE — every product, price id and module grant in one place.
//
// This file is imported by BOTH the browser bundle (src/config/checkout.js) and
// the serverless functions (api/stripe-webhook.js, api/provision-access.js), so
// keep it plain JS: no Vite `import.meta.env`, no Node `process.env`, no imports.
//
// Three things live here:
//   PRODUCTS           what we sell, what it costs, what it unlocks
//   SUPERSEDED_PRICES  prices we stopped selling but must still honour
//   helpers            derive the id map and the price → modules map
//
// `amount` is what the site DISPLAYS. Stripe is what actually CHARGES. They
// only agree if the price you create in Stripe has the same amount — that is
// the one invariant to hold when editing this file.
//
// ── WHAT TO CREATE IN STRIPE ────────────────────────────────────────────────
// Nine one-time prices, all USD, all "One time" (never recurring). Stripe
// prices are immutable — to change an amount you create a new price and paste
// its id here; the old one keeps working for anyone mid-checkout.
//
//   Product                      Amount   Paste into
//   ───────────────────────────────────────────────────────────
//   Drill Library                 $18     PLAN_DRILLS.live
//   Coach Toolkit                 $36     PLAN_TOOLKIT.live
//   Complete Coach                $69     PLAN_COMPLETE.live
//   Kids Tennis Manual            $12     ADDON_KIDS.live
//   Mental Game Mastery           $12     ADDON_MENTAL.live
//   Lesson Templates              $12     ADDON_LESSON_TEMPLATES.live
//   Tennis in the Gym             $12     ADDON_GYM.live
//   Serve Masterclass             $12     ADDON_SERVE.live
//   Doubles Tactics Guide         $12     ADDON_DOUBLES.live
//
// Repeat in test mode and paste into `.test` if you want to click the flow end
// to end without real cards. Nothing else needs touching: the webhook builds
// its price → module map from this file, so a pasted id is live everywhere at
// once. An empty `live` means the card shows "checkout isn't live yet" rather
// than charging a wrong amount.
// ─────────────────────────────────────────────────────────────────────────────

export const CURRENCY = 'usd'

// Every module sold outside a bundle costs the same. Change it here and the
// pricing cards, the add-on step and the dashboard paywall all follow.
export const ADDON_AMOUNT = 12

// What a module is worth on its own — the strikethrough anchor, never charged.
export const MODULE_REGULAR_AMOUNT = 27

export const PRODUCTS = {
  // ── Three-tier sales page (src/config/plans.js) ───────────────────────────
  PLAN_DRILLS: {
    label: 'TennisPro — Drill Library',
    amount: 18,
    modules: ['drills'],
    live: 'price_1U8rAsCz3W9JpqrlAxQqrrGp',
    test: 'price_1T1spNCz3W9JpqrliooB8TI0',
  },
  PLAN_TOOLKIT: {
    label: 'TennisPro — Coach Toolkit',
    amount: 36,
    modules: ['drills', 'tennis-kids', 'mental-game', 'lesson-templates'],
    live: 'price_1U8rBRCz3W9JpqrljiWJkrgI',
    test: 'price_1T1spNCz3W9JpqrliooB8TI0',
  },
  PLAN_COMPLETE: {
    label: 'TennisPro — Complete Coach',
    amount: 69,
    modules: [
      'drills',
      'tennis-kids',
      'mental-game',
      'lesson-templates',
      'gym-training',
      'serve-masterclass',
      'doubles-tactics',
    ],
    live: 'price_1U8rC6Cz3W9Jpqrlrm9aTEKn',
    test: 'price_1T1spNCz3W9JpqrliooB8TI0',
  },

  // ── Modules sold individually ─────────────────────────────────────────────
  // Offered in the add-on step before checkout and from the dashboard paywall.
  // The `test` ids are the old $9 sandbox prices, reused so the flow stays
  // clickable in dev — the amount won't match until you make $12 test prices.
  ADDON_KIDS: {
    label: 'Kids Tennis Manual',
    amount: ADDON_AMOUNT,
    modules: ['tennis-kids'],
    live: 'price_1U8rCyCz3W9JpqrlnI6Eg2uP',
    test: 'price_1T1spVCz3W9JpqrlD1BisICz',
  },
  ADDON_MENTAL: {
    label: 'Mental Game Mastery',
    amount: ADDON_AMOUNT,
    modules: ['mental-game'],
    live: 'price_1U8rGCCz3W9JpqrlwYN2Ekoj',
    test: 'price_1T1spVCz3W9JpqrlD1BisICz',
  },
  ADDON_LESSON_TEMPLATES: {
    label: 'Lesson Templates',
    amount: ADDON_AMOUNT,
    modules: ['lesson-templates'],
    live: 'price_1U8rH9Cz3W9JpqrlNRihPdpb',
    test: 'price_1T1spVCz3W9JpqrlD1BisICz',
  },
  ADDON_GYM: {
    label: 'Tennis in the Gym',
    amount: ADDON_AMOUNT,
    modules: ['gym-training'],
    live: 'price_1U8rHcCz3W9JpqrlgnYyzewc',
    test: 'price_1TVBymCz3W9JpqrlS6HkXQFF',
  },
  ADDON_SERVE: {
    label: 'Serve Masterclass',
    amount: ADDON_AMOUNT,
    modules: ['serve-masterclass'],
    live: 'price_1U8rI7Cz3W9Jpqrl4qjoUJKA',
    test: 'price_1TVBz3Cz3W9JpqrlmSXsPExo',
  },
  ADDON_DOUBLES: {
    label: 'Doubles Tactics Guide',
    amount: ADDON_AMOUNT,
    modules: ['doubles-tactics'],
    live: 'price_1U8rIPCz3W9JpqrlP0y7NsIS',
    test: 'price_1TVBzNCz3W9Jpqrlh0fK9lMq',
  },

  // ── Legacy single-offer funnel ────────────────────────────────────────────
  // Still live: /offer, the upsell page and the Stripe recovery emails point
  // here. Left exactly as they were — the three-tier page doesn't use them.
  BASIC: {
    label: 'Basic Plan (legacy)',
    amount: 17,
    modules: ['drills'],
    live: 'price_1T1s5JCz3W9Jpqrl8CV9AGqW',
    test: 'price_1T1spNCz3W9JpqrliooB8TI0',
  },
  PREMIUM: {
    label: 'Pro Premium Plan (legacy)',
    amount: 27,
    modules: ['drills', 'tennis-kids', 'mental-game'],
    live: 'price_1T1s4cCz3W9Jpqrlwjyfat0e',
    test: 'price_1T1spNCz3W9JpqrliooB8TI0',
  },
  DOWNSELL: {
    label: 'Downsell (legacy)',
    amount: 27,
    modules: ['drills', 'tennis-kids', 'mental-game'],
    live: 'price_1T1s5oCz3W9JpqrlGiQZSZIS',
    test: 'price_1T1spNCz3W9JpqrliooB8TI0',
  },
  ORDER_BUMP: {
    label: 'Order bump — Lesson Templates (legacy)',
    amount: 9,
    modules: ['lesson-templates'],
    live: 'price_1T1sCECz3W9JpqrlOgQRiPot',
    test: 'price_1T1spVCz3W9JpqrlD1BisICz',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// PRICE TESTS
//
// A variant is a sparse overlay on PRODUCTS: name a product, give it a new
// amount and its own Stripe price ids. Everything not named falls through to
// the control price, and `modules` is always inherited from the base product —
// a variant can change what a tier costs, never what it unlocks.
//
// Which variants are running, and how traffic splits between them, is set from
// the admin panel's Pricing tab — not from this file and not at build time. It
// lives in the `app_settings` row read by api/pricing-config.js, so changing it
// takes effect without a deploy. This file only declares what a variant *is*.
//
// Slider at 0 or 100 gives a clean sequential test (everyone on one ladder);
// anything in between splits live traffic. Note that at this site's volume a
// 50/50 split needs far more visitors than it gets to reach significance —
// the slider is honest about the split, not about the statistics.
//
// ── TO RUN THE `low` TEST ───────────────────────────────────────────────────
// The amounts below are a starting proposal — change them to whatever you
// actually want to test, then create matching one-time USD prices in Stripe
// and paste the ids in. While `live` is empty the pricing cards render inert
// ("checkout isn't live yet") rather than charging a control price behind a
// variant label, so a half-finished variant can't take a wrong payment.
//
//   Product                      Amount   Paste into
//   ───────────────────────────────────────────────────────────
//   Drill Library (low)           $12     PRICE_VARIANTS.low.PLAN_DRILLS.live
//   Coach Toolkit (low)           $24     PRICE_VARIANTS.low.PLAN_TOOLKIT.live
//   Complete Coach (low)          $45     PRICE_VARIANTS.low.PLAN_COMPLETE.live
//
// Add-ons stay at ADDON_AMOUNT in every variant. Note that at $12/$24/$45 a
// buyer on Drills who ticks one add-on pays exactly what the Coach Toolkit
// costs, for two modules instead of four — `ladderWarnings()` in
// src/config/plans.js flags that in dev. Widening the middle tier to $25 or
// dropping the entry tier to $10 clears it.
// ─────────────────────────────────────────────────────────────────────────────

export const DEFAULT_VARIANT = 'control'

export const PRICE_VARIANTS = {
  // The prices in PRODUCTS above, untouched.
  control: {},

  low: {
    PLAN_DRILLS: { amount: 12, live: 'price_1UAd3vCz3W9JpqrlLd1cIPuv', test: '' },
    PLAN_TOOLKIT: { amount: 24, live: 'price_1UAgmrCz3W9Jpqrlihg9siGI', test: '' },
    PLAN_COMPLETE: { amount: 45, live: 'price_1UAd4uCz3W9JpqrlObuZZDwR', test: '' },
  },
}

export function isVariant(name) {
  return Object.prototype.hasOwnProperty.call(PRICE_VARIANTS, name)
}

// PRODUCTS with one variant's overrides applied. An unknown name is treated as
// control rather than throwing — a typo'd env var must not take the site down.
export function productsFor(variant) {
  const overrides = PRICE_VARIANTS[variant] ?? {}
  return Object.fromEntries(
    Object.entries(PRODUCTS).map(([name, product]) => [
      name,
      overrides[name] ? { ...product, ...overrides[name] } : product,
    ])
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Prices we no longer sell. They stay mapped so a webhook for an old checkout
// session — a recovery link, an abandoned cart finished days later — still
// grants the right modules. Never remove a row from here.
// ─────────────────────────────────────────────────────────────────────────────
export const SUPERSEDED_PRICES = {
  // $9 add-ons, replaced by the $12 prices above
  price_1TPoiVCz3W9Jpqrl5vuHA6RN: ['gym-training'],
  price_1TPoihCz3W9Jpqrlf7oUs2J3: ['serve-masterclass'],
  price_1TPojKCz3W9JpqrltTSes10O: ['doubles-tactics'],
  // Older still, from a previous Stripe account
  price_1TPlP6EFtoy3ZjcS8uH4dKg7: ['gym-training'],
  price_1TPlPFEFtoy3ZjcSQxuxPygO: ['serve-masterclass'],
  price_1TPlPNEFtoy3ZjcSaIG4dIGp: ['doubles-tactics'],
}

// ── Helpers ─────────────────────────────────────────────────────────────────

// { PLAN_DRILLS: 'price_…', … } for one mode, at one variant's prices. Unset
// ids come back as '' — including a variant whose ids haven't been pasted yet.
export function priceIdsFor(mode, variant = DEFAULT_VARIANT) {
  const key = mode === 'test' ? 'test' : 'live'
  return Object.fromEntries(
    Object.entries(productsFor(variant)).map(([name, product]) => [name, product[key] ?? ''])
  )
}

// Every id we might ever see on a paid line item → the modules it unlocks.
// Live and test are in the same map on purpose: the webhook doesn't know which
// mode a session came from, and ids never collide across modes.
//
// EVERY variant's ids belong here, not just the one currently being sold. The
// webhook has no idea which variant was live when a session was created, and
// an id missing from this map doesn't fail loudly — provisionAccess falls back
// to granting 'drills', so a Complete Coach buyer would silently receive only
// the drill library. Adding a variant price id above is enough; this walks them.
export function buildPriceToModules() {
  const map = { ...SUPERSEDED_PRICES }

  // A shared id (test mode reuses one sandbox price for several products)
  // should grant the union, not the last writer's list.
  const grant = (id, modules) => {
    if (!id) return
    map[id] = [...new Set([...(map[id] ?? []), ...modules])]
  }

  for (const product of Object.values(PRODUCTS)) {
    for (const id of [product.live, product.test]) grant(id, product.modules)
  }

  // Variants inherit `modules` from the base product they override, so a
  // variant price can never grant a different set than its control twin.
  for (const overrides of Object.values(PRICE_VARIANTS)) {
    for (const [name, override] of Object.entries(overrides)) {
      const modules = PRODUCTS[name]?.modules
      if (!modules) continue
      for (const id of [override.live, override.test]) grant(id, modules)
    }
  }

  return map
}

// An id that hasn't been created in Stripe yet. Callers keep the button inert
// instead of sending the buyer into a 500 from the checkout API.
export function isPlaceholderPriceId(priceId) {
  return !priceId || priceId.includes('placeholder')
}

// Which tier prices a variant is still missing in Stripe, by product name.
// Returns [] when the variant is ready to take money.
export function missingPriceIds(variant, mode = 'live') {
  const key = mode === 'test' ? 'test' : 'live'
  const products = productsFor(variant)
  return Object.keys(products).filter(
    (name) => name.startsWith('PLAN_') && isPlaceholderPriceId(products[name][key])
  )
}

// A variant can only be given traffic once every tier it sells has a real
// Stripe price. Checked in the browser to grey out the option, and again in
// api/pricing-config.js so the rule holds even if the UI is bypassed.
export function isSellable(variant, mode = 'live') {
  return missingPriceIds(variant, mode).length === 0 && variantConflicts(variant).length === 0
}

// ─────────────────────────────────────────────────────────────────────────────
// PRICE ID COLLISIONS
//
// The one invariant this whole file rests on is that the amount the page shows
// is the amount Stripe charges. The easiest way to break it is to paste an id
// that already belongs to a different product — the card then advertises one
// number and bills another, and nothing anywhere would notice.
//
// So: every `live` id is claimed by exactly one (amount, modules) pair. Two
// entries sharing an id is fine if they agree on both; disagreeing means
// somebody pasted the wrong price. Only `live` is checked — test mode
// deliberately reuses one sandbox price across several products.
// ─────────────────────────────────────────────────────────────────────────────

function liveClaims() {
  const claims = []

  for (const [name, product] of Object.entries(PRODUCTS)) {
    if (!product.live) continue
    claims.push({
      id: product.live,
      where: `PRODUCTS.${name}`,
      amount: product.amount,
      modules: product.modules,
    })
  }

  for (const [variant, overrides] of Object.entries(PRICE_VARIANTS)) {
    for (const [name, override] of Object.entries(overrides)) {
      if (!override.live) continue
      claims.push({
        id: override.live,
        where: `PRICE_VARIANTS.${variant}.${name}`,
        variant,
        amount: override.amount ?? PRODUCTS[name]?.amount,
        modules: PRODUCTS[name]?.modules ?? [],
      })
    }
  }

  return claims
}

// [{ id, claims: [...] }] for every live id claimed with conflicting terms.
export function priceIdConflicts() {
  const byId = new Map()
  for (const claim of liveClaims()) {
    if (!byId.has(claim.id)) byId.set(claim.id, [])
    byId.get(claim.id).push(claim)
  }

  const conflicts = []
  for (const [id, claims] of byId) {
    if (claims.length < 2) continue
    const amounts = new Set(claims.map((c) => c.amount))
    const grants = new Set(claims.map((c) => [...c.modules].sort().join(',')))
    if (amounts.size > 1 || grants.size > 1) conflicts.push({ id, claims })
  }
  return conflicts
}

export function variantConflicts(variant) {
  return priceIdConflicts().filter((c) => c.claims.some((claim) => claim.variant === variant))
}

// Human-readable, for the admin panel and the dev console.
export function describeConflict(conflict) {
  const parts = conflict.claims.map(
    (c) => `${c.where} ($${c.amount}, grants ${c.modules.join(' + ') || 'nothing'})`
  )
  return `${conflict.id} is claimed by ${parts.join(' AND ')} — one of them is charging the wrong amount.`
}
