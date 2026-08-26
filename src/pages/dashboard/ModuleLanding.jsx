import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import CardArt from '../../components/dashboard/CardArt'
import { ModuleTheme } from '../../components/dashboard/content/Blocks'
import { getModule } from '../../config/modules'
import { MODULE_CARDS } from '../../config/catalog'
import { getModuleContent } from '../../content/modules'

// ─────────────────────────────────────────────────────────────────────────────
// Generic landing for a content module — the same shape the drill library
// uses: an index of parts, not a wall of prose. Each part card routes to its
// own screen; the primer below the grid holds the module-wide foundations
// that don't belong to any single part.
// ─────────────────────────────────────────────────────────────────────────────

function PartCard({ card, part, index, vi, onOpen }) {
  const accent = card.palette?.accent ?? '#4ade80'

  return (
    <button
      onClick={onOpen}
      className="group relative flex items-center gap-4 p-3 sm:p-3.5 bg-ink-900 border border-white/[0.06] rounded-2xl overflow-hidden text-left transition-colors duration-200 hover:border-white/[0.15] hover:bg-ink-850 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 cursor-pointer"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(130% 130% at 0% 50%, ${accent}1A 0%, transparent 60%)` }}
      />

      <div className="relative w-[76px] h-[76px] sm:w-[88px] sm:h-[88px] shrink-0 rounded-xl overflow-hidden bg-ink-800">
        <div className="w-full h-full transition-transform duration-300 group-hover:scale-[1.06]">
          <CardArt card={card} vi={vi} />
        </div>
      </div>

      <div className="relative flex-1 min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] mb-1" style={{ color: accent }}>
          Part {index + 1}
        </p>
        <h3 className="text-white font-bold text-[15px] sm:text-base tracking-tight leading-snug">
          {card.title}
        </h3>
        <p className="text-gray-500 text-xs mt-1 leading-relaxed line-clamp-2">
          {part.summary}
        </p>
      </div>

      <ChevronRight className="relative w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-0.5 transition shrink-0" />
    </button>
  )
}

export default function ModuleLanding({ moduleId }) {
  const navigate = useNavigate()
  const module = getModule(moduleId)
  const cards = MODULE_CARDS[moduleId] ?? []
  const content = getModuleContent(moduleId)

  if (!module || !content) return null

  const totalMinutes = content.parts.reduce((n, p) => n + (p.minutes ?? 0), 0)
  const Intro = content.Intro

  return (
    <div className="min-h-full bg-ink-950 pt-14">
      {/* Soft accent wash behind the header, same recipe as the drill screens */}
      <div
        style={{
          background: `radial-gradient(90% 140% at 15% 0%, ${content.washFrom}B3 0%, rgba(8,9,11,0) 65%)`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-2">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1 text-gray-400 hover:text-white text-[13px] font-medium mb-5 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Dashboard
          </button>

          <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: content.accent }}>
            {module.subtitle}
          </p>
          <h1 className="text-white text-3xl sm:text-[40px] font-extrabold tracking-tight leading-tight">
            {module.title}
          </h1>
          <p className="text-gray-400 text-sm sm:text-[15px] mt-2 max-w-xl leading-relaxed">
            {content.tagline ?? module.description}
          </p>
          <p className="flex items-center gap-1.5 text-gray-500 text-xs mt-3 tabular-nums">
            {content.parts.length} parts
            {totalMinutes > 0 && (
              <>
                <span className="text-gray-700">·</span>
                <Clock className="w-3 h-3" />
                {totalMinutes} min total
              </>
            )}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        {/* Part index */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-6">
          {content.parts.map((part, i) => {
            const card = cards.find((c) => c.key === part.key)
            if (!card) return null
            return (
              <PartCard
                key={part.key}
                card={card}
                part={part}
                index={i}
                vi={i}
                onOpen={() => navigate(`${module.route}/${part.key}`)}
              />
            )
          })}
        </div>

        {/* Module-wide primer */}
        {Intro && (
          <div className="pb-16 pt-2">
            <ModuleTheme accent={content.accent}>
              <Intro />
            </ModuleTheme>
          </div>
        )}
        {!Intro && <div className="pb-12" />}
      </div>
    </div>
  )
}
