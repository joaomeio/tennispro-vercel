import CourtDiagram from '../CourtDiagram'
import { ArrowRight } from 'lucide-react'

const DRILLS = [
  {
    name: 'Cross-Court Forehand Rally',
    type: 'Forehand',
    level: 'Intermediate',
    desc: 'Sustain deep cross-court exchanges from the deuce side. Net clearance and depth past the service line.',
    diagramType: 'crosscourt_fh_rally',
  },
  {
    name: 'Inside-Out Forehand Attack',
    type: 'Forehand',
    level: 'Advanced',
    desc: 'Step around the backhand and redirect to the open court. Builds the signature weapon of aggressive baseliners.',
    diagramType: 'inside_out_attack',
  },
  {
    name: 'Serve & Volley Wide',
    type: 'Serve',
    level: 'Advanced',
    desc: 'Pull the opponent wide with a slice serve, then finish at net. Classic pattern for serve-and-volleyers.',
    diagramType: 'serve_volley_wide',
  },
  {
    name: 'Approach & Punch Volley',
    type: 'Volley',
    level: 'Intermediate',
    desc: 'Move through the service box on a short ball and put away the first volley. Full approach-to-finish sequence.',
    diagramType: 'approach_punch_volley',
  },
  {
    name: 'Backhand Down-the-Line',
    type: 'Backhand',
    level: 'Intermediate',
    desc: 'Set up wide and redirect down the line to wrong-foot a defensive opponent. High-percentage pattern.',
    diagramType: 'backhand_dtl',
  },
]

const LEVEL_COLORS = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced: 'bg-red-100 text-red-700',
}

export default function DrillPreview({ onCtaClick }) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            5 Drills from the Library
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Every drill includes a visual court diagram and step-by-step setup. This is exactly
            what you get inside.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {DRILLS.map(({ name, type, level, desc, diagramType }) => (
            <div
              key={name}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div style={{ aspectRatio: '400/920' }} className="w-full">
                <CourtDiagram type={diagramType} />
              </div>
              <div className="p-3 flex flex-col gap-1.5 flex-1">
                <div className="flex items-center gap-1 flex-wrap">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${LEVEL_COLORS[level]}`}
                  >
                    {level}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {type}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 leading-tight">{name}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed hidden md:block">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-slate-400 text-sm mb-4">…and 195+ more drills inside the platform</p>
          <button
            onClick={onCtaClick}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-lg shadow-green-500/20 transition-all duration-200 hover:-translate-y-0.5 group"
          >
            Unlock the full library — $27
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}
