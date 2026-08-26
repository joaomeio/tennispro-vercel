import { useEffect } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import CardArt from '../../components/dashboard/CardArt'
import { ModuleTheme } from '../../components/dashboard/content/Blocks'
import { getModule } from '../../config/modules'
import { MODULE_CARDS } from '../../config/catalog'
import { getModuleContent } from '../../content/modules'

// ─────────────────────────────────────────────────────────────────────────────
// One part of a content module on its own screen — the same treatment a drill
// collection gets: identity header up top, the content itself, and continue
// navigation so the module reads as a course rather than loose pages.
// ─────────────────────────────────────────────────────────────────────────────

function ContinueCard({ label, card, onClick, direction = 'prev' }) {
  const isNext = direction === 'next'
  const art = (
    <div className="w-[52px] h-[52px] shrink-0 rounded-lg overflow-hidden bg-ink-800">
      <CardArt card={card} />
    </div>
  )
  const text = (
    <div className={`flex-1 min-w-0 ${isNext ? 'text-right' : 'text-left'}`}>
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500 mb-0.5">{label}</p>
      <p className="text-white font-semibold text-[13px] leading-snug truncate">{card.title}</p>
    </div>
  )

  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-3 w-full p-3 bg-ink-900 border border-white/[0.06] rounded-2xl transition-colors duration-200 hover:border-white/[0.15] hover:bg-ink-850 cursor-pointer"
    >
      {isNext ? (
        <>
          {text}
          {art}
          <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition shrink-0" />
        </>
      ) : (
        <>
          <ChevronLeft className="w-4 h-4 text-gray-600 group-hover:text-white transition shrink-0" />
          {art}
          {text}
        </>
      )}
    </button>
  )
}

export default function ModulePart({ moduleId }) {
  const navigate = useNavigate()
  const { partKey } = useParams()

  const module = getModule(moduleId)
  const cards = MODULE_CARDS[moduleId] ?? []
  const content = getModuleContent(moduleId)

  const index = content?.parts.findIndex((p) => p.key === partKey) ?? -1
  const part = index >= 0 ? content.parts[index] : null
  const card = part ? cards.find((c) => c.key === part.key) : null

  // New part, new scroll position — router keeps the scroll otherwise.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [partKey])

  if (!module || !content) return null
  if (!part || !card) return <Navigate to={module.route} replace />

  const accent = card.palette?.accent ?? '#4ade80'
  const prev = index > 0 ? content.parts[index - 1] : null
  const next = index < content.parts.length - 1 ? content.parts[index + 1] : null
  const prevCard = prev ? cards.find((c) => c.key === prev.key) : null
  const nextCard = next ? cards.find((c) => c.key === next.key) : null
  const Component = part.Component

  return (
    <div className="min-h-full bg-ink-950 pt-14">
      {/* Part header — art tile + title over the part's own accent wash */}
      <div
        style={{
          background: `radial-gradient(90% 140% at 15% 0%, ${card.palette?.from ?? '#052e16'}B3 0%, rgba(8,9,11,0) 65%)`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-6 sm:pt-8 pb-7">
          <button
            onClick={() => navigate(module.route)}
            className="flex items-center gap-1 text-gray-400 hover:text-white text-[13px] font-medium mb-5 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            {module.title}
          </button>

          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-[64px] h-[64px] sm:w-[84px] sm:h-[84px] shrink-0 rounded-2xl overflow-hidden bg-ink-800 border border-white/[0.08]">
              <CardArt card={card} />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1" style={{ color: accent }}>
                Part {index + 1} of {content.parts.length}
              </p>
              <h1 className="text-white font-extrabold text-2xl sm:text-4xl tracking-tight leading-tight">
                {card.title}
              </h1>
              <p className="flex items-center gap-1.5 text-gray-400 text-xs sm:text-sm mt-1.5">
                {part.minutes && (
                  <>
                    <Clock className="w-3.5 h-3.5" />
                    <span className="tabular-nums">{part.minutes} min read</span>
                    <span className="text-gray-600 mx-0.5">·</span>
                  </>
                )}
                {card.subtitle}
              </p>
              <span className="block w-10 h-[3px] rounded-full mt-3" style={{ backgroundColor: accent }} />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pb-10">
        <ModuleTheme accent={accent}>
          <div className="space-y-5">
            <Component />
          </div>
        </ModuleTheme>
      </div>

      {/* Continue navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-white/[0.06]">
          <div>
            {prevCard && (
              <ContinueCard
                label="Previous"
                card={prevCard}
                onClick={() => navigate(`${module.route}/${prev.key}`)}
              />
            )}
          </div>
          <div>
            {nextCard && (
              <ContinueCard
                label="Up next"
                card={nextCard}
                direction="next"
                onClick={() => navigate(`${module.route}/${next.key}`)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
