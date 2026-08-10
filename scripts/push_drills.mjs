// ─────────────────────────────────────────────────────────────────────────────
// Push the drill corpus from drills/*.json to Supabase.
//
//   node scripts/push_drills.mjs --dry-run   # validate, write nothing
//   node scripts/push_drills.mjs             # upsert to Supabase
//
// Requires scripts/002_drill_content.sql to have been run first.
//
// Two changes from the earlier version of this script:
//
//   1. It no longer discards content. It previously mapped only name,
//      description, type, level, duration and diagram, dropping instructions,
//      coaching cues, common errors, variations, tags and the drill IDs — so
//      most of the authored material never reached a coach.
//
//   2. It upserts on `slug` rather than delete-all-then-insert. The old
//      approach reissued every UUID on every run, which would break anything
//      referencing a drill (favourites, lesson plans, session notes).
//
// Reads SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from .env.local.
// ─────────────────────────────────────────────────────────────────────────────

import fs from 'fs'
import path from 'path'
// @supabase/supabase-js is imported lazily below so --dry-run works without
// node_modules installed.

const DRY_RUN = process.argv.includes('--dry-run')
const SRC = path.join(process.cwd(), 'drills')

const CATEGORY_TO_TYPE = {
  Groundwork: 'groundstrokes',
  Serve: 'serve',
  Volley: 'volley',
  Return: 'return',
  Footwork: 'footwork',
  Fitness: 'fitness',
  Matchplay: 'matchplay',
  'Drop Shot & Lob': 'dropshot',
}

function groupSize(playerCount) {
  if (playerCount <= 1) return 'individual'
  if (playerCount === 2) return 'pairs'
  return 'group'
}

// ── Load and map ────────────────────────────────────────────────────────────

const files = fs.readdirSync(SRC).filter((f) => f.endsWith('.json'))
const rows = []
const problems = []

for (const file of files) {
  const raw = JSON.parse(fs.readFileSync(path.join(SRC, file), 'utf-8'))
  const fileCategory = raw.category

  for (const d of raw.drills ?? []) {
    const category = d.category ?? fileCategory
    const type = CATEGORY_TO_TYPE[category]

    if (!type) {
      problems.push(`${d.id ?? '(no id)'} in ${file}: unknown category "${category}"`)
      continue
    }

    rows.push({
      slug: d.id,
      name: d.name,
      category,
      subcategory: d.subcategory ?? null,
      type,
      level: d.skill_level,
      duration_min: d.duration_minutes,
      player_count: d.player_count,
      group_size: groupSize(d.player_count),

      // `description` stays populated so the existing card/hero copy keeps
      // working; `objective` is the same text under its proper name.
      description: d.objective,
      objective: d.objective,
      setup: d.setup,
      instructions: d.instructions ?? [],
      coaching_cues: d.coaching_cues ?? [],
      common_errors: d.common_errors ?? [],
      variations: d.variations ?? [],
      tags: d.tags ?? [],

      diagram_type: 'json',
      diagram_data: d.diagramData ?? null,
    })
  }
}

// ── Validate before touching the database ───────────────────────────────────

const VALID_TYPES = new Set(Object.values(CATEGORY_TO_TYPE))
const VALID_LEVELS = new Set(['beginner', 'intermediate', 'advanced'])
const seen = new Set()

for (const r of rows) {
  const at = r.slug ?? r.name ?? '(unnamed)'
  if (!r.slug) problems.push(`${at}: missing id/slug`)
  if (seen.has(r.slug)) problems.push(`${at}: duplicate slug`)
  seen.add(r.slug)

  if (!VALID_TYPES.has(r.type)) problems.push(`${at}: bad type "${r.type}"`)
  if (!VALID_LEVELS.has(r.level)) problems.push(`${at}: bad level "${r.level}"`)
  if (!r.name) problems.push(`${at}: missing name`)
  if (!r.instructions.length) problems.push(`${at}: no instructions`)
  if (!r.setup) problems.push(`${at}: no setup`)
}

if (problems.length) {
  console.error(`Validation failed — ${problems.length} problem(s). Nothing written.\n`)
  for (const p of problems.slice(0, 40)) console.error(`  ${p}`)
  if (problems.length > 40) console.error(`  … and ${problems.length - 40} more`)
  process.exit(1)
}

// ── Report what's about to be written ───────────────────────────────────────

const byType = {}
let sections = 0
for (const r of rows) {
  byType[r.type] = (byType[r.type] ?? 0) + 1
  sections +=
    r.instructions.length + r.coaching_cues.length +
    r.common_errors.length + r.variations.length
}

console.log(`Validated ${rows.length} drills from ${files.length} files — no problems\n`)
for (const [t, n] of Object.entries(byType).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${t.padEnd(14)} ${String(n).padStart(3)}`)
}
console.log(`\n  ${sections} content items (steps, cues, errors, variations)`)
console.log(`  previously discarded by this script`)

if (DRY_RUN) {
  console.log('\n--dry-run: stopping before write')
  process.exit(0)
}

// ── Connect ─────────────────────────────────────────────────────────────────

function loadEnv() {
  const file = path.join(process.cwd(), '.env.local')
  if (!fs.existsSync(file)) return {}
  const env = {}
  for (const line of fs.readFileSync(file, 'utf-8').split('\n')) {
    const m = line.match(/^([^=#]+)=(.*)$/)
    if (m) env[m[1].trim()] = m[2].trim().replace(/^["'](.*)["']$/, '$1')
  }
  return env
}

const env = { ...loadEnv(), ...process.env }

// Supabase renamed its API keys: the legacy `service_role` JWT is now the
// "secret key" (sb_secret_…). Accept either name so both eras work.
const SERVICE_KEY = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY

if (!env.SUPABASE_URL || !SERVICE_KEY) {
  console.error('\nMissing credentials in .env.local. Needed:')
  console.error('  SUPABASE_URL')
  console.error('  SUPABASE_SECRET_KEY   (or legacy SUPABASE_SERVICE_ROLE_KEY)')
  process.exit(1)
}

// Writing to drills requires the secret key — the publishable key is subject to
// RLS and the read-only policy, so it would fail on insert.
if (/^sb_publishable_/.test(SERVICE_KEY)) {
  console.error('\nThat is the publishable key, which cannot write. Use the secret key (sb_secret_…).')
  process.exit(1)
}

const { createClient } = await import('@supabase/supabase-js')
const supabase = createClient(env.SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
})

// ── Upsert ──────────────────────────────────────────────────────────────────

const BATCH = 50
let written = 0

for (let i = 0; i < rows.length; i += BATCH) {
  const chunk = rows.slice(i, i + BATCH)
  const { error } = await supabase.from('drills').upsert(chunk, { onConflict: 'slug' })

  if (error) {
    console.error(`\nUpsert failed at row ${i}: ${error.message}`)
    if (/column .* does not exist/i.test(error.message)) {
      console.error('Run scripts/002_drill_content.sql first.')
    }
    console.error('Rows already written remain valid — rerun to continue.')
    process.exit(1)
  }

  written += chunk.length
  process.stdout.write(`\r  upserted ${written} / ${rows.length}`)
}

console.log('\n')

// Report rows that exist in the table but not in the source, rather than
// deleting them — an orphan usually means a renamed slug, and silently
// dropping a row a coach may have referenced is not recoverable.
const { data: existing, error: readErr } = await supabase.from('drills').select('slug')
if (!readErr && existing) {
  const legacy = existing.filter((r) => !r.slug).length
  if (legacy) {
    console.log(`${legacy} legacy row(s) from the original seed have no slug.`)
    console.log('  Remove with: DELETE FROM public.drills WHERE slug IS NULL;')
  }

  const orphans = existing.map((r) => r.slug).filter((s) => s && !seen.has(s))
  if (orphans.length) {
    console.log(`${orphans.length} row(s) not present in the source corpus:`)
    console.log(`  ${orphans.slice(0, 20).join(', ')}${orphans.length > 20 ? ' …' : ''}`)
    console.log('  Left in place — delete manually if genuinely retired.')
  }
}

console.log(`Done — ${written} drills live, with full content.`)
