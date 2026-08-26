// ─────────────────────────────────────────────────────────────────────────────
// One drill as a horizontal row card: court strip on the left, content right.
//
// Shared by the library's search results and the category screens so a drill
// looks identical wherever it appears.
//
// The court SVG is drawn portrait (viewBox 0 0 400 920). A narrow upright
// strip matches the artwork's own proportions; anything landscape letterboxes
// it into a thin band with dead margins either side.
// ─────────────────────────────────────────────────────────────────────────────

import { Clock, Users } from 'lucide-react'
import CourtDiagram from '../CourtDiagram'
import { LEVEL_DOTS } from '../../config/drillMeta'

// Height is pinned to what the court strip naturally occupies at this width
// (viewBox 400x920, so height = width x 2.3). Left to size itself the strip
// cannot stretch to match a taller text column, and cards with short titles
// show a dead band beneath the court.
export default function DrillRowCard({ drill, onClick, eyebrow }) {
  const steps = drill.instructions?.length ?? 0

  return (
    <button
      onClick={() => onClick(drill)}
      className="group flex h-[148px] sm:h-[166px] text-left bg-ink-900 rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.14] hover:bg-ink-850 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 cursor-pointer"
    >
      <div className="w-[64px] sm:w-[72px] shrink-0 border-r border-white/[0.05]">
        <CourtDiagram type={drill.diagram_type} diagramData={drill.diagram_data} />
      </div>

      <div className="flex-1 min-w-0 p-3 sm:p-4 flex flex-col">
        {eyebrow && (
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500 mb-1 truncate">
            {eyebrow}
          </span>
        )}

        <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 group-hover:text-green-400 transition-colors">
          {drill.name}
        </h3>

        <p className="text-gray-500 text-xs mt-1 line-clamp-2 leading-relaxed">
          {drill.objective || drill.description}
        </p>

        {/* mt-auto pins the meta row to the bottom, so it lines up across the
            row no matter how many lines the title takes. */}
        <div className="flex items-center gap-3 mt-auto pt-2.5 text-[11px] text-gray-500 tabular-nums">
          <span className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${LEVEL_DOTS[drill.level] ?? 'bg-gray-500'}`} />
            <span className="capitalize">{drill.level}</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {drill.duration_min ?? 10}m
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {drill.player_count <= 1 ? 'Solo' : drill.player_count}
          </span>
          {steps > 0 && <span className="ml-auto text-gray-600 hidden sm:inline">{steps} steps</span>}
        </div>
      </div>
    </button>
  )
}
