// Court viewBox: 160 x 100
// Court outline: x=10..150, y=8..92
// Net: y=50 (x=10..150)
// Singles sidelines: x=22, x=138
// Service lines: y=29 (top), y=71 (bottom)
// Center service line: x=80
// Player: filled circle; Ball path: dashed yellow; Movement: dotted cyan

const C = {
  surface: '#1a3a2a',
  lines: '#ffffff',
  net: '#e2e8f0',
  ball: '#facc15',
  player: '#f97316',
  player2: '#60a5fa',
  move: '#34d399',
  arrow: '#facc15',
}

function Court({ children }) {
  return (
    <svg viewBox="0 0 160 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={C.arrow} />
        </marker>
        <marker id="arrB" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={C.player2} />
        </marker>
        <marker id="arrG" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={C.move} />
        </marker>
      </defs>
      {/* Surface */}
      <rect x="0" y="0" width="160" height="100" fill={C.surface} />
      {/* Court outline */}
      <rect x="10" y="8" width="140" height="84" fill="none" stroke={C.lines} strokeWidth="1.2" />
      {/* Singles sidelines */}
      <line x1="22" y1="8" x2="22" y2="92" stroke={C.lines} strokeWidth="0.8" />
      <line x1="138" y1="8" x2="138" y2="92" stroke={C.lines} strokeWidth="0.8" />
      {/* Net */}
      <line x1="10" y1="50" x2="150" y2="50" stroke={C.net} strokeWidth="1.8" strokeDasharray="3,2" />
      {/* Service lines */}
      <line x1="22" y1="29" x2="138" y2="29" stroke={C.lines} strokeWidth="0.8" />
      <line x1="22" y1="71" x2="138" y2="71" stroke={C.lines} strokeWidth="0.8" />
      {/* Center service line */}
      <line x1="80" y1="29" x2="80" y2="71" stroke={C.lines} strokeWidth="0.8" />
      {/* Center marks */}
      <line x1="80" y1="47" x2="80" y2="53" stroke={C.lines} strokeWidth="1.2" />
      {children}
    </svg>
  )
}

function Player({ x, y, color = C.player }) {
  return <circle cx={x} cy={y} r="4" fill={color} stroke="white" strokeWidth="0.8" />
}

function BallPath({ x1, y1, x2, y2 }) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={C.ball} strokeWidth="1.5" strokeDasharray="4,2"
      markerEnd="url(#arr)" />
  )
}

function MovePath({ x1, y1, x2, y2 }) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={C.move} strokeWidth="1" strokeDasharray="2,2"
      markerEnd="url(#arrG)" />
  )
}

// ── Diagram components ──────────────────────────────────────

function CrosscourtFH() {
  return (
    <Court>
      <Player x={30} y={84} />
      <Player x={130} y={16} color={C.player2} />
      <BallPath x1={30} y1={82} x2={128} y2={18} />
      <BallPath x1={130} y1={18} x2={32} y2={82} />
    </Court>
  )
}

function CrosscourtBH() {
  return (
    <Court>
      <Player x={130} y={84} />
      <Player x={30} y={16} color={C.player2} />
      <BallPath x1={130} y1={82} x2={32} y2={18} />
      <BallPath x1={30} y1={18} x2={128} y2={82} />
    </Court>
  )
}

function DTL_FH() {
  return (
    <Court>
      <Player x={30} y={84} />
      <Player x={30} y={16} color={C.player2} />
      <BallPath x1={30} y1={82} x2={30} y2={18} />
      <BallPath x1={30} y1={18} x2={30} y2={82} />
    </Court>
  )
}

function DTL_BH() {
  return (
    <Court>
      <Player x={130} y={84} />
      <Player x={130} y={16} color={C.player2} />
      <BallPath x1={130} y1={82} x2={130} y2={18} />
      <BallPath x1={130} y1={18} x2={130} y2={82} />
    </Court>
  )
}

function InsideOut() {
  return (
    <Court>
      {/* Player moves from ad side to hit inside-out FH to deuce corner */}
      <Player x={100} y={84} />
      <Player x={80} y={84} color="#94a3b8" />
      <MovePath x1={80} y1={84} x2={100} y2={84} />
      <BallPath x1={100} y1={82} x2={32} y2={20} />
      <Player x={32} y={16} color={C.player2} />
    </Court>
  )
}

function InsideIn() {
  return (
    <Court>
      <Player x={100} y={84} />
      <Player x={80} y={84} color="#94a3b8" />
      <MovePath x1={80} y1={84} x2={100} y2={84} />
      <BallPath x1={100} y1={82} x2={128} y2={20} />
      <Player x={130} y={16} color={C.player2} />
    </Court>
  )
}

function ServeWideDeuce() {
  return (
    <Court>
      {/* Server on deuce side (right of center, bottom) */}
      <Player x={90} y={96} />
      {/* Ball arcs to wide deuce service box */}
      <BallPath x1={90} y1={94} x2={135} y2={38} />
      {/* Target zone hint */}
      <rect x="120" y="29" width="18" height="20" fill="rgba(250,204,21,0.15)" stroke={C.ball} strokeWidth="0.6" strokeDasharray="2,1" />
    </Court>
  )
}

function ServeTDeuce() {
  return (
    <Court>
      <Player x={90} y={96} />
      <BallPath x1={90} y1={94} x2={82} y2={38} />
      <rect x="72" y="29" width="18" height="20" fill="rgba(250,204,21,0.15)" stroke={C.ball} strokeWidth="0.6" strokeDasharray="2,1" />
    </Court>
  )
}

function ServeWideAd() {
  return (
    <Court>
      <Player x={70} y={96} />
      <BallPath x1={70} y1={94} x2={24} y2={38} />
      <rect x="22" y="29" width="18" height="20" fill="rgba(250,204,21,0.15)" stroke={C.ball} strokeWidth="0.6" strokeDasharray="2,1" />
    </Court>
  )
}

function ServeTAd() {
  return (
    <Court>
      <Player x={70} y={96} />
      <BallPath x1={70} y1={94} x2={78} y2={38} />
      <rect x="70" y="29" width="18" height="20" fill="rgba(250,204,21,0.15)" stroke={C.ball} strokeWidth="0.6" strokeDasharray="2,1" />
    </Court>
  )
}

function ServeBody() {
  return (
    <Court>
      <Player x={90} y={96} />
      <BallPath x1={90} y1={94} x2={105} y2={38} />
      <Player x={105} y={32} color={C.player2} />
    </Court>
  )
}

function ApproachNet() {
  return (
    <Court>
      <Player x={80} y={84} color="#94a3b8" />
      <MovePath x1={80} y1={84} x2={80} y2={60} />
      <Player x={80} y={60} />
      <BallPath x1={80} y1={60} x2={32} y2={20} />
      <Player x={32} y={16} color={C.player2} />
    </Court>
  )
}

function ApproachVolley() {
  return (
    <Court>
      <Player x={80} y={84} color="#94a3b8" />
      <MovePath x1={80} y1={84} x2={80} y2={62} />
      {/* First volley */}
      <Player x={80} y={62} />
      <BallPath x1={80} y1={62} x2={32} y2={20} />
      {/* Move closer */}
      <MovePath x1={80} y1={62} x2={80} y2={54} />
      <Player x={80} y={54} color={C.player2} />
      {/* Second volley winner */}
      <BallPath x1={80} y1={54} x2={130} y2={18} />
    </Court>
  )
}

function ViolleyExchange() {
  return (
    <Court>
      <Player x={80} y={60} />
      <Player x={80} y={40} color={C.player2} />
      <BallPath x1={80} y1={58} x2={80} y2={42} />
      <BallPath x1={80} y1={42} x2={80} y2={58} />
    </Court>
  )
}

function Overhead() {
  return (
    <Court>
      {/* Net player */}
      <Player x={80} y={56} />
      {/* Baseline opponent lobbing */}
      <Player x={80} y={84} color={C.player2} />
      {/* Lob arc upward */}
      <BallPath x1={80} y1={82} x2={80} y2={42} />
      {/* Smash down */}
      <BallPath x1={80} y1={42} x2={130} y2={82} />
    </Court>
  )
}

function FootworkAgility() {
  return (
    <Court>
      {/* Cones on baseline */}
      <rect x="20" y="86" width="4" height="4" fill={C.ball} rx="1" />
      <rect x="50" y="86" width="4" height="4" fill={C.ball} rx="1" />
      <rect x="78" y="86" width="4" height="4" fill={C.ball} rx="1" />
      <rect x="106" y="86" width="4" height="4" fill={C.ball} rx="1" />
      <rect x="136" y="86" width="4" height="4" fill={C.ball} rx="1" />
      {/* Center cone */}
      <rect x="78" y="65" width="4" height="4" fill={C.ball} rx="1" />
      {/* Movement paths */}
      <MovePath x1={80} y1={67} x2={22} y2={87} />
      <MovePath x1={22} y1={87} x2={80} y2={67} />
      <MovePath x1={80} y1={67} x2={52} y2={87} />
      <MovePath x1={52} y1={87} x2={80} y2={67} />
      <MovePath x1={80} y1={67} x2={108} y2={87} />
      <MovePath x1={108} y1={87} x2={80} y2={67} />
      <MovePath x1={80} y1={67} x2={138} y2={87} />
      <Player x={80} y={67} />
    </Court>
  )
}

function BaselineRally() {
  return (
    <Court>
      <Player x={80} y={84} />
      <Player x={80} y={16} color={C.player2} />
      <BallPath x1={80} y1={82} x2={80} y2={18} />
      <BallPath x1={80} y1={18} x2={80} y2={82} />
    </Court>
  )
}

function ReturnCC() {
  return (
    <Court>
      {/* Server at top */}
      <Player x={90} y={9} />
      {/* Ball from serve */}
      <BallPath x1={90} y1={11} x2={130} y2={62} />
      {/* Returner bottom right */}
      <Player x={130} y={84} />
      {/* Return cross-court */}
      <BallPath x1={130} y1={82} x2={32} y2={18} />
    </Court>
  )
}

function ReturnDTL() {
  return (
    <Court>
      <Player x={90} y={9} />
      <BallPath x1={90} y1={11} x2={130} y2={62} />
      <Player x={130} y={84} />
      <BallPath x1={130} y1={82} x2={130} y2={18} />
    </Court>
  )
}

function DefensiveReset() {
  return (
    <Court>
      {/* Player stretched wide */}
      <Player x={145} y={80} color="#94a3b8" />
      {/* Recover path */}
      <MovePath x1={143} y1={80} x2={80} y2={84} />
      <Player x={80} y={84} />
      {/* Reset shot cross-court */}
      <BallPath x1={145} y1={78} x2={32} y2={20} />
      <Player x={30} y={16} color={C.player2} />
    </Court>
  )
}

function DropShot() {
  return (
    <Court>
      <Player x={80} y={84} />
      {/* Ball arcs short into service box */}
      <BallPath x1={80} y1={82} x2={80} y2={60} />
      {/* Target in service box */}
      <circle cx={80} cy={60} r="5" fill="rgba(250,204,21,0.25)" stroke={C.ball} strokeWidth="0.8" />
      <Player x={80} y={16} color={C.player2} />
    </Court>
  )
}

function LobOverhead() {
  return (
    <Court>
      <Player x={80} y={84} color={C.player2} />
      {/* High lob arc */}
      <path d="M80,82 Q80,20 80,44" stroke={C.ball} strokeWidth="1.5" strokeDasharray="4,2" fill="none" markerEnd="url(#arr)" />
      {/* Net player smashes */}
      <Player x={80} y={56} />
      <BallPath x1={80} y1={54} x2={32} y2={82} />
    </Court>
  )
}

function MiniTennis() {
  return (
    <Court>
      <Player x={80} y={68} />
      <Player x={80} y={32} color={C.player2} />
      <BallPath x1={80} y1={66} x2={50} y2={42} />
      <BallPath x1={50} y1={42} x2={110} y2={62} />
      {/* Shade service boxes */}
      <rect x="22" y="29" width="116" height="42" fill="rgba(52,211,153,0.08)" />
    </Court>
  )
}

function HalfCourt() {
  return (
    <Court>
      {/* Shade deuce half */}
      <rect x="80" y="8" width="58" height="84" fill="rgba(99,102,241,0.12)" />
      <Player x={110} y={84} />
      <Player x={110} y={16} color={C.player2} />
      <BallPath x1={110} y1={82} x2={32} y2={20} />
      <BallPath x1={32} y1={20} x2={110} y2={82} />
    </Court>
  )
}

function FullCourt() {
  return (
    <Court>
      <Player x={80} y={84} />
      <Player x={80} y={16} color={C.player2} />
      {/* Complex pattern: cc, dtl, cc */}
      <BallPath x1={80} y1={82} x2={32} y2={20} />
      <BallPath x1={32} y1={20} x2={130} y2={82} />
      <BallPath x1={130} y1={82} x2={32} y2={20} />
    </Court>
  )
}

// ── Registry ────────────────────────────────────────────────

const DIAGRAMS = {
  crosscourt_fh:   CrosscourtFH,
  crosscourt_bh:   CrosscourtBH,
  dtl_fh:          DTL_FH,
  dtl_bh:          DTL_BH,
  inside_out:      InsideOut,
  inside_in:       InsideIn,
  serve_wide_d:    ServeWideDeuce,
  serve_t_d:       ServeTDeuce,
  serve_wide_ad:   ServeWideAd,
  serve_t_ad:      ServeTAd,
  serve_body:      ServeBody,
  approach_net:    ApproachNet,
  approach_volley: ApproachVolley,
  volley_exchange: ViolleyExchange,
  overhead:        Overhead,
  footwork_agility:FootworkAgility,
  baseline_rally:  BaselineRally,
  return_cc:       ReturnCC,
  return_dtl:      ReturnDTL,
  defensive_reset: DefensiveReset,
  drop_shot:       DropShot,
  lob_overhead:    LobOverhead,
  mini_tennis:     MiniTennis,
  half_court:      HalfCourt,
  full_court:      FullCourt,
}

export default function CourtDiagram({ type }) {
  const Diagram = DIAGRAMS[type] ?? BaselineRally
  return <Diagram />
}
