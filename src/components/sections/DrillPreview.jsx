import CourtDiagram from '../CourtDiagram'
import { ArrowRight } from 'lucide-react'

const DRILLS = [
  {
    name: 'Cross-Court Forehand Rally',
    type: 'Forehand',
    level: 'Intermediate',
    diagramType: 'crosscourt_fh_rally',
  },
  {
    name: 'Inside-Out Forehand Attack',
    type: 'Forehand',
    level: 'Advanced',
    diagramType: 'inside_out_attack',
  },
  {
    name: 'Serve & Volley Wide',
    type: 'Serve',
    level: 'Advanced',
    diagramType: 'serve_volley_wide',
  },
  {
    name: 'Approach & Punch Volley',
    type: 'Volley',
    level: 'Intermediate',
    diagramType: 'approach_punch_volley',
  },
  {
    name: 'Backhand Down-the-Line',
    type: 'Backhand',
    level: 'Intermediate',
    diagramType: 'backhand_dtl',
  },
  {
    name: 'Return Cross-Court',
    type: 'Return',
    level: 'Intermediate',
    diagramType: 'return_cc_deuce',
  },
  {
    name: 'Defensive Slice Recovery',
    type: 'Groundstrokes',
    level: 'Beginner',
    diagramType: 'defensive_slice',
  },
  {
    name: 'Overhead Retreat',
    type: 'Volley',
    level: 'Advanced',
    diagramType: 'overhead_retreat',
  },
  {
    name: 'Lateral Sprint Defense',
    type: 'Footwork',
    level: 'Beginner',
    diagramType: 'lateral_sprint_defense',
  },
  {
    name: 'Kick Serve to T (Ad)',
    type: 'Serve',
    level: 'Advanced',
    diagramType: 'serve_kick_t_ad',
  },
]

const LEVEL_COLORS = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced: 'bg-red-100 text-red-700',
}

const DOUBLED = [...DRILLS, ...DRILLS]

export default function DrillPreview({ onCtaClick }) {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
          From the Drill Library
        </h2>
        <p className="text-slate-500 text-base max-w-lg mx-auto">
          Every drill includes a visual court diagram. Here&rsquo;s what&rsquo;s inside.
        </p>
      </div>

      <div className="flex gap-3 animate-marquee-slow w-max mb-10">
        {DOUBLED.map(({ name, type, level, diagramType }, i) => (
          <div
            key={i}
            className="w-36 shrink-0 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col"
          >
            <div style={{ aspectRatio: '400/920' }} className="w-full">
              <CourtDiagram type={diagramType} />
            </div>
            <div className="p-2.5 flex flex-col gap-1">
              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full w-fit ${LEVEL_COLORS[level]}`}
              >
                {level}
              </span>
              <p className="text-[11px] font-bold text-slate-800 leading-tight">{name}</p>
              <p className="text-[10px] text-slate-400">{type}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center px-4">
        <p className="text-slate-400 text-sm mb-4">…and 190+ more drills inside the platform</p>
        <button
          onClick={onCtaClick}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-lg shadow-green-500/20 transition-all duration-200 hover:-translate-y-0.5 group"
        >
          Unlock the full library — $27
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  )
}
