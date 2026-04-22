// ─────────────────────────────────────────────────────────────────────────────
// MODULE REGISTRY
//
// To add a new module:
//   1. Add an entry here
//   2. Create src/pages/dashboard/<YourPage>.jsx
//   3. Add the route in App.jsx
//   4. If it's a paid add-on, set addOnPriceId to the Stripe price ID
//
// Access rules:
//   includedInAnyPurchase: true  → unlocked for any paying user
//   addOnPriceId: 'price_xxx'    → requires that specific purchase
//   Both can be true             → unlocked either way
// ─────────────────────────────────────────────────────────────────────────────

export const MODULES = [
  {
    id: 'drills',
    title: 'Premium Drill Library',
    subtitle: 'TennisPro',
    description: '250+ professional drills for every skill level — organised by category with animated court diagrams.',
    badge: '250+ Drills',
    tag: 'PREMIUM',
    tagColor: 'bg-green-500',
    route: '/dashboard/drills',
    color: 'from-green-950 to-green-900',
    // Access
    includedInAnyPurchase: true,
    addOnPriceId: null,
  },
  {
    id: 'tennis-kids',
    title: 'Kids Tennis Manual',
    subtitle: 'Bonus Content',
    description: 'Age-appropriate games, drills, and progressions designed for juniors aged 4–14.',
    badge: 'Ages 4–14',
    tag: 'BONUS',
    tagColor: 'bg-orange-500',
    route: '/dashboard/tennis-kids',
    color: 'from-orange-950 to-orange-900',
    includedInAnyPurchase: true,
    addOnPriceId: null,
  },
  {
    id: 'mental-game',
    title: 'Mental Game Mastery',
    subtitle: 'Bonus Content',
    description: 'Competition psychology, self-talk, focus routines, and pressure management strategies.',
    badge: '8 Modules',
    tag: 'BONUS',
    tagColor: 'bg-purple-500',
    route: '/dashboard/mental-game',
    color: 'from-purple-950 to-purple-900',
    includedInAnyPurchase: true,
    addOnPriceId: null,
  },
  {
    id: 'lesson-templates',
    title: 'Lesson Templates',
    subtitle: 'Bonus Content',
    description: 'Ready-to-use lesson plans for 30, 45, 60, and 90-minute sessions. Print and coach.',
    badge: '30–90 Min Plans',
    tag: 'BONUS',
    tagColor: 'bg-blue-500',
    route: '/dashboard/lesson-templates',
    color: 'from-blue-950 to-blue-900',
    includedInAnyPurchase: true,
    addOnPriceId: null,
  },

  // ── LOCKED ADD-ONS (future modules) ────────────────────────────────────────
  {
    id: 'video-analysis',
    title: 'Video Analysis Toolkit',
    subtitle: 'Add-on Module',
    description: 'Frame-by-frame video analysis templates, swing checklists, and player evaluation forms.',
    badge: 'Coming Soon',
    tag: 'ADD-ON',
    tagColor: 'bg-yellow-600',
    route: '/dashboard/video-analysis',
    color: 'from-yellow-950 to-yellow-900',
    includedInAnyPurchase: false,
    addOnPriceId: null, // Set Stripe price ID when available
    comingSoon: true,
  },
  {
    id: 'tactics-board',
    title: 'Tactics & Pattern Library',
    subtitle: 'Add-on Module',
    description: '100+ tactical point construction patterns with professional matchplay scenarios and court positioning.',
    badge: '100+ Patterns',
    tag: 'ADD-ON',
    tagColor: 'bg-red-600',
    route: '/dashboard/tactics-board',
    color: 'from-red-950 to-red-900',
    includedInAnyPurchase: false,
    addOnPriceId: null,
    comingSoon: true,
  },
]

export function getModule(id) {
  return MODULES.find((m) => m.id === id)
}
