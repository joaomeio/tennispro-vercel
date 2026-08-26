import serveMasterclass from './serve-masterclass'
import gymTraining from './gym-training'
import doublesTactics from './doubles-tactics'
import tennisKids from './tennis-kids'
import mentalGame from './mental-game'
import lessonTemplates from './lesson-templates'

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT REGISTRY
//
// One entry per content module. Part keys MUST match the card keys in
// config/catalog.js — the landing grid and part headers join on them.
//
// Shape:
//   accent    hex — the module-wide accent used by content blocks
//   washFrom  hex — dark tone behind the landing header
//   tagline   one-liner under the landing title
//   Intro     component — module-wide primer below the part grid (optional)
//   parts     [{ key, minutes, summary, Component }]
// ─────────────────────────────────────────────────────────────────────────────

const REGISTRY = {
  'serve-masterclass': serveMasterclass,
  'gym-training': gymTraining,
  'doubles-tactics': doublesTactics,
  'tennis-kids': tennisKids,
  'mental-game': mentalGame,
  'lesson-templates': lessonTemplates,
}

export function getModuleContent(moduleId) {
  return REGISTRY[moduleId] ?? null
}
