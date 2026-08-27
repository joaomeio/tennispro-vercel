import { EN_PRICE_IDS } from './checkout'
import { MODULES, getModule } from './modules'
import { MODULE_CARDS, DRILL_CATEGORIES } from './catalog'
import { PRODUCTS, ADDON_AMOUNT, MODULE_REGULAR_AMOUNT } from '../../stripe.config'

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
// ─────────────────────────────────────────────────────────────────────────────

// One-time price of a single module bought outside its tier, and the
// strikethrough anchor next to it. Both live in /stripe.config.js so the
// number the page shows is the number the price was created at.
export const ADDON_PRICE = ADDON_AMOUNT
export const MODULE_REGULAR_PRICE = MODULE_REGULAR_AMOUNT

export const DRILL_COUNT = DRILL_CATEGORIES.reduce((n, c) => n + (c.count ?? 0), 0)

export const PLANS = [
  {
    id: 'drills',
    tag: 'Starter',
    name: 'Drill Library',
    blurb: 'Every drill, nothing else. The one thing you use before every lesson.',
    price: PRODUCTS.PLAN_DRILLS.amount,
    priceId: EN_PRICE_IDS.PLAN_DRILLS,
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
    price: PRODUCTS.PLAN_TOOLKIT.amount,
    priceId: EN_PRICE_IDS.PLAN_TOOLKIT,
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
    price: PRODUCTS.PLAN_COMPLETE.amount,
    priceId: EN_PRICE_IDS.PLAN_COMPLETE,
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

export function getPlan(id) {
  return PLANS.find((p) => p.id === id) ?? null
}

// Modules a plan doesn't include — what the add-on step offers.
export function addonsForPlan(plan) {
  if (!plan) return []
  return ADDONS.filter((a) => !plan.modules.includes(a.id))
}

// What this plan's contents would cost bought à la carte: the cheapest tier
// that carries the drills, plus each extra module at its own price. Used as
// the strikethrough anchor, so it only ever reflects real prices.
export function separateTotal(plan) {
  const base = PLANS[0].price
  const extras = plan.modules.filter((id) => id !== 'drills')
  return base + extras.reduce((sum, id) => sum + (getModule(id)?.price ?? ADDON_PRICE), 0)
}

// If the buyer has ticked enough modules that a higher tier costs less for the
// same access, say so instead of quietly taking the bigger payment.
export function betterPlanFor(plan, selectedIds) {
  if (!plan) return null
  const wanted = new Set([...plan.modules, ...selectedIds])
  const current = plan.price + selectedIds.length * ADDON_PRICE

  return (
    PLANS.filter(
      (p) =>
        p.id !== plan.id &&
        p.price < current &&
        [...wanted].every((id) => p.modules.includes(id))
    ).sort((a, b) => a.price - b.price)[0] ?? null
  )
}
