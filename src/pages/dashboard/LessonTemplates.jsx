import { useNavigate } from 'react-router-dom'
import { Clock, FileText, CheckSquare, Calendar, ChevronLeft } from 'lucide-react'

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
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-950 pt-14">
      <div className="sticky top-14 z-30 bg-gray-950/95 backdrop-blur border-b border-gray-800 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-white font-semibold text-sm">Lesson Templates</span>
      </div>
    <div className="p-6 md:p-8 max-w-4xl mx-auto text-gray-300">
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

      {/* Templates List */}
      <div className="mt-12 mb-6">
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mb-4">Printable Templates</h2>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-colors group cursor-pointer" onClick={() => alert('Download starting...')}>
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">PDF</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-1">30-Min Fast Track Lesson</h3>
            <p className="text-xs text-slate-500 line-clamp-2">High intensity framework focused on a single technical correction followed by heavy live ball reps.</p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-blue-600 group-hover:text-blue-700 font-semibold text-sm">
              <span className="underline group-hover:no-underline">Download Template</span>
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-colors group cursor-pointer" onClick={() => alert('Download starting...')}>
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">PDF</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-1">60-Min Standard Group</h3>
            <p className="text-xs text-slate-500 line-clamp-2">Structure for 4-6 players. Rotation systems, feeding queues, and tactical progression games.</p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-blue-600 group-hover:text-blue-700 font-semibold text-sm">
              <span className="underline group-hover:no-underline">Download Template</span>
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-colors group cursor-pointer" onClick={() => alert('Download starting...')}>
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                <CheckSquare className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">EXCEL</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-1">Student Progress Tracker</h3>
            <p className="text-xs text-slate-500 line-clamp-2">Spreadsheet to track skill acquisition and log what was worked on during private lessons.</p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-blue-600 group-hover:text-blue-700 font-semibold text-sm">
              <span className="underline group-hover:no-underline">Download Tracker</span>
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-colors group cursor-pointer" onClick={() => alert('Download starting...')}>
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">PDF</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-1">Junior Competitive Planner</h3>
            <p className="text-xs text-slate-500 line-clamp-2">Macrocycle organization detailing pre-season preparation, competition phases, and active rest.</p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-blue-600 group-hover:text-blue-700 font-semibold text-sm">
              <span className="underline group-hover:no-underline">Download Planner</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
