import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Target, Users, Zap, Star, Brain } from 'lucide-react'

const TABS = [
  { id: 'mission', label: 'The Mission' },
  { id: 'ages', label: 'Age Groups' },
  { id: 'structure', label: 'Lesson Structure' },
  { id: 'groups', label: 'Group Management' },
  { id: 'mindset', label: 'Coach Mindset' },
]

function MissionTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">The Real Mission of a Kids Coach</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          Coaching kids is not about perfect technique — it's about building love for the game. When you step onto the court with a group of energetic children, your primary goal isn't to create miniature professionals. It's to ignite a passion that will keep them coming back, week after week, year after year.
        </p>
        <div className="bg-teal-50 rounded-xl p-4 border-l-4 border-teal-500">
          <p className="text-teal-800 font-semibold text-sm">Make kids want to come back next lesson. Everything else — technique, tactics, winning — flows from this foundation.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { title: 'Learn By Doing', desc: 'Kids need to feel the movement in their bodies, not just hear about it. Show them once, then let them try immediately.' },
          { title: 'Short Attention Spans', desc: 'Plan to change activities every 5–10 minutes maximum. Variety keeps young minds engaged and prevents boredom.' },
          { title: 'Need Constant Variety', desc: 'Repetition is essential for learning, but it must be disguised within different games and contexts to maintain interest.' },
          { title: 'Emotion Over Logic', desc: 'Excitement, celebration, and positive energy create stronger learning connections than technical explanations ever will.' },
        ].map(({ title, desc }) => (
          <div key={title} className="bg-white rounded-xl border border-slate-100 p-5">
            <h3 className="font-bold text-slate-900 text-sm mb-2">{title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-3">4 Core Teaching Principles</h3>
        <div className="space-y-3">
          {[
            'Less talking, more playing',
            'Show instead of explain',
            'Focus on one simple goal per drill',
            'Provide immediate, positive feedback',
          ].map((p, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
              <p className="text-sm text-slate-700">{p}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-amber-50 rounded-xl p-3 text-xs text-amber-800">
          If a drill needs a long explanation, it's too complex. Simplify until kids can understand in 15 seconds or less.
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-3">Why Kids Stay in Tennis</h3>
        <div className="grid sm:grid-cols-4 gap-3">
          {[
            { label: 'Try harder during drills', color: 'bg-teal-50 text-teal-700' },
            { label: 'Learn faster & retain more', color: 'bg-blue-50 text-blue-700' },
            { label: 'Stay committed longer', color: 'bg-purple-50 text-purple-700' },
            { label: 'Build lifelong healthy habits', color: 'bg-green-50 text-green-700' },
          ].map(({ label, color }) => (
            <div key={label} className={`${color} rounded-xl p-3 text-center text-xs font-semibold`}>{label}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AgeGroupsTab() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 border border-slate-200">
        <strong className="text-slate-900">Critical Principle:</strong> Always coach the age, not the stroke. Each age bracket needs its own tailored approach — treating all children as a homogeneous group is the most common coaching mistake.
      </div>

      {/* Ages 4-6 */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <div className="flex items-start gap-4 mb-4">
          <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shrink-0">Ages 4–6</span>
          <div>
            <h3 className="font-bold text-slate-900">Movement, Coordination & Fun</h3>
            <p className="text-xs text-slate-500 mt-1">No technical correction needed at this stage. Success means smiling and moving.</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { name: 'Animal Walks', desc: 'Bear crawls, crab walks, frog jumps, bunny hops. Kids love pretending to be animals — builds core strength and coordination naturally.' },
            { name: 'Imagination Games', desc: 'Court becomes a jungle, service boxes become rivers, baseline is the safe camp. Every drill becomes an adventure expedition.' },
            { name: 'Ball Balance', desc: 'Balance ball on racket while walking or navigating obstacles. Develops hand-eye coordination and racket familiarity without technical pressure.' },
            { name: 'Reaction Races', desc: 'Sprint to different colored cones when you call colors. Builds speed, listening skills, and genuine excitement for the session.' },
          ].map(({ name, desc }) => (
            <div key={name} className="bg-slate-50 rounded-xl p-3">
              <span className="font-bold text-slate-800 text-xs block mb-1">{name}</span>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ages 7-9 */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <div className="flex items-start gap-4 mb-4">
          <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shrink-0">Ages 7–9</span>
          <div>
            <h3 className="font-bold text-slate-900">Basic Rally, Direction & Control</h3>
            <p className="text-xs text-slate-500 mt-1">Introduce simple technique cues. Focus on getting the ball over the net consistently.</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { name: 'Volcano Toss', desc: 'Coach underhand tosses onto a visual target. Kids catch with cone before it bounces twice. Builds tracking and early hand-eye coordination.' },
            { name: 'Hit the Monster!', desc: 'Target becomes a monster that kids defeat with forehands. Technique is hidden inside the game — they practice without realizing it.' },
            { name: 'Bounce-Hit Rhythm', desc: 'Students call out "bounce-hit" while making contact. Develops timing awareness and the critical skill of tracking the ball through the bounce.' },
            { name: 'High-Five Finish', desc: 'After every forehand, players finish with their hitting hand high enough to give you a high-five. Ensures proper follow-through in a fun way.' },
          ].map(({ name, desc }) => (
            <div key={name} className="bg-slate-50 rounded-xl p-3">
              <span className="font-bold text-slate-800 text-xs block mb-1">{name}</span>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ages 10-12 */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <div className="flex items-start gap-4 mb-4">
          <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shrink-0">Ages 10–12</span>
          <div>
            <h3 className="font-bold text-slate-900">Consistency, Basic Tactics & Match Play</h3>
            <p className="text-xs text-slate-500 mt-1">Technique starts to matter more. Introduction of strategy and shot selection.</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { name: 'Target 21', desc: 'First to 21 points. Deep ball = 3 pts, service box = 1 pt. Errors go back to 0. Teaches accuracy and consistency under pressure.' },
            { name: 'Champions of the Court', desc: 'Challengers vs Champions format. Requires winning 3 points in a row to become the Champion. Builds competitive mindset.' },
            { name: 'Attack & Defend', desc: 'Coach feeds hard ball to simulate attack, players must loop it deep to reset the point. Develops defensive recovery patterns.' },
            { name: 'Inside-Out Pattern', desc: 'Students learn to run around their backhand to hit forehands to the opposite corner. First real offensive tactical pattern.' },
          ].map(({ name, desc }) => (
            <div key={name} className="bg-slate-50 rounded-xl p-3">
              <span className="font-bold text-slate-800 text-xs block mb-1">{name}</span>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-green-50 rounded-xl p-3 text-xs text-green-800">
          A twelve-year-old is ready to understand why eastern grip creates topspin. Technical concepts that were irrelevant at age 6 now become valuable coaching tools.
        </div>
      </div>

      {/* Equipment Guide */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Progressive Equipment System</h3>
        <div className="space-y-3">
          {[
            { ball: 'Red Ball', ages: 'Ages 4–8', court: '36ft (Service boxes)', racket: '17"–23"', color: 'bg-red-100 text-red-700', desc: 'Slowest ball. Builds basic motor skills, tracking, and pure enjoyment of hitting.' },
            { ball: 'Orange Ball', ages: 'Ages 8–10', court: '60ft', racket: '23"–25"', color: 'bg-orange-100 text-orange-700', desc: 'Medium speed. Introduces spin, serves, and court coverage patterns.' },
            { ball: 'Green Ball', ages: 'Ages 10–12', court: '78ft (Full)', racket: '25"–26"', color: 'bg-green-100 text-green-700', desc: 'Nearly regular speed. Enables real tactics, strategy, and match play.' },
          ].map(({ ball, ages, court, racket, color, desc }) => (
            <div key={ball} className="flex items-center gap-4 border border-slate-100 rounded-xl p-4">
              <span className={`${color} px-3 py-1 rounded-full text-xs font-bold shrink-0`}>{ball}</span>
              <div className="flex-1">
                <div className="flex gap-4 text-xs text-slate-500 mb-1">
                  <span>{ages}</span><span>•</span><span>{court}</span><span>•</span><span>Racket: {racket}</span>
                </div>
                <p className="text-xs text-slate-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StructureTab() {
  return (
    <div className="space-y-6">
      {/* Lesson Flow */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">The Perfect Kids Lesson Flow</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-5">
          A well-designed lesson has a rhythm that matches children's natural energy patterns. It starts with excitement, builds through focused skill work, peaks with competition, and ends on a high note that makes them eager to return.
        </p>
        <div className="grid sm:grid-cols-4 gap-3">
          {[
            { phase: 'Warm-Up Game', time: '5–10 min', desc: 'High-energy movement to get kids excited and bodies ready. Never start with static drills.', color: 'bg-amber-50 border-amber-200' },
            { phase: 'Main Skill Game', time: '10–15 min', desc: "The day's primary skill, disguised as an engaging game with clear objectives and scoring.", color: 'bg-blue-50 border-blue-200' },
            { phase: 'Competitive Game', time: '10–15 min', desc: 'Structured competition where kids apply what they learned in a fun, low-pressure format.', color: 'bg-purple-50 border-purple-200' },
            { phase: 'Fun Finisher', time: '5 min', desc: 'Pure enjoyment that sends kids home with huge smiles and excitement for next lesson.', color: 'bg-green-50 border-green-200' },
          ].map(({ phase, time, desc, color }) => (
            <div key={phase} className={`${color} border rounded-xl p-4`}>
              <div className="text-xs font-bold text-slate-500 mb-1">{time}</div>
              <div className="font-bold text-slate-900 text-sm mb-2">{phase}</div>
              <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-slate-50 rounded-xl p-3 text-xs text-slate-600">
          <strong>The Feel Test:</strong> A good lesson feels fast. Kids should be surprised when you announce it's time to finish. If they're watching the clock or looking bored, your pacing is off.
        </div>
      </div>

      {/* Warm-Ups */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-1">Warm-Ups That Don't Feel Like Warm-Ups</h3>
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">The secret is designing warm-ups that accomplish all physical preparation goals while feeling like pure play. When kids are laughing and moving, their heart rates rise, muscles warm up, and most importantly, they associate tennis with fun from the very first moment.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { name: 'Animal Walks', desc: 'Bear crawls, crab walks, frog jumps, bunny hops. Builds core strength and coordination while kids love pretending to be animals.' },
            { name: 'Tag Games', desc: 'Freeze tag, shadow tag, or racket tag. Gets kids moving while building racket familiarity and spatial awareness simultaneously.' },
            { name: 'Ball Balance', desc: 'Balance ball on racket while walking, jogging, or navigating obstacles. Develops hand-eye coordination and racket control naturally.' },
            { name: 'Reaction Races', desc: 'Sprint to different colored cones when you call colors. Builds speed, listening, and genuine excitement from the very first minute.' },
          ].map(({ name, desc }) => (
            <div key={name} className="bg-slate-50 rounded-xl p-4">
              <span className="font-bold text-slate-800 text-sm block mb-1">{name}</span>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3 italic">Smile test: If they're smiling during warm-up, it's working. If they're groaning or moving slowly, change to something more playful immediately.</p>
      </div>

      {/* Technique as Games */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-1">Turning Technique Into Games</h3>
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
          Average coaches announce "Now we will practice forehands" and wonder why kids look disappointed. Great coaches understand that technique must be hidden inside games — like vegetables hidden in a delicious smoothie.
        </p>
        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          {[
            { game: 'Hit the Monster!', skill: 'Forehand', desc: 'Target becomes a monster kids defeat with forehands. Focus is on beating the monster, not the stroke.' },
            { game: 'Protect Your Castle!', skill: 'Rally consistency', desc: 'Missing means losing castle points. Kids defend their kingdom instead of "practicing backhands".' },
            { game: 'Score in the Zone!', skill: 'Accuracy', desc: 'Point system based on accuracy to different zones. Competition drives natural repetition of the skill.' },
          ].map(({ game, skill, desc }) => (
            <div key={game} className="bg-teal-50 rounded-xl p-4">
              <span className="font-bold text-teal-800 text-sm block mb-1">{game}</span>
              <span className="text-xs font-semibold text-teal-600 block mb-2">Skill: {skill}</span>
              <p className="text-xs text-teal-700 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { rule: 'Keep It to One Cue', desc: 'Choose one technical element to improve: swing path, contact point, or follow-through. Never more than one.' },
            { rule: 'Correct Between Reps', desc: 'Give feedback quickly between attempts, not during long breaks that kill momentum and energy.' },
            { rule: 'Use Simple Language', desc: '"Swing low to high" instead of "maintain racket lag through the acceleration phase with proper kinetic chain sequencing."' },
          ].map(({ rule, desc }) => (
            <div key={rule} className="border border-slate-100 rounded-xl p-4">
              <span className="font-bold text-slate-900 text-xs block mb-1">{rule}</span>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Imagination */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-3">The Power of Imagination</h3>
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
          Kids live in a world where imagination is more real than reality. When you tap into children's natural love of stories and pretend play, you unlock levels of focus and effort that no amount of logical explanation could achieve. Imagination makes repetition invisible.
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { frame: 'Court as Jungle', desc: 'Service boxes become rivers, baseline is the safe camp, net becomes a wall protecting from wild animals. Every drill becomes an expedition.' },
            { frame: 'Balls as Magic Stones', desc: 'Each ball has special powers that kids must capture by hitting them. Different colors have different point values or magical properties.' },
            { frame: 'Targets as Treasure', desc: 'Hitting specific zones unlocks treasure chests full of points. Kids become treasure hunters competing to find the most gold.' },
          ].map(({ frame, desc }) => (
            <div key={frame} className="bg-purple-50 rounded-xl p-4">
              <span className="font-bold text-purple-800 text-sm block mb-2">{frame}</span>
              <p className="text-xs text-purple-700 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3 italic">The difference between a drill and an adventure is only in how you frame it. Choose adventure every time.</p>
      </div>
    </div>
  )
}

function GroupsTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">Managing Groups Without Yelling</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          When kids misbehave or lose focus, it's almost never a discipline problem — it's a curriculum problem. Control doesn't come from volume or authority, it comes from engagement. Fix the drill, not the kid.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { rule: 'Clear Start/Stop Signals', desc: 'Use consistent verbal cues, whistle patterns, or hand signals. Kids thrive on predictable routines they can anticipate.' },
            { rule: 'Short Explanations', desc: 'Fifteen seconds maximum. Show and start rather than talk and delay. Long speeches guarantee lost attention.' },
            { rule: 'Kids Demonstrating', desc: 'Have children show the drill to others. Builds investment, clarity, and gives you a break from constant instruction.' },
            { rule: 'Frequent Rotations', desc: 'Change partners, positions, or roles every few minutes. Staleness breeds misbehavior; variety maintains order.' },
          ].map(({ rule, desc }) => (
            <div key={rule} className="bg-slate-50 rounded-xl p-4">
              <span className="font-bold text-slate-900 text-sm block mb-1">{rule}</span>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">When Kids Misbehave — Ask These 3 Questions First</h3>
        <div className="space-y-3">
          {[
            { q: 'Is the drill too slow?', a: 'Kids standing in long lines waiting for turns will always find creative ways to entertain themselves, usually at your expense.' },
            { q: 'Is the drill too hard?', a: 'Frustration from impossible tasks leads to giving up, which looks like misbehavior but is actually a cry for help.' },
            { q: 'Is the drill boring?', a: 'Repetitive activities without imagination or challenge cause mental checkout, which manifests as physical disruption.' },
          ].map(({ q, a }, i) => (
            <div key={i} className="flex gap-4 items-start border-b border-slate-50 pb-3 last:border-0 last:pb-0">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{q}</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{a}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-amber-50 rounded-xl p-3 text-xs text-amber-800">
          Nine times out of ten, addressing one of these three issues instantly resolves the behavioral problem. A quiet individual conversation is far more effective than public correction.
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-1">Keeping Everyone Active — No Waiting Lines</h3>
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">The traditional tennis lesson structure of lines and turns is perfectly designed to bore children and waste their limited attention spans. The Golden Rule: no kid should stand still longer than 10 seconds.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { method: 'Multiple Courts or Zones', desc: 'Divide your space into smaller areas where different groups rotate through stations. Everyone plays simultaneously instead of watching.' },
            { method: 'Partner Drills', desc: 'Pair kids so both are always active — one hitting, one feeding, then switch immediately. Doubles the repetitions, eliminates waiting.' },
            { method: 'Shadow Swings While Waiting', desc: 'If brief waiting is unavoidable, kids practice the movement pattern they\'ll use when it\'s their turn. No wasted time.' },
            { method: 'Mini-Competitions', desc: 'Small group challenges where everyone competes simultaneously rather than taking turns. Race formats work brilliantly.' },
          ].map(({ method, desc }) => (
            <div key={method} className="bg-blue-50 rounded-xl p-4">
              <span className="font-bold text-blue-800 text-sm block mb-1">{method}</span>
              <p className="text-xs text-blue-700 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-slate-50 rounded-xl p-3 text-xs text-slate-600">
          <strong>Activity Scan:</strong> Count how many kids are moving vs. standing. Your goal is 80% or more actively engaged at every moment. If that drops below 50%, stop and redesign the activity on the spot.
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Adapting for Different Skill Levels</h3>
        <p className="text-sm text-slate-600 mb-4">Same drill, different difficulty levels happening simultaneously. Every child does the same core activity, but their individual challenge level matches their current ability.</p>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { level: 'Easy', vars: 'Short distance, large target, slow ball', color: 'bg-green-50 border-green-200' },
            { level: 'Medium', vars: 'Moderate distance, medium target, medium speed', color: 'bg-amber-50 border-amber-200' },
            { level: 'Hard', vars: 'Long distance, small target, fast ball', color: 'bg-red-50 border-red-200' },
          ].map(({ level, vars, color }) => (
            <div key={level} className={`${color} border rounded-xl p-4 text-center`}>
              <span className="font-bold text-slate-900 text-sm block mb-2">{level}</span>
              <p className="text-xs text-slate-600">{vars}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-purple-50 rounded-xl p-3 text-xs text-purple-800">
          <strong>The Confidence Principle:</strong> No kid should feel behind. Make adjustments invisible — don't announce "this is the easy version for beginners." Simply position kids at different distances and celebrate everyone's success equally.
        </div>
      </div>
    </div>
  )
}

function MindsetTab() {
  return (
    <div className="space-y-6">
      {/* Positive Feedback */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">Positive Feedback That Actually Works</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          The words you use shape how kids see themselves as tennis players and as people. Negative feedback shuts down learning and creates fear of mistakes. Positive feedback opens neural pathways, builds confidence, and creates kids who try new things fearlessly.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-red-50 rounded-xl p-4">
            <span className="font-bold text-red-700 text-xs block mb-2 uppercase tracking-wide">Avoid These Phrases</span>
            <ul className="space-y-1.5">
              {['"That was wrong"', '"No, not like that"', '"You\'re not listening"', '"I already told you how to do this"', '"You\'ll never get it if you keep doing that"'].map(p => (
                <li key={p} className="text-xs text-red-700 flex items-start gap-2"><span className="text-red-400 mt-0.5">×</span>{p}</li>
              ))}
            </ul>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <span className="font-bold text-green-700 text-xs block mb-2 uppercase tracking-wide">Use These Instead</span>
            <ul className="space-y-1.5">
              {['"Good try, now aim a bit higher"', '"Nice swing, make the next one faster"', '"I love your effort, let\'s adjust your feet"', '"You\'re getting closer, watch this"', '"Great progress, here\'s the next step"'].map(p => (
                <li key={p} className="text-xs text-green-700 flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>{p}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 grid sm:grid-cols-3 gap-3">
          {[
            { step: '1. Praise the Effort', desc: 'Start with genuine acknowledgment of what they did right or the effort they gave, even if the result wasn\'t perfect.' },
            { step: '2. Correct One Thing', desc: 'Identify the single most important adjustment. Never list multiple corrections at once — it overwhelms and confuses.' },
            { step: '3. Encourage Retry', desc: 'End with forward-looking encouragement that makes them excited to try again immediately with the new information.' },
          ].map(({ step, desc }) => (
            <div key={step} className="border border-slate-100 rounded-xl p-3">
              <span className="font-bold text-slate-900 text-xs block mb-1">{step}</span>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mistakes & Frustration */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-3">Handling Mistakes & Frustration</h3>
        <div className="bg-teal-50 rounded-xl p-4 mb-4">
          <p className="text-teal-800 font-semibold text-sm">A relaxed kid learns faster. Tension — physical and mental — is the enemy of skill acquisition.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          {[
            { phrase: '"Good miss!"', desc: 'When a kid misses long because they swung hard, that\'s a good miss showing commitment. Celebrate the right kind of mistakes.' },
            { phrase: '"That means you\'re trying"', desc: 'Frame mistakes as evidence of effort rather than failure. A kid who makes mistakes is challenging themselves.' },
            { phrase: '"Even champions miss"', desc: 'Help kids understand that professional players miss all the time. The difference is they don\'t let it bother them.' },
          ].map(({ phrase, desc }) => (
            <div key={phrase} className="bg-slate-50 rounded-xl p-4">
              <span className="font-bold text-slate-900 text-sm block mb-2">{phrase}</span>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="border border-slate-100 rounded-xl p-4">
          <span className="font-bold text-slate-900 text-sm block mb-2">Give Kids Tools to Self-Regulate</span>
          <ul className="space-y-2">
            {['Deep breath and reset after mistakes', 'Positive self-talk phrases ("I\'ve got this", "Next point")', 'Physical reset routines (bounce ball, adjust strings)', 'Focus on process, not outcome'].map(t => (
              <li key={t} className="text-xs text-slate-600 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></div>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Competition */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-3">Competition Without Pressure</h3>
        <p className="text-sm text-slate-600 mb-4">The key is designing competitive structures where losing doesn't feel like failure and winning doesn't require crushing opponents.</p>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { method: 'Short Games', desc: 'First to 5 points, timed 3-minute rounds. Short games mean quick resets, fresh starts, and no lingering resentment from losses.' },
            { method: 'Many Winners', desc: 'Create multiple categories: most accurate, most improved, best teamwork, best effort. Everyone can win something.' },
            { method: 'Reset Scores Often', desc: 'Start fresh each round. This prevents any single child from dominating and keeps hope alive for everyone.' },
            { method: 'Team Challenges', desc: 'Group competitions where success depends on collective effort. Builds community and takes pressure off any single player.' },
            { method: 'Beat Your Record', desc: 'Competition against personal best scores. Kids track their own progress and compete with themselves rather than others.' },
            { method: 'Balance Skill Levels', desc: 'Adjust handicaps, team compositions, or rules. Everyone deserves to experience winning in every session.' },
          ].map(({ method, desc }) => (
            <div key={method} className="bg-slate-50 rounded-xl p-3">
              <span className="font-bold text-slate-800 text-xs block mb-1">{method}</span>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Long-term Motivation & Parent Communication */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-3">Long-Term Motivation Systems</h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {[
            { system: 'Stickers & Rewards', desc: 'Kids collect stickers for achievements, attendance, or effort. The physical collection creates tangible evidence of progress.' },
            { system: 'Level Systems', desc: 'Create colored wristbands, certificates, or badges that mark skill progression. Kids advance through levels with specific requirements.' },
            { system: 'Achievement Challenges', desc: 'Weekly or monthly challenges all kids can attempt: rally record, target accuracy contest. Everyone can participate and succeed.' },
            { system: 'Skill of the Week', desc: 'Focus on one specific skill each week with special recognition for those who master it. Provides clear short-term goals.' },
          ].map(({ system, desc }) => (
            <div key={system} className="border border-slate-100 rounded-xl p-4">
              <span className="font-bold text-slate-900 text-sm block mb-1">{system}</span>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 rounded-xl p-4">
          <h4 className="font-bold text-blue-800 text-sm mb-2">Post-Lesson Parent Communication Template</h4>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { step: '1. What We Worked On', desc: 'Briefly describe the main focus in terms parents can understand. "We focused on getting the ball over the net consistently today."' },
              { step: '2. One Positive Highlight', desc: 'Share one specific moment where their child excelled or showed great effort. Make it personal and specific, not generic praise.' },
              { step: '3. Goal for Next Lesson', desc: 'Give parents something to look forward to. Creates continuity and anticipation for the next session.' },
            ].map(({ step, desc }) => (
              <div key={step} className="bg-white rounded-lg p-3">
                <span className="font-bold text-blue-700 text-xs block mb-1">{step}</span>
                <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Measuring Success */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Measuring Success Correctly</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-red-50 rounded-xl p-4">
            <span className="font-bold text-red-700 text-xs block mb-2 uppercase tracking-wide">Wrong Success Metrics</span>
            <ul className="space-y-2">
              {['Perfect stroke mechanics', 'Winning every point', 'Advanced tactics at young ages'].map(m => (
                <li key={m} className="text-xs text-red-700 flex items-start gap-2"><span className="text-red-400">×</span>{m}</li>
              ))}
            </ul>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <span className="font-bold text-green-700 text-xs block mb-2 uppercase tracking-wide">Right Success Metrics</span>
            <ul className="space-y-2">
              {['Kids asking to play again', 'Kids arriving excited', 'Kids staying months and years'].map(m => (
                <li key={m} className="text-xs text-green-700 flex items-start gap-2"><span className="text-green-500">✓</span>{m}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 bg-teal-50 rounded-xl p-3">
          <p className="text-teal-800 text-sm font-semibold">Retention is the real scoreboard. Everything else is noise.</p>
        </div>
      </div>
    </div>
  )
}

export default function TennisKids() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('mission')

  return (
    <div className="min-h-screen bg-gray-950 pt-14">
      <div className="sticky top-14 z-30 bg-gray-950/95 backdrop-blur border-b border-gray-800 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-white font-semibold text-sm">Kids Tennis Manual</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-6 pb-12">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-teal-900/50 text-teal-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
            Bonus Content
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Tennis Kids Masterclass</h1>
          <p className="text-gray-400 text-sm mt-1.5 max-w-xl">
            Everything you need to coach young players effectively — from first-ever lessons to competitive junior development.
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
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'mission' && <MissionTab />}
        {activeTab === 'ages' && <AgeGroupsTab />}
        {activeTab === 'structure' && <StructureTab />}
        {activeTab === 'groups' && <GroupsTab />}
        {activeTab === 'mindset' && <MindsetTab />}
      </div>
    </div>
  )
}
