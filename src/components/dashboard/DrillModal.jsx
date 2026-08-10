// ─────────────────────────────────────────────────────────────────────────────
// Drill detail modal.
//
// Shared by the full library (Drills.jsx) and the per-category screens
// (DrillCategory.jsx), so it lives on its own rather than in either page.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect } from 'react'
import {
  X, Clock, Users, MapPin, Target, AlertTriangle, Shuffle, Quote, ListOrdered,
} from 'lucide-react'
import CourtDiagram, { CourtLegend } from '../CourtDiagram'
import { LEVEL_STYLES, TYPE_LABELS } from '../../config/drillMeta'

// ── Drill detail modal ──────────────────────────────────────────────────────

// A drill is read on a phone, on court, mid-lesson. So the order below follows
// the order a coach needs it: where everyone stands, what to run, what to say,
// what to watch for, and only then how to progress it.

function Section({ icon: Icon, title, accent = 'text-green-500', children }) {
  return (
    <section className="px-5 py-5 border-t border-gray-800 first:border-t-0">
      <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-3">
        <Icon className={`w-3.5 h-3.5 ${accent}`} />
        {title}
      </h3>
      {children}
    </section>
  )
}

// Numbered steps: the numeral is the anchor a coach uses to find their place
// again after looking up at the court.
function Steps({ items }) {
  return (
    <ol className="space-y-3">
      {items.map((step, i) => (
        <li key={i} className="flex gap-3">
          <span className="shrink-0 w-6 h-6 rounded-full bg-green-500/15 text-green-400 text-xs font-bold flex items-center justify-center mt-px">
            {i + 1}
          </span>
          <p className="text-gray-300 text-sm leading-relaxed">{step}</p>
        </li>
      ))}
    </ol>
  )
}

// Cues are the words a coach says out loud, so they're set as quotes.
function Cues({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((cue, i) => (
        <li
          key={i}
          className="border-l-2 border-green-500/40 pl-3 text-gray-300 text-sm leading-relaxed italic"
        >
          {cue}
        </li>
      ))}
    </ul>
  )
}

function Bullets({ items, dot }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5">
          <span className={`shrink-0 w-1.5 h-1.5 rounded-full mt-1.5 ${dot}`} />
          <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
        </li>
      ))}
    </ul>
  )
}

export default function DrillModal({ drill, onClose }) {
  // Escape to close, and lock the page behind the sheet so the drill scrolls
  // instead of the library underneath it.
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  if (!drill) return null

  const has = (arr) => Array.isArray(arr) && arr.length > 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={drill.name}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div
        className="relative z-10 bg-gray-900 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden shadow-2xl animate-zoom-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header — the drill name stays visible while the body scrolls */}
        <header className="shrink-0 flex items-start gap-3 px-5 py-4 border-b border-gray-800 bg-gray-900/95 backdrop-blur">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                  LEVEL_STYLES[drill.level] ?? 'bg-gray-700 text-gray-300'
                }`}
              >
                {drill.level}
              </span>
              <span className="text-[10px] bg-gray-800 text-gray-400 font-semibold px-2 py-0.5 rounded-full">
                {TYPE_LABELS[drill.type] ?? drill.type}
              </span>
              {drill.subcategory && (
                <span className="text-[10px] text-gray-500 font-medium hidden sm:inline">
                  {drill.subcategory}
                </span>
              )}
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-white leading-snug">
              {drill.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close drill"
            className="shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        <div className="overflow-y-auto overscroll-contain">
          {/* Court diagram. The SVG is viewBox="0 0 400 920" — a real court seen
              from above is roughly 1:2.3 — so the box is pinned to that ratio.
              Left full-width it letterboxes, showing a small court stranded in a
              wide green slab. */}
          <div className="bg-gray-950 flex justify-center pt-5 pb-4">
            <div className="h-[290px] sm:h-[360px] aspect-[400/920] rounded-xl overflow-hidden border border-emerald-500/10 shadow-lg">
              <CourtDiagram type={drill.diagram_type} diagramData={drill.diagram_data} />
            </div>
          </div>
          <div className="px-5 pb-5 bg-gray-950">
            <div className="rounded-xl overflow-hidden">
              <CourtLegend />
            </div>
          </div>

          {/* At-a-glance meta */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 px-5 py-4 border-b border-gray-800 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-green-500" />
              {drill.duration_min ?? 10} min
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-green-500" />
              <span className="capitalize">{drill.group_size}</span>
            </span>
            {drill.category && (
              <span className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-green-500" />
                {drill.category}
              </span>
            )}
          </div>

          {/* Why run it. Falls back to `description` for rows seeded before the
              objective column existed. */}
          {(drill.objective || drill.description) && (
            <Section icon={Target} title="Objective">
              <p className="text-gray-300 text-sm leading-relaxed">
                {drill.objective || drill.description}
              </p>
            </Section>
          )}

          {drill.setup && (
            <Section icon={MapPin} title="Setup">
              <p className="text-gray-300 text-sm leading-relaxed">{drill.setup}</p>
            </Section>
          )}

          {has(drill.instructions) && (
            <Section icon={ListOrdered} title="How to run it">
              <Steps items={drill.instructions} />
            </Section>
          )}

          {has(drill.coaching_cues) && (
            <Section icon={Quote} title="Coaching cues">
              <Cues items={drill.coaching_cues} />
            </Section>
          )}

          {has(drill.common_errors) && (
            <Section icon={AlertTriangle} title="Watch for" accent="text-amber-500">
              <Bullets items={drill.common_errors} dot="bg-amber-500/70" />
            </Section>
          )}

          {has(drill.variations) && (
            <Section icon={Shuffle} title="Variations" accent="text-blue-400">
              <Bullets items={drill.variations} dot="bg-blue-400/70" />
            </Section>
          )}

          {has(drill.tags) && (
            <div className="px-5 py-5 border-t border-gray-800 flex flex-wrap gap-1.5">
              {drill.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-gray-500 bg-gray-800/70 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

