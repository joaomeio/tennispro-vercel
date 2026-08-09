// ─────────────────────────────────────────────────────────────────────────────
// Generate poster artwork for the dashboard cards with gpt-image-2.
//
//   node scripts/generate_card_art.mjs --list            # show what would run
//   node scripts/generate_card_art.mjs --only forehand,serve,physical
//   node scripts/generate_card_art.mjs --all
//   node scripts/generate_card_art.mjs --all --quality high
//   node scripts/generate_card_art.mjs --all --force     # redo existing
//
// Writes public/cards/<key>.webp. Existing files are skipped unless --force,
// so a re-run costs nothing and an interrupted batch can simply be resumed.
//
// COST: quality defaults to 'low', which is much cheaper per image and is
// plenty for cards that render at 132-160 CSS px wide. Note that `size` is not
// a cost lever here — 1024x1536 is the smallest portrait gpt-image-2 offers, so
// quality is the only dial. Whatever comes back gets downscaled anyway by
// scripts/optimize_card_art.mjs, which is free.
//
// Requires OPENAI_API_KEY in .env.local.
// ─────────────────────────────────────────────────────────────────────────────

import fs from 'fs'
import path from 'path'

const MODEL = 'gpt-image-2'
const OUT_DIR = path.join(process.cwd(), 'public', 'cards')

// One shared style contract across every image. Consistency across 30-odd
// posters comes from this string being byte-identical in every request.
const STYLE = [
  'Bold flat vector graphic illustration in a minimal geometric poster style.',
  'Thick clean strokes, simple bold shapes, generous negative space.',
  'Very dark near-black background with a deep tonal gradient.',
  'Strictly limited palette: dark background plus ONE luminous accent colour.',
  'Subtle faint court line grid in the background at low opacity.',
  'Flat colour only — no photorealism, no 3D rendering, no gradients inside shapes,',
  'no drop shadows, no texture, no grain.',
  'Composition sits in the upper two thirds; keep the lower third visually quiet',
  'and uncluttered so an overlaid title stays readable.',
  'ABSOLUTELY NO text, no letters, no numbers, no words, no logos, no watermarks,',
  'no signatures, no captions anywhere in the image.',
].join(' ')

// Per-card subject + accent. Keys match config/catalog.js.
const CARDS = {
  // ── Drills ───────────────────────────────────────────────────────────────
  forehand: ['a tennis player mid forehand swing, seen as a bold silhouette, with a sweeping arc tracing the racket path and a ball at the contact point', 'vivid emerald green'],
  backhand: ['a tennis player striking a two-handed backhand as a bold silhouette, with a sweeping arc across the body and a ball at contact', 'bright teal'],
  slice: ['a low skimming tennis ball trajectory with backspin lines beneath it, travelling flat and fast just above the court surface', 'cyan'],
  serve: ['a tennis player at full extension serving, ball tossed high above, bold silhouette, steep downward trajectory line into a service box', 'indigo violet'],
  return: ['a tennis court seen from above in perspective with a ball trajectory crossing it diagonally toward the returner', 'azure blue'],
  volley: ['a tennis net seen head on with a player punching a volley above it, compact bold silhouette, short sharp ball path', 'golden yellow'],
  physical: ['an athletic figure sprinting and changing direction, bold dynamic silhouette with speed lines behind it', 'warm red'],
  'match-play': ['a tennis court from above with two opposing ball trajectories crossing, showing a rally pattern between two players', 'magenta pink'],
  'drop-shot': ['a high looping lob arc clearing a tennis net and dropping steeply behind it, shown as a dotted trajectory', 'orange'],

  // ── Kids ─────────────────────────────────────────────────────────────────
  red: ['a small child playing tennis with an oversized soft red ball on a mini court, playful bold shapes', 'soft red'],
  orange: ['a young child rallying with an orange low-compression tennis ball, bouncing ball arcs, playful bold shapes', 'warm orange'],
  green: ['a pre-teen playing tennis with a green transition ball on a three-quarter court, bold simple shapes', 'bright green'],
  yellow: ['a teenage player striking a full yellow tennis ball on a full court, confident bold silhouette', 'yellow'],

  // ── Mental game ──────────────────────────────────────────────────────────
  focus: ['a human head in profile with concentric rings narrowing to a single point of focus', 'violet'],
  pressure: ['a lone figure standing at the baseline under converging pressure lines from all sides', 'purple'],
  routine: ['a repeating cyclical loop of arrows forming a preparation ritual around a tennis ball', 'indigo'],
  'self-talk': ['a head in profile with a speech bubble containing a simple upward arrow', 'fuchsia'],
  confidence: ['a figure standing tall with an ascending stepped arrow rising behind them', 'blue'],
  errors: ['a broken line that recovers and continues upward, showing a reset after a mistake', 'cyan'],
  goals: ['a target with an arrow striking the centre, with a path leading toward it', 'teal'],
  mindset: ['a head in profile split between a calm side and an energised side, geometric and bold', 'rose pink'],

  // ── Lesson templates ─────────────────────────────────────────────────────
  30: ['a horizontal timeline broken into a few short blocks representing a compact training session', 'sky blue'],
  45: ['a horizontal timeline broken into several blocks representing a standard training session', 'indigo'],
  60: ['a horizontal timeline of evenly spaced blocks representing a full hour training session', 'cyan'],
  90: ['a long horizontal timeline of many blocks representing an extended training session', 'teal'],

  // ── Gym ──────────────────────────────────────────────────────────────────
  strength: ['a powerful figure lifting a barbell overhead, bold blocky silhouette', 'teal'],
  power: ['an explosive figure leaping upward with burst lines radiating from the ground', 'green'],
  agility: ['a figure weaving rapidly between cones in a zigzag path, with motion trails', 'cyan'],
  prevention: ['a figure stretching with a protective shield shape behind the knee and shoulder joints', 'amber'],
  recovery: ['a seated figure at rest with calm concentric waves radiating outward', 'indigo'],

  // ── Serve masterclass ────────────────────────────────────────────────────
  flat: ['a tennis serve struck flat and hard, a straight fast trajectory line from high contact into the box', 'red'],
  'slice-serve': ['a tennis serve curving sideways with a sweeping curved trajectory bending away', 'orange'],
  kick: ['a tennis serve with heavy topspin, an arcing trajectory that kicks up steeply after the bounce', 'fuchsia'],
  second: ['a lone tennis player serving under pressure, safe high-margin arc over the net', 'indigo'],
  placement: ['a service box divided into target zones with balls landing precisely in the corners', 'green'],

  // ── Doubles ──────────────────────────────────────────────────────────────
  formations: ['a doubles tennis court from above with four player positions marked in an I formation', 'indigo'],
  net: ['two doubles partners side by side at the net in bold silhouette, controlling the front court', 'blue'],
  poaching: ['a net player cutting diagonally across to intercept a ball, sharp diagonal movement arrow', 'cyan'],
  returns: ['a returner striking a return of serve with a trajectory splitting the opposing doubles pair', 'teal'],
  communication: ['two partners side by side with overlapping signal waves connecting them', 'magenta'],
}

// The hero is landscape and sets the tone for the whole screen.
const HERO = [
  'A wide cinematic tennis court seen in dramatic perspective at dusk, bold flat vector illustration, ' +
    'ball trajectories arcing across the court, a lone player silhouette at the baseline, ' +
    'the left third kept dark, quiet and empty for overlaid text',
  'emerald green',
]

// ── CLI ─────────────────────────────────────────────────────────────────────

const argv = process.argv.slice(2)
const has = (f) => argv.includes(f)
const valueOf = (f) => {
  const i = argv.indexOf(f)
  return i >= 0 ? argv[i + 1] : null
}

const FORCE = has('--force')

// 'low' | 'medium' | 'high'. Low is the default because these render small and
// every image is downscaled to 480px afterwards regardless.
const QUALITY = valueOf('--quality') ?? 'low'
if (!['low', 'medium', 'high'].includes(QUALITY)) {
  console.error(`Invalid --quality "${QUALITY}". Use low, medium or high.`)
  process.exit(1)
}
let keys
if (has('--only')) keys = (valueOf('--only') ?? '').split(',').map((s) => s.trim()).filter(Boolean)
else if (has('--all')) keys = [...Object.keys(CARDS), 'hero']
else if (has('--list')) keys = [...Object.keys(CARDS), 'hero']
else {
  console.log('Specify --all, --only <keys>, or --list. See the header for usage.')
  process.exit(0)
}

const unknown = keys.filter((k) => k !== 'hero' && !CARDS[k])
if (unknown.length) {
  console.error(`Unknown card key(s): ${unknown.join(', ')}`)
  process.exit(1)
}

if (has('--list')) {
  console.log(`${keys.length} images would be generated with ${MODEL}:\n`)
  for (const k of keys) console.log(`  ${k}`)
  process.exit(0)
}

// ── Key ─────────────────────────────────────────────────────────────────────

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
const API_KEY = env.OPENAI_API_KEY
if (!API_KEY) {
  console.error('Missing OPENAI_API_KEY in .env.local')
  process.exit(1)
}

// ── Generate ────────────────────────────────────────────────────────────────

fs.mkdirSync(OUT_DIR, { recursive: true })

function promptFor(key) {
  const [subject, accent] = key === 'hero' ? HERO : CARDS[key]
  return `${subject}. Accent colour: ${accent}. ${STYLE}`
}

async function generate(key) {
  const outFile = path.join(OUT_DIR, `${key}.webp`)
  if (fs.existsSync(outFile) && !FORCE) return { key, status: 'skipped' }

  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      prompt: promptFor(key),
      // 2:3 for posters, 3:2 for the hero — matches the CSS aspect exactly so
      // nothing important is cropped away.
      size: key === 'hero' ? '1536x1024' : '1024x1536',
      quality: QUALITY,
      output_format: 'webp',
      n: 1,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    let msg = body.slice(0, 300)
    try {
      msg = JSON.parse(body).error?.message ?? msg
    } catch {}
    return { key, status: 'failed', error: `${res.status} ${msg}` }
  }

  const json = await res.json()
  const b64 = json.data?.[0]?.b64_json
  if (!b64) return { key, status: 'failed', error: 'no image data in response' }

  fs.writeFileSync(outFile, Buffer.from(b64, 'base64'))
  const kb = Math.round(fs.statSync(outFile).size / 1024)
  return { key, status: 'written', kb }
}

console.log(`Generating ${keys.length} image(s) with ${MODEL}…\n`)

const results = []
// Small concurrency — enough to be quick, low enough to stay clear of rate limits.
const POOL = 3
for (let i = 0; i < keys.length; i += POOL) {
  const batch = keys.slice(i, i + POOL)
  const settled = await Promise.all(batch.map(generate))
  for (const r of settled) {
    results.push(r)
    const label =
      r.status === 'written' ? `ok   ${r.kb}kb`
      : r.status === 'skipped' ? 'skip (exists)'
      : `FAIL ${r.error}`
    console.log(`  ${r.key.padEnd(16)} ${label}`)
  }
}

const written = results.filter((r) => r.status === 'written').length
const failed = results.filter((r) => r.status === 'failed')
console.log(`\n${written} written, ${results.length - written - failed.length} skipped, ${failed.length} failed`)
if (failed.length) process.exitCode = 1
