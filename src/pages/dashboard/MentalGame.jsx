import { useNavigate } from 'react-router-dom'
import { Brain, Shield, Focus, RefreshCw, ChevronLeft } from 'lucide-react'

const SECTIONS = [
  {
    icon: Brain,
    title: 'Pre-Match Routines',
    desc: 'Visualization scripts and warm-up rituals to prime players for competition. Adaptable for juniors and adults.',
  },
  {
    icon: Shield,
    title: 'Pressure Management',
    desc: 'Breathing techniques, reset rituals between points, and how to coach players through tight situations.',
  },
  {
    icon: Focus,
    title: 'Focus & Concentration',
    desc: 'Drills that train mental focus alongside physical skills — building the habit of playing one point at a time.',
  },
  {
    icon: RefreshCw,
    title: 'Resilience & Bounce-Back',
    desc: 'How to coach players through mistakes, momentum shifts, and building confidence after losses.',
  },
]

const TOPICS = [
  'Competition anxiety', 'Self-talk reframing', 'Body language cues',
  'Mindset in warm-up', 'Handling pressure points', 'Post-match review',
  'Parent communication', 'Motivation frameworks',
]

export default function MentalGame() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-950 pt-14">
      <div className="sticky top-14 z-30 bg-gray-950/95 backdrop-blur border-b border-gray-800 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-white font-semibold text-sm">Mental Game Mastery</span>
      </div>
    <div className="p-6 md:p-8 max-w-4xl mx-auto text-gray-300">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
          Bonus Content
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Mental Game Mastery</h1>
        <p className="text-slate-500 text-sm mt-1.5 max-w-xl">
          Teach resilience, focus, and competitive mindset. Techniques you can weave into everyday lessons.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        {SECTIONS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
              <Icon className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2 text-sm">{title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Topics grid */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
        <h2 className="font-bold text-slate-900 mb-4 text-sm">Topics covered</h2>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <span key={t} className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-medium capitalize">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-6 text-center">
        <div className="text-3xl mb-3">🧠</div>
        <h2 className="text-lg font-bold text-slate-900 mb-2">Full content coming soon</h2>
        <p className="text-slate-500 text-sm max-w-sm mx-auto">
          The Mental Game Mastery guide is being finalized. You'll be notified by email when it's live on the platform.
        </p>
      </div>
    </div>
    </div>
  )
}
