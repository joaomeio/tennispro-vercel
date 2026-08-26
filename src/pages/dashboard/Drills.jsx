import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search, X, AlertCircle, ChevronRight, ChevronLeft } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { DRILL_CATEGORIES, getDrillCategory, matchesFilter } from '../../config/catalog'
import CardArt from '../../components/dashboard/CardArt'
import DrillModal from '../../components/dashboard/DrillModal'
import DrillRowCard from '../../components/dashboard/DrillRowCard'
import DrillCategory from './DrillCategory'
import { TYPE_LABELS } from '../../config/drillMeta'

// ─────────────────────────────────────────────────────────────────────────────
// The drill library, collections-first.
//
// The dashboard home is the browse/showcase surface; by the time a coach is
// here they are looking for something specific. So this screen is an index,
// not a feed: nine collection cards, and a search that cuts straight across
// all 280 drills. Opening a collection scopes the URL (?c=) and renders the
// category screen with its filter set.
// ─────────────────────────────────────────────────────────────────────────────

// ── Collection card ─────────────────────────────────────────────────────────

function CollectionCard({ category, count, vi = 0, onOpen }) {
  const accent = category.palette?.accent ?? '#4ade80'

  return (
    <button
      onClick={() => onOpen(category)}
      className="group relative flex items-center gap-4 p-3 sm:p-3.5 bg-ink-900 border border-white/[0.06] rounded-2xl overflow-hidden text-left transition-colors duration-200 hover:border-white/[0.15] hover:bg-ink-850 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 cursor-pointer"
    >
      {/* Accent wash rising on hover — each collection keeps its own colour */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(130% 130% at 0% 50%, ${accent}1A 0%, transparent 60%)` }}
      />

      <div className="relative w-[76px] h-[76px] sm:w-[88px] sm:h-[88px] shrink-0 rounded-xl overflow-hidden bg-ink-800">
        <div className="w-full h-full transition-transform duration-300 group-hover:scale-[1.06]">
          <CardArt card={category} vi={vi} />
        </div>
      </div>

      <div className="relative flex-1 min-w-0">
        <h3 className="text-white font-bold text-[15px] sm:text-base tracking-tight leading-snug">
          {category.title}
        </h3>
        <p className="text-gray-500 text-xs sm:text-[13px] mt-1 tabular-nums">
          {count} drills
        </p>
      </div>

      <ChevronRight className="relative w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-0.5 transition shrink-0" />
    </button>
  )
}

function CollectionSkeleton() {
  return (
    <div className="flex items-center gap-4 p-3 sm:p-3.5 bg-ink-900 border border-white/[0.06] rounded-2xl animate-pulse">
      <div className="w-[76px] h-[76px] sm:w-[88px] sm:h-[88px] shrink-0 rounded-xl bg-ink-800" />
      <div className="flex-1 space-y-2.5">
        <div className="h-3.5 w-2/5 rounded bg-ink-800" />
        <div className="h-3 w-1/4 rounded bg-ink-800" />
      </div>
    </div>
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

  // A `?c=` param scopes the library to one collection, e.g. /dashboard/drills?c=forehand
  const category = getDrillCategory(searchParams.get('c'))
  const scoped = category ? drills.filter((d) => matchesFilter(d, category.filter)) : drills

  // Live counts per collection, so the cards never drift from the data
  const counts = useMemo(() => {
    const map = {}
    for (const c of DRILL_CATEGORIES) {
      map[c.key] = drills.filter((d) => matchesFilter(d, c.filter)).length
    }
    return map
  }, [drills])

  const q = search.trim().toLowerCase()
  const results = useMemo(() => {
    if (!q) return []
    return drills.filter((d) => {
      const haystack = `${d.name} ${d.objective ?? d.description ?? ''} ${d.subcategory ?? ''} ${(d.tags ?? []).join(' ')}`
      return haystack.toLowerCase().includes(q)
    })
  }, [drills, q])

  function openCollection(c) {
    const next = new URLSearchParams(searchParams)
    next.set('c', c.key)
    setSearchParams(next)
  }

  function clearCategory() {
    const next = new URLSearchParams(searchParams)
    next.delete('c')
    setSearchParams(next, { replace: true })
  }

  // A collection gets its own screen: a filterable grid scoped to its slice.
  if (category && !loading && !error) {
    return <DrillCategory category={category} drills={scoped} onBack={clearCategory} />
  }

  return (
    <div className="min-h-full bg-ink-950 pt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="pt-8 sm:pt-12 pb-2">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1 text-gray-500 hover:text-white text-[13px] font-medium mb-5 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Dashboard
          </button>

          <p className="text-green-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-2">
            TennisPro Library
          </p>
          <h1 className="text-white text-3xl sm:text-[40px] font-extrabold tracking-tight leading-tight">
            Drill Library
          </h1>
          <p className="text-gray-400 text-sm sm:text-[15px] mt-2 max-w-xl leading-relaxed">
            {loading ? ' ' : `${drills.length} professional drills across ${DRILL_CATEGORIES.length} collections — each with setup, steps, coaching cues and a court diagram.`}
          </p>
        </div>

        {/* Search — sticks under the top nav once the header scrolls away */}
        <div className="sticky top-14 z-30 -mx-4 sm:-mx-8 px-4 sm:px-8 py-3 bg-ink-950/90 backdrop-blur-md">
          <div className="relative max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search all drills…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-ink-850 border border-white/[0.08] text-white text-sm rounded-xl pl-10 pr-10 py-2.5 focus:outline-none focus:border-green-500/60 focus:ring-1 focus:ring-green-500/60 placeholder-gray-500 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Error */}
        {!loading && error && (
          <div className="my-6 flex items-center gap-3 bg-red-950/40 border border-red-900/60 rounded-xl p-4 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 py-6 pb-16">
            {Array.from({ length: 6 }).map((_, i) => (
              <CollectionSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Collections */}
        {!loading && !error && !q && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 py-6 pb-16">
            {DRILL_CATEGORIES.map((c, i) => (
              <CollectionCard key={c.key} category={c} count={counts[c.key] ?? 0} vi={i} onOpen={openCollection} />
            ))}
          </div>
        )}

        {/* Search results */}
        {!loading && !error && q && (
          <div className="py-6 pb-16">
            <p className="text-gray-400 text-sm mb-4 tabular-nums">
              {results.length === 0
                ? 'No drills match your search.'
                : `${results.length} ${results.length === 1 ? 'drill' : 'drills'} found`}
            </p>

            {results.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-sm">
                  Try a stroke, a situation or a keyword — “approach”, “second serve”, “footwork”.
                </p>
                <button
                  onClick={() => setSearch('')}
                  className="mt-4 text-sm font-medium text-green-400 hover:text-green-300 transition-colors cursor-pointer"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {results.map((drill) => (
                  <DrillRowCard
                    key={drill.id}
                    drill={drill}
                    onClick={setSelected}
                    eyebrow={TYPE_LABELS[drill.type] ?? drill.type}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Drill detail modal */}
      {selected && <DrillModal drill={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
