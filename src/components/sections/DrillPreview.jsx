import { ChevronRight } from 'lucide-react'

const DRILLS = [
  'Cross-Court Forehand Rally',
  'Serve + First Shot Pattern',
  'Approach Shot Ladder',
  'Volley Reaction Wall',
  'Two-Ball Live Feed',
  'Inside-Out Forehand Attack',
  'Backhand Slice Defense',
  'Serve & Return Game',
  'Red Ball Coordination Circuit',
  'Overhead Smash Drop',
]

export default function DrillPreview({ onCtaClick }) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Preview 10 Drills from the Library
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Every drill comes with a visual court diagram and step-by-step setup. Here&rsquo;s a
            taste of what&rsquo;s inside.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto mb-10">
          {DRILLS.map((drill, i) => (
            <div
              key={drill}
              className="flex items-center gap-3 bg-slate-50 rounded-xl px-5 py-3.5 border border-slate-100 hover:bg-brand-50 hover:border-brand-200 transition-colors duration-200 group cursor-default"
            >
              <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                {i + 1}
              </span>
              <span className="text-slate-700 font-medium text-sm group-hover:text-brand-800 transition-colors flex-1">
                {drill}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 transition-colors shrink-0" />
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-slate-400 text-sm mb-4">…and 190+ more drills inside the platform</p>
          <button
            onClick={onCtaClick}
            className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-800 font-bold text-sm underline underline-offset-2 transition-colors"
          >
            Unlock the full library for $27
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
