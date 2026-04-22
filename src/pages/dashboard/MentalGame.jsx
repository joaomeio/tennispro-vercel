import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

const TABS = [
  { id: 'between-points', label: 'Between Points' },
  { id: 'self-talk', label: 'Self-Talk' },
  { id: 'pressure', label: 'Under Pressure' },
  { id: 'kids', label: 'Kids Mental Game' },
  { id: 'competition', label: 'Competition Design' },
]

function BetweenPointsTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">The 16-Second Cure</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          Based on Dr. Jim Loehr's research on top players. The time between points is crucial — it determines whether a player mentally recovers or spirals. This four-step process helps players reset emotionally between every single point, regardless of whether they won or lost it.
        </p>
        <div className="grid sm:grid-cols-4 gap-3 mb-4">
          {[
            { step: 'A', name: 'Positive Physical Response', desc: 'Turn away from the net immediately. Head up, shoulders back, confident walk to baseline. Body language drives internal state.', color: 'bg-purple-50 border-purple-200' },
            { step: 'B', name: 'Relaxation', desc: 'Take a deep abdominal breath. Look at the strings or a fixed object to center the eyes and quiet the mind.', color: 'bg-blue-50 border-blue-200' },
            { step: 'C', name: 'Preparation', desc: 'Think about the next point only. "Where am I serving?" "What\'s my return strategy?" Plan, don\'t dwell.', color: 'bg-amber-50 border-amber-200' },
            { step: 'D', name: 'Ritual', desc: 'Bounce the ball an identical number of times. Step into stance. Fire physical trigger. Then execute.', color: 'bg-green-50 border-green-200' },
          ].map(({ step, name, desc, color }) => (
            <div key={step} className={`${color} border rounded-xl p-4`}>
              <div className="text-lg font-extrabold text-slate-400 mb-1">{step}</div>
              <div className="font-bold text-slate-900 text-sm mb-2">{name}</div>
              <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600">
          Train this routine in every practice drill — not just matches. When students practice their between-point routine even during ball-feeding drills, it becomes automatic under match conditions.
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Building the Between-Point Routine</h3>
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
          The between-point routine is the foundation of mental consistency. Top players' routines are recognizable, repeatable, and automatic — because they've rehearsed them thousands of times in practice.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="border border-slate-100 rounded-xl p-5">
            <span className="font-bold text-slate-900 text-sm block mb-3">After a Won Point</span>
            <ul className="space-y-2">
              {['Brief celebration (fist pump or quiet "yes")','Walk confidently, head up', 'Brief thought: "That worked — do it again"', 'Reset routine and look ahead'].map(s => (
                <li key={s} className="text-xs text-slate-600 flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div>{s}</li>
              ))}
            </ul>
          </div>
          <div className="border border-slate-100 rounded-xl p-5">
            <span className="font-bold text-slate-900 text-sm block mb-3">After a Lost Point</span>
            <ul className="space-y-2">
              {['Turn away from the net immediately', 'One controlled physical release (acceptable)', 'Deep breath — reset the nervous system', 'Anchor word, then routine'].map(s => (
                <li key={s} className="text-xs text-slate-600 flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></div>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Routine Under Pressure Drill</h3>
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
          Practice your between-point routine (towel, strings, bounce, breathe) after every single drill ball — even in practice. Mental toughness and emotional regulation are skills that must be trained systematically, not just activated during matches.
        </p>
        <div className="bg-purple-50 rounded-xl p-4">
          <div className="space-y-3">
            {[
              { step: '1', action: 'After every fed ball or drill point', detail: 'Full between-point routine. No skipping. Train it like a technical skill.' },
              { step: '2', action: 'Situational points at pressure scores', detail: 'Start points at 30-40, deuce, game point. Practice execution under the exact pressure situations that occur in matches.' },
              { step: '3', action: 'Monitor physical triggers', detail: 'Watch for tight jaw, dropped shoulders, slow feet — these are early warning signs of mental pressure affecting physical play.' },
            ].map(({ step, action, detail }) => (
              <div key={step} className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center text-xs font-bold shrink-0">{step}</div>
                <div>
                  <p className="font-bold text-purple-900 text-sm">{action}</p>
                  <p className="text-xs text-purple-700 mt-0.5">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SelfTalkTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">Anchor Words & Self-Talk</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          Negative self-talk tightens muscles and narrows focus. Teach players to develop personal "Anchor Words" they can say before the serve or return to create a specific physical or tactical intention — replacing anxious thinking with purposeful action.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="border border-slate-100 rounded-xl p-5">
            <span className="font-bold text-slate-900 text-sm block mb-3">Anchor Word Examples</span>
            <div className="space-y-3">
              {[
                { word: '"Heavy"', effect: 'Focus on hitting deep, heavy topspin instead of trying to hit winners. Shifts intention from outcome to process.' },
                { word: '"Loose"', effect: 'Reminds the body to relax grip tension and swing freely. Directly counteracts the physical effect of nerves.' },
                { word: '"Bounce, Hit"', effect: 'Saying it out loud to track the ball and stop overthinking the mechanics. Pure focus, pure execution.' },
                { word: '"Up and Out"', effect: 'Specific serve target cue. Replaces fear-based thinking ("don\'t double fault") with a positive physical intention.' },
              ].map(({ word, effect }) => (
                <div key={word} className="flex gap-3 items-start">
                  <span className="font-bold text-purple-600 text-sm shrink-0 w-24">{word}</span>
                  <p className="text-xs text-slate-500 leading-relaxed">{effect}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-amber-50 rounded-xl p-5 flex flex-col justify-center">
            <p className="text-sm text-amber-800 italic leading-relaxed mb-3">
              "Instead of saying 'Don't double fault', say 'Hit up and out'. The brain does not process the word 'don't' well under stress."
            </p>
            <p className="text-xs text-amber-700">The unconscious mind deletes the negation and processes the image of the mistake you're trying to avoid — making it more likely, not less.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Self-Talk Reframing — Positive vs. Negative</h3>
        <div className="space-y-3">
          {[
            { negative: '"I always choke on big points"', reframe: '"I\'ve practiced this exact moment — I\'m ready for it"' },
            { negative: '"My backhand is broken today"', reframe: '"Keep the ball high and build — stay patient"' },
            { negative: '"I can\'t believe I missed that"', reframe: '"Reset. One point at a time. Next ball."' },
            { negative: '"They\'re way better than me"', reframe: '"Play my game, trust my patterns"' },
            { negative: '"I\'m going to lose this set"', reframe: '"This point only. Ball in play, feet moving"' },
          ].map(({ negative, reframe }) => (
            <div key={negative} className="grid sm:grid-cols-2 gap-3">
              <div className="bg-red-50 rounded-xl p-3 flex items-start gap-2">
                <span className="text-red-400 text-sm mt-0.5">×</span>
                <p className="text-xs text-red-700 italic">{negative}</p>
              </div>
              <div className="bg-green-50 rounded-xl p-3 flex items-start gap-2">
                <span className="text-green-500 text-sm mt-0.5">→</span>
                <p className="text-xs text-green-700 font-medium">{reframe}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-3">Body Language as a Mental Tool</h3>
        <p className="text-sm text-slate-600 mb-4">Body language doesn't just express your internal state — it creates it. Teach players to use physical posture deliberately to influence their psychology on court.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { cue: 'Head Up', effect: 'Looking down signals defeat. Head up signals confidence — even when you don\'t feel it yet.' },
            { cue: 'Shoulders Back', effect: 'Slumped shoulders compress breathing and increase anxiety. Open chest allows full deep breaths.' },
            { cue: 'Slow Down Movement', effect: 'Speeding up between points signals panic. Deliberate movement communicates control to both your brain and your opponent.' },
            { cue: 'Positive Fist Pump', effect: 'A brief, genuine physical celebration after a won point builds positive momentum and signals belief to your own nervous system.' },
          ].map(({ cue, effect }) => (
            <div key={cue} className="border border-slate-100 rounded-xl p-4">
              <span className="font-bold text-slate-900 text-sm block mb-1">{cue}</span>
              <p className="text-xs text-slate-500 leading-relaxed">{effect}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PressureTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">Managing Nerves & Competition Anxiety</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          Players get nervous when they care about the result. To calm nerves, bring their focus back to the present moment and tactical execution (the process) rather than winning or losing (the outcome). This is the core shift that separates mentally strong players from those who consistently underperform their practice level.
        </p>
        <div className="space-y-3">
          {[
            { n: '1', title: 'Name It', desc: 'Acknowledge the nerves. "I\'m feeling tight because I want to win. That\'s normal." Labeling the emotion reduces its intensity and prevents it from becoming a secondary source of anxiety.' },
            { n: '2', title: 'Get Physical', desc: 'Nerves make footwork lazy and swings tight. The antidote is exaggerated footwork and high net clearance — physically counteract the effects of nervous tension with movement.' },
            { n: '3', title: 'Small Targets', desc: 'In tight moments, focus on playing high-percentage tennis to big targets. Pick one specific target and hit it. Narrowing the task narrows the anxiety.' },
            { n: '4', title: 'Process Goals Only', desc: 'Replace outcome goals ("I need to win this game") with process goals ("Split-step every ball, serve wide first ball"). You can control execution, not results.' },
          ].map(({ n, title, desc }) => (
            <div key={n} className="flex gap-4 items-start border-b border-slate-50 pb-3 last:border-0 last:pb-0">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold shrink-0">{n}</div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{title}</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Pressure Point Training</h3>
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">Mental toughness is a skill that must be trained systematically, not just hoped for. Build pressure into practice every session so match conditions feel familiar, not foreign.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { method: 'Situational Points', desc: 'Start every competitive drill at 30-40, deuce, or 5-6 in the third set. Players repeatedly practice the exact high-pressure situations they face in matches.', color: 'bg-red-50' },
            { method: 'Consequence Scoring', desc: 'Whoever loses a set of points does 10 push-ups, runs a line, or sits out a game. Attaches real (but manageable) stakes to practice points.', color: 'bg-amber-50' },
            { method: 'Pattern-Only Points', desc: 'Players must execute a predetermined shot pattern. Going off-pattern costs a point. Forces discipline and tactical execution under competitive conditions.', color: 'bg-blue-50' },
            { method: 'No Warm-Up Match Points', desc: 'Begin match play with no hitting warm-up. Forces players to find their game under pressure — exactly what happens in real competition.', color: 'bg-purple-50' },
          ].map(({ method, desc, color }) => (
            <div key={method} className={`${color} rounded-xl p-4`}>
              <span className="font-bold text-slate-900 text-sm block mb-1">{method}</span>
              <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-3">Pre-Match Mental Routine</h3>
        <p className="text-sm text-slate-600 mb-4">A consistent pre-match routine creates a reliable mental state regardless of venue, opponent, or conditions. Teach players to control what they can control before the first point is played.</p>
        <div className="space-y-3">
          {[
            { phase: '60 min before', actions: ['Light physical warm-up — get blood moving without exhausting energy reserves', 'Review your game plan: 2-3 tactical intentions maximum', 'Identify your anchor words for this match'] },
            { phase: '15 min before', actions: ['Focused ball hitting on chosen patterns — reinforce what you plan to do', 'First few serves in the routine — build the rhythm before the match', 'Deepen the between-point routine physically'] },
            { phase: '5 min before', actions: ['Quiet time — no phone, no new information', 'Visualization: see yourself executing your first 3 serves perfectly', 'One final anchor word or phrase to carry into the match'] },
          ].map(({ phase, actions }) => (
            <div key={phase} className="border border-slate-100 rounded-xl p-4">
              <span className="font-bold text-purple-600 text-xs uppercase tracking-wide block mb-2">{phase}</span>
              <ul className="space-y-1.5">
                {actions.map(a => (
                  <li key={a} className="text-xs text-slate-600 flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0"></div>{a}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function KidsMentalTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">Mental Skills for Young Players</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          Kids don't have the emotional vocabulary to identify what they're feeling or the tools to manage it. Your job is to teach them simple, actionable frameworks that create confidence, resilience, and joy — the three mental foundations of a long tennis career.
        </p>
        <div className="bg-teal-50 rounded-xl p-4 border-l-4 border-teal-500">
          <p className="text-teal-800 font-semibold text-sm">A relaxed kid learns faster. Tension — physical and mental — is the enemy of skill acquisition. When children are afraid of making mistakes, their muscles tighten and their natural athleticism disappears.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Reframing Mistakes for Kids</h3>
        <p className="text-sm text-slate-600 mb-4">Mistakes are not obstacles to learning — they are learning itself. But kids don't naturally understand this. In their experience, mistakes often lead to correction, disappointment, or feeling stupid. Your job is to completely reframe how they perceive errors.</p>
        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          {[
            { phrase: '"Good miss!"', detail: 'When a kid misses long because they swung hard, that\'s a good miss showing commitment. When they miss wide trying a new technique, that\'s courage. Celebrate the right kinds of mistakes.' },
            { phrase: '"That means you\'re trying"', detail: 'Frame mistakes as evidence of effort rather than failure. A kid who makes mistakes is one who\'s challenging themselves — and that deserves recognition, not correction.' },
            { phrase: '"Even champions miss"', detail: 'Help kids understand that Federer, Nadal, and Djokovic miss shots constantly. The difference is they don\'t let it bother them — they just focus on the next shot.' },
          ].map(({ phrase, detail }) => (
            <div key={phrase} className="bg-slate-50 rounded-xl p-4">
              <span className="font-bold text-slate-900 text-sm block mb-2">{phrase}</span>
              <p className="text-xs text-slate-500 leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>
        <div className="border border-slate-100 rounded-xl p-4">
          <span className="font-bold text-slate-900 text-sm block mb-2">Simple Self-Regulation Tools for Kids</span>
          <div className="grid sm:grid-cols-2 gap-2">
            {['Deep breath and reset after a mistake', 'Simple positive self-talk: "Next point", "I\'ve got this"', 'Physical reset: bounce ball 3 times, adjust strings', 'Focus on process only — forget the score, play the next ball'].map(t => (
              <div key={t} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></div>
                <p className="text-xs text-slate-600">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Handling Frustration on Court</h3>
        <p className="text-sm text-slate-600 mb-4">When a child gets visibly frustrated, pause the activity. Have a brief, calm conversation about what they're feeling. Validate the emotion, then guide them back to a productive mindset. This teaches emotional regulation that extends far beyond tennis.</p>
        <div className="space-y-3">
          {[
            { step: 'Validate the Feeling', desc: '"I can see you\'re really frustrated right now. That makes sense — you\'re working hard and it\'s not clicking yet." Never dismiss or minimize the emotion.' },
            { step: 'Normalize the Experience', desc: '"Every player feels this way sometimes — even the best ones. Feeling frustrated means you care, and that\'s a good thing." Connect them to a larger community.' },
            { step: 'Redirect to Action', desc: '"Let\'s take a breath and try just this one thing. Don\'t think about the last shot. Only this next ball." Give them one small, achievable focus.' },
            { step: 'Celebrate the Recovery', desc: 'When they successfully manage frustration and continue playing, specifically acknowledge it. "I noticed you got frustrated and then kept going — that\'s real mental strength."' },
          ].map(({ step, desc }, i) => (
            <div key={step} className="flex gap-4 items-start border-b border-slate-50 pb-3 last:border-0 last:pb-0">
              <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{step}</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Confidence Builders for Young Players</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { method: 'Celebrate Effort, Not Just Results', desc: 'Recognize the child who tried their hardest even if they didn\'t win. This builds intrinsic motivation and resilience that lasts a lifetime.' },
            { method: 'Create Many "Winners"', desc: 'Multiple win categories each session: most improved, best effort, most creative shot, best sportsmanship. Everyone can win something every class.' },
            { method: 'Progress Visibility', desc: 'Stickers, levels, and badges make progress tangible. Kids who can see how far they\'ve come feel momentum — and momentum creates belief.' },
            { method: 'Beat Your Own Record', desc: 'Compete against personal best scores rather than always comparing against others. Keeps every player competing for success, regardless of skill level.' },
          ].map(({ method, desc }) => (
            <div key={method} className="border border-slate-100 rounded-xl p-4">
              <span className="font-bold text-slate-900 text-sm block mb-1">{method}</span>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CompetitionTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">Designing Competition Without Pressure</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          Competition is one of the most motivating elements of tennis — but only if structured correctly. Done wrong, it creates anxiety, tears, and avoidance. Done right, it creates excitement, effort, and the memorable moments that keep players passionate for years. The key is structuring competitive situations where effort and execution are rewarded more than the final score.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Competitive Game Formats That Work</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { format: 'Short Games (First to 5)', desc: 'Quick resets, fresh starts, and no lingering resentment from losses. Losing a short game feels trivial — losing a long one feels like a disaster.', best: 'All ages, especially 6-10' },
            { format: 'Champions of the Court', desc: 'Challengers vs. Champions format. Requires winning 3 points in a row to become Champion. Keeps everyone engaged — even losers stay motivated to challenge.', best: 'Ages 8-13' },
            { format: 'Team Wipes', desc: 'Team game where an error gives points to the other team (wiping your score). Shifts pressure from individual to collective — players support instead of criticize.', best: 'Group classes, all ages' },
            { format: 'Target 21', desc: 'Deep ball = 3 points, service box = 1 point. Errors reset to 0. Rewards risk management and consistency over power. Teaches court geometry naturally.', best: 'Ages 9-14' },
            { format: 'Beat Your Record', desc: 'Individual rally count challenge. How many in a row? Competition against self removes comparison anxiety while still creating genuine competitive pressure.', best: 'All ages, especially shy players' },
            { format: 'Pattern Tournament', desc: 'Points scored only by executing specific patterns. Crosscourt rally + short ball attack = 2 pts. Creates tactical pressure while rewarding execution over winners.', best: 'Ages 12+ intermediate-advanced' },
          ].map(({ format, desc, best }) => (
            <div key={format} className="border border-slate-100 rounded-xl p-4">
              <span className="font-bold text-slate-900 text-sm block mb-1">{format}</span>
              <p className="text-xs text-slate-500 leading-relaxed mb-2">{desc}</p>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Best for: {best}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Coaching Through Competitive Moments</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-xl p-4">
            <span className="font-bold text-green-800 text-sm block mb-2">When a Player Is Winning Easily</span>
            <ul className="space-y-2">
              {['Raise the challenge — smaller targets, harder patterns, serve from baseline', 'Give the opponent a head start or bonus points', 'Set new personal challenges within the game', 'Focus on the quality of execution, not the score'].map(s => (
                <li key={s} className="text-xs text-green-700 flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div>{s}</li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-50 rounded-xl p-4">
            <span className="font-bold text-amber-800 text-sm block mb-2">When a Player Is Losing Repeatedly</span>
            <ul className="space-y-2">
              {['Quietly adjust distance, target size, or serve position', 'Switch to individual challenges against personal records', 'Pair them with a stronger partner (not weaker — doubles their exposure to good tennis)', 'Highlight moments of success within the loss'].map(s => (
                <li key={s} className="text-xs text-amber-700 flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-3">Post-Match Review Framework</h3>
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">The most important mental skill is learning to evaluate performance objectively — without spiraling into self-criticism or inflating a good result. Teach players this simple three-part review after every match or competitive drill.</p>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { q: 'What worked?', prompt: 'Identify 2-3 specific things that executed well — patterns, tactics, or mental moments. Not just "I played well" — be specific.', color: 'bg-green-50 border-green-200' },
            { q: 'What to improve?', prompt: 'One technical or tactical area to work on next session. Not a list of everything wrong — just the highest leverage improvement.', color: 'bg-amber-50 border-amber-200' },
            { q: 'What to remember?', prompt: 'One insight about your game or your mental response that you want to carry forward. Something you learned about yourself today.', color: 'bg-blue-50 border-blue-200' },
          ].map(({ q, prompt, color }) => (
            <div key={q} className={`${color} border rounded-xl p-4`}>
              <span className="font-bold text-slate-900 text-sm block mb-2">{q}</span>
              <p className="text-xs text-slate-600 leading-relaxed">{prompt}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-slate-50 rounded-xl p-3 text-xs text-slate-600">
          Do this review within 10 minutes of finishing. Emotional memory fades fast — the specific observations become general feelings within an hour. Specificity is what makes the review useful rather than just venting.
        </div>
      </div>
    </div>
  )
}

export default function MentalGame() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('between-points')

  return (
    <div className="min-h-screen bg-gray-950 pt-14">
      <div className="sticky top-14 z-30 bg-gray-950/95 backdrop-blur border-b border-gray-800 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-white font-semibold text-sm">Mental Game Mastery</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-6 pb-12">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-purple-900/50 text-purple-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
            Bonus Content
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Mental Game Mastery</h1>
          <p className="text-gray-400 text-sm mt-1.5 max-w-xl">
            Teach resilience, focus, and competitive mindset. Techniques you can weave into everyday lessons for players of all ages.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'between-points' && <BetweenPointsTab />}
        {activeTab === 'self-talk' && <SelfTalkTab />}
        {activeTab === 'pressure' && <PressureTab />}
        {activeTab === 'kids' && <KidsMentalTab />}
        {activeTab === 'competition' && <CompetitionTab />}
      </div>
    </div>
  )
}
