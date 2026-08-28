// ─────────────────────────────────────────────────────────────────────────────
// Derive every shipped logo/favicon variant from one source mark.
//
//   node scripts/generate_logo_assets.mjs
//
// The source is the raw export dropped at the repo root (logo.png). It gets
// trimmed of its transparent margin once and kept as brand/logo-master.png — out
// of public/, so the multi-hundred-KB master never ships — which means re-running
// never depends on the drop-in file still being there.
//
// Outputs:
//   public/brand/logo.png          the mark, transparent, for in-app <img>
//   public/favicon-32.png          browser tab
//   public/icon-192.png            Android / PWA
//   public/icon-512.png            Android / PWA
//   public/apple-touch-icon.png    iOS home screen — needs an opaque background,
//                                  Apple composites transparency onto black.
// ─────────────────────────────────────────────────────────────────────────────

import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const ROOT = process.cwd()
const MASTER = path.join(ROOT, 'brand', 'logo-master.png')

// ink-950 from tailwind.config.js — the dashboard surface the mark lives on.
const INK = { r: 8, g: 9, b: 11, alpha: 1 }

const source = [path.join(ROOT, 'logo.png'), MASTER].find((p) => fs.existsSync(p))
if (!source) {
  console.error('No source logo. Drop the export at logo.png in the repo root.')
  process.exit(1)
}

fs.mkdirSync(path.dirname(MASTER), { recursive: true })
fs.mkdirSync(path.join(ROOT, 'public', 'brand'), { recursive: true })

// Trim the transparent margin so every derived size can control its own padding.
const trimmed = await sharp(source).trim({ threshold: 1 }).png().toBuffer()
if (source !== MASTER) fs.writeFileSync(MASTER, trimmed)

const { width, height } = await sharp(trimmed).metadata()
console.log(`  source ${path.relative(ROOT, source)} → trimmed ${width}×${height}`)

// The mark is two flat tones, so a palette costs nothing visually and turns a
// 100KB truecolour PNG into 20KB.
const PNG = { palette: true, quality: 90, compressionLevel: 9 }

/**
 * Square icon: the mark centred on a canvas with `pad` of breathing room on its
 * longest side, over `background` (null = transparent).
 */
async function icon(size, { pad = 0.12, background = null } = {}) {
  const inner = Math.round(size * (1 - pad * 2))
  const mark = await sharp(trimmed)
    .resize({ width: inner, height: inner, fit: 'inside' })
    .toBuffer()

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: background ?? { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: mark, gravity: 'center' }])
    .png(PNG)
    .toBuffer()
}

const outputs = [
  ['public/brand/logo.png', await sharp(trimmed).resize({ width: 512 }).png(PNG).toBuffer()],
  ['public/favicon-32.png', await icon(32, { pad: 0.06 })],
  ['public/icon-192.png', await icon(192)],
  ['public/icon-512.png', await icon(512)],
  ['public/apple-touch-icon.png', await icon(180, { pad: 0.16, background: INK })],
]

for (const [rel, buf] of outputs) {
  fs.writeFileSync(path.join(ROOT, rel), buf)
  console.log(`  ${rel.padEnd(30)} ${String(Math.round(buf.length / 1024)).padStart(4)}KB`)
}
