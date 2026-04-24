import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

const TABS = [
  { id: 'mechanics', label: 'Mechanics' },
  { id: 'spin-serves', label: 'Spin Serves' },
  { id: 'placement', label: 'Placement' },
  { id: 'second-serve', label: 'Second Serve' },
  { id: 'practice', label: 'Practice Plans' },
]

function MechanicsTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">The Serve — Tennis's Most Complex Skill</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          The serve is the only shot in tennis where the player has complete control — of the ball, the position, the pace, the spin, and the timing. Yet most club players and even many coaches treat it as an afterthought. Mastering the serve doesn't just win free points; it determines who controls the tone of every single game.
        </p>
        <div className="bg-rose-50 rounded-xl p-4 border-l-4 border-rose-500">
          <p className="text-rose-800 font-semibold text-sm">A reliable, varied serve transforms a reactive baseline player into a match dictator. You start every game with the advantage — or you don't.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">The Kinetic Chain — Where Power Actually Comes From</h3>
        <p className="text-slate-500 text-xs leading-relaxed mb-4">
          Most players try to hit the serve harder with their arm. Professional players generate power from the ground up, using the entire body as a whip. Understanding this changes everything.
        </p>
        <div className="space-y-3">
          {[
            { phase: '1 — Ground', action: 'Leg drive', detail: 'The legs push into the ground with trophy position loading. This upward energy transfer begins the entire power chain. Knee bend of 30–40° before trophy is optimal.' },
            { phase: '2 — Hip', action: 'Hip rotation', detail: 'Hips rotate first, leading the upper body. This hip-shoulder separation creates elastic energy in the trunk — the same principle as a spring being wound.' },
            { phase: '3 — Trunk', action: 'Torso rotation', detail: 'Shoulders unwind after the hips, increasing the rotational velocity. The greater the separation between hips and shoulders at trophy, the more elastic energy available.' },
            { phase: '4 — Shoulder', action: 'Internal rotation', detail: 'The fastest phase: the shoulder internally rotates at 2,000–2,500 degrees per second in elite servers. The arm is simply a lever at this point — the shoulder does the work.' },
            { phase: '5 — Wrist', action: 'Pronation & snap', detail: 'The final accelerating force. For flat serves, the wrist snaps through contact. For kick serves, it brushes up and forward. Proper pronation also protects the elbow from injury.' },
          ].map(({ phase, action, detail }) => (
            <div key={phase} className="flex gap-4 border border-slate-100 rounded-xl p-4">
              <div className="shrink-0">
                <div className="text-xs font-black text-rose-600 bg-rose-50 px-2 py-1 rounded text-center min-w-[52px]">{phase}</div>
                <div className="text-[10px] text-slate-400 text-center mt-1 font-medium">{action}</div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Trophy Position — The Checkpoint</h3>
        <p className="text-slate-500 text-xs leading-relaxed mb-4">
          The trophy position is the pause frame between the wind-up and the swing. Getting this right determines the quality of everything that follows. Use it as your diagnostic checkpoint when a serve breaks down.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { check: 'Tossing arm fully extended', correct: 'Ball directly above or slightly inside the tossing shoulder', fault: 'Ball too far left or right creates compensatory tilting' },
            { check: 'Racket arm position', correct: 'Elbow at shoulder height, racket pointing up or back (not down)', fault: 'Elbow dropping early causes power loss and shoulder strain' },
            { check: 'Body rotation', correct: 'Shoulders coiled back from hips — visible separation', fault: 'Square shoulders at trophy means no hip-shoulder separation, no elastic energy' },
            { check: 'Weight and balance', correct: 'Weight transferring from back to front foot in fluid motion', fault: 'Falling forward or backward breaks the upward power transfer' },
          ].map(({ check, correct, fault }) => (
            <div key={check} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="font-bold text-slate-900 text-sm mb-2">{check}</p>
              <p className="text-xs text-green-700 mb-1">✓ {correct}</p>
              <p className="text-xs text-red-600">✗ {fault}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-3">The Toss — Most Underrated Factor</h3>
        <p className="text-slate-500 text-xs leading-relaxed mb-4">
          A bad toss creates a bad serve. Every time. The arm, the timing, and the power all compensate for a poor toss — and compensations lead to inconsistency and injury. Fix the toss first, always.
        </p>
        <div className="space-y-2">
          {[
            'Release the ball gently — do not throw it. Think of placing the ball on a shelf above you.',
            'Use the entire arm moving upward from the shoulder — not a wrist flip at the end.',
            'For a flat serve: place ball slightly forward and to the right (RH player) of the body midline.',
            'For a kick serve: place ball more directly overhead or slightly left — this is the most common toss error to fix.',
            'Practice the toss alone: stand against a wall and toss the ball to hit the wall at maximum extended arm height.',
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
              <p className="text-xs text-slate-600 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SpinServesTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">The Three Serves You Need</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          A one-dimensional server is easy to read and easy to return. A server with three distinct deliveries — each with different spin, bounce, and trajectory — forces the returner to constantly recalibrate and creates free points from the very first ball.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
            <span className="font-black text-rose-700 text-sm">F</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Flat Serve</h3>
            <p className="text-xs text-slate-500">Maximum pace — the weapon</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          {[
            { label: 'Spin', value: 'Minimal topspin — mostly straight through' },
            { label: 'Toss', value: 'Slightly in front and to the right (RH)' },
            { label: 'Contact', value: 'Hit through the ball at full stretch — 1 o\'clock position' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-rose-50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-rose-600 uppercase tracking-wide mb-1">{label}</p>
              <p className="text-xs text-slate-700">{value}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          The flat serve is your first-serve weapon into the body or the T. Use it primarily when you're ahead in the game (30-0, 40-0) or when you've established a pattern and want to surprise with raw pace. Reliability is lower than slice or kick — it's a calculated risk, not a first-serve default.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="font-black text-blue-700 text-sm">Sl</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Slice Serve</h3>
            <p className="text-xs text-slate-500">Lateral movement — the tool</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          {[
            { label: 'Spin', value: 'Sidespin — brushes around the right side of the ball (RH)' },
            { label: 'Toss', value: 'Slightly further to the right than flat serve' },
            { label: 'Contact', value: 'Hit around the outside edge — 3 o\'clock position' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-blue-50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wide mb-1">{label}</p>
              <p className="text-xs text-slate-700">{value}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          The wide slice serve in the deuce court is one of the highest-percentage first-serve weapons in tennis. It pushes the returner off the court and opens the opposite side for an easy putaway. It also stays low on fast courts — neutralizing aggressive returners. Master this serve first.
        </p>
        <div className="mt-3 bg-slate-50 rounded-xl p-3 text-xs text-slate-600">
          <span className="font-semibold">Key feel:</span> Think of your racket cutting through a clock face, hitting at 3–4 o'clock. The ball should curve horizontally through the air and kick sideways on the bounce.
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
            <span className="font-black text-teal-700 text-sm">K</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Kick Serve (American Twist)</h3>
            <p className="text-xs text-slate-500">High bounce — the second serve</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          {[
            { label: 'Spin', value: 'Heavy topspin — brushes up and across the ball' },
            { label: 'Toss', value: 'Over the head or slightly left (RH) — more behind the body' },
            { label: 'Contact', value: 'Brush up from 7 o\'clock to 1 o\'clock across the ball face' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-teal-50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-teal-600 uppercase tracking-wide mb-1">{label}</p>
              <p className="text-xs text-slate-700">{value}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          The kick serve is the professional second serve. It clears the net with margin (due to the arc of topspin), lands deep, and bounces high and away from the returner — putting them in a defensive position even on the second serve. This is the most important serve to develop for long-term competitive play.
        </p>
        <div className="mt-3 bg-amber-50 rounded-xl p-3 text-xs text-amber-800">
          <span className="font-semibold">Common mistake:</span> Players try to kick the ball with the wrist. The kick comes from the brushing motion of the entire arm across the ball — the wrist snap is the finish, not the source of spin.
        </div>
      </div>
    </div>
  )
}

function PlacementTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">Placement Over Power</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          Research on professional tennis consistently shows that serve placement — not serve speed — is the primary predictor of free points. A well-placed 120mph serve wins more points than an aimless 140mph serve. Understand the geometry, then build your patterns around it.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 border border-slate-200">
          The three serve targets: <span className="font-semibold text-slate-800">T (center)</span>, <span className="font-semibold text-slate-800">Body</span>, and <span className="font-semibold text-slate-800">Wide</span>. Every elite serve pattern is built by mixing these three locations to prevent the returner from anticipating.
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Deuce Court — Serve Patterns</h3>
        <div className="space-y-3">
          {[
            { target: 'T (down the middle)', serve: 'Flat or slice', effect: 'Jams the backhand of right-handed returners. Eliminates the wide angle cross-court return.', followup: 'Follow to the net or drive to the open court.' },
            { target: 'Body', serve: 'Flat to the hip', effect: 'Forces the returner to move their feet at the last moment. Creates cramped swings and weak returns.', followup: 'Approach or attack short returns aggressively.' },
            { target: 'Wide slice', serve: 'Slice serve (primary weapon)', effect: 'Pushes returner off the court. Opens the entire ad court for the next ball.', followup: 'Hit immediately to the open court before they recover.' },
          ].map(({ target, serve, effect, followup }) => (
            <div key={target} className="border border-slate-100 rounded-xl p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="font-bold text-slate-900 text-sm">{target}</span>
                <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded shrink-0">{serve}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-1"><span className="font-medium text-slate-700">Effect: </span>{effect}</p>
              <p className="text-xs text-teal-700 font-medium">Follow-up: {followup}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Ad Court — Serve Patterns</h3>
        <div className="space-y-3">
          {[
            { target: 'T (down the middle)', serve: 'Flat or kick', effect: 'Hits directly into the forehand of right-handed returners — or the backhand on the ad side if a lefty.', followup: 'Great when returner has been moving wide all match.' },
            { target: 'Body (hip)', serve: 'Flat serve to the body', effect: 'Works especially well against players who like to step in early on the return.', followup: 'Exploit the cramped return — often nets or goes short.' },
            { target: 'Wide to backhand', serve: 'Slice or kick (primary weapon)', effect: 'Attacks the weaker backhand of most right-handed players. Kick serve bounces high into the backhand shoulder — extremely difficult to attack.', followup: 'Take the net or drive deep cross-court.' },
          ].map(({ target, serve, effect, followup }) => (
            <div key={target} className="border border-slate-100 rounded-xl p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="font-bold text-slate-900 text-sm">{target}</span>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded shrink-0">{serve}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-1"><span className="font-medium text-slate-700">Effect: </span>{effect}</p>
              <p className="text-xs text-teal-700 font-medium">Follow-up: {followup}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-3">Reading the Returner</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { signal: 'Stands far behind the baseline', read: 'They want time. Attack with body serve or short angle slice to pull them forward.' },
            { signal: 'Stands close to the baseline', read: 'They want to intercept early. Jam them with body serves and kick serves to the shoulder.' },
            { signal: 'Positions wide to protect backhand', read: 'Serve down the T to their forehand — the court is open.' },
            { signal: 'Has a big return forehand', read: 'Consistently serve to the backhand — even if it\'s not the "natural" pattern.' },
          ].map(({ signal, read }) => (
            <div key={signal} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="font-semibold text-slate-900 text-xs mb-2">📍 {signal}</p>
              <p className="text-xs text-slate-600 leading-relaxed">→ {read}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SecondServeTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">The Second Serve Problem</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          Most amateur players' second serve is their biggest competitive liability. When you're afraid of double-faulting, you slow down, push the ball in weakly, and hand your opponent a free attacking ball. This fear is created by a lack of a reliable, properly-spun second serve — not by mental weakness.
        </p>
        <div className="bg-rose-50 rounded-xl p-4 border-l-4 border-rose-400">
          <p className="text-rose-800 font-semibold text-sm">The kick serve is the solution. It clears the net by a larger margin than any other serve, lands deep, and bounces into the body — making it simultaneously safer and more aggressive than a slow, flat push.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Building the Kick Serve — Step by Step</h3>
        <div className="space-y-4">
          {[
            { step: 'Fix the toss first', detail: 'The kick serve toss goes behind and above the head (slightly left for right-handers). Most players toss too far in front. Stand sideways against a fence — the toss should land on top of or behind your shoulder without hitting the fence.' },
            { step: 'Feel the brushing motion', detail: 'Throw a ball straight up and try to brush across the top of it as it comes down. That brushing sensation — upward and forward — is exactly the contact needed for the kick serve. The racket strings travel from low-left to high-right across the ball.' },
            { step: 'Use a slow-motion swing', detail: 'Hit 20 kick serves at 30% pace. Focus entirely on feeling the ball leave at a high arc and land with heavy spin. Speed comes later — first, groove the motion. Slow spin beats fast flat every time.' },
            { step: 'Add speed progressively', detail: 'Week 1: 30% speed, heavy focus on spin. Week 2: 50% speed. Week 3: 70%. Week 4: match pace. Never skip to full speed — you\'ll revert to flat pushing when pressure arrives.' },
            { step: 'Test it under pressure', detail: 'Practice the kick serve on 0-30 and 0-40 scenarios specifically. This trains your brain to trust it when you need it most. If you only practice it when relaxed, it won\'t hold under match conditions.' },
          ].map(({ step, detail }, i) => (
            <div key={step} className="flex gap-4 border border-slate-100 rounded-xl p-4">
              <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</div>
              <div>
                <p className="font-bold text-slate-900 text-sm mb-1">{step}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-3">Second Serve Mindset</h3>
        <div className="space-y-3">
          {[
            { principle: 'The second serve is not a "safe" serve — it\'s an aggressive serve with higher margin.', note: 'Re-frame it from defensive to proactive.' },
            { principle: 'Pick a specific target before every second serve.', note: 'Standing at the baseline with no plan creates last-second decisions, which cause faults.' },
            { principle: 'If your second serve % drops below 60%, add more spin — not less.', note: 'Most players who double-fault do so because they try to hit harder, not smarter.' },
            { principle: 'Track your second serve stats in practice.', note: 'You cannot improve what you don\'t measure. Count every second serve attempt and make.' },
          ].map(({ principle, note }, i) => (
            <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-sm font-semibold text-slate-800 mb-1">{principle}</p>
              <p className="text-xs text-slate-500">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PracticeTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">How to Practice the Serve</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          Most players practice the serve by hitting 50 balls randomly with no intent. This creates volume without improvement. Effective serve practice is structured, deliberate, and measurable — with specific targets, specific spin, and real performance tracking.
        </p>
        <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 border border-slate-200">
          Rule: Never practice the serve for more than 20 minutes without a break. Serve mechanics deteriorate with fatigue, and you want to groove correct patterns — not reinforce tired compensations.
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">20-Minute Serve Session</h3>
        <div className="space-y-3">
          {[
            { block: '0–3 min', title: 'Toss Isolation', desc: 'Stand still, practice only the toss. Use a target cone at your contact point. No swing — just perfect toss placement. 10 repetitions. This primes the motor pattern.' },
            { block: '3–8 min', title: 'Slow-Motion Kick Serves', desc: '15 kick serves at 40% pace. Focus entirely on brushing up the back of the ball. Place cones in target zones (wide T, body). Count makes. Aim for 12/15 in zone.' },
            { block: '8–13 min', title: 'First Serve Placement Blocks', desc: '5 flat T, 5 slice wide, 5 body. Alternate deuce and ad courts. Say the target out loud before each serve. Track makes per target. This builds awareness and precision.' },
            { block: '13–18 min', title: 'Pressure Simulation', desc: 'Call your own score before each serve (0-30, 30-40, advantage). Hit the appropriate serve for the situation. Second serve on 0-30 and 0-40. First serve on 30-0.' },
            { block: '18–20 min', title: 'Free Practice', desc: 'Hit 10 serves with no restrictions. Let the patterns you\'ve drilled show up naturally. This helps consolidate the session\'s work without conscious control.' },
          ].map(({ block, title, desc }) => (
            <div key={block} className="flex gap-4 border border-slate-100 rounded-xl p-4">
              <div className="shrink-0">
                <div className="text-xs font-black text-rose-600 bg-rose-50 px-2 py-1 rounded text-center whitespace-nowrap">{block}</div>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm mb-1">{title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-3">Self-Correction Checklist</h3>
        <p className="text-slate-500 text-xs leading-relaxed mb-4">When a serve breaks down, diagnose from the ground up. Correct the first fault in the chain before looking at the end result.</p>
        <div className="space-y-2">
          {[
            { fault: 'Consistent double faults', check: 'Check the toss — is it in the right position? Check spin — are you brushing or pushing?' },
            { fault: 'Serves landing long', check: 'Toss too far in front. Also check if you\'re leading with the elbow instead of the shoulder.' },
            { fault: 'Serves landing in the net', check: 'Contacting too early (ball dropping too low) or not getting full leg drive and upward reach.' },
            { fault: 'Serve feels weak', check: 'Kinetic chain breakdown — usually hips not rotating before the shoulders. Check trophy position shoulder/hip separation.' },
            { fault: 'Kick serve not kicking', check: 'Toss is too far in front (should be behind/above). The brushing motion isn\'t starting low enough.' },
          ].map(({ fault, check }) => (
            <div key={fault} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p className="text-xs font-bold text-rose-700 mb-1">⚠ {fault}</p>
              <p className="text-xs text-slate-600 leading-relaxed">→ {check}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ServeMasterclass() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('mechanics')

  return (
    <div className="min-h-screen bg-gray-950 pt-14">
      <div className="sticky top-14 z-30 bg-gray-950/95 backdrop-blur border-b border-gray-800 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-white font-semibold text-sm">Serve Masterclass</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-6 pb-12">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-rose-900/50 text-rose-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
            Add-On
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Serve Masterclass</h1>
          <p className="text-gray-400 text-sm mt-1.5 max-w-xl">
            Master every serve variation and become the player who controls every game.
          </p>
        </div>

        <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-rose-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'mechanics' && <MechanicsTab />}
        {activeTab === 'spin-serves' && <SpinServesTab />}
        {activeTab === 'placement' && <PlacementTab />}
        {activeTab === 'second-serve' && <SecondServeTab />}
        {activeTab === 'practice' && <PracticeTab />}
      </div>
    </div>
  )
}
