import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Search, X, Clock, Users, SlidersHorizontal } from 'lucide-react'
import CourtDiagram from '../../components/CourtDiagram'
import DrillModal from '../../components/dashboard/DrillModal'
import { LEVEL_DOTS, LEVEL_ORDER, TYPE_LABELS } from '../../config/drillMeta'

// ─────────────────────────────────────────────────────────────────────────────
// One drill category — Forehand, Serve, Physical, and so on.
//
// The previous version reused the library's carousel layout, which fell apart
// here: inside a single category every drill shares one type, so it collapsed
// to one horizontal row of up to 60 cards with no way to narrow it down.
//
// This screen is built for the opposite job — scanning a known set and finding
// the drill that fits the session you're about to run. So: a vertical grid,
// filters for the three things a coach actually decides on (level, how long,
// whether a partner is needed), and subcategory grouping where it clarifies.
// ─────────────────────────────────────────────────────────────────────────────

// Buckets rather than exact minutes: the source uses 8/10/12/15/20/25/30, and
// a coach thinks "I've got a quarter of an hour", not "I need exactly 12".
const DURATION_BUCKETS = [
  { key: 'short',  label: 'Under 12 min', test: (d) => d.duration_min < 12 },
  { key: 'medium', label: '12–15 min',    test: (d) => d.duration_min >= 12 && d.duration_min <= 15 },
  { key: 'long',   label: '20 min +',     test: (d) => d.duration_min > 15 },
]

function FilterChip({ active, onClick, children, count }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
        active
          ? 'bg-green-500 text-gray-950'
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
      }`}
    >
      {children}
      {count != null && (
        <span className={active ? 'text-gray-950/60' : 'text-gray-500'}>{count}</span>
      )}
    </button>
  )
}

// Horizontal tile, not a poster.
//
// The court SVG is drawn portrait (viewBox 0 0 400 920). Putting it in a
// landscape thumbnail letterboxes it into a thin strip with wide empty margins
// — worst on the fitness drills, whose diagrams are a nearly bare court. A
// narrow upright strip matches the artwork's own proportions, kills the dead
// space, and fixes every card to the same height so the grid stays aligned
// however the titles wrap.
function DrillCard({ drill, onClick, showSubcategory }) {
  const steps = drill.instructions?.length ?? 0

  // Card height is pinned to what the court strip naturally occupies at this
  // width (viewBox 400x920, so height = width x 2.3). Left to size itself the
  // strip cannot stretch to match a taller text column, and cards with short
  // titles show a dead band beneath the court.
  return (
    <button
      onClick={() => onClick(drill)}
      className="group flex h-[148px] sm:h-[166px] text-left bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 hover:bg-gray-800/60 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
    >
      <div className="w-[64px] sm:w-[72px] shrink-0 bg-gray-950/60 border-r border-gray-800">
        <CourtDiagram type={drill.diagram_type} diagramData={drill.diagram_data} />
      </div>

      <div className="flex-1 min-w-0 p-3 sm:p-3.5 flex flex-col">
        {showSubcategory && drill.subcategory && (
          <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 mb-1">
            {drill.subcategory}
          </span>
        )}

        <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 group-hover:text-green-400 transition-colors">
          {drill.name}
        </h3>

        <p className="text-gray-500 text-xs mt-1 line-clamp-2 leading-relaxed">
          {drill.objective || drill.description}
        </p>

        {/* mt-auto pins the meta row to the bottom, so it lines up across the
            row no matter how many lines the title takes. */}
        <div className="flex items-center gap-3 mt-auto pt-2.5 text-[11px] text-gray-500">
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

export default function DrillCategory({ category, drills, onBack }) {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [level, setLevel] = useState(null)
  const [duration, setDuration] = useState(null)
  const [soloOnly, setSoloOnly] = useState(false)
  const [selected, setSelected] = useState(null)

  // Counts come from the unfiltered set so a chip never reads "0" purely
  // because another chip is active.
  const levelCounts = useMemo(() => {
    const c = {}
    for (const d of drills) c[d.level] = (c[d.level] ?? 0) + 1
    return c
  }, [drills])

  const soloCount = useMemo(() => drills.filter((d) => d.player_count <= 1).length, [drills])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return drills.filter((d) => {
      if (level && d.level !== level) return false
      if (soloOnly && d.player_count > 1) return false
      if (duration) {
        const bucket = DURATION_BUCKETS.find((b) => b.key === duration)
        if (bucket && !bucket.test(d)) return false
      }
      if (q) {
        const haystack = `${d.name} ${d.objective ?? d.description ?? ''} ${d.subcategory ?? ''} ${(d.tags ?? []).join(' ')}`
        if (!haystack.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [drills, level, duration, soloOnly, search])

  // Group when the category defines it and there's more than one group to show,
  // otherwise a single heading above one grid is just noise.
  const groups = useMemo(() => {
    const by = category.groupBy
    if (!by) return [{ key: '__all', label: null, items: filtered }]

    const map = new Map()
    for (const d of filtered) {
      const raw = by === 'type' ? d.type : d.subcategory
      const key = raw ?? 'Other'
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(d)
    }

    const out = [...map.entries()]
      .map(([key, items]) => ({
        key,
        label: by === 'type' ? (TYPE_LABELS[key] ?? key) : key,
        items,
      }))
      .sort((a, b) => b.items.length - a.items.length)

    return out.length > 1 ? out : [{ key: '__all', label: null, items: filtered }]
  }, [filtered, category.groupBy])

  // The subcategory is only worth showing on the card when it isn't already
  // implied: pinned by the category filter (every Forehand drill is "Forehand")
  // or stated by the group heading above it.
  const showSubcategory =
    !category.filter?.subcategory && category.groupBy !== 'subcategory'

  const filtersActive = Boolean(level || duration || soloOnly || search)

  function clearFilters() {
    setLevel(null)
    setDuration(null)
    setSoloOnly(false)
    setSearch('')
  }

  const accent = category.palette?.accent ?? '#4ade80'

  return (
    <div className="min-h-full bg-gray-950 pt-14">
      {/* Category banner — a thin colour wash so each category feels distinct
          without spending the vertical space a full hero would cost. */}
      <div
        className="relative px-4 sm:px-6 pt-6 pb-5 border-b border-gray-800"
        style={{
          background: `linear-gradient(135deg, ${category.palette?.from ?? '#052e16'} 0%, rgba(3,7,18,0) 70%)`,
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-gray-400 hover:text-white text-sm font-medium mb-3 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          All drills
        </button>

        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-white font-extrabold text-2xl sm:text-3xl leading-tight">
              {category.title}
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              {filtered.length === drills.length
                ? `${drills.length} drills`
                : `${filtered.length} of ${drills.length} drills`}
            </p>
          </div>
          <span
            className="hidden sm:block w-12 h-1 rounded-full shrink-0 mb-2"
            style={{ backgroundColor: accent }}
          />
        </div>
      </div>

      {/* Search + filters. Sticks below the dashboard's own 56px top nav. */}
      <div className="sticky top-14 z-30 bg-gray-950/95 backdrop-blur border-b border-gray-800">
        <div className="px-4 sm:px-6 py-3">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder={`Search ${category.title.toLowerCase()} drills…`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-800 text-white text-sm rounded-full pl-9 pr-9 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar px-4 sm:px-6 pb-3">
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-600 shrink-0" />

          {LEVEL_ORDER.filter((l) => levelCounts[l]).map((l) => (
            <FilterChip
              key={l}
              active={level === l}
              count={levelCounts[l]}
              onClick={() => setLevel(level === l ? null : l)}
            >
              <span className="capitalize">{l}</span>
            </FilterChip>
          ))}

          <span className="w-px h-5 bg-gray-800 shrink-0 mx-0.5" />

          {DURATION_BUCKETS.filter((b) => drills.some(b.test)).map((b) => (
            <FilterChip
              key={b.key}
              active={duration === b.key}
              onClick={() => setDuration(duration === b.key ? null : b.key)}
            >
              {b.label}
            </FilterChip>
          ))}

          {soloCount > 0 && (
            <>
              <span className="w-px h-5 bg-gray-800 shrink-0 mx-0.5" />
              <FilterChip
                active={soloOnly}
                count={soloCount}
                onClick={() => setSoloOnly((v) => !v)}
              >
                Solo
              </FilterChip>
            </>
          )}

          {filtersActive && (
            <button
              onClick={clearFilters}
              className="shrink-0 ml-1 text-xs text-gray-500 hover:text-white underline underline-offset-2 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 px-6">
          <p className="text-gray-400 font-medium">No drills match these filters.</p>
          <button
            onClick={clearFilters}
            className="mt-3 text-sm text-green-400 hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="px-4 sm:px-6 py-6 space-y-8">
          {groups.map((group) => (
            <section key={group.key}>
              {group.label && (
                <div className="flex items-baseline gap-2 mb-3">
                  <h2 className="text-white font-bold text-sm sm:text-base">{group.label}</h2>
                  <span className="text-gray-600 text-xs">{group.items.length}</span>
                </div>
              )}
              <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-3">
                {group.items.map((drill) => (
                  <DrillCard
                    key={drill.id}
                    drill={drill}
                    onClick={setSelected}
                    showSubcategory={showSubcategory}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {selected && <DrillModal drill={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
