// ─────────────────────────────────────────────────────────────────────────────
// PRICE VARIANT ASSIGNMENT
//
// The decision of which ladder a visitor sees, kept apart from the React that
// surrounds it (src/context/PricingContext.jsx) so it can be reasoned about —
// and tested — without a DOM.
// ─────────────────────────────────────────────────────────────────────────────

// Extension is explicit so this module stays importable by plain Node, not
// just Vite — the assignment rules are worth being able to test directly.
import { isVariant, DEFAULT_VARIANT } from '../../stripe.config.js'

// Draw a side. `split` is the percentage going to B, so split=0 never picks B
// and split=100 always does — the two ends of the admin slider are exact, not
// merely very likely, which is what makes it usable as an on/off switch.
export function bucket({ variantA, variantB, split }, rand = Math.random) {
  const pct = Number(split) || 0
  if (pct <= 0) return variantA
  if (pct >= 100) return variantB
  return rand() * 100 < pct ? variantB : variantA
}

// Reuse the stored assignment while the admin hasn't touched anything; re-draw
// when they have. `stored` is whatever was in localStorage (or null).
//
// Returns { variant, version, changed } — `changed` tells the caller whether
// it needs to write back to storage.
export function resolveAssignment(stored, config, rand = Math.random) {
  const version = Number(config?.version ?? 0)

  const reusable =
    stored && isVariant(stored.variant) && Number(stored.version) === version

  if (reusable) {
    return { variant: stored.variant, version, changed: false }
  }

  const drawn = bucket(config ?? {}, rand)
  return {
    variant: isVariant(drawn) ? drawn : DEFAULT_VARIANT,
    version,
    changed: true,
  }
}
