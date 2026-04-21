import { useNavigate } from 'react-router-dom'
import { Play, Lock } from 'lucide-react'

// ── Section poster illustrations ─────────────────────────────────────────

function DrillsPoster() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#052e16" />
          <stop offset="100%" stopColor="#14532d" />
        </linearGradient>
        <marker id="da" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 Z" fill="#facc15" />
        </marker>
      </defs>
      <rect width="320" height="180" fill="url(#dg)" />
      {/* Court */}
      <rect x="40" y="20" width="240" height="140" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
      <line x1="40" y1="90" x2="280" y2="90" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" strokeDasharray="6,4" />
      <line x1="60" y1="20" x2="60" y2="160" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" />
      <line x1="260" y1="20" x2="260" y2="160" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" />
      <line x1="160" y1="50" x2="160" y2="130" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" />
      <line x1="60" y1="50" x2="260" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" />
      <line x1="60" y1="130" x2="260" y2="130" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" />
      {/* Ball paths */}
      <line x1="70" y1="148" x2="250" y2="32" stroke="#facc15" strokeWidth="2" strokeDasharray="8,4" markerEnd="url(#da)" opacity="0.9" />
      <line x1="250" y1="148" x2="70" y2="32" stroke="#34d399" strokeWidth="2" strokeDasharray="8,4" markerEnd="url(#da)" opacity="0.7" />
      <line x1="160" y1="148" x2="70" y2="32" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="6,4" markerEnd="url(#da)" opacity="0.6" />
      {/* Players */}
      <circle cx="70" cy="150" r="7" fill="#f97316" stroke="white" strokeWidth="1.5" />
      <circle cx="250" cy="150" r="7" fill="#f97316" stroke="white" strokeWidth="1.5" />
      <circle cx="160" cy="30" r="7" fill="#60a5fa" stroke="white" strokeWidth="1.5" />
      {/* Glow overlay */}
      <rect width="320" height="180" fill="url(#dg)" opacity="0.15" />
    </svg>
  )
}

function KidsPoster() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="kg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c2d12" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#kg)" />
      {/* Fun circles */}
      <circle cx="50" cy="50" r="30" fill="rgba(255,255,255,0.06)" />
      <circle cx="270" cy="130" r="45" fill="rgba(255,255,255,0.06)" />
      <circle cx="300" cy="30" r="20" fill="rgba(255,255,255,0.06)" />
      {/* Mini court */}
      <rect x="80" y="50" width="160" height="80" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" rx="4" />
      <line x1="80" y1="90" x2="240" y2="90" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="5,3" />
      {/* Bouncing ball arcs */}
      <path d="M90,130 Q130,60 170,130 Q210,60 250,130" stroke="#fde047" strokeWidth="2.5" fill="none" strokeDasharray="5,3" />
      {/* Ball */}
      <circle cx="170" cy="55" r="8" fill="#fde047" />
      <path d="M164,55 Q170,48 176,55" stroke="white" strokeWidth="1" fill="none" />
      {/* Kids figures (simple) */}
      <circle cx="100" cy="148" r="8" fill="white" opacity="0.8" />
      <line x1="100" y1="156" x2="100" y2="172" stroke="white" strokeWidth="3" opacity="0.8" />
      <line x1="90" y1="162" x2="110" y2="162" stroke="white" strokeWidth="2.5" opacity="0.8" />
      <circle cx="220" cy="148" r="8" fill="white" opacity="0.8" />
      <line x1="220" y1="156" x2="220" y2="172" stroke="white" strokeWidth="3" opacity="0.8" />
      <line x1="210" y1="162" x2="230" y2="162" stroke="white" strokeWidth="2.5" opacity="0.8" />
      {/* Stars */}
      <text x="270" y="55" fontSize="16" fill="#fde047" opacity="0.8">★</text>
      <text x="30" y="140" fontSize="12" fill="#fde047" opacity="0.6">★</text>
    </svg>
  )
}

function MentalPoster() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <linearGradient id="mg2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
          <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#mg)" />
      {/* Brain wave lines */}
      {[30, 60, 90, 120, 150].map((y, i) => (
        <path key={i}
          d={`M0,${y} Q40,${y-20} 80,${y} Q120,${y+20} 160,${y} Q200,${y-20} 240,${y} Q280,${y+20} 320,${y}`}
          stroke="rgba(167,139,250,0.2)" strokeWidth="1.5" fill="none"
        />
      ))}
      {/* Central glow wave */}
      <path d="M0,90 Q40,50 80,90 Q120,130 160,90 Q200,50 240,90 Q280,130 320,90"
        stroke="url(#mg2)" strokeWidth="3" fill="none" />
      {/* Concentric circles */}
      <circle cx="160" cy="90" r="50" fill="none" stroke="rgba(167,139,250,0.15)" strokeWidth="1" />
      <circle cx="160" cy="90" r="35" fill="none" stroke="rgba(167,139,250,0.2)" strokeWidth="1" />
      <circle cx="160" cy="90" r="20" fill="none" stroke="rgba(167,139,250,0.3)" strokeWidth="1.5" />
      <circle cx="160" cy="90" r="8" fill="#7c3aed" opacity="0.8" />
      <circle cx="160" cy="90" r="4" fill="#a78bfa" />
      {/* Dots */}
      {[[90,50],[230,60],[80,130],[250,120],[160,30]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#a78bfa" opacity="0.6" />
      ))}
      {/* Connecting lines */}
      <line x1="90" y1="50" x2="160" y2="90" stroke="rgba(167,139,250,0.2)" strokeWidth="1" />
      <line x1="230" y1="60" x2="160" y2="90" stroke="rgba(167,139,250,0.2)" strokeWidth="1" />
      <line x1="80" y1="130" x2="160" y2="90" stroke="rgba(167,139,250,0.2)" strokeWidth="1" />
      <line x1="250" y1="120" x2="160" y2="90" stroke="rgba(167,139,250,0.2)" strokeWidth="1" />
    </svg>
  )
}

function TemplatesPoster() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0c1a3a" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#tg)" />
      {/* Document grid */}
      {[0,1,2,3].map(col =>
        [0,1,2].map(row => (
          <rect key={`${col}-${row}`}
            x={30 + col * 70} y={20 + row * 50}
            width="55" height="38"
            rx="4"
            fill="rgba(255,255,255,0.07)"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
          />
        ))
      )}
      {/* Active card highlight */}
      <rect x="100" y="70" width="55" height="38" rx="4"
        fill="rgba(59,130,246,0.3)" stroke="#3b82f6" strokeWidth="1.5" />
      {/* Lines inside cards */}
      {[0,1,2,3].map(col =>
        [0,1,2].map(row => (
          <g key={`l-${col}-${row}`}>
            <line x1={36 + col*70} y1={32 + row*50} x2={73 + col*70} y2={32 + row*50}
              stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <line x1={36 + col*70} y1={40 + row*50} x2={65 + col*70} y2={40 + row*50}
              stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1={36 + col*70} y1={47 + row*50} x2={60 + col*70} y2={47 + row*50}
              stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          </g>
        ))
      )}
      {/* Clock icon area */}
      <circle cx="270" cy="90" r="28" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" />
      <line x1="270" y1="72" x2="270" y2="90" stroke="#60a5fa" strokeWidth="2" />
      <line x1="270" y1="90" x2="282" y2="90" stroke="#60a5fa" strokeWidth="2" />
      <circle cx="270" cy="90" r="3" fill="#60a5fa" />
    </svg>
  )
}

// ── Section definitions ───────────────────────────────────────────────────

const SECTIONS = [
  {
    id: 'drills',
    title: 'Premium Drill Library',
    subtitle: 'TennisPro',
    description: '250+ professional drills for every skill level — organised by category with court diagrams.',
    badge: '250+ Drills',
    tag: 'PREMIUM',
    tagColor: 'bg-green-500',
    route: '/dashboard/drills',
    Poster: DrillsPoster,
    locked: false,
  },
  {
    id: 'tennis-kids',
    title: 'Kids Tennis Manual',
    subtitle: 'Bonus Content',
    description: 'Age-appropriate games, drills, and progressions designed for juniors aged 6–14.',
    badge: 'Ages 6–14',
    tag: 'BONUS',
    tagColor: 'bg-orange-500',
    route: '/dashboard/tennis-kids',
    Poster: KidsPoster,
    locked: false,
  },
  {
    id: 'mental-game',
    title: 'Mental Game Mastery',
    subtitle: 'Bonus Content',
    description: 'Competition psychology, self-talk, focus routines, and pressure management strategies.',
    badge: '8 Modules',
    tag: 'BONUS',
    tagColor: 'bg-purple-500',
    route: '/dashboard/mental-game',
    Poster: MentalPoster,
    locked: false,
  },
  {
    id: 'lesson-templates',
    title: 'Lesson Templates',
    subtitle: 'Bonus Content',
    description: 'Ready-to-use lesson plans for 30, 45, 60, and 90-minute sessions. Print and coach.',
    badge: '30–90 Min Plans',
    tag: 'BONUS',
    tagColor: 'bg-blue-500',
    route: '/dashboard/lesson-templates',
    Poster: TemplatesPoster,
    locked: false,
  },
]

// ── Section card ──────────────────────────────────────────────────────────

function SectionCard({ section }) {
  const navigate = useNavigate()
  const { title, subtitle, description, badge, tag, tagColor, route, Poster, locked } = section

  return (
    <button
      onClick={() => navigate(route)}
      className="group relative rounded-xl overflow-hidden bg-gray-800 text-left w-full transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-black/60 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      {/* Poster image */}
      <div className="w-full aspect-video relative">
        <Poster />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
        {/* Play button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            {locked ? <Lock className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white fill-white ml-0.5" />}
          </div>
        </div>
        {/* Tag badge */}
        <div className="absolute top-2 left-2">
          <span className={`${tagColor} text-white text-[9px] font-black px-2 py-0.5 rounded tracking-widest uppercase`}>
            {tag}
          </span>
        </div>
        {/* Badge pill */}
        <div className="absolute bottom-2 right-2">
          <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
            {badge}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4">
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-0.5">{subtitle}</p>
        <h3 className="text-white font-bold text-sm sm:text-base leading-snug group-hover:text-green-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 text-xs mt-1 line-clamp-2 leading-relaxed hidden sm:block">
          {description}
        </p>
      </div>
    </button>
  )
}

// ── Hero banner ───────────────────────────────────────────────────────────

function Hero() {
  const navigate = useNavigate()
  const main = SECTIONS[0]

  return (
    <div className="relative w-full h-56 sm:h-72 md:h-80 overflow-hidden">
      <div className="absolute inset-0">
        <main.Poster />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />

      <div className="relative h-full flex flex-col justify-end p-5 sm:p-8 max-w-lg">
        <span className="text-green-400 text-[10px] font-black uppercase tracking-widest mb-2">
          ★ Featured
        </span>
        <h1 className="text-white text-2xl sm:text-3xl font-extrabold leading-tight mb-2">
          {main.title}
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-2">
          {main.description}
        </p>
        <button
          onClick={() => navigate(main.route)}
          className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-sm px-5 py-2.5 rounded-lg w-fit hover:bg-gray-200 transition-colors"
        >
          <Play className="w-4 h-4 fill-gray-900" />
          Open Library
        </button>
      </div>
    </div>
  )
}

// ── Home page ─────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-full bg-gray-950">
      {/* Hero */}
      <Hero />

      {/* Your Library */}
      <div className="px-4 sm:px-6 py-6">
        <h2 className="text-white font-bold text-base sm:text-lg mb-4">Your Library</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {SECTIONS.map((s) => (
            <SectionCard key={s.id} section={s} />
          ))}
        </div>
      </div>

      {/* Quick access — drill categories */}
      <QuickAccess />
    </div>
  )
}

const CATEGORIES = [
  { label: 'Forehand',      color: 'from-green-900   to-green-800' },
  { label: 'Backhand',      color: 'from-emerald-900 to-emerald-800' },
  { label: 'Serve',         color: 'from-teal-900    to-teal-800' },
  { label: 'Volley',        color: 'from-cyan-900    to-cyan-800' },
  { label: 'Footwork',      color: 'from-sky-900     to-sky-800' },
  { label: 'Return',        color: 'from-blue-900    to-blue-800' },
  { label: 'Groundstrokes', color: 'from-indigo-900  to-indigo-800' },
  { label: 'Match Play',    color: 'from-violet-900  to-violet-800' },
]

function QuickAccess() {
  const navigate = useNavigate()
  return (
    <div className="px-4 sm:px-6 pb-8">
      <h2 className="text-white font-bold text-base sm:text-lg mb-4">Quick Access — Drill Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {CATEGORIES.map(({ label, color }) => (
          <button
            key={label}
            onClick={() => navigate('/dashboard/drills')}
            className={`bg-gradient-to-br ${color} rounded-lg py-4 px-3 text-white text-xs font-bold hover:brightness-125 transition-all text-center`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
