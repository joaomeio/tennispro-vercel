// ─────────────────────────────────────────────────────────────────────────────
// Court geometry — PROPORTIONAL VERTICAL COURT (Singles 27ft x 78ft, Doubles 36ft x 78ft)
// ViewBox: "0 0 400 920"
// Scale: 10 units = 1 real-life foot
//
// Y-Axis (Length: 780 units):
//   Top baseline:       y=70
//   Top service line:   y=250
//   Net:                y=460
//   Bottom service line:y=670
//   Bottom baseline:    y=850
//
// X-Axis (Width: 360 units for Doubles, 270 units for Singles):
//   Left doubles line:  x=20
//   Left singles line:  x=65
//   Center mark/line:   x=200
//   Right singles line: x=335
//   Right doubles line: x=380
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'

const C = {
  sky:    '#0f2820',
  grass:  '#1a3a2a',
  lines:  '#e2e8f0',
  net:    '#cbd5e1',
  ball:   '#facc15',
  p1:     '#f97316', // Student / Player 1 (Orange)
  p2:     '#60a5fa', // Coach / Player 2 (Blue)
  move:   '#34d399', // Movement Path (Green)
  cone:   '#fb923c', // Target / Cone
  target: 'rgba(250,204,21,0.18)',
}

function Court({ children }) {
  return (
    <div className="w-full h-full flex flex-col">
      <svg viewBox="0 0 400 920" className="w-full flex-grow object-contain bg-[#0f2820] rounded-t-xl" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Arrowheads for Ball Path */}
          <marker id="ay" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={C.ball} />
          </marker>
          {/* Arrowheads for Movement Path */}
          <marker id="ag" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={C.move} />
          </marker>
        </defs>

        {/* Sky / background out of bounds */}
        <rect width="400" height="920" fill={C.sky} />

        {/* Court surface (doubles bounds completely filled) */}
        <rect x="20" y="70" width="360" height="780" fill={C.grass} />

        {/* Court outline */}
        <rect x="20" y="70" width="360" height="780" fill="none" stroke={C.lines} strokeWidth="2" />

        {/* Singles sidelines */}
        <line x1="65" y1="70" x2="65" y2="850" stroke={C.lines} strokeWidth="2" />
        <line x1="335" y1="70" x2="335" y2="850" stroke={C.lines} strokeWidth="2" />

        {/* Net */}
        <line x1="10" y1="460" x2="390" y2="460" stroke={C.net} strokeWidth="4" strokeDasharray="6,4" />

        {/* Service lines */}
        <line x1="65" y1="250" x2="335" y2="250" stroke={C.lines} strokeWidth="2" />
        <line x1="65" y1="670" x2="335" y2="670" stroke={C.lines} strokeWidth="2" />

        {/* Center service line */}
        <line x1="200" y1="250" x2="200" y2="670" stroke={C.lines} strokeWidth="2" />

        {/* Center marks on baselines */}
        <line x1="200" y1="70" x2="200" y2="85" stroke={C.lines} strokeWidth="2" />
        <line x1="200" y1="835" x2="200" y2="850" stroke={C.lines} strokeWidth="2" />

        {children}
      </svg>
    </div>
  )
}

// ── Primitive helpers ─────────────────────────────────────────────────────────

function P1({ x, y }) {
  return <circle cx={x} cy={y} r="10" fill={C.p1} stroke="white" strokeWidth="2" />
}
function P2({ x, y }) {
  return <circle cx={x} cy={y} r="10" fill={C.p2} stroke="white" strokeWidth="2" />
}
function TargetCone({ x, y }) {
  // Triangle pointing slightly up
  return <polygon points={`${x},${y-8} ${x-6},${y+6} ${x+6},${y+6}`} fill={C.cone} />
}
function TargetArea({ x, y, r = 25 }) {
  return <circle cx={x} cy={y} r={r} fill={C.target} stroke={C.ball} strokeWidth="2" strokeDasharray="4,2" />
}
function Shot({ x1, y1, x2, y2 }) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={C.ball} strokeWidth="3" strokeDasharray="8,4" markerEnd="url(#ay)" />
  )
}
function Move({ x1, y1, x2, y2 }) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={C.move} strokeWidth="2.5" strokeDasharray="5,5" markerEnd="url(#ag)" />
  )
}

// ── Fixed Diagrams Based on SQL Insertions ────────────────────────────────────

function ReturnCCDeuce() {
  return (
    <Court>
      <P2 x={170} y={60} />
      <Shot x1={170} y1={70} x2={260} y2={560} />
      <P1 x={280} y={870} />
      <Shot x1={280} y1={860} x2={90} y2={130} />
      <TargetArea x={90} y={130} r={30} />
    </Court>
  )
}

function ReturnDTLAd() {
  return (
    <Court>
      <P2 x={230} y={60} />
      <Shot x1={230} y1={70} x2={100} y2={620} />
      <P1 x={80} y={870} />
      <Move x1={80} y1={860} x2={50} y2={850} />
      <Shot x1={50} y1={840} x2={90} y2={120} />
      <TargetArea x={90} y={120} r={30} />
    </Court>
  )
}

function CrosscourtFHRally() {
  return (
    <Court>
      <P1 x={280} y={860} />
      <P2 x={120} y={60} />
      <Shot x1={280} y1={850} x2={120} y2={90} />
      <Shot x1={120} y1={70} x2={270} y2={840} />
      <TargetArea x={120} y={90} r={25} />
      <TargetArea x={280} y={820} r={25} />
    </Court>
  )
}

function InsideOutAttack() {
  return (
    <Court>
      <P2 x={200} y={60} />
      <P1 x={200} y={850} />
      <Move x1={190} y1={850} x2={120} y2={850} />
      <Shot x1={120} y1={840} x2={100} y2={100} />
      <TargetArea x={100} y={100} r={30} />
    </Court>
  )
}

function InsideInAttack() {
  return (
    <Court>
      <P2 x={200} y={60} />
      <P1 x={120} y={850} />
      <Shot x1={120} y1={840} x2={300} y2={100} />
      <TargetArea x={300} y={100} r={30} />
      <TargetCone x={300} y={100} />
    </Court>
  )
}

function BackhandDTL() {
  return (
    <Court>
      <P2 x={280} y={60} />
      <P1 x={120} y={850} />
      <Move x1={120} y1={840} x2={120} y2={800} />
      <Shot x1={120} y1={790} x2={90} y2={100} />
      <TargetArea x={90} y={100} r={25} />
    </Court>
  )
}

function DefensiveSlice() {
  return (
    <Court>
      <P2 x={200} y={60} />
      <Shot x1={200} y1={70} x2={80} y2={800} />
      <P1 x={150} y={850} />
      <Move x1={140} y1={850} x2={70} y2={870} />
      <Shot x1={70} y1={860} x2={300} y2={150} />
      <TargetArea x={300} y={150} r={40} />
    </Court>
  )
}

function ServeVolleyWide() {
  return (
    <Court>
      <P1 x={240} y={860} />
      <P2 x={100} y={60} />
      <Shot x1={240} y1={850} x2={90} y2={350} />
      <Move x1={240} y1={850} x2={200} y2={560} />
      <Shot x1={200} y1={550} x2={320} y2={200} />
      <TargetArea x={320} y={200} r={20} />
    </Court>
  )
}

function ServeKickTAd() {
  return (
    <Court>
      <P1 x={160} y={860} />
      <P2 x={250} y={60} />
      <Shot x1={160} y1={850} x2={210} y2={350} />
      <path d="M210,350 Q240,250 300,150" fill="none" stroke={C.ball} strokeWidth="3" strokeDasharray="8,4" markerEnd="url(#ay)" />
    </Court>
  )
}

function DropShotDisguise() {
  return (
    <Court>
      <P2 x={200} y={60} />
      <P1 x={200} y={850} />
      <Shot x1={200} y1={840} x2={290} y2={300} />
      <TargetArea x={290} y={300} r={20} />
      <TargetCone x={290} y={300} />
    </Court>
  )
}

function OverheadRetreat() {
  return (
    <Court>
      <P2 x={200} y={60} />
      <P1 x={200} y={500} />
      <Shot x1={200} y1={70} x2={200} y2={650} /> 
      <Move x1={200} y1={510} x2={200} y2={650} />
      <Shot x1={200} y1={640} x2={100} y2={100} />
      <TargetArea x={100} y={100} r={30} />
    </Court>
  )
}

function ApproachPunchVolley() {
  return (
    <Court>
      <P2 x={200} y={60} />
      <P1 x={200} y={850} />
      <Move x1={200} y1={840} x2={200} y2={600} />
      <Shot x1={200} y1={590} x2={100} y2={100} />
      <Move x1={200} y1={580} x2={150} y2={500} />
      <Shot x1={150} y1={490} x2={300} y2={200} />
      <TargetArea x={300} y={200} r={25} />
    </Court>
  )
}

function LateralSprintDefense() {
  return (
    <Court>
      <P2 x={200} y={150} />
      <TargetCone x={80} y={800} />
      <TargetCone x={320} y={800} />
      <P1 x={200} y={800} />
      <Move x1={190} y1={800} x2={90} y2={800} />
      <Move x1={210} y1={800} x2={310} y2={800} />
    </Court>
  )
}

const TYPES = {
  return_cc_deuce:      ReturnCCDeuce,
  return_dtl_ad:        ReturnDTLAd,
  crosscourt_fh_rally:  CrosscourtFHRally,
  inside_out_attack:    InsideOutAttack,
  inside_in_attack:     InsideInAttack,
  backhand_dtl:         BackhandDTL,
  defensive_slice:      DefensiveSlice,
  serve_volley_wide:    ServeVolleyWide,
  serve_kick_t_ad:      ServeKickTAd,
  drop_shot_disguise:   DropShotDisguise,
  overhead_retreat:     OverheadRetreat,
  approach_punch_volley:ApproachPunchVolley,
  lateral_sprint_defense: LateralSprintDefense,
}

// ── Legend Component ────────────────────────────────────────────────────────
export function CourtLegend() {
  return (
    <div className="bg-[#1a3a2a] border-t border-[#34d399]/20 rounded-b-xl p-4 flex flex-wrap gap-x-6 gap-y-3 justify-center text-xs lg:text-sm text-slate-300">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-[#f97316] border border-white" />
        <span>Student</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-[#60a5fa] border border-white" />
        <span>Coach</span>
      </div>
      <div className="flex items-center gap-2">
        <svg width="24" height="6"><line x1="0" y1="3" x2="24" y2="3" stroke="#facc15" strokeWidth="2" strokeDasharray="8,4" /></svg>
        <span>Ball Path</span>
      </div>
      <div className="flex items-center gap-2">
        <svg width="24" height="6"><line x1="0" y1="3" x2="24" y2="3" stroke="#34d399" strokeWidth="2" strokeDasharray="5,5" /></svg>
        <span>Movement</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full border border-[#facc15] bg-[#facc15]/20 flex items-center justify-center border-dashed" />
        <span>Target Area</span>
      </div>
    </div>
  )
}

// ── Public API ────────────────────────────────────────────────────────────────

export default function CourtDiagram({ type = 'crosscourt_fh_rally', showLegend = false }) {
  const Diagram = TYPES[type] ?? CrosscourtFHRally

  if (showLegend) {
    return (
      <div className="flex flex-col w-full h-full max-w-md mx-auto shadow-xl rounded-xl overflow-hidden border border-[#34d399]/10">
        <Diagram />
        <CourtLegend />
      </div>
    )
  }

  return <Diagram />
}
