import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

const TABS = [
  { id: 'how', label: 'How It Works' },
  { id: '6-9', label: 'Ages 6–9' },
  { id: '10-13', label: 'Ages 10–13' },
  { id: '14-18', label: 'Ages 14–18' },
  { id: 'planning', label: 'Session Planning' },
]

const LEVEL_COLORS = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-amber-100 text-amber-700',
  Advanced: 'bg-red-100 text-red-700',
}

function DrillCard({ number, name, desc }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0">{number}</div>
        <div>
          <span className="font-bold text-slate-900 text-sm block mb-1">{name}</span>
          <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  )
}

function SessionBlock({ level, objective, drills, summary }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className={`${LEVEL_COLORS[level]} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider`}>{level}</span>
          <span className="font-bold text-slate-900 text-sm">{level} Session</span>
        </div>
        <span className="text-slate-400 text-lg">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-slate-50 pt-4">
          <div className="bg-blue-50 rounded-xl p-4 mb-4">
            <span className="font-bold text-blue-700 text-xs uppercase tracking-wide block mb-1">Training Objective</span>
            <p className="text-sm text-blue-800 leading-relaxed">{objective}</p>
          </div>
          <div className="space-y-3 mb-4">
            {drills.map((d, i) => <DrillCard key={i} number={i + 1} name={d.name} desc={d.desc} />)}
          </div>
          {summary && (
            <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 leading-relaxed italic">{summary}</div>
          )}
        </div>
      )}
    </div>
  )
}

function HowTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">How to Use This System</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          Every session in this system presents a complete training plan designed for specific age groups and skill levels, with 3–4 court-tested drills that work together to build real skills. Think of each training session as a recipe — the ingredients and steps are provided, but you control the portions based on who you're feeding.
        </p>
        <div className="bg-teal-50 rounded-xl p-4 border-l-4 border-teal-500 mb-4">
          <p className="text-teal-800 font-semibold text-sm">No more arriving at the court wondering what to do next — just open to the appropriate age and level, and you're ready to coach with confidence.</p>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">
          You can apply these sessions exactly as presented, knowing they've been tested with real players in real conditions. Or modify duration and volume while keeping the proven progression intact. A 20-minute drill can become 15 or 25 minutes based on your class size, energy level, or facility constraints.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">The 4-Drill Session Framework</h3>
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">Every training session follows the same proven logic, creating a rhythm your players will recognize and trust. This consistency isn't boring — it's the foundation of effective learning.</p>
        <div className="grid sm:grid-cols-4 gap-3">
          {[
            { drill: 'Drill 1', phase: 'Technical Activation', desc: 'Warms up the specific movement pattern you\'re targeting. Focused, often isolated, sets the neuromuscular pathway for what follows.', color: 'bg-amber-50 border-amber-200' },
            { drill: 'Drill 2', phase: 'Control Building', desc: 'Adds complexity while maintaining success. Players repeat the technical pattern with added targets, rhythm, or constraints.', color: 'bg-blue-50 border-blue-200' },
            { drill: 'Drill 3', phase: 'Real Situation', desc: 'Places the skill into game-like context. Movement must happen with decision-making, positioning, and tactical awareness.', color: 'bg-purple-50 border-purple-200' },
            { drill: 'Drill 4', phase: 'Game Pressure', desc: 'Adds competition, scoring, or time constraints. Skills get tested under the emotional and physical conditions of real play.', color: 'bg-green-50 border-green-200' },
          ].map(({ drill, phase, desc, color }) => (
            <div key={drill} className={`${color} border rounded-xl p-4`}>
              <div className="text-xs font-bold text-slate-500 mb-1">{drill}</div>
              <div className="font-bold text-slate-900 text-sm mb-2">{phase}</div>
              <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-slate-50 rounded-xl p-3 text-xs text-slate-600">
          <strong>Key principle:</strong> This sequence prevents improvisation and dramatically increases student retention by building skills in a logical, repeatable pattern. Each drill should build on the previous one: Technical Activation → Consistency → Tactical Application → Pressure.
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">The Cost of Improvisation</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { problem: 'You Waste Training Time', desc: 'Every minute spent deciding what to do next is a minute stolen from actual skill development. Transitions drag and momentum dies.' },
            { problem: 'Students Lose Confidence in You', desc: 'Players recognize when you don\'t know what\'s next. Hesitation or changing plans mid-session signals you haven\'t planned their development.' },
            { problem: 'Learning Becomes Random', desc: 'Without connected drills building toward specific objectives, students experience isolated activities instead of systematic skill progression.' },
          ].map(({ problem, desc }) => (
            <div key={problem} className="bg-red-50 rounded-xl p-4">
              <span className="font-bold text-red-700 text-sm block mb-2">{problem}</span>
              <p className="text-xs text-red-700 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-green-50 rounded-xl p-3 text-sm text-green-800 font-medium">
          When you stand on court with a predetermined, logical training progression, you project competence and inspire confidence. Your students train harder because they trust you have a plan.
        </div>
      </div>
    </div>
  )
}

function Ages69Tab() {
  return (
    <div className="space-y-4">
      <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 border border-slate-200">
        <strong className="text-slate-900">Ages 6–9:</strong> At this age, technical perfection is less important than creating positive associations with the swing motion and building the neurological pathways for hand-eye coordination. Keep it playful, keep it moving.
      </div>
      <SessionBlock
        level="Beginner"
        objective="Develop coordination, consistent ball contact, and confidence through movement patterns that feel natural and fun."
        drills={[
          { name: 'Rainbow Swing to Target', desc: 'Players practice the arc of a proper groundstroke by swinging over a visual rainbow path, finishing with the racket pointing at a large colorful target. Builds spatial awareness and swing path memory.' },
          { name: 'Bounce-Hit Rhythm', desc: 'Students call out "bounce-hit" while making contact, developing timing awareness and the critical skill of tracking the ball through the bounce phase — the foundation of all groundstroke consistency.' },
          { name: 'Two-Hand Catch then Hit', desc: 'Before each swing, players catch the ball with two hands, then immediately hit. Creates body balance, proper positioning, and eliminates the reaching or lunging that young players often default to.' },
          { name: 'High-Five Finish', desc: 'After every forehand, players finish with their hitting hand high enough to give a high-five. Ensures proper follow-through, prevents stopping the racket at contact, and adds a fun social element to technical work.' },
        ]}
        summary="This session develops fluid swing mechanics, precise timing, and dynamic balance without overwhelming young minds with technical complexity. Each drill feels like a game while secretly building foundational movement patterns."
      />
      <SessionBlock
        level="Intermediate"
        objective="Improve stroke form and introduce basic topspin mechanics while maintaining the playful, game-based approach that keeps young players engaged."
        drills={[
          { name: 'Forehand "Window" Topspin', desc: 'Players swing through an imaginary window frame, brushing low to high to create topspin. The visual boundary helps them understand swing path while the brushing action introduces spin mechanics that become automatic with repetition.' },
          { name: 'Backhand Step-and-Plant', desc: 'Before every backhand, players take one deliberate step and plant their front foot. Builds the critical habit of moving into the ball rather than waiting for it, establishing proper weight transfer from the ground up.' },
          { name: 'Volley Catch-to-Volley', desc: 'Players alternate between catching balls at the net with their non-dominant hand and volleying them. Develops soft hands, quick reactions, and the compact punch motion essential for effective net play.' },
          { name: 'Serve Toss Freeze', desc: 'Players toss the ball and freeze in perfect position before swinging. Isolates toss consistency — the most common serve error at every level — and allows correction of arm position, balance, and posture.' },
        ]}
        summary="The focus is improving form and developing quality repetition without sacrificing the playful atmosphere. Each drill adds one specific technical element while keeping success rates high enough to maintain confidence."
      />
      <SessionBlock
        level="Advanced"
        objective="Introduce simple tactical patterns and basic decision-making while refining stroke variety and shot selection."
        drills={[
          { name: 'Spin Explorer', desc: 'Players experiment with different swing paths to create topspin, slice, and flat shots, discovering how racket angle and path affect ball flight and bounce.' },
          { name: 'Inside-Out Forehand Pattern', desc: 'Students learn to run around their backhand to hit forehands to the opposite corner, building their first offensive pattern. Tactical thinking begins here.' },
          { name: 'Net Reaction Volley', desc: 'Quick-fire volleys at close range develop reflexes, hand speed, and the ability to redirect pace without taking a big swing.' },
          { name: 'Crosscourt + Down-the-Line Combo', desc: 'Players hit two crosscourt balls for consistency, then change direction down the line when they see a short ball. Their first real tactical decision drill.' },
        ]}
        summary="This session teaches students to vary their shots and make better tactical choices based on ball position and court geometry. They're no longer just hitting — they're choosing. You're building tennis IQ alongside technique."
      />
    </div>
  )
}

function Ages1013Tab() {
  return (
    <div className="space-y-4">
      <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 border border-slate-200">
        <strong className="text-slate-900">Ages 10–13:</strong> These players have better focus and body awareness. Emphasize quality repetition and movement habits. They're ready for complexity, tactical patterns, and execution under pressure.
      </div>
      <SessionBlock
        level="Beginner"
        objective="Build consistency and establish technical routines that create reliable stroke production. Emphasize quality repetition and movement habits that will serve them for years."
        drills={[
          { name: 'Baseline Basics: Big Target Rally', desc: 'Players rally crosscourt into large target areas, focusing on margin over the net and depth beyond the service line. Builds the understanding that consistency comes from safety margins, not perfection.' },
          { name: 'Split-Step Alarm', desc: 'Every time the opponent makes contact, players must split-step and call out "split!" This transforms the most important movement habit in tennis into an automatic response triggered by visual cues.' },
          { name: 'Cooperative 10-Ball Challenge', desc: 'Working together, players try to sustain a rally for 10 consecutive shots. Removes competitive pressure while building rally tolerance, rhythm awareness, and the satisfaction of collaborative achievement.' },
          { name: 'Serve Start Line', desc: 'Players serve from inside the baseline, gradually moving back as consistency improves. Ensures early success, proper technique development, and prevents the rushing that occurs when starting from the full distance too soon.' },
        ]}
        summary="The importance of margin, rhythm, and split-step habits at this developmental phase cannot be overstated. These players are building neural pathways that will either support or limit their game for the rest of their tennis lives."
      />
      <SessionBlock
        level="Intermediate"
        objective="Develop point construction skills and teach the transition from defensive positioning to offensive opportunities. Players learn to recognize situations rather than just execute techniques."
        drills={[
          { name: 'Depth Dial (3 Speeds)', desc: 'Players practice hitting the same target at slow, medium, and fast pace, discovering how speed affects margin and learning to modulate power without sacrificing control.' },
          { name: 'Crosscourt + Attack Short Ball', desc: 'Rally crosscourt until receiving a short ball, then attack down the line or inside-out. Teaches pattern recognition — the critical skill of identifying when to change from building to attacking.' },
          { name: 'Serve + Return + First Ball', desc: 'Players serve, the partner returns, and they play out one more shot. Isolates the most important shots in tennis while building the habit of having a plan for the first ball after the return.' },
          { name: 'Approach + Volley + Overhead Sequence', desc: 'Complete the attacking sequence: approach shot, first volley, second volley, overhead. Builds the full transition game in one connected drill.' },
        ]}
        summary="Students develop tennis intelligence — the ability to read the ball, recognize patterns, and make tactical decisions in real time. Players learn to think their way through matches, not just hit their way through them."
      />
      <SessionBlock
        level="Advanced"
        objective="Develop tactical control and execution under pressure. Advanced players at this age are ready for complexity, decision-making under stress, and the discipline required to execute patterns even when uncomfortable."
        drills={[
          { name: 'Heavy Topspin Height Challenge', desc: 'Players must clear a rope suspended 6–8 feet above the net while maintaining depth. Forces proper low-to-high swing paths and teaches that aggressive topspin comes from brush and trajectory, not just speed.' },
          { name: 'Backhand Change Direction Timing', desc: 'Feed crosscourt backhands, and on a random ball, call "change!" The player must redirect down the line with the same swing but different contact point. Develops adaptability mid-rally.' },
          { name: 'Serve + 2 Pattern', desc: 'Players execute a specific three-shot pattern: serve to a target, return goes crosscourt, and the third shot attacks to a designated zone. Builds the ability to plan ahead under tactical pressure.' },
          { name: 'Pattern Tournament', desc: 'Play points where specific patterns earn bonus points. Crosscourt rally to short ball attack = 2 points, serve + attack second ball = 3 points. Rewards strategic thinking over power.' },
        ]}
        summary="This training forces consistency before aggression — a critical concept for competitive development. Players learn that control enables power, not the other way around. Winning tennis requires discipline to execute the right shot at the right moment."
      />
    </div>
  )
}

function Ages1418Tab() {
  return (
    <div className="space-y-4">
      <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 border border-slate-200">
        <strong className="text-slate-900">Ages 14–18:</strong> Unlike younger players, these players can grasp more sophisticated concepts and benefit from understanding the "why" behind each drill. They're also more self-conscious and need success experiences to overcome fear of judgment.
      </div>
      <SessionBlock
        level="Beginner"
        objective="Establish a solid competitive foundation by reducing unforced errors and building confidence to compete. Teenage beginners need clear, actionable technical frameworks that produce immediate improvement."
        drills={[
          { name: 'Contact Window Calibration', desc: 'Players identify and mark their ideal contact point for forehands and backhands using visual and proprioceptive cues. Understanding where the "window" exists — and moving to it rather than reaching — transforms ball-striking into purposeful technique.' },
          { name: 'Forehand Shape: Lift then Drive', desc: 'Practice two distinct forehand trajectories: heavy topspin "lift" shots that clear the net by 5+ feet, and flatter "drive" shots with lower net clearance. Teaches that shot selection changes swing shape, not just speed.' },
          { name: 'Crosscourt Safe Zone Rally', desc: 'Rally exclusively crosscourt into generous target areas, emphasizing depth and safety margins. Builds the most reliable shot in tennis and creates the foundation for point construction.' },
          { name: 'Serve Basics: Toss-Then-Swing', desc: 'Separate the toss from the swing. Perfect the toss location with 10 repetitions, then add the swing. This isolated approach prevents compensation patterns and builds serve consistency from the ground up.' },
        ]}
      />
      <SessionBlock
        level="Intermediate"
        objective="Master the transition between attack and defense by learning to recognize real opportunities and execute the appropriate response. These players understand tactics conceptually but struggle to apply them under match pressure."
        drills={[
          { name: 'Depth + Direction "Two Choices"', desc: 'Rally with only two options: deep crosscourt (building) or short down-the-line (attacking). Simplifies decision-making and teaches that shot selection comes from ball quality, not randomness.' },
          { name: 'Crosscourt + Change on Short Ball', desc: 'Build crosscourt until receiving a ball inside the service line, then change direction. Trains pattern recognition — the specific trigger that converts defense into offense.' },
          { name: 'Serve + Return + 2 Live', desc: 'Play out four total shots (serve, return, two more) and freeze. Analyze positioning, shot selection, and tactical choices before playing the point out fully.' },
          { name: 'Overhead + Recovery Volley', desc: 'Hit an overhead, immediately recover to net, and finish with a volley. Builds the complete attacking sequence and prevents the common error of admiring the overhead instead of closing.' },
        ]}
        summary="Players learn to recognize real opportunities based on court position, ball height, and opponent location — not just hitting hard whenever they feel like it. This is where tennis IQ separates players of similar technical ability."
      />
      <SessionBlock
        level="Advanced"
        objective="Execute tactical patterns in game context with match-level pressure and decision-making complexity. Advanced teenage players need drills that simulate the physical, mental, and emotional demands of competitive tennis."
        drills={[
          { name: 'Pace Absorption + Re-Acceleration', desc: 'Defend against heavy balls by absorbing pace with stable positioning and short backswing, then counter-punch back with interest when the opportunity appears. Builds defensive skill and offensive transition from uncomfortable positions.' },
          { name: 'Serve Patterns: Wide + 1 to Open Court', desc: 'Serve wide to pull the opponent off court, then attack the open court with the next shot. Practice the complete two-shot pattern until it becomes automatic under pressure.' },
          { name: 'Live Pattern Points', desc: 'Play points where both players must execute predetermined patterns. For example: server must serve + approach, returner must return low and pass. Creates controlled match simulation.' },
          { name: 'Situational Points', desc: 'Start points at specific scores (30-40, deuce, game point) to practice execution under the exact pressure situations that occur in matches. Mental toughness is a skill that must be trained, not just hoped for.' },
        ]}
        summary="These drills simulate the real pressure of match play — the physical demand of defending and counterattacking, the strategic discipline of multi-shot patterns, and the mental challenge of executing while the score matters."
      />
    </div>
  )
}

function PlanningTab() {
  return (
    <div className="space-y-6">
      {/* 60-min Structure */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">60-Minute Session Structure</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">Effective 60-minute sessions require efficient transitions and purposeful pacing. Every minute matters when you have limited time to create meaningful skill development.</p>
        <div className="grid sm:grid-cols-4 gap-3 mb-4">
          {[
            { block: '10 min', phase: 'Technical Drill', desc: 'Warm up with focused movement quality. Keep it simple and specific.', color: 'bg-amber-50 border-amber-200' },
            { block: '20 min', phase: 'Consistency Drill', desc: 'Build reliability through repetition with targets. Success rates 60–80%.', color: 'bg-blue-50 border-blue-200' },
            { block: '20 min', phase: 'Pattern Drill', desc: 'Apply skills in tactical context. Bridges technique and match play.', color: 'bg-purple-50 border-purple-200' },
            { block: '10 min', phase: 'Game or Pressure', desc: 'Compete with scoring or time constraints. Tests everything under emotional pressure.', color: 'bg-green-50 border-green-200' },
          ].map(({ block, phase, desc, color }) => (
            <div key={phase} className={`${color} border rounded-xl p-4 text-center`}>
              <div className="text-xl font-extrabold text-slate-900 mb-1">{block}</div>
              <div className="font-bold text-slate-700 text-sm mb-2">{phase}</div>
              <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-600 space-y-2">
          <p><strong>10 min Technical:</strong> Contact point calibration, topspin brush mechanics, or volley punch technique.</p>
          <p><strong>20 min Consistency:</strong> Crosscourt rallies to zones, serve placement routines, or approach shot sequences.</p>
          <p><strong>20 min Pattern:</strong> Serve + attack second ball, defensive retrieve + counter, or transition sequences.</p>
          <p><strong>10 min Game:</strong> Pattern points, situational games, or challenge scoring.</p>
        </div>
      </div>

      {/* 90-min Structure */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">90-Minute Session Structure</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">The additional 30 minutes should be used for increased volume and complexity, not just more of the same. The structure expands proportionally while maintaining the proven progression.</p>
        <div className="grid sm:grid-cols-4 gap-3 mb-4">
          {[
            { block: '15 min', phase: 'Technical Development', desc: 'Extended time allows for detailed feedback, video analysis, or partner observation. Quality repetition and movement refinement.', color: 'bg-amber-50 border-amber-200' },
            { block: '30 min', phase: 'Construction Phase', desc: 'Find groove and develop muscle memory through sustained repetition with medium-intensity drilling and targets.', color: 'bg-blue-50 border-blue-200' },
            { block: '30 min', phase: 'Patterns & Game Situations', desc: 'Complex multi-ball patterns, situational point play, and strategic thinking required for competitive tennis.', color: 'bg-purple-50 border-purple-200' },
            { block: '15 min', phase: 'Pressure & Competition', desc: 'Scoring games, timed challenges, or competitive situations. High-intensity but short enough to maintain quality.', color: 'bg-green-50 border-green-200' },
          ].map(({ block, phase, desc, color }) => (
            <div key={phase} className={`${color} border rounded-xl p-4 text-center`}>
              <div className="text-xl font-extrabold text-slate-900 mb-1">{block}</div>
              <div className="font-bold text-slate-700 text-sm mb-2">{phase}</div>
              <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-amber-50 rounded-xl p-3 text-xs text-amber-800">
          <strong>Intensity Variation:</strong> Alternate between high-intensity bursts and moderate-pace drilling. Use water breaks strategically as natural transitions — brief your next drill during breaks so players return knowing exactly what's next.
        </div>
      </div>

      {/* Weekly Structure */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Sample Weekly Training Progression</h3>
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">Strategic weekly planning creates cumulative skill development instead of random session-to-session activities. A well-designed training week follows a logical arc from technical refinement through pattern application to competitive pressure.</p>
        <div className="space-y-3">
          {[
            { day: 'Day 1', focus: 'Technique + Control', desc: 'Start the week with technical focus and consistency drilling. Players are fresh and can handle detailed technical feedback. This session establishes the movement patterns that will be tested later in the week.', color: 'bg-blue-50 border-blue-200' },
            { day: 'Day 2', focus: 'Patterns', desc: 'Apply Monday\'s technical work in tactical sequences. Students practice shot combinations, court positioning, and decision-making using the skills they refined the previous session.', color: 'bg-purple-50 border-purple-200' },
            { day: 'Day 3', focus: 'Game & Pressure', desc: 'Test everything under competitive conditions. Play points with constraints, situational games, or challenge scoring. This is where technical work and tactical patterns face the pressure of actual competition.', color: 'bg-green-50 border-green-200' },
          ].map(({ day, focus, desc, color }) => (
            <div key={day} className={`${color} border rounded-xl p-4`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-bold text-slate-500 text-xs">{day}</span>
                <span className="font-bold text-slate-900">{focus}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-slate-50 rounded-xl p-3 text-xs text-slate-600">
          Students know that Day 1 focuses on technique, Day 2 on tactics, and Day 3 on competition — but the specific drills rotate to maintain engagement. The structure is consistent; the content varies. This is how you build systematic improvement instead of random ball-hitting.
        </div>
      </div>

      {/* Group Training Modifications */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Adapting Drills for Group Training</h3>
        <p className="text-sm text-slate-600 mb-4">Group lessons require different logistics than private sessions, but the core drills remain the same. Modify the feeding patterns and rotation structures while preserving the skill development objectives.</p>
        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          {[
            { method: 'Reduce Feeds, Increase Targets', desc: 'Create larger target zones and have players rally to each other or feed from a ball machine while you provide coaching cues.' },
            { method: 'Use Rotation Systems', desc: 'Design drills with built-in rotation so players move through different roles: feeder, hitter, collector. Keeps everyone active.' },
            { method: 'Collective Challenges', desc: 'Convert individual drills into team challenges: "Can we make 50 crosscourt rallies as a group?" Creates social cohesion with technical focus.' },
          ].map(({ method, desc }) => (
            <div key={method} className="bg-blue-50 rounded-xl p-4">
              <span className="font-bold text-blue-800 text-sm block mb-1">{method}</span>
              <p className="text-xs text-blue-700 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <span className="font-bold text-slate-900 text-sm block mb-2">Example Group Adaptation</span>
          <p className="text-xs text-slate-600 mb-2">Take the "Crosscourt + Attack Short Ball" drill from the 10–13 intermediate section. In groups, modify it this way:</p>
          <ul className="space-y-1.5">
            {['Players pair up and rally crosscourt cooperatively', 'After 4–6 balls, one player deliberately feeds a short ball', 'Partner attacks down the line to a large target zone', 'Reset and switch roles after 5 repetitions', 'You circulate, provide feedback, and correct technique'].map(s => (
              <li key={s} className="text-xs text-slate-600 flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0"></div>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function LessonTemplates() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('how')

  return (
    <div className="min-h-screen bg-gray-950 pt-14">
      <div className="sticky top-14 z-30 bg-gray-950/95 backdrop-blur border-b border-gray-800 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-white font-semibold text-sm">Lesson Templates</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-6 pb-12">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-900/50 text-blue-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
            Bonus Content
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Planned Lesson Sessions</h1>
          <p className="text-gray-400 text-sm mt-1.5 max-w-xl">
            200+ court-tested drills across all age groups and skill levels. Walk onto the court with a professional-grade training plan every single time.
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
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'how' && <HowTab />}
        {activeTab === '6-9' && <Ages69Tab />}
        {activeTab === '10-13' && <Ages1013Tab />}
        {activeTab === '14-18' && <Ages1418Tab />}
        {activeTab === 'planning' && <PlanningTab />}
      </div>
    </div>
  )
}
