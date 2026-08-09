import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Search, X, Loader2, AlertCircle, ChevronRight, Clock, Users, ChevronLeft,
  MapPin, Target, AlertTriangle, Shuffle, Quote, ListOrdered,
} from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { getDrillCategory, matchesFilter } from '../../config/catalog'
import CourtDiagram, { CourtLegend } from '../../components/CourtDiagram'

const LEVEL_STYLES = {
  beginner:     'bg-green-900/60 text-green-300',
  intermediate: 'bg-yellow-900/60 text-yellow-300',
  advanced:     'bg-red-900/60 text-red-300',
}

const TYPE_LABELS = {
  groundstrokes: 'Groundwork',
  serve:         'Serve',
  volley:        'Volley',
  return:        'Return',
  footwork:      'Footwork',
  fitness:       'Fitness',
  matchplay:     'Match Play',
  dropshot:      'Dropshot & Lob',
}

const TYPE_ORDER = ['groundstrokes','serve','volley','return','footwork','fitness','matchplay','dropshot']

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

function DrillModal({ drill, onClose }) {
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

// ── Drill card (Netflix thumbnail) ─────────────────────────────────────────

function DrillCard({ drill, onClick }) {
  return (
    <button
      onClick={() => onClick(drill)}
      className="shrink-0 w-40 sm:w-48 rounded-xl overflow-hidden bg-gray-800 hover:scale-105 hover:shadow-2xl transition-transform duration-200 text-left group"
    >
      <div className="h-40 sm:h-48 bg-gray-700">
        <CourtDiagram type={drill.diagram_type} diagramData={drill.diagram_data} />
      </div>
      <div className="p-2.5">
        <p className="text-white text-xs font-bold line-clamp-1 group-hover:text-green-400 transition-colors">{drill.name}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full capitalize ${LEVEL_STYLES[drill.level] ?? 'bg-gray-600 text-gray-300'}`}>
            {drill.level}
          </span>
          <span className="text-[9px] text-gray-500 capitalize">{drill.group_size}</span>
        </div>
      </div>
    </button>
  )
}

// ── Category row (horizontal carousel) ────────────────────────────────────

function CategoryRow({ type, drills, onCardClick }) {
  const scrollRef = useRef(null)

  function scrollRight() {
    scrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' })
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between px-4 sm:px-6 mb-3">
        <h2 className="text-white font-bold text-base sm:text-lg">{TYPE_LABELS[type] ?? type}</h2>
        <button
          onClick={scrollRight}
          className="flex items-center gap-0.5 text-green-400 text-xs font-semibold hover:text-green-300 transition-colors"
        >
          See all <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto px-4 sm:px-6 pb-2 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {drills.map((drill) => (
          <DrillCard key={drill.id} drill={drill} onClick={onCardClick} />
        ))}
      </div>
    </div>
  )
}

// ── Hero featured drill ────────────────────────────────────────────────────

function HeroDrill({ drill, onClick }) {
  if (!drill) return null
  return (
    <button
      onClick={() => onClick(drill)}
      className="relative w-full h-52 sm:h-64 overflow-hidden bg-gray-800 text-left group mb-8"
    >
      <div className="absolute inset-0">
        <CourtDiagram type={drill.diagram_type} diagramData={drill.diagram_data} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
        <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Featured Drill</span>
        <h2 className="text-white text-xl sm:text-2xl font-extrabold mt-1 mb-1">{drill.name}</h2>
        <p className="text-gray-400 text-xs sm:text-sm line-clamp-2">{drill.description}</p>
        <span className="inline-flex items-center gap-1.5 mt-3 text-xs text-white bg-green-600 px-3 py-1.5 rounded-full font-semibold group-hover:bg-green-500 transition-colors">
          View Drill
        </span>
      </div>
    </button>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function Drills() {
  const navigate = useNavigate()
  const [drills, setDrills]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')
  const [search, setSearch]   = useState('')
  const [selected, setSelected] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    async function fetchDrills() {
      setLoading(true)
      const { data, error } = await supabase
        .from('drills')
        .select('*')
        .order('created_at', { ascending: true })
      if (error) setError(error.message)
      else setDrills(data ?? [])
      setLoading(false)
    }
    fetchDrills()
  }, [])

  // A `?c=` param scopes the library to one dashboard card's slice, e.g.
  // /dashboard/drills?c=forehand
  const category = getDrillCategory(searchParams.get('c'))

  const scoped = category ? drills.filter((d) => matchesFilter(d, category.filter)) : drills

  const filtered = search
    ? scoped.filter(
        (d) =>
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.description?.toLowerCase().includes(search.toLowerCase()),
      )
    : scoped

  // Group by type preserving category order
  const grouped = TYPE_ORDER.reduce((acc, type) => {
    const list = filtered.filter((d) => d.type === type)
    if (list.length) acc[type] = list
    return acc
  }, {})

  const featured = drills.find((d) => d.type === 'groundstrokes' && d.level === 'advanced') ?? drills[0]

  function clearCategory() {
    const next = new URLSearchParams(searchParams)
    next.delete('c')
    setSearchParams(next, { replace: true })
  }

  // Forehand/Backhand/Slice filter on `subcategory`, which only exists once
  // scripts/002_drill_content.sql has been run and the drills re-pushed. Say so
  // explicitly rather than showing a bare "no results".
  const needsSubcategory = Boolean(category?.filter?.subcategory)
  const subcategoryMissing =
    needsSubcategory && drills.length > 0 && drills.every((d) => d.subcategory == null)

  return (
    <div className="min-h-full bg-gray-950 pt-14">
      {/* Sticky search header */}
      <div className="sticky top-14 z-30 bg-gray-950/95 backdrop-blur border-b border-gray-800 px-4 sm:px-6 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white transition-colors shrink-0">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search drills…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-800 text-white text-sm rounded-full pl-9 pr-9 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Active category, arrived at from a dashboard card */}
        {category && (
          <button
            onClick={clearCategory}
            className="ml-auto shrink-0 flex items-center gap-1.5 bg-green-500/15 text-green-300 text-xs font-semibold pl-3 pr-2 py-1.5 rounded-full hover:bg-green-500/25 transition-colors"
          >
            {category.title}
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* States */}
      {loading && (
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-6 h-6 animate-spin text-green-500" />
        </div>
      )}

      {!loading && error && (
        <div className="m-6 flex items-center gap-3 bg-red-900/30 border border-red-800 rounded-xl p-4 text-red-400 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Hero — full library only; a scoped category is its own context */}
          {!search && !category && <HeroDrill drill={featured} onClick={setSelected} />}

          {category && (
            <div className="px-4 sm:px-6 pt-5 pb-1">
              <h1 className="text-white font-extrabold text-xl sm:text-2xl">{category.title}</h1>
              <p className="text-gray-500 text-xs mt-1">
                {filtered.length} {filtered.length === 1 ? 'drill' : 'drills'}
              </p>
            </div>
          )}

          {Object.keys(grouped).length === 0 ? (
            <div className="text-center py-24 px-6">
              {subcategoryMissing ? (
                <>
                  <p className="text-gray-400 font-medium">
                    This category needs the drill content migration.
                  </p>
                  <p className="text-gray-600 text-sm mt-2 max-w-md mx-auto leading-relaxed">
                    {category.title} filters on each drill’s subcategory, which is
                    populated by <code className="text-gray-500">scripts/002_drill_content.sql</code>{' '}
                    and a re-push. Categories that filter on type alone work now.
                  </p>
                </>
              ) : (
                <p className="text-gray-500 font-medium">
                  {search ? 'No drills match your search.' : 'No drills in this category yet.'}
                </p>
              )}
              <div className="mt-4 flex items-center justify-center gap-4">
                {search && (
                  <button onClick={() => setSearch('')} className="text-sm text-green-400 hover:underline">
                    Clear search
                  </button>
                )}
                {category && (
                  <button onClick={clearCategory} className="text-sm text-green-400 hover:underline">
                    Show all drills
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="pt-2 pb-6">
              {Object.entries(grouped).map(([type, list]) => (
                <CategoryRow key={type} type={type} drills={list} onCardClick={setSelected} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Drill detail modal */}
      {selected && <DrillModal drill={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
