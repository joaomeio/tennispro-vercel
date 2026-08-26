// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD CATALOG
//
// The dashboard is a Netflix-style browse screen: one horizontal row per
// module, and vertical poster cards within each row.
//
//   MODULES (config/modules.js)  →  one row each, in this order
//   CARDS   (here)               →  the posters inside that row
//
// Each card carries its own art direction (motif + palette) so the poster
// artwork is generated from data rather than hand-built per card. When real
// generated artwork arrives, set `image` on a card and it replaces the SVG
// with no other change.
// ─────────────────────────────────────────────────────────────────────────────

// ── Drill categories ────────────────────────────────────────────────────────
// These nine cover all 280 drills with nothing orphaned and nothing double
// counted. `filter` is the query Drills.jsx applies when the card is opened —
// `type` matches the drills.type column, `subcategory` narrows within it.
//
// Note Groundwork splits three ways by subcategory (Forehand 27 / Backhand 14 /
// Slice 9), while volleys stay together under Volley rather than being split
// across the Forehand and Backhand cards.

export const DRILL_CATEGORIES = [
  {
    key: 'forehand',
    groupBy: null,               // single subcategory — a flat grid reads better
    title: 'Forehand',
    count: 27,
    filter: { type: 'groundstrokes', subcategory: 'Forehand' },
    motif: 'stroke',
    palette: { from: '#052e16', to: '#14532d', accent: '#4ade80' },
  },
  {
    key: 'backhand',
    groupBy: null,
    title: 'Backhand',
    count: 14,
    filter: { type: 'groundstrokes', subcategory: 'Backhand' },
    motif: 'stroke',
    flip: true,
    palette: { from: '#042f2e', to: '#115e59', accent: '#2dd4bf' },
  },
  {
    key: 'slice',
    groupBy: null,
    title: 'Slice',
    count: 9,
    filter: { type: 'groundstrokes', subcategory: 'Slice' },
    motif: 'slice',
    palette: { from: '#083344', to: '#155e75', accent: '#22d3ee' },
  },
  {
    key: 'serve',
    groupBy: 'subcategory',      // Flat / Kick / Slice
    title: 'Serve',
    count: 40,
    filter: { type: 'serve' },
    motif: 'serve',
    palette: { from: '#1e1b4b', to: '#3730a3', accent: '#818cf8' },
  },
  {
    key: 'return',
    groupBy: 'subcategory',
    title: 'Return',
    count: 35,
    filter: { type: 'return' },
    motif: 'court',
    palette: { from: '#172554', to: '#1e40af', accent: '#60a5fa' },
  },
  {
    key: 'volley',
    groupBy: 'subcategory',      // Forehand / Backhand / Overhead / Half volley
    title: 'Volley',
    count: 30,
    filter: { type: 'volley' },
    motif: 'net',
    palette: { from: '#422006', to: '#854d0e', accent: '#facc15' },
  },
  {
    key: 'physical',
    // 28 subcategories across 60 drills would give useless groups of 1-4,
    // so this one groups by its two source types instead.
    groupBy: 'type',
    title: 'Physical',
    count: 60,
    // The only card spanning two types: Fitness (30) + Footwork (30).
    filter: { type: ['fitness', 'footwork'] },
    motif: 'figure',
    palette: { from: '#450a0a', to: '#991b1b', accent: '#f87171' },
  },
  {
    key: 'match-play',
    groupBy: 'subcategory',
    title: 'Match Play',
    count: 40,
    filter: { type: 'matchplay' },
    motif: 'court',
    variant: 'tactics',
    palette: { from: '#4a044e', to: '#86198f', accent: '#e879f9' },
  },
  {
    key: 'drop-shot',
    groupBy: 'subcategory',
    title: 'Drop Shot & Lob',
    count: 25,
    filter: { type: 'dropshot' },
    motif: 'arc',
    palette: { from: '#431407', to: '#9a3412', accent: '#fb923c' },
  },
]

// ── Cards for the remaining modules ─────────────────────────────────────────
// Each card is one part of its module and opens that part's own screen at
// /dashboard/<module>/<key>. The part content lives in src/content/modules —
// card keys and part keys must stay in sync.

const KIDS_CARDS = [
  { key: 'red', title: 'Red Ball', subtitle: 'Ages 4–6', motif: 'kids', palette: { from: '#450a0a', to: '#b91c1c', accent: '#fca5a5' } },
  { key: 'orange', title: 'Orange Ball', subtitle: 'Ages 7–8', motif: 'kids', palette: { from: '#431407', to: '#c2410c', accent: '#fdba74' } },
  { key: 'green', title: 'Green Ball', subtitle: 'Ages 9–10', motif: 'kids', palette: { from: '#052e16', to: '#15803d', accent: '#86efac' } },
  { key: 'yellow', title: 'Yellow Ball', subtitle: 'Ages 11–14', motif: 'kids', palette: { from: '#422006', to: '#a16207', accent: '#fde047' } },
]

const MENTAL_CARDS = [
  { key: 'focus', title: 'Focus', subtitle: 'Concentration', motif: 'mind', palette: { from: '#2e1065', to: '#6d28d9', accent: '#c4b5fd' } },
  { key: 'pressure', title: 'Pressure Points', subtitle: 'Big moments', motif: 'mind', palette: { from: '#3b0764', to: '#7e22ce', accent: '#d8b4fe' } },
  { key: 'routine', title: 'Pre-Match Routine', subtitle: 'Preparation', motif: 'mind', palette: { from: '#1e1b4b', to: '#4338ca', accent: '#a5b4fc' } },
  { key: 'self-talk', title: 'Self-Talk', subtitle: 'Inner voice', motif: 'mind', palette: { from: '#4a044e', to: '#a21caf', accent: '#f0abfc' } },
  { key: 'confidence', title: 'Confidence', subtitle: 'Belief', motif: 'mind', palette: { from: '#172554', to: '#1d4ed8', accent: '#93c5fd' } },
  { key: 'errors', title: 'After Errors', subtitle: 'Resetting', motif: 'mind', palette: { from: '#083344', to: '#0e7490', accent: '#67e8f9' } },
  { key: 'goals', title: 'Goal Setting', subtitle: 'Direction', motif: 'mind', palette: { from: '#042f2e', to: '#0f766e', accent: '#5eead4' } },
  { key: 'mindset', title: 'Match Mindset', subtitle: 'Competing', motif: 'mind', palette: { from: '#500724', to: '#9d174d', accent: '#f9a8d4' } },
]

const TEMPLATE_CARDS = [
  { key: '30', title: '30 Minutes', subtitle: 'Short session', motif: 'plan', palette: { from: '#172554', to: '#1e40af', accent: '#93c5fd' } },
  { key: '45', title: '45 Minutes', subtitle: 'Standard', motif: 'plan', palette: { from: '#1e1b4b', to: '#3730a3', accent: '#a5b4fc' } },
  { key: '60', title: '60 Minutes', subtitle: 'Full lesson', motif: 'plan', palette: { from: '#083344', to: '#0e7490', accent: '#67e8f9' } },
  { key: '90', title: '90 Minutes', subtitle: 'Extended', motif: 'plan', palette: { from: '#042f2e', to: '#0f766e', accent: '#5eead4' } },
]

const GYM_CARDS = [
  { key: 'strength', title: 'Strength', subtitle: 'Foundation', motif: 'figure', palette: { from: '#042f2e', to: '#0f766e', accent: '#5eead4' } },
  { key: 'power', title: 'Explosive Power', subtitle: 'First step', motif: 'figure', palette: { from: '#052e16', to: '#15803d', accent: '#86efac' } },
  { key: 'agility', title: 'Agility', subtitle: 'Change of direction', motif: 'figure', palette: { from: '#083344', to: '#0e7490', accent: '#67e8f9' } },
  { key: 'prevention', title: 'Injury Prevention', subtitle: 'Staying on court', motif: 'figure', palette: { from: '#422006', to: '#a16207', accent: '#fde047' } },
  { key: 'recovery', title: 'Recovery', subtitle: 'Between sessions', motif: 'figure', palette: { from: '#1e1b4b', to: '#4338ca', accent: '#a5b4fc' } },
]

const SERVE_CARDS = [
  { key: 'flat', title: 'Flat Serve', subtitle: 'Power', motif: 'serve', palette: { from: '#450a0a', to: '#b91c1c', accent: '#fca5a5' } },
  { key: 'slice-serve', title: 'Slice Serve', subtitle: 'Angle', motif: 'serve', palette: { from: '#431407', to: '#c2410c', accent: '#fdba74' } },
  { key: 'kick', title: 'Kick Serve', subtitle: 'Spin', motif: 'serve', palette: { from: '#4a044e', to: '#a21caf', accent: '#f0abfc' } },
  { key: 'second', title: 'Second Serve', subtitle: 'Under pressure', motif: 'serve', palette: { from: '#1e1b4b', to: '#4338ca', accent: '#a5b4fc' } },
  { key: 'placement', title: 'Placement', subtitle: 'Targets', motif: 'court', palette: { from: '#052e16', to: '#15803d', accent: '#86efac' } },
]

const DOUBLES_CARDS = [
  { key: 'formations', title: 'Formations', subtitle: 'I & Australian', motif: 'court', variant: 'doubles', palette: { from: '#1e1b4b', to: '#3730a3', accent: '#a5b4fc' } },
  { key: 'net', title: 'Net Play', subtitle: 'Owning the front', motif: 'net', palette: { from: '#172554', to: '#1d4ed8', accent: '#93c5fd' } },
  { key: 'poaching', title: 'Poaching', subtitle: 'Intercepting', motif: 'arc', palette: { from: '#083344', to: '#0e7490', accent: '#67e8f9' } },
  { key: 'returns', title: 'Return Games', subtitle: 'Breaking serve', motif: 'court', palette: { from: '#042f2e', to: '#0f766e', accent: '#5eead4' } },
  { key: 'communication', title: 'Communication', subtitle: 'Partnership', motif: 'mind', palette: { from: '#4a044e', to: '#86198f', accent: '#e879f9' } },
]

// ── Row definitions ─────────────────────────────────────────────────────────
// Keyed by module id from config/modules.js.

export const MODULE_CARDS = {
  'drills': DRILL_CATEGORIES,
  'tennis-kids': KIDS_CARDS,
  'mental-game': MENTAL_CARDS,
  'lesson-templates': TEMPLATE_CARDS,
  'gym-training': GYM_CARDS,
  'serve-masterclass': SERVE_CARDS,
  'doubles-tactics': DOUBLES_CARDS,
}

// Every module now has real content behind its cards. Drills scopes the
// library with a query param; the content modules give each part its own
// route segment.
export const MODULES_WITH_CONTENT = new Set([
  'drills',
  'tennis-kids',
  'mental-game',
  'lesson-templates',
  'gym-training',
  'serve-masterclass',
  'doubles-tactics',
])

export function getDrillCategory(key) {
  return DRILL_CATEGORIES.find((c) => c.key === key) ?? null
}

// Applied by Drills.jsx to narrow the library to a card's slice.
export function matchesFilter(drill, filter) {
  if (!filter) return true
  if (filter.type) {
    const types = Array.isArray(filter.type) ? filter.type : [filter.type]
    if (!types.includes(drill.type)) return false
  }
  if (filter.subcategory && drill.subcategory !== filter.subcategory) return false
  return true
}
