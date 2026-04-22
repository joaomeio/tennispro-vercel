import fs from 'fs'
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

const DRILLS = []

const Y_T_BASE = 70
const Y_T_SRV = 250
const Y_NET = 460
const Y_B_SRV = 670
const Y_B_BASE = 850
const X_L = 65
const X_C = 200
const X_R = 335

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const pick = (arr) => arr[rand(0, arr.length - 1)]

function getPosName(x, isP1) {
  if (isP1) {
    if (x < X_C - 10) return "Ad court"
    if (x > X_C + 10) return "Deuce court"
    return "Center"
  } else {
    if (x < X_C - 10) return "Deuce court"
    if (x > X_C + 10) return "Ad court"
    return "Center"
  }
}

// ── GROUNDSTROKES (80 drills) ──
for (let i = 0; i < 80; i++) {
  const p1_x = rand(X_L + 20, X_R - 20)
  const p2_x = rand(X_L + 20, X_R - 20)
  const shot1_x = rand(X_L + 10, X_R - 10)
  const shot1_y = rand(Y_T_BASE, Y_T_SRV)
  const shot2_x = rand(X_L + 10, X_R - 10)
  const shot2_y = rand(Y_B_SRV, Y_B_BASE)
  const isP1Ad = p1_x < X_C
  const isP2Ad = p2_x > X_C
  const wing1 = isP1Ad ? "Backhand" : "Forehand"
  const crosscourt = (isP1Ad && isP2Ad) || (!isP1Ad && !isP2Ad)
  const name = `${wing1} ${crosscourt ? 'Crosscourt' : 'Down the Line'} ${['Grind', 'Rally', 'Exchange', 'Pace Generator', 'Depth Drill'][rand(0, 4)]} ${i}`
  const description = `Student is positioned in the ${getPosName(p1_x, true)}. Play an extensive rally targeting the ${crosscourt ? 'opposite diagonal' : 'same flank'}. Focus on high net clearance and maintaining depth past the service line.`

  DRILLS.push({
    name, description, type: i < 40 ? 'forehand' : 'groundstrokes',
    level: pick(['beginner', 'intermediate', 'advanced']),
    duration_min: pick([10, 15, 20]),
    group_size: 'pairs',
    diagram_type: 'json',
    diagram_data: {
      p1: { x: p1_x, y: 850 },
      p2: { x: p2_x, y: 70 },
      shots: [{ x1: p1_x, y1: 840, x2: shot1_x, y2: shot1_y }, { x1: p2_x, y1: 80, x2: shot2_x, y2: shot2_y }],
      areas: [{ x: shot1_x, y: shot1_y, r: 25 }, { x: shot2_x, y: shot2_y, r: 25 }]
    }
  })
}

// ── SERVES (50 drills) ──
for (let i = 0; i < 50; i++) {
  const isDeuce = rand(0, 1) === 0
  const isWide = rand(0, 1) === 0
  const p1_x = isDeuce ? rand(X_C + 20, X_C + 60) : rand(X_L + 40, X_C - 20)
  const target_x = isDeuce ? (isWide ? rand(X_L, X_L + 40) : rand(X_C - 30, X_C - 5)) : (isWide ? rand(X_R - 40, X_R) : rand(X_C + 5, X_C + 30))
  const target_y = rand(Y_T_SRV + 10, Y_T_SRV + 70) 
  const serveType = pick(['Flat', 'Kick', 'Slice'])
  const name = `${serveType} Serve ${isWide ? 'Wide' : 'Down the T'} (${isDeuce ? 'Deuce' : 'Ad'} Side) ${i}`
  const description = `Student serves from the ${isDeuce ? 'Deuce' : 'Ad'} side. Execute a ${serveType} serve targeting the ${isWide ? 'wide corner' : 'T'}. Focus on toss placement and extending through the contact point.`

  DRILLS.push({
    name, description, type: 'serve',
    level: pick(['beginner', 'intermediate', 'advanced']),
    duration_min: pick([10, 15]),
    group_size: 'pairs',
    diagram_type: 'json',
    diagram_data: {
      p1: { x: p1_x, y: 850 },
      p2: { x: target_x + (isWide ? -20 : 20), y: 70 },
      shots: [{ x1: p1_x, y1: 840, x2: target_x, y2: target_y }],
      areas: [{ x: target_x, y: target_y, r: 20 }]
    }
  })
}

// ── RETURNS (50 drills) ──
for (let i = 0; i < 50; i++) {
  const coachDeuce = rand(0, 1) === 0
  const coachX = coachDeuce ? rand(X_C - 60, X_C - 20) : rand(X_C + 20, X_C + 60)
  const bounceY = rand(Y_B_SRV - 70, Y_B_SRV - 10)
  const bounceX = coachDeuce ? rand(X_C + 10, X_R) : rand(X_L, X_C - 10)
  const p1X_start = coachDeuce ? rand(X_C + 20, X_R + 20) : rand(X_L - 20, X_C - 20)
  const returnCC = rand(0, 1) === 0
  const returnX = returnCC ? (coachDeuce ? X_R - 40 : X_L + 40) : (coachDeuce ? X_L + 40 : X_R - 40)
  const returnY = rand(Y_T_BASE, Y_T_SRV)
  const name = `Return Serve ${coachDeuce ? 'Deuce' : 'Ad'} Court ${returnCC ? 'Crosscourt' : 'DTL'} ${i}`
  const description = `Coach serves from the ${coachDeuce ? 'Deuce' : 'Ad'} side. Student split steps and returns ${returnCC ? 'crosscourt' : 'down the line'}. Focus on a compact backswing and transferring weight forward.`

  DRILLS.push({
    name, description, type: 'return',
    level: pick(['intermediate', 'advanced']),
    duration_min: 15,
    group_size: 'pairs',
    diagram_type: 'json',
    diagram_data: {
      p1: { x: p1X_start, y: 860 },
      p2: { x: coachX, y: 70 },
      shots: [{ x1: coachX, y1: 80, x2: bounceX, y2: bounceY }, { x1: bounceX, y1: bounceY + 20, x2: returnX, y2: returnY }],
      moves: [{ x1: p1X_start, y1: 850, x2: bounceX, y2: bounceY + 40 }],
      areas: [{ x: returnX, y: returnY, r: 25 }]
    }
  })
}

// ── VOLLEYS (50 drills) ──
for (let i = 0; i < 50; i++) {
  const p1_x = rand(X_L + 40, X_R - 40)
  const p1_y = rand(Y_NET + 40, Y_B_SRV - 40)
  const p2_x = rand(X_L + 40, X_R - 40)
  const p2_y = rand(Y_T_BASE, Y_T_SRV - 40)
  const volY = rand(Y_T_BASE, Y_T_SRV)
  const volX = rand(X_L + 20, X_R - 20)
  const name = `Net Attack: ${pick(['Punch Volley', 'Angle Volley', 'Deep Volley', 'Reflex Volley'])} ${i}`
  const description = `Student is stationed at the net. Coach feeds a firm ball from the baseline. Execute a decisive volley aiming for the ${getPosName(volX, false)} corner.`

  DRILLS.push({
    name, description, type: 'volley',
    level: pick(['beginner', 'intermediate', 'advanced']),
    duration_min: 10,
    group_size: 'pairs',
    diagram_type: 'json',
    diagram_data: {
      p1: { x: p1_x, y: p1_y },
      p2: { x: p2_x, y: p2_y },
      shots: [{ x1: p2_x, y1: p2_y + 10, x2: p1_x, y2: p1_y - 20 }, { x1: p1_x, y1: p1_y - 20, x2: volX, y2: volY }],
      areas: [{ x: volX, y: volY, r: 20 }]
    }
  })
}

// ── FOOTWORK & MATCH PLAY (70 drills) ──
for (let i = 0; i < 70; i++) {
  const isMatchPlay = i > 40
  const type = isMatchPlay ? 'match play' : 'footwork'
  const p1_x = X_C
  const p1_y = 850
  const run1X = rand(20, X_L)
  const run1Y = rand(800, 850)
  const run2X = rand(X_R, 380)
  const run2Y = rand(800, 850)
  const name = isMatchPlay ? `Point Construction Pattern ${i}` : `Lateral Baseline Sprint ${i}`
  const description = isMatchPlay ? `Live ball point play starting with a specific crosscourt feed. Student must sustain depth and wait for a short ball to attack.` : `High intensity agility drill. Student starts center, sprints to the outer doubles alley to strike an open-stance groundstroke, and recovers instantly to center.`

  DRILLS.push({
    name, description, type,
    level: pick(['intermediate', 'advanced']),
    duration_min: pick([15, 20]),
    group_size: 'individual',
    diagram_type: 'json',
    diagram_data: {
      p1: { x: p1_x, y: p1_y },
      p2: { x: X_C, y: 70 },
      moves: isMatchPlay ? [] : [{ x1: p1_x, y1: 840, x2: run1X, y2: run1Y }, { x1: run1X, y1: run1Y, x2: p1_x, y2: 840 }, { x1: p1_x, y1: 840, x2: run2X, y2: run2Y }],
      cones: isMatchPlay ? [] : [{ x: run1X, y: run1Y }, { x: run2X, y: run2Y }],
      shots: isMatchPlay ? [{ x1: X_C, y1: 80, x2: X_L + 20, y2: 800 }, { x1: X_L + 20, y1: 800, x2: X_R - 20, y2: 120 }] : []
    }
  })
}

async function run() {
  console.log('Deleting existing drills...')
  let { error: delErr } = await supabase.from('drills').delete().not('id', 'is', null)
  if (delErr) { console.error(delErr); process.exit(1) }

  console.log('Inserting ' + DRILLS.length + ' new drills...')
  let { error: insertErr } = await supabase.from('drills').insert(DRILLS)
  if (insertErr) { console.error(insertErr); process.exit(1) }

  console.log('Success!')
}

run()
