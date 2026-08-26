// ─────────────────────────────────────────────────────────────────────────────
// Emit the drill corpus as SQL, for pasting into the Supabase SQL editor.
//
//   node scripts/generate_seed_sql.mjs
//
// This is the no-credentials alternative to scripts/push_drills.mjs. Same data,
// same upsert-on-slug semantics — it just goes through the SQL editor instead
// of the service role key.
//
// Writes scripts/seed/003_drills_NN.sql, split into chunks small enough for the
// editor to accept. Run them in order.
//
// Requires scripts/002_drill_content.sql to have been applied first.
// ─────────────────────────────────────────────────────────────────────────────

import fs from 'fs'
import path from 'path'

const SRC = path.join(process.cwd(), 'drills')
const OUT_DIR = path.join(process.cwd(), 'scripts', 'seed')
const CHUNK = 40

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

function groupSize(n) {
  if (n <= 1) return 'individual'
  if (n === 2) return 'pairs'
  return 'group'
}

// ── SQL literal helpers ─────────────────────────────────────────────────────
// standard_conforming_strings is on by default in Postgres, so backslashes are
// literal and only the single quote needs escaping — by doubling it.

function q(value) {
  if (value == null) return 'NULL'
  return `'${String(value).replace(/'/g, "''")}'`
}

function qArray(arr) {
  if (!arr?.length) return `ARRAY[]::text[]`
  return `ARRAY[${arr.map(q).join(',')}]::text[]`
}

function qJson(obj) {
  if (obj == null) return 'NULL'
  return `${q(JSON.stringify(obj))}::jsonb`
}

function qInt(n) {
  return n == null ? 'NULL' : String(Number(n))
}

// ── Load ────────────────────────────────────────────────────────────────────

const rows = []
for (const file of fs.readdirSync(SRC).filter((f) => f.endsWith('.json'))) {
  const raw = JSON.parse(fs.readFileSync(path.join(SRC, file), 'utf-8'))
  for (const d of raw.drills ?? []) {
    const category = d.category ?? raw.category
    const type = CATEGORY_TO_TYPE[category]
    if (!type) {
      console.error(`Unknown category "${category}" for ${d.id} — aborting`)
      process.exit(1)
    }
    rows.push({ d, category, type })
  }
}

const slugs = new Set()
for (const { d } of rows) {
  if (!d.id) {
    console.error('A drill has no id — aborting')
    process.exit(1)
  }
  if (slugs.has(d.id)) {
    console.error(`Duplicate slug ${d.id} — aborting`)
    process.exit(1)
  }
  slugs.add(d.id)
}

const COLUMNS = [
  'slug', 'name', 'category', 'subcategory', 'type', 'level',
  'duration_min', 'player_count', 'group_size',
  'description', 'objective', 'setup',
  'instructions', 'coaching_cues', 'common_errors', 'variations', 'tags',
  'diagram_type', 'diagram_data',
]

function valuesFor({ d, category, type }) {
  return [
    q(d.id),
    q(d.name),
    q(category),
    q(d.subcategory),
    q(type),
    q(d.skill_level),
    qInt(d.duration_minutes),
    qInt(d.player_count),
    q(groupSize(d.player_count)),
    q(d.objective),
    q(d.objective),
    q(d.setup),
    qArray(d.instructions),
    qArray(d.coaching_cues),
    qArray(d.common_errors),
    qArray(d.variations),
    qArray(d.tags),
    q('json'),
    qJson(d.diagramData),
  ].join(', ')
}

// Update every column except slug, so re-running a chunk is safe.
const UPDATE_SET = COLUMNS.filter((c) => c !== 'slug')
  .map((c) => `${c} = EXCLUDED.${c}`)
  .join(',\n    ')

// ── Emit ────────────────────────────────────────────────────────────────────

fs.rmSync(OUT_DIR, { recursive: true, force: true })
fs.mkdirSync(OUT_DIR, { recursive: true })

const chunks = []
for (let i = 0; i < rows.length; i += CHUNK) chunks.push(rows.slice(i, i + CHUNK))

chunks.forEach((chunk, i) => {
  const n = String(i + 1).padStart(2, '0')
  const total = String(chunks.length).padStart(2, '0')

  const sql = `-- ============================================================
-- 003 — Drill seed, part ${n} of ${total}  (${chunk.length} drills)
--
-- Paste into the Supabase SQL editor and run. Parts are independent and
-- idempotent: re-running one updates those rows rather than duplicating them.
--
-- Requires scripts/002_drill_content.sql to have been applied first.
-- ============================================================

INSERT INTO public.drills (
  ${COLUMNS.join(', ')}
) VALUES
${chunk.map((r) => `  (${valuesFor(r)})`).join(',\n')}
ON CONFLICT (slug) DO UPDATE SET
    ${UPDATE_SET};
`

  const file = path.join(OUT_DIR, `003_drills_${n}.sql`)
  fs.writeFileSync(file, sql)
  const kb = Math.round(fs.statSync(file).size / 1024)
  console.log(`  003_drills_${n}.sql   ${String(chunk.length).padStart(3)} drills   ${String(kb).padStart(4)}KB`)
})

// A final part to clear the superseded rows from the original seed.
const cleanup = `-- ============================================================
-- 003 — Final step: remove the superseded original seed
--
-- Run ONLY after every part above has completed.
--
-- The inserts above key on slug. Rows from the original seed have slug NULL,
-- so nothing overwrote them and they are still present — roughly 253 thin rows
-- with no instructions, cues or variations, sitting alongside the 280 new ones.
-- Leaving them means the library shows duplicates.
-- ============================================================

-- Check first — expect 280 with a slug, ~253 without.
SELECT count(*) FILTER (WHERE slug IS NOT NULL) AS new_rows,
       count(*) FILTER (WHERE slug IS NULL)     AS legacy_rows,
       count(*)                                 AS total
FROM public.drills;

-- Then remove the legacy rows.
DELETE FROM public.drills WHERE slug IS NULL;

-- Confirm: 280 rows, all with content.
SELECT count(*) AS total,
       count(instructions) AS with_instructions,
       count(coaching_cues) AS with_cues
FROM public.drills;
`

fs.writeFileSync(path.join(OUT_DIR, `003_drills_99_cleanup.sql`), cleanup)
console.log(`  003_drills_99_cleanup.sql          removes superseded rows`)

const contentItems = rows.reduce(
  (s, { d }) =>
    s + (d.instructions?.length ?? 0) + (d.coaching_cues?.length ?? 0) +
    (d.common_errors?.length ?? 0) + (d.variations?.length ?? 0),
  0
)

console.log(`\n${rows.length} drills, ${contentItems} content items, ${chunks.length} parts + cleanup`)
console.log(`Written to scripts/seed/ — run them in filename order.`)
