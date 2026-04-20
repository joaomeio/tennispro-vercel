import { Users, Star, Smile, Zap } from 'lucide-react'

const SECTIONS = [
  {
    icon: Smile,
    title: 'Age-Appropriate Games (4–8)',
    desc: 'Cooperative and competitive games designed for young motor skills — short court, foam balls, high repetition, constant movement.',
  },
  {
    icon: Zap,
    title: 'Engagement & Motivation',
    desc: 'Point systems, team formats, and creative naming that make every drill feel like a game rather than practice.',
  },
  {
    icon: Star,
    title: 'Skill Progressions',
    desc: 'Red ball → Orange ball → Green ball pathways so every child advances at the right pace without frustration.',
  },
  {
    icon: Users,
    title: 'Group Management',
    desc: 'How to run productive group classes with mixed ages and abilities — rotations, stations, and energy management.',
  },
]

export default function TennisKids() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
          Bonus Content
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Tennis Kids Manual</h1>
        <p className="text-slate-500 text-sm mt-1.5 max-w-xl">
          Everything you need to coach young players effectively — from first-ever lessons to competitive junior development.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        {SECTIONS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center mb-4">
              <Icon className="w-5 h-5 text-teal-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2 text-sm">{title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-teal-50 to-green-50 border border-teal-100 rounded-2xl p-6 text-center">
        <div className="text-3xl mb-3">🎾</div>
        <h2 className="text-lg font-bold text-slate-900 mb-2">Full content coming soon</h2>
        <p className="text-slate-500 text-sm max-w-sm mx-auto">
          The complete Tennis Kids Manual is being uploaded to the platform. You'll be notified by email when it's ready.
        </p>
      </div>
    </div>
  )
}
