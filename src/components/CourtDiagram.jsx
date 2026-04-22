// ─────────────────────────────────────────────────────────────────────────────
// Court geometry — real proportions (singles court 78ft × 27ft = 2.89:1)
// ViewBox 290 × 100
//
//  Left baseline  x=5       Right baseline  x=285
//  Left srv line  x=70      Right srv line  x=220
//  Net            x=145
//
//  Top doubles    y=10      Bottom doubles  y=90
//  Top singles    y=22      Bottom singles  y=78
//  Center         y=50
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  sky:    '#0f2820',
  grass:  '#1a3a2a',
  lines:  '#e2e8f0',
  net:    '#cbd5e1',
  ball:   '#facc15',
  p1:     '#f97316',
  p2:     '#60a5fa',
  move:   '#34d399',
  cone:   '#fb923c',
  target: 'rgba(250,204,21,0.18)',
}

// Deterministic seed from drill name/id — returns 0..1
function seed(str, offset = 0) {
  let h = offset * 2654435761
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 2654435761)
  return ((h >>> 0) % 1000) / 1000
}

function Court({ children }) {
  return (
    <svg viewBox="0 0 290 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Arrowheads */}
        <marker id="ay" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 Z" fill={C.ball} />
        </marker>
        <marker id="ab" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 Z" fill={C.p2} />
        </marker>
        <marker id="ag" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 Z" fill={C.move} />
        </marker>
        <marker id="aw" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 Z" fill="rgba(255,255,255,0.6)" />
        </marker>
      </defs>

      {/* Sky / background */}
      <rect width="290" height="100" fill={C.sky} />

      {/* Doubles alleys (slightly different shade) */}
      <rect x="5" y="10" width="280" height="12" fill="rgba(30,60,40,0.6)" />
      <rect x="5" y="78" width="280" height="12" fill="rgba(30,60,40,0.6)" />

      {/* Court surface (singles) */}
      <rect x="5" y="22" width="280" height="56" fill={C.grass} />

      {/* Court outline */}
      <rect x="5" y="10" width="280" height="80" fill="none" stroke={C.lines} strokeWidth="1" />

      {/* Singles sidelines */}
      <line x1="5" y1="22" x2="285" y2="22" stroke={C.lines} strokeWidth="0.8" />
      <line x1="5" y1="78" x2="285" y2="78" stroke={C.lines} strokeWidth="0.8" />

      {/* Net */}
      <line x1="145" y1="10" x2="145" y2="90" stroke={C.net} strokeWidth="1.8" strokeDasharray="3,2" />

      {/* Service lines */}
      <line x1="70" y1="22" x2="70" y2="78" stroke={C.lines} strokeWidth="0.7" />
      <line x1="220" y1="22" x2="220" y2="78" stroke={C.lines} strokeWidth="0.7" />

      {/* Center service line */}
      <line x1="70" y1="50" x2="220" y2="50" stroke={C.lines} strokeWidth="0.7" />

      {/* Center marks on baselines */}
      <line x1="145" y1="10" x2="145" y2="16" stroke={C.lines} strokeWidth="1" />
      <line x1="145" y1="84" x2="145" y2="90" stroke={C.lines} strokeWidth="1" />

      {children}
    </svg>
  )
}

// ── Primitive helpers ─────────────────────────────────────────────────────────

function P1({ x, y }) {
  return <circle cx={x} cy={y} r="4" fill={C.p1} stroke="white" strokeWidth="0.8" />
}
function P2({ x, y }) {
  return <circle cx={x} cy={y} r="4" fill={C.p2} stroke="white" strokeWidth="0.8" />
}
function Cone({ x, y }) {
  return <polygon points={`${x},${y-4} ${x-3},${y+3} ${x+3},${y+3}`} fill={C.cone} />
}
function Target({ x, y, r = 6 }) {
  return <circle cx={x} cy={y} r={r} fill={C.target} stroke={C.ball} strokeWidth="0.7" strokeDasharray="2,1" />
}
function Shot({ x1, y1, x2, y2, color = 'ay' }) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color === 'ay' ? C.ball : color === 'ab' ? C.p2 : C.move}
      strokeWidth="1.4" strokeDasharray="5,2.5" markerEnd={`url(#${color})`} />
  )
}
function Move({ x1, y1, x2, y2 }) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={C.move} strokeWidth="1" strokeDasharray="2,2" markerEnd="url(#ag)" />
  )
}

// ── Zone shading helpers ──────────────────────────────────────────────────────

function ZoneDeuce() {
  return <rect x="145" y="22" width="75" height="28" fill="rgba(250,204,21,0.07)" />
}
function ZoneAd() {
  return <rect x="145" y="50" width="75" height="28" fill="rgba(96,165,250,0.07)" />
}

// ── Diagram components ────────────────────────────────────────────────────────

// Each receives `v` = array of 0..1 variation values seeded from drill name

function CrosscourtFH({ v }) {
  const py = 72 + v[0] * 6
  const ty = 28 - v[1] * 5
  return (
    <Court>
      <ZoneAd />
      <P1 x={12} y={py} />
      <P2 x={278} y={30 - v[2] * 4} />
      <Shot x1={14} y1={py - 1} x2={272} y2={ty} />
      <Shot x1={276} y1={32} x2={16} y2={76} color="ab" />
      <Target x={275} y={ty + 2} r={5} />
    </Court>
  )
}

function CrosscourtBH({ v }) {
  const py = 30 + v[0] * 6
  const ty = 72 - v[1] * 5
  return (
    <Court>
      <ZoneDeuce />
      <P1 x={12} y={py} />
      <P2 x={278} y={70 + v[2] * 4} />
      <Shot x1={14} y1={py + 1} x2={272} y2={ty} />
      <Shot x1={276} y1={68} x2={16} y2={26} color="ab" />
      <Target x={275} y={ty - 2} r={5} />
    </Court>
  )
}

function DTL_FH({ v }) {
  const py = 30 + v[0] * 4
  const endY = 26 + v[1] * 4
  return (
    <Court>
      <P1 x={12} y={py} />
      <P2 x={278} y={endY + v[2] * 3} />
      <Shot x1={14} y1={py} x2={272} y2={endY} />
      <Shot x1={276} y1={endY + 3} x2={16} y2={py + 4} color="ab" />
      <Target x={270} y={endY} r={5} />
    </Court>
  )
}

function DTL_BH({ v }) {
  const py = 70 + v[0] * 4
  const endY = 74 + v[1] * 3
  return (
    <Court>
      <P1 x={12} y={py} />
      <P2 x={278} y={endY - v[2] * 3} />
      <Shot x1={14} y1={py} x2={272} y2={endY} />
      <Shot x1={276} y1={endY - 2} x2={16} y2={py - 3} color="ab" />
      <Target x={270} y={endY} r={5} />
    </Court>
  )
}

function InsideOut({ v }) {
  const px = 12 + v[0] * 8
  const py = 62 + v[1] * 6
  return (
    <Court>
      <ZoneAd />
      {/* Player moves from center to ad corner to load inside-out */}
      <P1 x={12} y={50} />
      <Move x1={13} y1={50} x2={px} y2={py} />
      <P1 x={px} y={py} />
      <Shot x1={px + 1} y1={py - 1} x2={270} y2={28 + v[2] * 4} />
      <P2 x={278} y={32 + v[2] * 3} />
      <Target x={268} y={28 + v[2] * 3} r={5} />
    </Court>
  )
}

function InsideIn({ v }) {
  const px = 12 + v[0] * 8
  const py = 62 + v[1] * 6
  return (
    <Court>
      <P1 x={12} y={50} />
      <Move x1={13} y1={50} x2={px} y2={py} />
      <P1 x={px} y={py} />
      <Shot x1={px + 1} y1={py - 1} x2={270} y2={72 + v[2] * 3} />
      <P2 x={278} y={70 + v[2] * 2} />
      <Target x={268} y={72 + v[2] * 3} r={5} />
      <Cone x={268} y={72 + v[2] * 3 - 8} />
    </Court>
  )
}

function ServeWideDeuce({ v }) {
  const sx = 152 + v[0] * 5
  const ty = 26 + v[1] * 3
  return (
    <Court>
      {/* Server top-right of center mark */}
      <P1 x={sx} y={9} />
      {/* Ball arc into wide deuce box */}
      <Shot x1={sx} y1={11} x2={210 + v[2] * 6} y2={ty} />
      <Target x={212 + v[2] * 5} y={ty} r={6} />
      <rect x="145" y="22" width="75" height="28" fill="rgba(250,204,21,0.08)" />
    </Court>
  )
}

function ServeTDeuce({ v }) {
  const sx = 148 + v[0] * 4
  return (
    <Court>
      <P1 x={sx} y={9} />
      <Shot x1={sx} y1={11} x2={152 + v[1] * 4} y2={46 + v[2] * 3} />
      <Target x={152 + v[1] * 3} y={46 + v[2] * 3} r={6} />
      <rect x="145" y="22" width="75" height="28" fill="rgba(250,204,21,0.08)" />
    </Court>
  )
}

function ServeWideAd({ v }) {
  const sx = 138 - v[0] * 4
  const ty = 26 + v[1] * 4
  return (
    <Court>
      <P1 x={sx} y={9} />
      <Shot x1={sx} y1={11} x2={75 + v[2] * 5} y2={ty} />
      <Target x={76 + v[2] * 4} y={ty} r={6} />
      <rect x="70" y="22" width="75" height="28" fill="rgba(96,165,250,0.08)" />
    </Court>
  )
}

function ServeTAd({ v }) {
  const sx = 138 - v[0] * 4
  return (
    <Court>
      <P1 x={sx} y={9} />
      <Shot x1={sx} y1={11} x2={138 - v[1] * 3} y2={46 + v[2] * 4} />
      <Target x={138 - v[1] * 2} y={46 + v[2] * 3} r={6} />
      <rect x="70" y="22" width="75" height="28" fill="rgba(96,165,250,0.08)" />
    </Court>
  )
}

function ServeBody({ v }) {
  const sx = 152 + v[0] * 5
  const ty = 32 + v[1] * 10
  return (
    <Court>
      <P1 x={sx} y={9} />
      <Shot x1={sx} y1={11} x2={180 + v[2] * 5} y2={ty} />
      <P2 x={184 + v[2] * 4} y={ty + 5} />
    </Court>
  )
}

function ApproachNet({ v }) {
  const startX = 15 + v[0] * 8
  const approachX = 100 + v[1] * 10
  const shotY = 28 + v[2] * 8
  return (
    <Court>
      <P1 x={startX} y={68} />
      <Move x1={startX + 1} y1={67} x2={approachX} y2={60 + v[0] * 5} />
      <P1 x={approachX} y={60 + v[0] * 4} />
      <Shot x1={approachX + 1} y1={59 + v[0] * 3} x2={265} y2={shotY} />
      <P2 x={278} y={32 + v[2] * 6} />
      <Target x={265} y={shotY} r={5} />
    </Court>
  )
}

function ApproachVolley({ v }) {
  const vx1 = 110 + v[0] * 8
  const vx2 = 128 + v[1] * 6
  return (
    <Court>
      <P1 x={14} y={68} />
      <Move x1={15} y1={67} x2={vx1} y2={55 + v[0] * 5} />
      {/* First volley */}
      <P1 x={vx1} y={55 + v[0] * 4} />
      <Shot x1={vx1 + 1} y1={54 + v[0] * 3} x2={265} y2={28 + v[2] * 6} />
      {/* Move forward */}
      <Move x1={vx1 + 1} y1={55 + v[0] * 3} x2={vx2} y2={50 + v[1] * 3} />
      {/* Second volley winner */}
      <P1 x={vx2} y={50 + v[1] * 2} />
      <Shot x1={vx2 + 1} y1={49 + v[1] * 2} x2={268} y2={72 + v[2] * 3} />
      <P2 x={278} y={38 + v[0] * 6} />
      <Target x={268} y={72 + v[2] * 3} r={5} />
    </Court>
  )
}

function VolleyExchange({ v }) {
  const lx = 115 + v[0] * 8
  const rx = 175 - v[1] * 8
  const ly = 42 + v[2] * 6
  const ry = 58 - v[0] * 6
  return (
    <Court>
      <P1 x={lx} y={ly} />
      <P2 x={rx} y={ry} />
      <Shot x1={lx + 1} y1={ly} x2={rx - 1} y2={ry} />
      <Shot x1={rx - 1} y1={ry + 1} x2={lx + 1} y2={ly + 1} color="ab" />
      {/* Show they are at net */}
      <line x1={lx - 8} y1={ly - 10} x2={lx + 8} y2={ly - 10} stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <line x1={rx - 8} y1={ry - 10} x2={rx + 8} y2={ry - 10} stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
    </Court>
  )
}

function Overhead({ v }) {
  const px = 130 + v[0] * 10
  const py = 50 + v[1] * 8
  const lx = 270 - v[2] * 8
  const ly = 72 + v[0] * 5
  return (
    <Court>
      <P2 x={278} y={80 - v[1] * 6} />
      {/* Lob arc */}
      <path d={`M277,${79 - v[1]*5} Q${145 + v[0]*10},${18 + v[2]*5} ${px},${py}`}
        stroke={C.ball} strokeWidth="1.4" strokeDasharray="5,2.5" fill="none" markerEnd="url(#ay)" />
      <P1 x={px} y={py} />
      {/* Smash */}
      <Shot x1={px + 1} y1={py + 1} x2={lx} y2={ly} />
      <Target x={lx} y={ly} r={6} />
    </Court>
  )
}

function FootworkAgility({ v }) {
  const cx = 70 + v[0] * 10
  const cy = 70 + v[1] * 6
  // 5 cones on baseline area, 1 center
  const cones = [
    [12, 85], [50 + v[0]*5, 83], [90 + v[1]*5, 85],
    [130 + v[2]*5, 83], [cx, cy],
  ]
  return (
    <Court>
      {cones.map(([x, y], i) => <Cone key={i} x={x} y={y} />)}
      {/* Movement paths from center to each cone */}
      {cones.slice(0, 4).map(([x, y], i) => (
        <Move key={i} x1={cx - 1} y1={cy - 1} x2={x + 1} y2={y - 1} />
      ))}
      <P1 x={cx} y={cy - 8} />
    </Court>
  )
}

function BaselineRally({ v }) {
  const ly = 50 + (v[0] - 0.5) * 12
  const ry = 50 + (v[1] - 0.5) * 12
  return (
    <Court>
      <P1 x={12} y={ly} />
      <P2 x={278} y={ry} />
      <Shot x1={14} y1={ly} x2={272} y2={ry} />
      <Shot x1={270} y1={ry + 2} x2={16} y2={ly + 2} color="ab" />
    </Court>
  )
}

function ReturnCC({ v }) {
  const svy = 32 + v[0] * 16 // server position y
  const retY = svy + 8 + v[1] * 4
  const shotY = 30 + v[2] * 6
  return (
    <Court>
      {/* Server bottom */}
      <P1 x={153} y={91} />
      {/* Serve to returner */}
      <Shot x1={153} y1={89} x2={220 + v[0]*10} y2={svy} />
      {/* Returner */}
      <P2 x={278} y={retY} />
      {/* Return crosscourt */}
      <Shot x1={276} y1={retY} x2={18} y2={shotY} color="ab" />
      <Target x={18} y={shotY} r={5} />
    </Court>
  )
}

function ReturnDTL({ v }) {
  const svy = 32 + v[0] * 16
  const retY = svy + 8 + v[1] * 4
  return (
    <Court>
      <P1 x={153} y={91} />
      <Shot x1={153} y1={89} x2={220 + v[0]*8} y2={svy} />
      <P2 x={278} y={retY} />
      <Shot x1={276} y1={retY} x2={18} y2={retY + 4 - v[2]*4} color="ab" />
      <Target x={18} y={retY + 4} r={5} />
    </Court>
  )
}

function DefensiveReset({ v }) {
  const wx = 270 + v[0] * 10
  const wy = 74 + v[1] * 8
  const resetY = 65 + v[2] * 10
  return (
    <Court>
      {/* Player stretched wide */}
      <P1 x={wx > 284 ? 284 : wx} y={wy} />
      <Move x1={(wx > 284 ? 284 : wx) - 2} y1={wy - 1} x2={20} y2={70 + v[0]*5} />
      {/* Reset shot deep crosscourt */}
      <Shot x1={wx - 3} y1={wy - 2} x2={18} y2={resetY} />
      <P2 x={14} y={40 + v[1]*10} />
      <Target x={18} y={resetY} r={5} />
    </Court>
  )
}

function DropShot({ v }) {
  const py = 64 + v[0] * 8
  const tx = 120 + v[1] * 20
  const ty = 40 + v[2] * 16
  return (
    <Court>
      <P1 x={12} y={py} />
      <path d={`M14,${py} Q${tx - 20},${ty - 10} ${tx},${ty}`}
        stroke={C.ball} strokeWidth="1.4" strokeDasharray="4,2" fill="none" markerEnd="url(#ay)" />
      <Target x={tx} y={ty} r={7} />
      <P2 x={278} y={50 + (v[1] - 0.5) * 15} />
    </Court>
  )
}

function LobOverhead({ v }) {
  const netX = 130 + v[0] * 10
  const netY = 50 + v[1] * 10
  const baseY = 72 + v[2] * 5
  return (
    <Court>
      <P2 x={278} y={baseY} />
      {/* Lob arc (high) */}
      <path d={`M276,${baseY} Q${145 + v[0]*8},${12 + v[2]*5} ${netX},${netY}`}
        stroke={C.ball} strokeWidth="1.4" strokeDasharray="5,2" fill="none" markerEnd="url(#ay)" />
      <P1 x={netX} y={netY} />
      {/* Smash reply */}
      <Shot x1={netX + 1} y1={netY + 1} x2={268} y2={74 + v[0]*6} />
      <Target x={268} y={74 + v[0]*6} r={5} />
    </Court>
  )
}

function MiniTennis({ v }) {
  const lx = 85 + v[0] * 8
  const rx = 205 - v[1] * 8
  const ly = 44 + v[2] * 8
  const ry = 56 - v[0] * 8
  return (
    <Court>
      {/* Shade service boxes */}
      <rect x="70" y="22" width="150" height="56" fill="rgba(52,211,153,0.06)" />
      <P1 x={lx} y={ly} />
      <P2 x={rx} y={ry} />
      <Shot x1={lx + 1} y1={ly} x2={rx - 1} y2={ry} />
      <Shot x1={rx - 1} y1={ry + 1} x2={lx + 1} y2={ly + 1} color="ab" />
    </Court>
  )
}

function HalfCourt({ v }) {
  const side = v[0] > 0.5 ? 'deuce' : 'ad'
  const yBase = side === 'deuce' ? 28 + v[1] * 10 : 62 + v[1] * 10
  return (
    <Court>
      {side === 'deuce'
        ? <rect x="5" y="22" width="280" height="28" fill="rgba(250,204,21,0.08)" />
        : <rect x="5" y="50" width="280" height="28" fill="rgba(96,165,250,0.08)" />}
      <P1 x={12} y={yBase} />
      <P2 x={278} y={yBase + (v[2] - 0.5) * 8} />
      <Shot x1={14} y1={yBase} x2={272} y2={yBase + (v[2] - 0.5) * 6} />
      <Shot x1={270} y1={yBase + (v[2] - 0.5) * 7} x2={16} y2={yBase + 3} color="ab" />
    </Court>
  )
}

function FullCourt({ v }) {
  const p1y = 65 + v[0] * 10
  const p2y = 35 + v[1] * 10
  return (
    <Court>
      <P1 x={12} y={p1y} />
      <P2 x={278} y={p2y} />
      {/* CC then DTL pattern */}
      <Shot x1={14} y1={p1y} x2={265} y2={28 + v[2]*6} />
      <Shot x1={263} y1={30 + v[2]*5} x2={14} y2={p2y + 4} color="ab" />
      <Shot x1={16} y1={p2y + 6} x2={268} y2={72 + v[0]*4} />
      <Target x={268} y={72 + v[0]*4} r={5} />
    </Court>
  )
}

function TwoPlayerAngle({ v }) {
  const p1y = 50 + (v[0] - 0.5) * 20
  return (
    <Court>
      <P1 x={12} y={p1y} />
      <P2 x={278} y={50 + (v[1] - 0.5) * 20} />
      {/* Acute angle shot */}
      <Shot x1={14} y1={p1y} x2={165 + v[2]*10} y2={22} />
      <Target x={165 + v[2]*8} y={23} r={5} />
    </Court>
  )
}

function ServeVolleyPattern({ v }) {
  const sx = 148 + v[0] * 8
  return (
    <Court>
      <P1 x={sx} y={9} />
      <Shot x1={sx} y1={11} x2={200 + v[1]*10} y2={28 + v[2]*6} />
      <Move x1={sx} y1={12} x2={130 + v[0]*5} y2={55 + v[1]*4} />
      <P1 x={130 + v[0]*5} y={55 + v[1]*3} />
      <P2 x={278} y={50 + (v[2]-0.5)*15} />
      <Shot x1={132 + v[0]*4} y1={54 + v[1]*2} x2={265} y2={28 + v[0]*8} />
    </Court>
  )
}

// ── Registry ──────────────────────────────────────────────────────────────────

const TYPES = {
  crosscourt_fh:    CrosscourtFH,
  crosscourt_bh:    CrosscourtBH,
  dtl_fh:           DTL_FH,
  dtl_bh:           DTL_BH,
  inside_out:       InsideOut,
  inside_in:        InsideIn,
  serve_wide_d:     ServeWideDeuce,
  serve_t_d:        ServeTDeuce,
  serve_wide_ad:    ServeWideAd,
  serve_t_ad:       ServeTAd,
  serve_body:       ServeBody,
  approach_net:     ApproachNet,
  approach_volley:  ApproachVolley,
  volley_exchange:  VolleyExchange,
  overhead:         Overhead,
  footwork_agility: FootworkAgility,
  baseline_rally:   BaselineRally,
  return_cc:        ReturnCC,
  return_dtl:       ReturnDTL,
  defensive_reset:  DefensiveReset,
  drop_shot:        DropShot,
  lob_overhead:     LobOverhead,
  mini_tennis:      MiniTennis,
  half_court:       HalfCourt,
  full_court:       FullCourt,
  two_player_angle: TwoPlayerAngle,
  serve_volley:     ServeVolleyPattern,
}

// ── Public API ────────────────────────────────────────────────────────────────

export default function CourtDiagram({ type = 'baseline_rally', drillName = '' }) {
  // Generate 8 variation values 0..1 seeded from the drill's name
  const v = Array.from({ length: 8 }, (_, i) => seed(drillName || type, i))
  const Diagram = TYPES[type] ?? BaselineRally
  return <Diagram v={v} />
}
