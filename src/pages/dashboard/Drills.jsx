import { useEffect, useState } from 'react'
import { Search, X, Loader2, AlertCircle } from 'lucide-react'
import { supabase } from '../../lib/supabase'

// SVG tennis court diagram placeholder
function CourtDiagram() {
  return (
    <svg viewBox="0 0 160 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Court surface */}
      <rect x="0" y="0" width="160" height="100" fill="#2d6a4f" />
      {/* Court outline */}
      <rect x="10" y="8" width="140" height="84" fill="none" stroke="white" strokeWidth="1.5" />
      {/* Singles sidelines */}
      <line x1="22" y1="8" x2="22" y2="92" stroke="white" strokeWidth="1" />
      <line x1="138" y1="8" x2="138" y2="92" stroke="white" strokeWidth="1" />
      {/* Net */}
      <line x1="10" y1="50" x2="150" y2="50" stroke="white" strokeWidth="2" strokeDasharray="4,3" />
      {/* Service boxes */}
      <line x1="80" y1="8" x2="80" y2="92" stroke="white" strokeWidth="1" />
      <line x1="22" y1="29" x2="138" y2="29" stroke="white" strokeWidth="1" />
      <line x1="22" y1="71" x2="138" y2="71" stroke="white" strokeWidth="1" />
      {/* Center mark */}
      <line x1="80" y1="46" x2="80" y2="54" stroke="white" strokeWidth="1.5" />
    </svg>
  )
}

const LEVEL_STYLES = {
  beginner:     'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced:     'bg-red-100 text-red-700',
}

const TYPE_OPTIONS     = ['All', 'forehand', 'backhand', 'serve', 'volley', 'footwork', 'return', 'groundstrokes', 'match play']
const LEVEL_OPTIONS    = ['All', 'beginner', 'intermediate', 'advanced']
const GROUP_OPTIONS    = ['All', 'individual', 'pairs', 'group']

function FilterPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 capitalize ${
        active
          ? 'bg-green-600 text-white shadow-sm'
          : 'bg-white text-slate-600 border border-slate-200 hover:border-green-400 hover:text-green-700'
      }`}
    >
      {label}
    </button>
  )
}

function DrillCard({ drill }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
      {/* Court diagram */}
      <div className="h-28 bg-[#1a4731] overflow-hidden">
        <CourtDiagram />
      </div>

      <div className="p-4">
        {/* Name + level badge */}
        <div className="flex items-start gap-2 mb-2">
          <h3 className="font-bold text-slate-900 text-sm leading-snug flex-1">{drill.name}</h3>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize shrink-0 ${LEVEL_STYLES[drill.level] ?? 'bg-slate-100 text-slate-600'}`}>
            {drill.level}
          </span>
        </div>

        <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-2">
          {drill.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-semibold capitalize">
            {drill.type}
          </span>
          <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-semibold capitalize">
            {drill.group_size}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Drills() {
  const [drills, setDrills]         = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState('')
  const [search, setSearch]         = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [levelFilter, setLevelFilter] = useState('All')
  const [groupFilter, setGroupFilter] = useState('All')

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

  const filtered = drills.filter((d) => {
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.description?.toLowerCase().includes(search.toLowerCase())
    const matchType   = typeFilter  === 'All' || d.type       === typeFilter
    const matchLevel  = levelFilter === 'All' || d.level      === levelFilter
    const matchGroup  = groupFilter === 'All' || d.group_size === groupFilter
    return matchSearch && matchType && matchLevel && matchGroup
  })

  const hasActiveFilters = typeFilter !== 'All' || levelFilter !== 'All' || groupFilter !== 'All' || search

  function clearAll() {
    setSearch('')
    setTypeFilter('All')
    setLevelFilter('All')
    setGroupFilter('All')
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Drills</h1>
        <p className="text-slate-500 text-sm mt-1">
          {loading ? '…' : `${filtered.length} drill${filtered.length !== 1 ? 's' : ''} available`}
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search drills…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide w-14 shrink-0">Type</span>
          {TYPE_OPTIONS.map((opt) => (
            <FilterPill key={opt} label={opt} active={typeFilter === opt} onClick={() => setTypeFilter(opt)} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide w-14 shrink-0">Level</span>
          {LEVEL_OPTIONS.map((opt) => (
            <FilterPill key={opt} label={opt} active={levelFilter === opt} onClick={() => setLevelFilter(opt)} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide w-14 shrink-0">Group</span>
          {GROUP_OPTIONS.map((opt) => (
            <FilterPill key={opt} label={opt} active={groupFilter === opt} onClick={() => setGroupFilter(opt)} />
          ))}
        </div>
        {hasActiveFilters && (
          <button onClick={clearAll} className="self-start flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-500 transition-colors font-medium mt-1">
            <X className="w-3.5 h-3.5" />
            Clear all filters
          </button>
        )}
      </div>

      {/* States */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-green-600" />
        </div>
      )}

      {!loading && error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl p-4 text-red-600 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          {error}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 font-medium">No drills match your filters.</p>
          <button onClick={clearAll} className="mt-3 text-sm text-green-600 hover:underline font-medium">
            Clear filters
          </button>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((drill) => (
            <DrillCard key={drill.id} drill={drill} />
          ))}
        </div>
      )}
    </div>
  )
}
