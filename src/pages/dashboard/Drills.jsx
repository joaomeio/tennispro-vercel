import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, Loader2, AlertCircle, ChevronRight, Clock, Users, ChevronLeft } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import CourtDiagram, { CourtLegend } from '../../components/CourtDiagram'

const LEVEL_STYLES = {
  beginner:     'bg-green-900/60 text-green-300',
  intermediate: 'bg-yellow-900/60 text-yellow-300',
  advanced:     'bg-red-900/60 text-red-300',
}

const TYPE_LABELS = {
  forehand:      'Forehand',
  backhand:      'Backhand',
  serve:         'Serve',
  volley:        'Volley',
  footwork:      'Footwork',
  return:        'Return',
  groundstrokes: 'Groundstrokes',
  'match play':  'Match Play',
}

const TYPE_ORDER = ['forehand','backhand','serve','volley','footwork','return','groundstrokes','match play']

// ── Drill detail modal ──────────────────────────────────────────────────────

function DrillModal({ drill, onClose }) {
  if (!drill) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/75" />
      <div
        className="relative z-10 bg-gray-900 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Court diagram */}
        <div className="h-64 sm:h-80 bg-gray-800">
          <CourtDiagram type={drill.diagram_type} />
        </div>

        <div className="p-0 sm:p-2 bg-gray-950">
          <CourtLegend />
        </div>

        <div className="p-5">
          {/* Level + type */}
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${LEVEL_STYLES[drill.level] ?? 'bg-gray-700 text-gray-300'}`}>
              {drill.level}
            </span>
            <span className="text-[10px] bg-gray-800 text-gray-400 font-semibold px-2 py-0.5 rounded-full capitalize">
              {drill.type}
            </span>
          </div>

          <h2 className="text-lg font-extrabold text-white mb-2">{drill.name}</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">{drill.description}</p>

          <div className="flex gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-green-500" />
              {drill.duration_min ?? 10} min
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-green-500" />
              <span className="capitalize">{drill.group_size}</span>
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
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
        <CourtDiagram type={drill.diagram_type} />
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
        <CourtDiagram type={drill.diagram_type} />
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

  const filtered = search
    ? drills.filter(
        (d) =>
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.description?.toLowerCase().includes(search.toLowerCase()),
      )
    : drills

  // Group by type preserving category order
  const grouped = TYPE_ORDER.reduce((acc, type) => {
    const list = filtered.filter((d) => d.type === type)
    if (list.length) acc[type] = list
    return acc
  }, {})

  const featured = drills.find((d) => d.type === 'forehand' && d.level === 'advanced') ?? drills[0]

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
          {/* Hero — only when not searching */}
          {!search && <HeroDrill drill={featured} onClick={setSelected} />}

          {Object.keys(grouped).length === 0 ? (
            <div className="text-center py-24">
              <p className="text-gray-500 font-medium">No drills match your search.</p>
              <button onClick={() => setSearch('')} className="mt-3 text-sm text-green-400 hover:underline">
                Clear search
              </button>
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
