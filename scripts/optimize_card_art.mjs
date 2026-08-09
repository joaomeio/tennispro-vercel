// ─────────────────────────────────────────────────────────────────────────────
// Downscale and recompress the generated card artwork.
//
//   node scripts/optimize_card_art.mjs            # optimise in place
//   node scripts/optimize_card_art.mjs --check    # report sizes, change nothing
//
// gpt-image-2 returns 1024×1536, but a poster card is only 132–160 CSS px wide.
// Shipping the raw output means ~35MB of images on the dashboard. Cards are
// resized to 480px wide (3× the largest render size, so they stay crisp on
// high-DPR phones) and the hero to 1600px.
//
// Originals are kept in public/cards/_original/ so this is repeatable and
// never destroys the source.
// ─────────────────────────────────────────────────────────────────────────────

import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const DIR = path.join(process.cwd(), 'public', 'cards')
const ORIGINALS = path.join(DIR, '_original')
const CHECK = process.argv.includes('--check')

const CARD_WIDTH = 480
const HERO_WIDTH = 1600
const QUALITY = 82

if (!fs.existsSync(DIR)) {
  console.error('No public/cards directory. Run scripts/generate_card_art.mjs first.')
  process.exit(1)
}

const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.webp'))
if (!files.length) {
  console.error('No .webp files in public/cards.')
  process.exit(1)
}

function kb(bytes) {
  return Math.round(bytes / 1024)
}

if (CHECK) {
  let total = 0
  for (const f of files.sort()) {
    const size = fs.statSync(path.join(DIR, f)).size
    total += size
    const meta = await sharp(path.join(DIR, f)).metadata()
    console.log(`  ${f.padEnd(22)} ${String(kb(size)).padStart(5)}KB  ${meta.width}×${meta.height}`)
  }
  console.log(`\n  ${files.length} files, ${(total / 1024 / 1024).toFixed(1)}MB total`)
  process.exit(0)
}

fs.mkdirSync(ORIGINALS, { recursive: true })

let before = 0
let after = 0

for (const f of files.sort()) {
  const src = path.join(DIR, f)
  const kept = path.join(ORIGINALS, f)

  // Move the untouched original aside the first time we see it, so re-running
  // always re-encodes from the source rather than compounding compression.
  if (!fs.existsSync(kept)) fs.copyFileSync(src, kept)

  const originalSize = fs.statSync(kept).size
  before += originalSize

  const isHero = path.basename(f, '.webp') === 'hero'
  const width = isHero ? HERO_WIDTH : CARD_WIDTH

  const buf = await sharp(kept)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toBuffer()

  fs.writeFileSync(src, buf)
  after += buf.length

  console.log(
    `  ${f.padEnd(22)} ${String(kb(originalSize)).padStart(5)}KB → ${String(kb(buf.length)).padStart(4)}KB`
  )
}

const pct = Math.round((1 - after / before) * 100)
console.log(
  `\n  ${files.length} files: ${(before / 1024 / 1024).toFixed(1)}MB → ${(after / 1024 / 1024).toFixed(1)}MB (${pct}% smaller)`
)
console.log(`  Originals preserved in public/cards/_original/`)
