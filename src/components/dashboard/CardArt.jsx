// ─────────────────────────────────────────────────────────────────────────────
// SVG artwork for dashboard card tiles.
//
// Every tile is drawn, not generated: one geometric motif per card built from
// a shared vocabulary — dark gradient surface, faint court grid, one luminous
// accent colour, glowing strokes, dashed trajectories — the same language as
// the drill court diagrams, so the whole dashboard reads as one drawn system.
//
// Drawn at 200×200 (square tile) and scaled by the card. `vi` picks a variant
// inside a motif so a row of same-motif cards doesn't repeat one picture.
// ─────────────────────────────────────────────────────────────────────────────

const W = 200
const H = 200

// A stroke with a soft luminous underlay — the standard "lit line" of the set.
function Glow({ d, accent, width = 6, dash, opacity = 1 }) {
  return (
    <g>
      <path
        d={d}
        fill="none" stroke={accent}
        strokeWidth={width * 2.4}
        strokeLinecap="round" strokeLinejoin="round"
        opacity={0.16 * opacity}
      />
      <path
        d={d}
        fill="none" stroke={accent}
        strokeWidth={width}
        strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray={dash}
        opacity={opacity}
      />
    </g>
  )
}

// The ball: solid core plus halo ring.
function Ball({ x, y, r = 12, accent, halo = true }) {
  return (
    <g>
      {halo && <circle cx={x} cy={y} r={r + 9} fill="none" stroke={accent} strokeWidth="2" opacity="0.3" />}
      <circle cx={x} cy={y} r={r} fill={accent} />
    </g>
  )
}

// ── Motifs ──────────────────────────────────────────────────────────────────

function StrokeMotif({ accent, flip }) {
  // A swing path sweeping through the contact point.
  return (
    <g transform={flip ? `translate(${W},0) scale(-1,1)` : undefined}>
      <Glow d="M -14 168 C 50 178, 120 142, 156 62" accent={accent} width={7} />
      <path
        d="M 6 184 C 68 190, 138 156, 172 84"
        fill="none" stroke={accent} strokeWidth="2.5"
        strokeLinecap="round" strokeDasharray="9 8" opacity="0.3"
      />
      <Ball x={156} y={62} r={13} accent={accent} />
      {/* impact burst at contact */}
      <g stroke={accent} strokeWidth="3" strokeLinecap="round" opacity="0.6">
        <line x1="176" y1="38" x2="185" y2="28" />
        <line x1="182" y1="58" x2="194" y2="56" />
        <line x1="164" y1="34" x2="167" y2="21" />
      </g>
      {/* speed ticks trailing the swing */}
      <path d="M 6 148 L 34 151" stroke={accent} strokeWidth="3" strokeLinecap="round" opacity="0.35" />
      <path d="M 14 132 L 36 136" stroke={accent} strokeWidth="3" strokeLinecap="round" opacity="0.22" />
    </g>
  )
}

function SliceMotif({ accent }) {
  // A flat, skidding trajectory with under-spin lines beneath it.
  return (
    <g>
      <Glow d="M -12 88 C 55 76, 120 92, 168 78" accent={accent} width={6.5} />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M ${18 + i * 12} ${116 + i * 20} C ${72 + i * 8} ${104 + i * 20}, ${120} ${120 + i * 20}, ${170 - i * 6} ${106 + i * 20}`}
          fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round"
          opacity={0.3 - i * 0.09}
        />
      ))}
      <Ball x={168} y={78} r={11} accent={accent} />
      <line x1="24" y1="180" x2="176" y2="180" stroke={accent} strokeWidth="2" opacity="0.15" />
    </g>
  )
}

function ServeMotif({ accent, vi = 0 }) {
  // Toss up, strike down into the box. Variants move the toss and the spin
  // path so a row of serve cards doesn't read as one picture five times.
  const V = [
    { tx: 122, ty: 40, land: 92,  spin: 'M 122 62 C 142 96, 132 130, 104 158' },
    { tx: 102, ty: 32, land: 132, spin: 'M 102 54 C 76 92, 94 130, 128 156' },
    { tx: 136, ty: 48, land: 76,  spin: 'M 136 70 C 162 102, 122 138, 88 160' },
    { tx: 92,  ty: 44, land: 124, spin: 'M 92 66 C 68 102, 96 138, 122 158' },
    { tx: 118, ty: 30, land: 104, spin: 'M 118 52 C 146 92, 128 132, 110 156' },
  ][vi % 5]

  return (
    <g>
      <Glow d={`M ${V.tx} ${V.ty + 14} L ${V.land} 158`} accent={accent} width={6.5} />
      <path d={V.spin} fill="none" stroke={accent} strokeWidth="2.5" strokeDasharray="8 7" opacity="0.35" />
      <Ball x={V.tx} y={V.ty} r={12} accent={accent} />
      {/* service box in shallow perspective */}
      <path d="M 42 158 L 158 158 L 184 196 L 16 196 Z" fill={accent} opacity="0.1" />
      <path d="M 42 158 L 158 158 L 184 196 L 16 196 Z" fill="none" stroke={accent} strokeWidth="2" opacity="0.35" />
      <circle cx={V.land} cy={172} r="7" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
    </g>
  )
}

function CourtMotif({ accent, variant }) {
  // Court in shallow perspective with a ball path across it. `tactics` adds
  // the opposing path of a rally pattern; `doubles` places the four players.
  return (
    <g>
      <g stroke={accent} fill="none">
        <path d="M 58 30 L 142 30 L 170 172 L 30 172 Z" strokeWidth="2.2" opacity="0.5" />
        <line x1="41" y1="104" x2="159" y2="104" strokeWidth="3" opacity="0.65" />
        <line x1="50" y1="66" x2="150" y2="66" strokeWidth="1.5" opacity="0.25" />
        <line x1="36" y1="140" x2="164" y2="140" strokeWidth="1.5" opacity="0.25" />
        <line x1="100" y1="66" x2="100" y2="140" strokeWidth="1.5" opacity="0.25" />
      </g>

      {variant === 'doubles' ? (
        <g>
          <circle cx="74" cy="128" r="9" fill={accent} />
          <circle cx="126" cy="150" r="9" fill={accent} />
          <circle cx="78" cy="52" r="7" fill={accent} opacity="0.45" />
          <circle cx="124" cy="76" r="7" fill={accent} opacity="0.45" />
          <path d="M 74 118 L 96 96" stroke={accent} strokeWidth="2.5" strokeDasharray="4 5" opacity="0.55" />
        </g>
      ) : (
        <g>
          <Glow d="M 62 166 C 92 128, 116 84, 146 44" accent={accent} width={5.5} />
          {variant === 'tactics' && (
            <path
              d="M 142 168 C 114 128, 88 86, 58 48"
              fill="none" stroke={accent} strokeWidth="2.5"
              strokeLinecap="round" strokeDasharray="8 7" opacity="0.4"
            />
          )}
          <Ball x={146} y={44} r={10} accent={accent} />
        </g>
      )}
    </g>
  )
}

function NetMotif({ accent }) {
  // The net band head-on, ball punched above it.
  return (
    <g>
      <path d="M 34 66 C 66 44, 100 40, 126 52" fill="none" stroke={accent} strokeWidth="2.5" strokeDasharray="8 7" opacity="0.4" />
      <Ball x={130} y={54} r={13} accent={accent} />
      <Glow d="M 130 68 L 168 118" accent={accent} width={5} />

      <line x1="0" y1="124" x2="200" y2="124" stroke={accent} strokeWidth="4.5" opacity="0.85" />
      <rect x="0" y="124" width="200" height="42" fill={accent} opacity="0.08" />
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={i} x1={i * 20} y1="124" x2={i * 20} y2="166" stroke={accent} strokeWidth="1.4" opacity="0.25" />
      ))}
      <line x1="0" y1="166" x2="200" y2="166" stroke={accent} strokeWidth="2" opacity="0.35" />
    </g>
  )
}

function FigureMotif({ accent, vi = 0 }) {
  // Physical training as abstract glyphs — a stick figure reads as clip art
  // at this size, so each variant is drawn as its subject instead:
  // barbell, explosive burst, slalom through cones, shield, recovery pulse.
  const glyphs = [
    // barbell
    <g key="bar">
      <Glow d="M 38 100 L 162 100" accent={accent} width={7} />
      <line x1="58" y1="70" x2="58" y2="130" stroke={accent} strokeWidth="11" strokeLinecap="round" />
      <line x1="76" y1="58" x2="76" y2="142" stroke={accent} strokeWidth="11" strokeLinecap="round" />
      <line x1="142" y1="70" x2="142" y2="130" stroke={accent} strokeWidth="11" strokeLinecap="round" />
      <line x1="124" y1="58" x2="124" y2="142" stroke={accent} strokeWidth="11" strokeLinecap="round" />
    </g>,
    // explosive burst
    <g key="burst">
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4 + Math.PI / 8
        const r1 = 30
        const r2 = 30 + (i % 2 ? 26 : 44)
        return (
          <line
            key={i}
            x1={100 + r1 * Math.cos(a)} y1={100 + r1 * Math.sin(a)}
            x2={100 + r2 * Math.cos(a)} y2={100 + r2 * Math.sin(a)}
            stroke={accent} strokeWidth="6.5" strokeLinecap="round"
            opacity={i % 2 ? 0.55 : 0.95}
          />
        )
      })}
      <circle cx="100" cy="100" r="13" fill={accent} />
      <circle cx="100" cy="100" r="24" fill="none" stroke={accent} strokeWidth="2" opacity="0.3" />
    </g>,
    // slalom through cones
    <g key="slalom">
      <Glow d="M 46 178 C 104 156, 44 118, 102 96 C 158 76, 76 52, 128 26" accent={accent} width={5} dash="10 9" />
      <polygon points="138,158 129,176 147,176" fill={accent} opacity="0.85" />
      <polygon points="58,84 49,102 67,102" fill={accent} opacity="0.85" />
      <polygon points="152,44 145,58 159,58" fill={accent} opacity="0.6" />
    </g>,
    // shield
    <g key="shield">
      <path
        d="M 100 30 L 152 48 L 152 98 Q 152 146 100 172 Q 48 146 48 98 L 48 48 Z"
        fill={accent} opacity="0.09"
      />
      <path
        d="M 100 30 L 152 48 L 152 98 Q 152 146 100 172 Q 48 146 48 98 L 48 48 Z"
        fill="none" stroke={accent} strokeWidth="6" strokeLinejoin="round"
      />
      <circle cx="100" cy="96" r="10" fill={accent} />
    </g>,
    // recovery pulse
    <g key="pulse">
      <Glow d="M 18 104 L 62 104 L 80 68 L 102 140 L 118 92 L 132 104 L 182 104" accent={accent} width={6} />
      <circle cx="182" cy="104" r="6" fill={accent} />
    </g>,
  ]

  return glyphs[vi % glyphs.length]
}

function ArcMotif({ accent }) {
  // A high lob clearing the net and dropping steeply behind it.
  return (
    <g>
      <Glow d="M 22 164 C 42 40, 148 40, 176 138" accent={accent} width={5} dash="10 9" />
      <line x1="96" y1="118" x2="96" y2="168" stroke={accent} strokeWidth="4" opacity="0.5" />
      <line x1="62" y1="168" x2="130" y2="168" stroke={accent} strokeWidth="2.5" opacity="0.3" />
      <Ball x={176} y={138} r={11} accent={accent} />
      <circle cx="22" cy="164" r="8" fill={accent} opacity="0.35" />
    </g>
  )
}

function MindMotif({ accent, vi = 0 }) {
  // A radar: quiet concentric rings, one bright arc sweeping part of a ring,
  // the focal point burning at the arc's end. Variants move the sweep so the
  // mental-game row stays distinguishable at a glance.
  const V = [
    { arc: 'M 39.4 65 A 70 70 0 0 1 135 39.4',    fx: 135,   fy: 39.4,  ticks: true },
    { arc: 'M 143.3 75 A 50 50 0 0 1 125 143.3',  fx: 125,   fy: 143.3, ticks: false },
    { arc: 'M 65 160.6 A 70 70 0 0 1 34.2 76.1',  fx: 34.2,  fy: 76.1,  ticks: false },
    { arc: 'M 130 100 A 30 30 0 0 1 85 126',      fx: 85,    fy: 126,   ticks: true },
    { arc: 'M 56.7 125 A 50 50 0 0 1 91.3 50.8',  fx: 91.3,  fy: 50.8,  ticks: false },
    { arc: 'M 135 39.4 A 70 70 0 0 1 160.6 135',  fx: 160.6, fy: 135,   ticks: true },
    { arc: 'M 100 150 A 50 50 0 0 1 50.8 91.3',   fx: 50.8,  fy: 91.3,  ticks: false },
    { arc: 'M 74 85 A 30 30 0 0 1 126 85',        fx: 126,   fy: 85,    ticks: true },
  ][vi % 8]

  return (
    <g>
      {[30, 50, 70].map((r, i) => (
        <circle
          key={r}
          cx="100" cy="100" r={r}
          fill="none" stroke={accent}
          strokeWidth="2"
          opacity={0.16 + i * 0.06}
        />
      ))}
      <circle cx="100" cy="100" r="4.5" fill={accent} opacity="0.55" />
      <Glow d={V.arc} accent={accent} width={4.5} />
      <Ball x={V.fx} y={V.fy} r={9} accent={accent} />
      {V.ticks && (
        <g stroke={accent} strokeWidth="3" strokeLinecap="round" opacity="0.35">
          <line x1="100" y1="12" x2="100" y2="24" />
          <line x1="100" y1="176" x2="100" y2="188" />
          <line x1="12" y1="100" x2="24" y2="100" />
          <line x1="176" y1="100" x2="188" y2="100" />
        </g>
      )}
    </g>
  )
}

function PlanMotif({ accent, vi = 0 }) {
  // A session as time on a clock ring: 30, 45, 60, 90 minutes.
  const ARCS = [
    { d: 'M 100 38 A 62 62 0 0 1 154.3 129.9', ex: 154.3, ey: 129.9 }, // 120°
    { d: 'M 100 38 A 62 62 0 0 1 100 162',     ex: 100,   ey: 162 },   // 180°
    { d: 'M 100 38 A 62 62 0 1 1 38 100',      ex: 38,    ey: 100 },   // 270°
    { d: 'M 100 38 A 62 62 0 1 1 88.4 39.1',   ex: 88.4,  ey: 39.1 },  // ~350°
  ]
  const a = ARCS[vi % 4]

  return (
    <g>
      <circle cx="100" cy="100" r="62" fill="none" stroke="#FFFFFF" strokeWidth="9" opacity="0.06" />
      {/* quarter ticks */}
      {[[100, 26], [174, 100], [100, 174], [26, 100]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" fill={accent} opacity="0.35" />
      ))}
      <Glow d={a.d} accent={accent} width={9} />
      <circle cx={a.ex} cy={a.ey} r="7" fill={accent} />
      <circle cx="100" cy="100" r="6" fill={accent} opacity="0.5" />
    </g>
  )
}

function KidsMotif({ accent, vi = 0 }) {
  // A ball bouncing in decreasing arcs — the first thing a child learns to
  // read. The ball shrinks stage by stage: red foam down to yellow.
  const r = [21, 18, 15, 12][vi % 4]

  return (
    <g>
      <path
        d="M 10 156 Q 48 52, 86 156 Q 116 84, 146 156 Q 166 116, 186 156"
        fill="none" stroke={accent} strokeWidth="3.5" strokeLinecap="round"
        strokeDasharray="9 8" opacity="0.5"
      />
      <line x1="0" y1="156" x2="200" y2="156" stroke={accent} strokeWidth="2.5" opacity="0.35" />
      <Ball x={48} y={62} r={r} accent={accent} />
      <circle cx="116" cy="94" r={r * 0.62} fill={accent} opacity="0.55" />
      <circle cx="166" cy="122" r={r * 0.42} fill={accent} opacity="0.32" />
    </g>
  )
}

// ── Hero ────────────────────────────────────────────────────────────────────
// The hero is a wide banner with its own composition. Re-slicing a square
// tile into a 16:5 band crops it to an unreadable fragment.

export function HeroArt({ accent = '#4ade80' }) {
  return (
    <svg
      viewBox="0 0 1200 460"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#04140d" />
          <stop offset="55%" stopColor="#062b1c" />
          <stop offset="100%" stopColor="#0b3f2a" />
        </linearGradient>
        <radialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="460" fill="url(#hero-bg)" />
      <circle cx="880" cy="200" r="300" fill="url(#hero-glow)" />

      {/* Court in perspective, anchored right so the copy sits clear of it */}
      <g stroke={accent} fill="none" opacity="0.45">
        <path d="M 700 430 L 1140 430 L 1010 120 L 800 120 Z" strokeWidth="2.5" opacity="0.55" />
        <line x1="742" y1="330" x2="1092" y2="330" strokeWidth="2" opacity="0.4" />
        <line x1="782" y1="240" x2="1052" y2="240" strokeWidth="1.5" opacity="0.3" />
        <line x1="905" y1="430" x2="905" y2="120" strokeWidth="1.5" opacity="0.25" />
      </g>

      {/* Net */}
      <g opacity="0.5">
        <line x1="726" y1="372" x2="1112" y2="372" stroke={accent} strokeWidth="4" />
        {Array.from({ length: 18 }).map((_, i) => (
          <line
            key={i}
            x1={730 + i * 22} y1="372" x2={730 + i * 22} y2="410"
            stroke={accent} strokeWidth="1" opacity="0.35"
          />
        ))}
      </g>

      {/* Ball trajectories crossing the court */}
      <path d="M 770 420 C 840 320, 940 220, 1030 140" stroke={accent} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.9" />
      <path d="M 1060 420 C 980 330, 880 230, 806 150" stroke={accent} strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="12 10" opacity="0.45" />
      <path d="M 700 250 C 800 210, 900 280, 1000 250" stroke={accent} strokeWidth="2" fill="none" strokeDasharray="8 10" opacity="0.25" />

      <circle cx="1030" cy="140" r="17" fill={accent} />
      <circle cx="1030" cy="140" r="32" fill="none" stroke={accent} strokeWidth="2" opacity="0.3" />
      <circle cx="806" cy="150" r="9" fill={accent} opacity="0.45" />

      {/* Faint grid tying the hero to the card set */}
      <g opacity="0.05" stroke="#ffffff" strokeWidth="1.5">
        <line x1="0" y1="118" x2="1200" y2="118" />
        <line x1="0" y1="342" x2="1200" y2="342" />
        <line x1="300" y1="0" x2="300" y2="460" />
        <line x1="620" y1="0" x2="620" y2="460" />
      </g>
    </svg>
  )
}

const MOTIFS = {
  stroke: StrokeMotif,
  slice: SliceMotif,
  serve: ServeMotif,
  court: CourtMotif,
  net: NetMotif,
  figure: FigureMotif,
  arc: ArcMotif,
  mind: MindMotif,
  plan: PlanMotif,
  kids: KidsMotif,
}

// ── Tile ────────────────────────────────────────────────────────────────────

export default function CardArt({ card, vi = 0 }) {
  const { key, motif = 'court', palette, flip, variant } = card
  const Motif = MOTIFS[motif] ?? CourtMotif
  const accent = palette?.accent ?? '#4ade80'

  // Gradient ids must be unique per card — duplicate ids across inline SVGs
  // make every card render the first card's gradient.
  const bgId = `bg-${key}`
  const gloId = `glo-${key}`
  const vigId = `vig-${key}`

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Near-black surface with the category's dark tint pooling top-left.
            The luminous accent stroke carries the colour — a bright surface
            under it reads as candy, not court-at-night. */}
        <linearGradient id={bgId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette?.from ?? '#052e16'} />
          <stop offset="80%" stopColor="#0A0C10" />
        </linearGradient>
        <radialGradient id={gloId} cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.12" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={vigId} cx="50%" cy="50%" r="72%">
          <stop offset="62%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
        </radialGradient>
      </defs>

      <rect width={W} height={H} fill={`url(#${bgId})`} />
      <rect width={W} height={H} fill={`url(#${gloId})`} />

      {/* Faint court grid behind every motif — the shared thread across the set */}
      <g opacity="0.06" stroke="#ffffff" strokeWidth="1.2" fill="none">
        <line x1="0" y1="58" x2={W} y2="58" />
        <line x1="0" y1="142" x2={W} y2="142" />
        <line x1="58" y1="0" x2="58" y2={H} />
        <line x1="142" y1="0" x2="142" y2={H} />
      </g>

      <Motif accent={accent} flip={flip} variant={variant} vi={vi} />

      <rect width={W} height={H} fill={`url(#${vigId})`} />
    </svg>
  )
}
