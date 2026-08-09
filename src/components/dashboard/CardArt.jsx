// ─────────────────────────────────────────────────────────────────────────────
// Poster artwork for dashboard cards.
//
// Bold, flat graphic illustration built from a shared geometric vocabulary, so
// thirty-odd cards read as one designed set rather than thirty separate images.
// Every motif works from the same rules: one accent colour, thick strokes, flat
// fills, court geometry as the underlying grid.
//
// Drawn at 200×300 (2:3 poster) and scaled by the card.
//
// When generated artwork arrives, a card with an `image` field renders that
// instead — see PosterCard. Nothing else has to change.
// ─────────────────────────────────────────────────────────────────────────────

const W = 200
const H = 300

// ── Motifs ──────────────────────────────────────────────────────────────────
// Each receives the accent colour and returns bare SVG children. They are drawn
// large and allowed to bleed off the edges — cropping is what stops a flat
// illustration reading as a clip-art icon.

function StrokeMotif({ accent, flip }) {
  // A swing path through the contact point, with the ball at the finish.
  return (
    <g transform={flip ? `translate(${W},0) scale(-1,1)` : undefined}>
      <path
        d="M -10 250 C 60 250, 130 210, 165 120"
        fill="none"
        stroke={accent}
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M 10 265 C 75 265, 140 225, 178 135"
        fill="none"
        stroke={accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.35"
        strokeDasharray="10 9"
      />
      <circle cx="165" cy="120" r="15" fill={accent} />
      <circle cx="165" cy="120" r="27" fill="none" stroke={accent} strokeWidth="2" opacity="0.35" />
    </g>
  )
}

function SliceMotif({ accent }) {
  // A flat, skidding trajectory with under-spin lines beneath it.
  return (
    <g>
      <path
        d="M -10 130 C 60 118, 140 132, 215 112"
        fill="none"
        stroke={accent}
        strokeWidth="7"
        strokeLinecap="round"
      />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M ${20 + i * 12} ${168 + i * 22} C ${80 + i * 10} ${156 + i * 22}, ${140} ${172 + i * 22}, ${196} ${152 + i * 22}`}
          fill="none"
          stroke={accent}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity={0.32 - i * 0.08}
        />
      ))}
      <circle cx="196" cy="112" r="13" fill={accent} />
    </g>
  )
}

function ServeMotif({ accent, vi = 0 }) {
  // Toss up, strike down. The variant shifts toss height and spin path so a row
  // of serve cards doesn't read as the same picture five times.
  const V = [
    { tx: 128, ty: 58, land: 92, spin: 'M 128 90 C 150 140, 140 200, 104 246' },
    { tx: 108, ty: 44, land: 140, spin: 'M 108 78 C 74 132, 96 196, 138 244' },
    { tx: 142, ty: 72, land: 70, spin: 'M 142 102 C 178 148, 128 206, 82 248' },
    { tx: 96, ty: 62, land: 128, spin: 'M 96 94 C 66 148, 100 204, 132 246' },
    { tx: 124, ty: 40, land: 104, spin: 'M 124 74 C 156 130, 132 198, 112 244' },
  ][vi % 5]

  return (
    <g>
      <circle cx={V.tx} cy={V.ty} r="16" fill={accent} />
      <circle cx={V.tx} cy={V.ty} r="28" fill="none" stroke={accent} strokeWidth="2" opacity="0.3" />
      <path
        d={`M ${V.tx} ${V.ty} L ${V.land} 232`}
        stroke={accent}
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d={V.spin}
        fill="none"
        stroke={accent}
        strokeWidth="2.5"
        strokeDasharray="9 8"
        opacity="0.4"
      />
      {/* service box */}
      <path d="M 30 250 L 170 250 L 200 300 L 0 300 Z" fill={accent} opacity="0.12" />
      <path d="M 30 250 L 170 250 L 200 300 L 0 300 Z" fill="none" stroke={accent} strokeWidth="2" opacity="0.35" />
    </g>
  )
}

function CourtMotif({ accent, variant }) {
  // Court seen from above with a ball path across it. `tactics` adds a second,
  // opposing path — the visual shorthand for a rally pattern.
  return (
    <g>
      <g opacity="0.5">
        <rect x="38" y="70" width="124" height="180" fill="none" stroke={accent} strokeWidth="2.5" opacity="0.5" />
        <line x1="38" y1="160" x2="162" y2="160" stroke={accent} strokeWidth="3" opacity="0.7" />
        <line x1="100" y1="70" x2="100" y2="250" stroke={accent} strokeWidth="1.5" opacity="0.3" />
        <line x1="38" y1="112" x2="162" y2="112" stroke={accent} strokeWidth="1.5" opacity="0.3" />
        <line x1="38" y1="208" x2="162" y2="208" stroke={accent} strokeWidth="1.5" opacity="0.3" />
      </g>
      <path
        d="M 58 238 C 96 200, 120 130, 150 84"
        fill="none"
        stroke={accent}
        strokeWidth="6"
        strokeLinecap="round"
      />
      {variant === 'tactics' && (
        <path
          d="M 148 240 C 116 198, 88 132, 56 86"
          fill="none"
          stroke={accent}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="10 8"
          opacity="0.45"
        />
      )}
      {variant === 'doubles' ? (
        <>
          <circle cx="72" cy="196" r="10" fill={accent} />
          <circle cx="128" cy="196" r="10" fill={accent} />
          <circle cx="72" cy="120" r="8" fill={accent} opacity="0.4" />
          <circle cx="128" cy="120" r="8" fill={accent} opacity="0.4" />
        </>
      ) : (
        <circle cx="150" cy="84" r="12" fill={accent} />
      )}
    </g>
  )
}

function NetMotif({ accent }) {
  // Net band with the ball punched above it.
  return (
    <g>
      <line x1="0" y1="190" x2="200" y2="190" stroke={accent} strokeWidth="5" opacity="0.9" />
      <rect x="0" y="190" width="200" height="52" fill={accent} opacity="0.1" />
      {Array.from({ length: 11 }).map((_, i) => (
        <line
          key={i}
          x1={i * 20}
          y1="190"
          x2={i * 20}
          y2="242"
          stroke={accent}
          strokeWidth="1.5"
          opacity="0.28"
        />
      ))}
      <line x1="0" y1="242" x2="200" y2="242" stroke={accent} strokeWidth="2" opacity="0.4" />
      <path
        d="M 42 150 C 80 120, 130 118, 176 138"
        fill="none"
        stroke={accent}
        strokeWidth="2.5"
        strokeDasharray="9 8"
        opacity="0.45"
      />
      <circle cx="132" cy="120" r="16" fill={accent} />
    </g>
  )
}

function FigureMotif({ accent, vi = 0 }) {
  // An athlete abstracted to a head and angled limbs. Each variant is a
  // genuinely different pose — otherwise a row of physical-training cards is
  // the same silhouette in five colours.
  const POSES = [
    // lunge
    { head: [112, 86], torso: 'M 112 106 L 106 166', legs: ['M 106 166 L 66 220', 'M 106 166 L 152 210'], arms: ['M 110 122 L 66 142', 'M 110 122 L 156 106'] },
    // sprint
    { head: [122, 78], torso: 'M 122 98 L 104 158', legs: ['M 104 158 L 128 224', 'M 104 158 L 60 202'], arms: ['M 116 116 L 158 138', 'M 116 116 L 74 96'] },
    // jump
    { head: [100, 68], torso: 'M 100 88 L 100 148', legs: ['M 100 148 L 70 200', 'M 100 148 L 132 200'], arms: ['M 100 102 L 58 62', 'M 100 102 L 142 62'] },
    // reach / stretch
    { head: [104, 92], torso: 'M 104 112 L 108 174', legs: ['M 108 174 L 88 232', 'M 108 174 L 138 228'], arms: ['M 105 128 L 74 176', 'M 105 128 L 148 70'] },
    // recover / low stance
    { head: [100, 104], torso: 'M 100 124 L 100 170', legs: ['M 100 170 L 62 212', 'M 100 170 L 138 212'], arms: ['M 100 136 L 62 158', 'M 100 136 L 138 158'] },
  ]
  const p = POSES[vi % POSES.length]

  return (
    <g>
      <circle cx={p.head[0]} cy={p.head[1]} r="17" fill={accent} />
      <path d={p.torso} stroke={accent} strokeWidth="8" strokeLinecap="round" />
      {p.legs.map((d) => (
        <path key={d} d={d} stroke={accent} strokeWidth="8" strokeLinecap="round" />
      ))}
      {p.arms.map((d) => (
        <path key={d} d={d} stroke={accent} strokeWidth="7" strokeLinecap="round" />
      ))}
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1={14 + i * 8}
          y1={126 + i * 30}
          x2={50 + i * 8}
          y2={126 + i * 30}
          stroke={accent}
          strokeWidth="4"
          strokeLinecap="round"
          opacity={0.28 - i * 0.07}
        />
      ))}
    </g>
  )
}

function ArcMotif({ accent }) {
  // A high lob clearing the net and dropping steeply — drop shot's opposite.
  return (
    <g>
      <path
        d="M 24 250 C 48 96, 156 96, 182 214"
        fill="none"
        stroke={accent}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="12 10"
      />
      <line x1="96" y1="164" x2="96" y2="250" stroke={accent} strokeWidth="4" opacity="0.55" />
      <line x1="60" y1="250" x2="132" y2="250" stroke={accent} strokeWidth="2.5" opacity="0.4" />
      <circle cx="182" cy="214" r="14" fill={accent} />
      <circle cx="24" cy="250" r="9" fill={accent} opacity="0.4" />
    </g>
  )
}

function MindMotif({ accent, vi = 0 }) {
  // A target narrowing on a point. Variants shift how far off-centre the mark
  // sits and how many rings close around it, so the eight mental-game cards
  // stay distinguishable at a glance.
  const V = [
    { rings: [76, 58, 40], mx: 100, my: 162, ticks: true },
    { rings: [80, 52], mx: 128, my: 138, ticks: false },
    { rings: [70, 54, 38, 22], mx: 100, my: 162, ticks: false },
    { rings: [84, 44], mx: 74, my: 186, ticks: true },
    { rings: [64, 46, 28], mx: 118, my: 190, ticks: false },
    { rings: [88, 66, 44], mx: 82, my: 132, ticks: true },
    { rings: [72, 36], mx: 100, my: 162, ticks: false },
    { rings: [78, 60, 42, 24], mx: 130, my: 178, ticks: true },
  ][vi % 8]

  return (
    <g>
      {V.rings.map((r, i) => (
        <circle
          key={r}
          cx="100"
          cy="162"
          r={r}
          fill="none"
          stroke={accent}
          strokeWidth={2 + i * 0.8}
          opacity={0.16 + i * 0.12}
        />
      ))}
      <circle cx={V.mx} cy={V.my} r="18" fill={accent} />
      {V.ticks && (
        <>
          <line x1="100" y1="48" x2="100" y2="72" stroke={accent} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
          <line x1="100" y1="252" x2="100" y2="276" stroke={accent} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
          <line x1="10" y1="162" x2="34" y2="162" stroke={accent} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
          <line x1="166" y1="162" x2="190" y2="162" stroke={accent} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
        </>
      )}
    </g>
  )
}

function PlanMotif({ accent }) {
  // Stacked blocks reading as a session broken into timed segments.
  const blocks = [
    { y: 88, w: 118 },
    { y: 128, w: 84 },
    { y: 168, w: 138 },
    { y: 208, w: 66 },
  ]
  return (
    <g>
      {blocks.map((b, i) => (
        <g key={b.y}>
          <rect x="34" y={b.y} width={b.w} height="20" rx="10" fill={accent} opacity={i === 2 ? 0.9 : 0.32} />
        </g>
      ))}
      <line x1="34" y1="66" x2="166" y2="66" stroke={accent} strokeWidth="3" opacity="0.5" />
      <line x1="34" y1="252" x2="166" y2="252" stroke={accent} strokeWidth="3" opacity="0.5" />
    </g>
  )
}

function KidsMotif({ accent }) {
  // A ball bouncing in decreasing arcs — the first thing a child learns to read.
  return (
    <g>
      <path
        d="M 12 244 Q 52 118, 92 244 Q 124 152, 156 244 Q 178 190, 198 244"
        fill="none"
        stroke={accent}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="10 9"
        opacity="0.55"
      />
      <line x1="0" y1="244" x2="200" y2="244" stroke={accent} strokeWidth="3" opacity="0.45" />
      <circle cx="52" cy="128" r="21" fill={accent} />
      <circle cx="124" cy="162" r="14" fill={accent} opacity="0.6" />
      <circle cx="178" cy="196" r="9" fill={accent} opacity="0.38" />
    </g>
  )
}

// ── Hero ────────────────────────────────────────────────────────────────────
// The hero is a wide banner, so it needs its own composition. Re-slicing a 2:3
// poster into a 16:5 band crops it to an unreadable fragment.

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
            x1={730 + i * 22}
            y1="372"
            x2={730 + i * 22}
            y2="410"
            stroke={accent}
            strokeWidth="1"
            opacity="0.35"
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

// ── Poster ──────────────────────────────────────────────────────────────────

export default function CardArt({ card, vi = 0 }) {
  const { key, motif = 'court', palette, flip, variant } = card
  const Motif = MOTIFS[motif] ?? CourtMotif
  const accent = palette?.accent ?? '#4ade80'

  // Gradient ids must be unique per card — duplicate ids across inline SVGs
  // make every card render the first card's gradient.
  const gradId = `bg-${key}`

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette?.from ?? '#052e16'} />
          <stop offset="100%" stopColor={palette?.to ?? '#14532d'} />
        </linearGradient>
      </defs>

      <rect width={W} height={H} fill={`url(#${gradId})`} />

      {/* Faint court grid behind every motif — the shared thread across the set */}
      <g opacity="0.07" stroke="#ffffff" strokeWidth="1.5" fill="none">
        <line x1="0" y1="76" x2={W} y2="76" />
        <line x1="0" y1="224" x2={W} y2="224" />
        <line x1="52" y1="0" x2="52" y2={H} />
        <line x1="148" y1="0" x2="148" y2={H} />
      </g>

      <Motif accent={accent} flip={flip} variant={variant} vi={vi} />
    </svg>
  )
}
