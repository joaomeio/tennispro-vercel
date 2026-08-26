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

// Night-court palette. The surround fades into the app's ink background so a
// diagram sits in any card without a visible slab boundary; markers carry the
// colour.
const C = {
  surround: '#0A0F0D',
  courtHi:  '#173B2E', // court surface gradient, top
  courtLo:  '#102A21', // court surface gradient, bottom
  lines:    '#DCE7E2',
  net:      '#EDF2F0',
  ball:     '#FACC15',
  p1:       '#FB923C', // Student / Player 1 (Orange)
  p2:       '#4AA8F0', // Coach / Player 2 (Blue)
  move:     '#34D399', // Movement Path (Green)
  cone:     '#FB923C', // Target / Cone
}

function Court({ children }) {
  return (
    <svg
      viewBox="0 0 400 920"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Shared ids across instances are fine — every court draws the same defs */}
        <linearGradient id="court-surface" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.courtHi} />
          <stop offset="100%" stopColor={C.courtLo} />
        </linearGradient>
        <radialGradient id="court-glow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#2E6B52" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2E6B52" stopOpacity="0" />
        </radialGradient>
        {/* Arrowheads for ball + movement paths */}
        <marker id="ay" markerWidth="7" markerHeight="7" refX="4.5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill={C.ball} />
        </marker>
        <marker id="ag" markerWidth="7" markerHeight="7" refX="4.5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill={C.move} />
        </marker>
      </defs>

      {/* Surround, with a soft light pooling on the court */}
      <rect width="400" height="920" fill={C.surround} />
      <rect width="400" height="920" fill="url(#court-glow)" />

      {/* Court surface */}
      <rect x="20" y="70" width="360" height="780" rx="3" fill="url(#court-surface)" />

      {/* Line work — main outline strongest, interior lines quieter */}
      <g stroke={C.lines} fill="none">
        <rect x="20" y="70" width="360" height="780" rx="2" strokeWidth="2.5" opacity="0.75" />
        <line x1="65" y1="70" x2="65" y2="850" strokeWidth="1.8" opacity="0.55" />
        <line x1="335" y1="70" x2="335" y2="850" strokeWidth="1.8" opacity="0.55" />
        <line x1="65" y1="250" x2="335" y2="250" strokeWidth="1.8" opacity="0.55" />
        <line x1="65" y1="670" x2="335" y2="670" strokeWidth="1.8" opacity="0.55" />
        <line x1="200" y1="250" x2="200" y2="670" strokeWidth="1.8" opacity="0.55" />
        <line x1="200" y1="70" x2="200" y2="85" strokeWidth="2" opacity="0.6" />
        <line x1="200" y1="835" x2="200" y2="850" strokeWidth="2" opacity="0.6" />
      </g>

      {/* Net — a solid band with posts, not a dashed line */}
      <g>
        <line x1="8" y1="466" x2="392" y2="466" stroke="#000000" strokeWidth="6" opacity="0.35" />
        <line x1="8" y1="460" x2="392" y2="460" stroke={C.net} strokeWidth="5" opacity="0.95" />
        <circle cx="10" cy="460" r="5" fill={C.net} />
        <circle cx="390" cy="460" r="5" fill={C.net} />
      </g>

      {children}
    </svg>
  )
}

// ── Primitive helpers ─────────────────────────────────────────────────────────

function Player({ x, y, fill }) {
  return (
    <g>
      <circle cx={x} cy={y} r="17" fill={fill} opacity="0.18" />
      <circle cx={x} cy={y} r="10" fill={fill} stroke="#FFFFFF" strokeWidth="2" />
    </g>
  )
}
function P1({ x, y }) {
  return <Player x={x} y={y} fill={C.p1} />
}
function P2({ x, y }) {
  return <Player x={x} y={y} fill={C.p2} />
}
function TargetCone({ x, y }) {
  return (
    <polygon
      points={`${x},${y - 9} ${x - 7},${y + 6} ${x + 7},${y + 6}`}
      fill={C.cone}
      stroke="#7C2D12"
      strokeWidth="1"
    />
  )
}
function TargetArea({ x, y, r = 25 }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={C.ball} opacity="0.09" />
      <circle
        cx={x} cy={y} r={r}
        fill="none" stroke={C.ball} strokeWidth="2"
        strokeDasharray="5,4" opacity="0.8"
      />
      <circle cx={x} cy={y} r="3.5" fill={C.ball} opacity="0.6" />
    </g>
  )
}
// Ball flight: a faint glow underlay below the dashed stroke keeps it luminous
// at thumbnail size without SVG filters (cheap enough for long card grids).
function Shot({ x1, y1, x2, y2 }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.ball} strokeWidth="8" strokeLinecap="round" opacity="0.14" />
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={C.ball} strokeWidth="3" strokeLinecap="round"
        strokeDasharray="9,6" markerEnd="url(#ay)"
      />
    </g>
  )
}
function Move({ x1, y1, x2, y2 }) {
  return (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={C.move} strokeWidth="2.5" strokeLinecap="round"
      strokeDasharray="4,6" markerEnd="url(#ag)"
    />
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
      <path
        d="M210,350 Q240,250 300,150"
        fill="none" stroke={C.ball} strokeWidth="3" strokeLinecap="round"
        strokeDasharray="9,6" markerEnd="url(#ay)"
      />
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

// ── Legend ──────────────────────────────────────────────────────────────────
// Quiet chip row rather than a coloured slab — the container decides spacing.

function LegendDot({ color }) {
  return <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
}

function LegendDash({ color }) {
  return (
    <svg width="18" height="4" className="shrink-0" aria-hidden="true">
      <line x1="0" y1="2" x2="18" y2="2" stroke={color} strokeWidth="2.5" strokeDasharray="5,3" strokeLinecap="round" />
    </svg>
  )
}

export function CourtLegend() {
  const items = [
    { swatch: <LegendDot color={C.p1} />, label: 'Student' },
    { swatch: <LegendDot color={C.p2} />, label: 'Coach' },
    { swatch: <LegendDash color={C.ball} />, label: 'Ball path' },
    { swatch: <LegendDash color={C.move} />, label: 'Movement' },
    {
      swatch: (
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0 border border-dashed"
          style={{ borderColor: C.ball, backgroundColor: 'rgba(250,204,21,0.15)' }}
        />
      ),
      label: 'Target',
    },
  ]
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
      {items.map(({ swatch, label }) => (
        <span key={label} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-400">
          {swatch}
          {label}
        </span>
      ))}
    </div>
  )
}

// ── Data-Driven Renderer ──────────────────────────────────────────────────────

function DataRenderer({ data }) {
  if (!data) return null
  return (
    <Court>
      {data.p2 && <P2 x={data.p2.x} y={data.p2.y} />}
      {data.moves && data.moves.map((m, i) => <Move key={i} x1={m.x1} y1={m.y1} x2={m.x2} y2={m.y2} />)}
      {data.p1 && <P1 x={data.p1.x} y={data.p1.y} />}
      {data.shots && data.shots.map((s, i) => <Shot key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} />)}
      {data.areas && data.areas.map((a, i) => <TargetArea key={i} x={a.x} y={a.y} r={a.r ?? 25} />)}
      {data.cones && data.cones.map((c, i) => <TargetCone key={i} x={c.x} y={c.y} />)}
    </Court>
  )
}

// ── Public API ────────────────────────────────────────────────────────────────

export default function CourtDiagram({ type = 'crosscourt_fh_rally', diagramData = null, showLegend = false }) {
  const isDataDriven = type === 'json' && diagramData

  const Diagram = isDataDriven ? () => <DataRenderer data={diagramData} /> : (TYPES[type] ?? CrosscourtFHRally)

  if (showLegend) {
    return (
      <div className="flex flex-col w-full h-full max-w-md mx-auto gap-3">
        <Diagram />
        <CourtLegend />
      </div>
    )
  }

  return <Diagram />
}
