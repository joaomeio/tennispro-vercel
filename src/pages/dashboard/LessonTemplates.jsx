import { Clock, FileText, CheckSquare, Calendar } from 'lucide-react'

const TEMPLATES = [
  { duration: '30 min', desc: 'Fast private lesson. Warm-up + one technical focus + live ball.' },
  { duration: '45 min', desc: 'Standard private or small group. Two technical segments + point play.' },
  { duration: '60 min', desc: 'Full group class. Warm-up + two drills + tactic game + cool-down.' },
  { duration: '90 min', desc: 'Clinic or academy session. Full periodized block with physical conditioning.' },
]

const SECTIONS = [
  {
    icon: Clock,
    title: 'Time-Based Templates',
    desc: 'Pre-built lesson structures for 30, 45, 60, and 90-minute sessions. Just plug in your drills.',
  },
  {
    icon: CheckSquare,
    title: 'Student Progress Tracker',
    desc: 'Track technique, consistency, and tactical development for each student over time.',
  },
  {
    icon: Calendar,
    title: 'Periodization Planner',
    desc: 'Macrocycle and microcycle templates to plan the full season for competitive players.',
  },
  {
    icon: FileText,
    title: 'Session Notes Sheet',
    desc: 'Quick printable notes format — goals, key cues used, and next session focus.',
  },
]

export default function LessonTemplates() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
          Bonus Content
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Lesson Planning Templates</h1>
        <p className="text-slate-500 text-sm mt-1.5 max-w-xl">
          Walk into every session with a clear plan. Pre-built structures you can fill in minutes before stepping on court.
        </p>
      </div>

      {/* Duration cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {TEMPLATES.map(({ duration, desc }) => (
          <div key={duration} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center hover:shadow-md transition-shadow">
            <div className="text-2xl font-extrabold text-green-600 mb-2">{duration}</div>
            <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        {SECTIONS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
              <Icon className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2 text-sm">{title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 text-center">
        <div className="text-3xl mb-3">📋</div>
        <h2 className="text-lg font-bold text-slate-900 mb-2">Full content coming soon</h2>
        <p className="text-slate-500 text-sm max-w-sm mx-auto">
          All downloadable template files are being prepared. You'll receive an email when they're available on the platform.
        </p>
      </div>
    </div>
  )
}
