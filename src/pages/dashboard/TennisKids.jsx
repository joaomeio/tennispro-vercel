import { useNavigate } from 'react-router-dom'
import { Users, Star, Smile, Zap, ChevronLeft } from 'lucide-react'

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
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-950 pt-14">
      <div className="sticky top-14 z-30 bg-gray-950/95 backdrop-blur border-b border-gray-800 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-white font-semibold text-sm">Kids Tennis Manual</span>
      </div>
    <div className="p-6 md:p-8 max-w-4xl mx-auto text-gray-300">
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

      {/* Age Groups Breakdown */}
      <div className="mt-12 mb-6">
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mb-4">Stage by Stage Breakdown</h2>
        <div className="space-y-6">
          {/* Stage 1 */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 pr-4">
              <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">Red Ball (Ages 4-8)</span>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Coordination & Fundamentals</h3>
              <ul className="text-sm text-slate-500 space-y-2">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div><p>Court: 36ft (Service boxes)</p></li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div><p>Racket: 17" - 23"</p></li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div><p>Focus: Motor skills, tracking, sending & receiving</p></li>
              </ul>
            </div>
            <div className="md:w-2/3">
              <h4 className="font-semibold text-slate-900 text-sm mb-3">Key Games:</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-lg p-3">
                  <span className="font-bold text-slate-800 text-xs block mb-1">Volcano Toss</span>
                  <p className="text-xs text-slate-500 leading-relaxed">Coach underhand tosses onto a visual target. Kids catch with cone before it bounces twice.</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <span className="font-bold text-slate-800 text-xs block mb-1">Jailbreak</span>
                  <p className="text-xs text-slate-500 leading-relaxed">Hit to targets to win teammates out of "jail" (the net zone).</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stage 2 */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 pr-4">
              <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">Orange Ball (Ages 8-10)</span>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Technique & Control</h3>
              <ul className="text-sm text-slate-500 space-y-2">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0"></div><p>Court: 60ft</p></li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0"></div><p>Racket: 23" - 25"</p></li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0"></div><p>Focus: Spin, serves, and court coverage</p></li>
              </ul>
            </div>
            <div className="md:w-2/3">
              <h4 className="font-semibold text-slate-900 text-sm mb-3">Key Games:</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-lg p-3">
                  <span className="font-bold text-slate-800 text-xs block mb-1">Target 21</span>
                  <p className="text-xs text-slate-500 leading-relaxed">First to 21 points. Deep ball = 3 pts, service box = 1 pt. Errors go back to 0.</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <span className="font-bold text-slate-800 text-xs block mb-1">Champions of the Court</span>
                  <p className="text-xs text-slate-500 leading-relaxed">Challengers vs Champions. Requires winning 3 points in a row to become the Champion.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stage 3 */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 pr-4">
              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">Green Ball (Ages 10-12)</span>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Tactics & Matchplay</h3>
              <ul className="text-sm text-slate-500 space-y-2">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div><p>Court: 78ft (Full)</p></li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div><p>Racket: 25" - 26"</p></li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div><p>Focus: Strategy, exploiting weaknesses</p></li>
              </ul>
            </div>
            <div className="md:w-2/3">
              <h4 className="font-semibold text-slate-900 text-sm mb-3">Key Games:</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-lg p-3">
                  <span className="font-bold text-slate-800 text-xs block mb-1">Attack & Defend</span>
                  <p className="text-xs text-slate-500 leading-relaxed">Coach feeds hard ball to simulate attack, players must loop it deep to reset the point.</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <span className="font-bold text-slate-800 text-xs block mb-1">Team Wipes</span>
                  <p className="text-xs text-slate-500 leading-relaxed">Team game. An error gives the points to the other team (wiping your score).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
