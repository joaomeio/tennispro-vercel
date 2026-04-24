// ─────────────────────────────────────────────────────────────────────────────
// MODULE REGISTRY
//
// To add a new module:
//   1. Add an entry here
//   2. Create src/pages/dashboard/<YourPage>.jsx
//   3. Add the route in App.jsx
//
// Access rules:
//   Access is verified via the Supabase user_modules table.
//   includedInAnyPurchase: true  → visually and functionally unlocked for any paying user
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
    includedInAnyPurchase: false,
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
    includedInAnyPurchase: false,
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
    includedInAnyPurchase: false,
  },

  // ── PURCHASABLE ADD-ONS ────────────────────────────────────────────────────
  {
    id: 'gym-training',
    title: 'Tennis in the Gym',
    subtitle: 'Add-on Module',
    description: 'Sport-specific strength, agility, and conditioning programs to sharpen your game off the court.',
    badge: '5 Programs',
    tag: 'ADD-ON',
    tagColor: 'bg-teal-600',
    route: '/dashboard/gym-training',
    color: 'from-teal-950 to-teal-900',
    includedInAnyPurchase: false,
    isAddon: true,
    price: 17,
    priceId: 'price_1TP8eICz3W9Jpqrl3CFU1A1E',
    paywallBenefits: [
      '5 complete gym programs built around tennis performance',
      'Strength, agility, explosiveness & injury prevention',
      'Weekly schedules that fit around your court sessions',
      'Exercise library with form cues for every movement',
      'Recovery protocols to stay match-ready year-round',
    ],
  },
  {
    id: 'serve-masterclass',
    title: 'Serve Masterclass',
    subtitle: 'Add-on Module',
    description: 'Master flat, slice, and kick serves with mechanics breakdowns, spin guides, and placement strategy.',
    badge: '5 Modules',
    tag: 'ADD-ON',
    tagColor: 'bg-rose-600',
    route: '/dashboard/serve-masterclass',
    color: 'from-rose-950 to-rose-900',
    includedInAnyPurchase: false,
    isAddon: true,
    price: 17,
    priceId: 'price_1TP8edCz3W9JpqrlGX4clzHo',
    paywallBenefits: [
      'Full mechanics breakdown: flat, slice, and kick serves',
      'Spin and placement strategy for every court position',
      'Build an unshakeable second serve under pressure',
      'Practice plans trusted by professional coaches',
      'Self-correction checklists to fix common errors fast',
    ],
  },
  {
    id: 'doubles-tactics',
    title: 'Doubles Tactics Guide',
    subtitle: 'Add-on Module',
    description: '40+ formation patterns, communication frameworks, and net strategies for competitive doubles play.',
    badge: '40+ Patterns',
    tag: 'ADD-ON',
    tagColor: 'bg-indigo-600',
    route: '/dashboard/doubles-tactics',
    color: 'from-indigo-950 to-indigo-900',
    includedInAnyPurchase: false,
    isAddon: true,
    price: 17,
    priceId: 'price_1TP8epCz3W9JpqrlyP9EDMDt',
    paywallBenefits: [
      '40+ tactical patterns for competitive doubles play',
      'I-formation, Australian, and hybrid systems explained',
      'Net game mastery: poaching, volleying, and lob coverage',
      'Return of serve strategies to break down any team',
      'Communication frameworks to build winning partnerships',
    ],
  },
]

export function getModule(id) {
  return MODULES.find((m) => m.id === id)
}
