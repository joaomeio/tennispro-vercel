import { useMemo, useState } from 'react'
import { ChevronLeft, Search, X, SlidersHorizontal } from 'lucide-react'
import CardArt from '../../components/dashboard/CardArt'
import DrillModal from '../../components/dashboard/DrillModal'
import DrillRowCard from '../../components/dashboard/DrillRowCard'
import { LEVEL_ORDER, TYPE_LABELS } from '../../config/drillMeta'

// ─────────────────────────────────────────────────────────────────────────────
// One drill collection — Forehand, Serve, Physical, and so on.
//
// Built for scanning a known set and finding the drill that fits the session
// you're about to run: a vertical grid, filters for the three things a coach
// actually decides on (level, how long, whether a partner is needed), and
// subcategory grouping where it clarifies.
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
      className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors duration-150 cursor-pointer ${
        active
          ? 'bg-green-500 border-green-500 text-ink-950'
          : 'bg-white/[0.04] border-white/[0.08] text-gray-300 hover:bg-white/[0.08] hover:border-white/[0.14]'
      }`}
    >
      {children}
      {count != null && (
        <span className={active ? 'text-ink-950/60' : 'text-gray-500'}>{count}</span>
      )}
    </button>
  )
}

export default function DrillCategory({ category, drills, onBack }) {
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
    <div className="min-h-full bg-ink-950 pt-14">
      {/* Collection header — art tile + title over a soft accent wash */}
      <div
        className="relative"
        style={{
          background: `radial-gradient(90% 140% at 15% 0%, ${category.palette?.from ?? '#052e16'}B3 0%, rgba(8,9,11,0) 65%)`,
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-6 sm:pt-8 pb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-gray-400 hover:text-white text-[13px] font-medium mb-5 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            All collections
          </button>

          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-[64px] h-[64px] sm:w-[84px] sm:h-[84px] shrink-0 rounded-2xl overflow-hidden bg-ink-800 border border-white/[0.08]">
              <CardArt card={category} />
            </div>

            <div className="min-w-0">
              <h1 className="text-white font-extrabold text-2xl sm:text-4xl tracking-tight leading-tight">
                {category.title}
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm mt-1.5 tabular-nums">
                {filtered.length === drills.length
                  ? `${drills.length} drills`
                  : `${filtered.length} of ${drills.length} drills`}
              </p>
              <span
                className="block w-10 h-[3px] rounded-full mt-3"
                style={{ backgroundColor: accent }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search + filters. Sticks below the dashboard's own 56px top nav. */}
      <div className="sticky top-14 z-30 bg-ink-950/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="py-3">
            <div className="relative max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder={`Search ${category.title.toLowerCase()} drills…`}
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

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3">
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

            <span className="w-px h-5 bg-white/[0.08] shrink-0 mx-0.5" />

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
                <span className="w-px h-5 bg-white/[0.08] shrink-0 mx-0.5" />
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
                className="shrink-0 ml-1 text-xs font-medium text-gray-500 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 font-medium">No drills match these filters.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-sm font-medium text-green-400 hover:text-green-300 transition-colors cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="py-6 pb-16 space-y-10">
            {groups.map((group) => (
              <section key={group.key}>
                {group.label && (
                  <div className="flex items-baseline gap-2.5 mb-3.5">
                    <span className="w-1 h-4 rounded-full" style={{ backgroundColor: accent }} />
                    <h2 className="text-white font-bold text-sm sm:text-base tracking-tight">{group.label}</h2>
                    <span className="text-gray-600 text-xs tabular-nums">{group.items.length}</span>
                  </div>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {group.items.map((drill) => (
                    <DrillRowCard
                      key={drill.id}
                      drill={drill}
                      onClick={setSelected}
                      eyebrow={showSubcategory ? drill.subcategory : null}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {selected && <DrillModal drill={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
