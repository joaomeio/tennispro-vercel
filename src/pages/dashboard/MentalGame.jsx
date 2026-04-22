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

      {/* Mental Frameworks */}
      <div className="mt-12 mb-6">
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mb-4">Core Mental Frameworks</h2>
        
        <div className="grid gap-6">
          {/* Framework 1 */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h3 className="font-bold text-slate-900 text-lg mb-3">1. The 16-Second Cure</h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Based on Dr. Jim Loehr's research on top players. The time between points is crucial. This four-step process helps players reset emotionally between every single point, regardless of whether they won or lost it.
            </p>
            <div className="bg-purple-50/50 rounded-xl p-4 grid sm:grid-cols-4 gap-4">
              <div>
                <span className="font-bold text-purple-700 text-xs block mb-1">A. Positive Physical Response</span>
                <p className="text-xs text-slate-500">Turn away from the net immediately. Head up, shoulders back, confident walk to baseline.</p>
              </div>
              <div>
                <span className="font-bold text-purple-700 text-xs block mb-1">B. Relaxation</span>
                <p className="text-xs text-slate-500">Take a deep abdominal breath. Look at the strings or a fixed object to center the eyes.</p>
              </div>
              <div>
                <span className="font-bold text-purple-700 text-xs block mb-1">C. Preparation</span>
                <p className="text-xs text-slate-500">Think about the next point. "Where am I serving?" "What's my return strategy?"</p>
              </div>
              <div>
                <span className="font-bold text-purple-700 text-xs block mb-1">D. Ritual</span>
                <p className="text-xs text-slate-500">Bounce the ball identical number of times. Stepping into the stance. Firing physical trigger.</p>
              </div>
            </div>
          </div>
          
          {/* Framework 2 */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h3 className="font-bold text-slate-900 text-lg mb-3">2. Anchor Words & Self-Talk</h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Negative self-talk tightens muscles. Teach players to develop personal "Anchor Words" they can say before the serve or return to create a specific physical or tactical goal.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-slate-100 rounded-xl p-4">
                <span className="font-bold text-slate-900 text-sm block mb-2">Examples of Anchor Words</span>
                <ul className="text-sm text-slate-500 space-y-2">
                  <li><span className="font-bold text-purple-600">"Heavy"</span> - Focus on hitting deep, heavy topspin instead of trying to hit winners.</li>
                  <li><span className="font-bold text-purple-600">"Loose"</span> - Reminds the body to relax grip tension and swing freely.</li>
                  <li><span className="font-bold text-purple-600">"Bounce, Hit"</span> - Saying it out loud to track the ball and stop overthinking.</li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-center text-center">
                <p className="text-sm text-slate-600 italic">
                  "Instead of saying 'Don't double fault', say 'Hit up and out'. The brain does not process the word 'don't' well under stress."
                </p>
              </div>
            </div>
          </div>

          {/* Framework 3 */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h3 className="font-bold text-slate-900 text-lg mb-3">3. Managing Nerves</h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Players get nervous when they care about the result. To calm nerves, bring their focus back to the present moment and tactical execution (the process) rather than winning/losing (the outcome).
            </p>
            <div className="grid gap-3">
              <div className="flex gap-4 items-center border-b border-slate-50 pb-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600 font-bold">1</div>
                <p className="text-sm text-slate-600"><span className="font-bold text-slate-900">Name It:</span> Acknowledge the nerves. "I'm feeling tight because I want to win. That's normal."</p>
              </div>
              <div className="flex gap-4 items-center border-b border-slate-50 pb-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600 font-bold">2</div>
                <p className="text-sm text-slate-600"><span className="font-bold text-slate-900">Get Physical:</span> Nerves make footwork lazy and swings tight. The antidote is exaggerated footwork and high net clearance.</p>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600 font-bold">3</div>
                <p className="text-sm text-slate-600"><span className="font-bold text-slate-900">Small Targets:</span> In tight moments, focus on playing high percentage tennis to big targets. Pick a specific target and hit it.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
