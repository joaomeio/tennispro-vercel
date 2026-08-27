import CardArt, { HeroArt } from '../dashboard/CardArt'
import { DRILL_CATEGORIES, MODULE_CARDS } from '../../config/catalog'
import { DRILL_COUNT } from '../../config/plans'

// ─────────────────────────────────────────────────────────────────────────────
// The app, open on a phone — the hero's proof shot.
//
// The screen is the real dashboard rendered small (same CardArt drawings, same
// ink surfaces, same catalog data) rather than a flat screenshot, so it stays
// sharp at any density and can't drift out of date when the library changes.
// ─────────────────────────────────────────────────────────────────────────────

const ROWS = [
  {
    title: 'Drill Library',
    meta: `${DRILL_COUNT} drills`,
    cards: DRILL_CATEGORIES.filter((c) => ['forehand', 'serve', 'volley'].includes(c.key)),
  },
  {
    title: 'Kids Tennis Manual',
    meta: 'Ages 4–14',
    cards: (MODULE_CARDS['tennis-kids'] ?? []).slice(0, 3),
  },
]

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-2.5 pb-1 text-white">
      <span className="text-[9px] font-semibold tracking-tight tabular-nums">9:41</span>
      <div className="flex items-center gap-[3px]">
        {[3, 5, 7, 9].map((h) => (
          <span key={h} className="w-[2px] rounded-sm bg-white/80" style={{ height: h }} />
        ))}
        <span className="ml-1 w-[15px] h-[8px] rounded-[2px] border border-white/60 p-[1px] flex">
          <span className="flex-1 rounded-[1px] bg-white/80" />
        </span>
      </div>
    </div>
  )
}

function Tile({ card }) {
  return (
    <div className="shrink-0 w-[62px]">
      <div className="aspect-square rounded-[10px] overflow-hidden border border-white/[0.06] bg-ink-850">
        <CardArt card={{ ...card, key: `phone-${card.key}` }} />
      </div>
      <p className="mt-1 text-[7px] font-semibold text-gray-200 leading-none truncate">
        {card.title}
      </p>
      <p className="mt-[3px] text-[6px] text-gray-500 leading-none tabular-nums">
        {card.count != null ? `${card.count} drills` : card.subtitle}
      </p>
    </div>
  )
}

export default function AppPhone() {
  return (
    <div className="relative w-full max-w-[264px] mx-auto">
      {/* Court-green glow so the dark device doesn't punch a hole in the page */}
      <div
        className="absolute -inset-10 -z-10 rounded-full blur-3xl opacity-60"
        style={{
          background:
            'radial-gradient(circle at 50% 35%, rgba(34,197,94,0.28), rgba(59,130,246,0.12) 55%, transparent 72%)',
        }}
      />

      {/* Device */}
      <div className="relative rounded-[2.6rem] bg-gradient-to-b from-slate-700 via-slate-900 to-slate-950 p-[7px] shadow-[0_30px_60px_-18px_rgba(15,23,42,0.55)] ring-1 ring-slate-900/10">
        {/* Side buttons */}
        <span className="absolute -left-[2px] top-[110px] w-[3px] h-9 rounded-l bg-slate-700" />
        <span className="absolute -left-[2px] top-[158px] w-[3px] h-9 rounded-l bg-slate-700" />
        <span className="absolute -right-[2px] top-[130px] w-[3px] h-14 rounded-r bg-slate-700" />

        {/* Screen */}
        <div className="relative aspect-[9/18.5] overflow-hidden rounded-[2.15rem] bg-ink-950 font-app antialiased">
          {/* Dynamic island */}
          <div className="absolute top-[9px] left-1/2 -translate-x-1/2 z-20 w-[64px] h-[17px] rounded-full bg-black" />

          <div className="relative h-full flex flex-col">
            <StatusBar />

            {/* App top nav */}
            <div className="flex items-center justify-between px-3.5 pt-1.5 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-[15px] h-[15px] rounded-[5px] bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <span className="text-ink-950 text-[6px] font-extrabold leading-none">TP</span>
                </span>
                <span className="text-white text-[9px] font-extrabold tracking-tight">TennisPro</span>
              </div>
              <span className="w-[15px] h-[15px] rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                <span className="text-green-400 text-[6px] font-bold leading-none">J</span>
              </span>
            </div>

            {/* Hero band */}
            <div className="relative h-[150px] shrink-0">
              <div className="absolute inset-0">
                <HeroArt />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/20 to-transparent" />

              <div className="relative h-full flex flex-col justify-end px-3.5 pb-3">
                <span className="text-green-400 text-[6px] font-black uppercase tracking-[0.22em] mb-1">
                  Your library
                </span>
                <p className="text-white text-[13px] font-extrabold leading-[1.1] tracking-tight mb-1.5">
                  {DRILL_COUNT} drills, ready
                  <br />
                  for your next lesson
                </p>
                <span className="inline-flex items-center gap-1 w-fit bg-white text-ink-950 text-[7px] font-bold rounded-md px-2 py-[5px]">
                  <svg viewBox="0 0 8 8" className="w-[6px] h-[6px] fill-ink-950" aria-hidden="true">
                    <path d="M1 0.5 L7 4 L1 7.5 Z" />
                  </svg>
                  Browse drills
                </span>
              </div>
            </div>

            {/* Rows */}
            <div className="flex-1 pt-3">
              {ROWS.map((row) => (
                <div key={row.title} className="mb-3.5">
                  <div className="flex items-baseline justify-between px-3.5 mb-1.5">
                    <p className="text-white text-[8px] font-bold tracking-tight">{row.title}</p>
                    <p className="text-gray-500 text-[6px] tabular-nums">{row.meta}</p>
                  </div>
                  <div className="flex gap-1.5 px-3.5">
                    {row.cards.map((card) => (
                      <Tile key={card.key} card={card} />
                    ))}
                    {/* Fourth tile cropped by the bezel — the row keeps going */}
                    <div className="shrink-0 w-[62px] aspect-square rounded-[10px] bg-ink-850 border border-white/[0.06]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Home indicator */}
            <div className="shrink-0 flex justify-center pb-2">
              <span className="w-[70px] h-[3px] rounded-full bg-white/25" />
            </div>
          </div>

          {/* Glass sheen */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.07] via-transparent to-white/[0.04]" />
        </div>
      </div>
    </div>
  )
}
