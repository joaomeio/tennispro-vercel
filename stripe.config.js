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

// { PLAN_DRILLS: 'price_…', … } for one mode. Unset ids come back as ''.
export function priceIdsFor(mode) {
  const key = mode === 'test' ? 'test' : 'live'
  return Object.fromEntries(
    Object.entries(PRODUCTS).map(([name, product]) => [name, product[key] ?? ''])
  )
}

// Every id we might ever see on a paid line item → the modules it unlocks.
// Live and test are in the same map on purpose: the webhook doesn't know which
// mode a session came from, and ids never collide across modes.
export function buildPriceToModules() {
  const map = { ...SUPERSEDED_PRICES }
  for (const product of Object.values(PRODUCTS)) {
    for (const id of [product.live, product.test]) {
      if (!id) continue
      // A shared id (test mode reuses one sandbox price for several products)
      // should grant the union, not the last writer's list.
      map[id] = [...new Set([...(map[id] ?? []), ...product.modules])]
    }
  }
  return map
}

// An id that hasn't been created in Stripe yet. Callers keep the button inert
// instead of sending the buyer into a 500 from the checkout API.
export function isPlaceholderPriceId(priceId) {
  return !priceId || priceId.includes('placeholder')
}
