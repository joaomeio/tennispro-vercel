import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'

const envContent = fs.readFileSync('.env.local', 'utf-8')
const env = {}
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match) env[match[1]] = match[2].replace(/^"(.*)"$/, '$1')
})

const supabase = createClient(
  env['SUPABASE_URL'],
  env['SUPABASE_SERVICE_ROLE_KEY']
)

const CATEGORY_TO_TYPE = {
  'Groundwork':      'groundstrokes',
  'Serve':           'serve',
  'Volley':          'volley',
  'Return':          'return',
  'Footwork':        'footwork',
  'Fitness':         'fitness',
  'Matchplay':       'matchplay',
  'Drop Shot & Lob': 'dropshot',
}

function groupSize(playerCount) {
  if (playerCount <= 1) return 'individual'
  if (playerCount === 2) return 'pairs'
  return 'group'
}

const drillsDir = path.join(process.cwd(), 'drills')
const files = fs.readdirSync(drillsDir).filter(f => f.endsWith('.json'))

const DRILLS = []

for (const file of files) {
  const raw = JSON.parse(fs.readFileSync(path.join(drillsDir, file), 'utf-8'))
  const fileCategory = raw.category

  for (const drill of raw.drills) {
    const category = drill.category ?? fileCategory
    const type = CATEGORY_TO_TYPE[category]
    if (!type) {
      console.warn(`Unknown category "${category}" in ${file} — skipping drill ${drill.id}`)
      continue
    }

    DRILLS.push({
      name:         drill.name,
      description:  drill.objective,
      type,
      level:        drill.skill_level,
      duration_min: drill.duration_minutes,
      group_size:   groupSize(drill.player_count),
      diagram_type: 'json',
      diagram_data: drill.diagramData ?? null,
    })
  }
}

console.log(`Loaded ${DRILLS.length} drills from ${files.length} files`)

async function run() {
  console.log('Deleting existing drills...')
  const { error: delErr } = await supabase.from('drills').delete().not('id', 'is', null)
  if (delErr) { console.error('Delete failed:', delErr); process.exit(1) }

  console.log(`Inserting ${DRILLS.length} drills...`)
  const BATCH = 50
  for (let i = 0; i < DRILLS.length; i += BATCH) {
    const chunk = DRILLS.slice(i, i + BATCH)
    const { error } = await supabase.from('drills').insert(chunk)
    if (error) { console.error(`Insert failed at batch ${i}:`, error); process.exit(1) }
    console.log(`  Inserted ${Math.min(i + BATCH, DRILLS.length)} / ${DRILLS.length}`)
  }

  console.log('Done!')
}

run()
