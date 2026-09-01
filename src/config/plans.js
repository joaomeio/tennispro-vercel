import { PRICE_MODE } from './checkout'
import { MODULES, getModule } from './modules'
import { MODULE_CARDS, DRILL_CATEGORIES } from './catalog'
import {
  productsFor,
  priceIdsFor,
  priceIdConflicts,
  describeConflict,
  PRICE_VARIANTS,
  DEFAULT_VARIANT,
  ADDON_AMOUNT,
  MODULE_REGULAR_AMOUNT,
} from '../../stripe.config'

// ─────────────────────────────────────────────────────────────────────────────
// SALES PAGE PLANS (EN)
//
// Three one-time tiers. Everything a buyer doesn't get in their tier stays
// purchasable as a single module in the step between the pricing card and
// Stripe (components/PlanCheckoutModal.jsx), so no tier is a dead end.
//
//   drills    $18   the library
//   toolkit   $36   + kids manual, mental game, lesson templates
//   complete  $69   + gym, serve, doubles  (everything)
//
// At $12 a module the ladder holds in every direction: assembling the top tier
// out of the bottom one costs $90, and out of the middle one $72, so Complete
// at $69 is always the cheapest route to everything. Changing ADDON_AMOUNT in
// stripe.config.js without re-checking that arithmetic can invert it.
//
// Those are the control numbers. A price test swaps the tier amounts wholesale
// (PRICE_VARIANTS in stripe.config.js), so the arithmetic is no longer a fixed
// fact to reason about once — `ladderWarnings()` below re-derives it from
// whatever ladder a visitor was actually shown and complains in dev if it
// inverts.
//
// Which ladder that is varies PER VISITOR now, so nothing here can be a module
// const. `plansFor(variant)` builds the array; components reach it through
// usePricing() (src/context/PricingContext.jsx) rather than importing it.
// ─────────────────────────────────────────────────────────────────────────────

// One-time price of a single module bought outside its tier, and the
// strikethrough anchor next to it. Both live in /stripe.config.js so the
// number the page shows is the number the price was created at.
export const ADDON_PRICE = ADDON_AMOUNT
export const MODULE_REGULAR_PRICE = MODULE_REGULAR_AMOUNT

export const DRILL_COUNT = DRILL_CATEGORIES.reduce((n, c) => n + (c.count ?? 0), 0)

// Memoised: usePricing() calls this on every render, and there are only ever
// a handful of variants.
const planCache = new Map()

export function plansFor(variant = DEFAULT_VARIANT) {
  if (!planCache.has(variant)) planCache.set(variant, buildPlans(variant))
  return planCache.get(variant)
}

function buildPlans(variant) {
  const products = productsFor(variant)
  const ids = priceIdsFor(PRICE_MODE, variant)

  return [
  {
    id: 'drills',
    tag: 'Starter',
    name: 'Drill Library',
    blurb: 'Every drill, nothing else. The one thing you use before every lesson.',
    price: products.PLAN_DRILLS.amount,
    priceId: ids.PLAN_DRILLS,
    modules: ['drills'],
    cta: 'Get the Drill Library',
    highlights: [
      `All ${DRILL_COUNT} drills with court diagrams`,
      'Filter by stroke, level and situation',
      'Setup, steps and coaching cues on every drill',
      'Lifetime access — no subscription',
    ],
  },
  {
    id: 'toolkit',
    tag: 'Most Popular',
    featured: true,
    name: 'Coach Toolkit',
    blurb: 'The library plus the three things coaches ask for the week after they buy.',
    price: products.PLAN_TOOLKIT.amount,
    priceId: ids.PLAN_TOOLKIT,
    modules: ['drills', 'tennis-kids', 'mental-game', 'lesson-templates'],
    cta: 'Get the Coach Toolkit',
    highlights: [
      `Everything in the Drill Library (${DRILL_COUNT} drills)`,
      'Kids Tennis Manual — red to yellow ball',
      'Mental Game Mastery — 8 sessions',
      'Lesson Templates — 30 to 90 minutes',
    ],
  },
  {
    id: 'complete',
    tag: 'Best Value',
    name: 'Complete Coach',
    blurb: 'All seven modules. Nothing locked, nothing left to buy later.',
    price: products.PLAN_COMPLETE.amount,
    priceId: ids.PLAN_COMPLETE,
    modules: MODULES.map((m) => m.id),
    cta: 'Get Everything',
    highlights: [
      'Everything in the Coach Toolkit',
      'Serve Masterclass — flat, slice and kick',
      'Doubles Tactics — 40+ patterns',
      'Tennis in the Gym — 5 programs',
    ],
  },
  ]
}

// Punchy one-liners for the add-on step — the dashboard `description` fields
// are written for a buyer who already owns the product.
const ADDON_TAGLINES = {
  'tennis-kids': 'Red to yellow ball, stage by stage.',
  'mental-game': 'Focus, pressure and confidence work.',
  'lesson-templates': 'Print-and-coach plans, 30–90 min.',
  'gym-training': 'Off-court strength and movement.',
  'serve-masterclass': 'Flat, slice and kick, broken down.',
  'doubles-tactics': '40+ formations and net patterns.',
}

// Every module that can be bought on its own, in the order it should be
// offered. Art is the module's own first card so the tile in the modal is the
// same drawing the buyer meets inside the app.
export const ADDONS = MODULES.filter((m) => m.id !== 'drills').map((m) => ({
  id: m.id,
  title: m.title,
  tagline: ADDON_TAGLINES[m.id] ?? m.description,
  badge: m.badge,
  price: m.price ?? ADDON_PRICE,
  priceId: m.priceId,
  art: MODULE_CARDS[m.id]?.[0] ?? null,
}))

// ── Plan helpers ────────────────────────────────────────────────────────────
// Each takes the visitor's `plans` array as its first argument, because the
// prices they reason about differ per visitor now. usePricing() hands back
// versions already bound to the right ladder, so components never pass it.

export function getPlan(plans, id) {
  return plans.find((p) => p.id === id) ?? null
}

// Modules a plan doesn't include — what the add-on step offers. Add-on prices
// don't vary by variant, so this one needs no ladder.
export function addonsForPlan(plan) {
  if (!plan) return []
  return ADDONS.filter((a) => !plan.modules.includes(a.id))
}

// What this plan's contents would cost bought à la carte: the cheapest tier
// that carries the drills, plus each extra module at its own price. Used as
// the strikethrough anchor, so it only ever reflects real prices.
export function separateTotal(plans, plan) {
  const base = plans[0].price
  const extras = plan.modules.filter((id) => id !== 'drills')
  return base + extras.reduce((sum, id) => sum + (getModule(id)?.price ?? ADDON_PRICE), 0)
}

// If the buyer has ticked enough modules that a higher tier costs less for the
// same access, say so instead of quietly taking the bigger payment.
export function betterPlanFor(plans, plan, selectedIds) {
  if (!plan) return null
  const wanted = new Set([...plan.modules, ...selectedIds])
  const current = plan.price + selectedIds.length * ADDON_PRICE

  return (
    plans
      .filter(
        (p) =>
          p.id !== plan.id &&
          p.price < current &&
          [...wanted].every((id) => p.modules.includes(id))
      )
      .sort((a, b) => a.price - b.price)[0] ?? null
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// LADDER SELF-CHECK
//
// The three tiers only work as a ladder if each one is the cheapest route to
// its own contents — otherwise the add-on step sitting right next to the card
// quietly offers a better deal than the card itself. At control prices that
// holds by hand-checked arithmetic. A price variant can break it, and it
// breaks silently: nothing throws, the page just sells badly.
//
// So it is re-derived from whatever prices are actually live rather than
// trusted as a fact about $18/$36/$69.
// ─────────────────────────────────────────────────────────────────────────────
export function ladderWarnings(plans, addonPrice = ADDON_PRICE) {
  const warnings = []

  for (let i = 0; i < plans.length; i++) {
    for (let j = i + 1; j < plans.length; j++) {
      const lower = plans[i]
      const upper = plans[j]

      if (upper.price <= lower.price) {
        warnings.push(
          `${upper.name} ($${upper.price}) is not priced above ${lower.name} ($${lower.price}).`
        )
        continue
      }

      // Everything `upper` carries that `lower` doesn't, bought à la carte.
      const missing = upper.modules.filter((id) => !lower.modules.includes(id))
      const viaAddons = lower.price + missing.length * addonPrice

      if (viaAddons <= upper.price) {
        warnings.push(
          `${upper.name} ($${upper.price}) is not cheaper than assembling it from ` +
            `${lower.name} ($${lower.price} + ${missing.length} × $${addonPrice} = $${viaAddons}).`
        )
      }
    }
  }

  // One add-on costing as much as the next tier up leaves the lower card a
  // strictly worse buy at the same money — and betterPlanFor won't flag it,
  // since it only speaks up when the higher tier is *strictly* cheaper.
  for (let i = 0; i < plans.length - 1; i++) {
    const lower = plans[i]
    const upper = plans[i + 1]
    if (lower.price + addonPrice >= upper.price) {
      warnings.push(
        `${lower.name} + one add-on ($${lower.price + addonPrice}) costs at least as much as ` +
          `${upper.name} ($${upper.price}) but unlocks fewer modules.`
      )
    }
  }

  return warnings
}

// Every variant is checked at boot, not just the one being served — the admin
// can point traffic at any of them from the Pricing tab without a deploy, so a
// broken ladder needs to surface here rather than the first time it's shown.
if (import.meta.env.DEV) {
  for (const conflict of priceIdConflicts()) {
    console.error(`[pricing] PRICE ID COLLISION — ${describeConflict(conflict)}`)
  }

  for (const variant of Object.keys(PRICE_VARIANTS)) {
    const warnings = ladderWarnings(plansFor(variant))
    if (warnings.length > 0) {
      console.warn(
        `[pricing] Variant "${variant}" has an inconsistent ladder:\n  ${warnings.join('\n  ')}`
      )
    }
  }
}
