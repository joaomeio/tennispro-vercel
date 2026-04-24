import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Dumbbell, Zap, Heart, RotateCcw, Calendar } from 'lucide-react'

const TABS = [
  { id: 'why-gym', label: 'Why the Gym?' },
  { id: 'strength', label: 'Strength' },
  { id: 'agility', label: 'Agility & Speed' },
  { id: 'recovery', label: 'Recovery' },
  { id: 'programs', label: 'Weekly Programs' },
]

function WhyGymTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">The Off-Court Advantage</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          Tennis is one of the most physically demanding sports in the world — explosive sprints, rapid direction changes, overhead power, and hours of sustained concentration. Yet most recreational and club coaches spend zero time preparing their players physically off the court. That gap is your biggest competitive opportunity.
        </p>
        <div className="bg-teal-50 rounded-xl p-4 border-l-4 border-teal-500">
          <p className="text-teal-800 font-semibold text-sm">A player who is stronger, faster, and better conditioned doesn't just perform better — they recover faster between points and stay mentally sharp in the third set.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { icon: '⚡', title: 'Explosive First Step', desc: 'Court coverage comes down to the first 2–3 steps. Power training develops the fast-twitch muscle fibers needed to get to wide balls your opponents can only dream of reaching.' },
          { icon: '🛡️', title: 'Injury Prevention', desc: 'The shoulder, elbow, knee, and ankle are tennis\'s most common injury sites. Targeted strength work directly protects these joints and keeps you on the court year-round.' },
          { icon: '🧠', title: 'Mental Durability', desc: 'Physical fatigue destroys decision-making. A conditioned player makes better tactical choices in the final games of a long match because their brain isn\'t starved of oxygen.' },
          { icon: '💪', title: 'More Racket Head Speed', desc: 'Serve and groundstroke power come from the kinetic chain — legs, hips, core, shoulder, arm. Gym training optimizes every link in that chain for maximum output.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-white rounded-xl border border-slate-100 p-5">
            <div className="text-2xl mb-2">{icon}</div>
            <h3 className="font-bold text-slate-900 text-sm mb-2">{title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-3">The 5 Physical Pillars of Tennis</h3>
        <div className="space-y-3">
          {[
            { label: 'Strength', note: 'Foundational force for all power-based shots' },
            { label: 'Speed & Agility', note: 'Court coverage and change of direction' },
            { label: 'Endurance', note: 'Sustaining effort across long matches and tournaments' },
            { label: 'Flexibility & Mobility', note: 'Reaching wide balls and recovering from effort positions' },
            { label: 'Balance & Coordination', note: 'Hitting on the run, off-balance, and under pressure' },
          ].map(({ label, note }, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{label}</p>
                <p className="text-xs text-slate-500">{note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-3">How to Use These Programs</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { label: 'Integrate with Court Sessions', color: 'bg-teal-50 text-teal-700', note: 'Schedule gym work on non-court days or as a lighter session after short practices.' },
            { label: 'Progressive Overload', color: 'bg-blue-50 text-blue-700', note: 'Add 5% resistance or one extra set every two weeks. Consistent progression beats random hard workouts.' },
            { label: 'Listen to Your Body', color: 'bg-amber-50 text-amber-800', note: 'Tennis-specific soreness is fine. Sharp joint pain is not. Rest is part of the program, not a failure.' },
          ].map(({ label, color, note }) => (
            <div key={label} className={`${color} rounded-xl p-4`}>
              <p className="font-bold text-sm mb-1">{label}</p>
              <p className="text-xs opacity-80 leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StrengthTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">Strength Training for Tennis</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          Tennis strength isn't bodybuilder strength. It's functional, rotational, and unilateral — because the sport demands you generate force from awkward positions at high speed. Every exercise below was chosen for direct carryover to on-court performance.
        </p>
        <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 border border-slate-200">
          Aim for 3 sessions per week with at least one rest day between each. Start with lighter weights and perfect form before increasing load.
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Lower Body — Court Power Foundation</h3>
        <div className="space-y-4">
          {[
            { exercise: 'Bulgarian Split Squat', sets: '3×10 each leg', cue: 'Rear foot elevated. Front knee tracks over second toe. Drives directly into the split-step loading pattern.', benefit: 'Unilateral leg strength + hip stability' },
            { exercise: 'Lateral Band Walks', sets: '3×15 each direction', cue: 'Band above knees, soft knees, stay low. Move laterally without letting feet come together.', benefit: 'Glute medius activation for court movement' },
            { exercise: 'Romanian Deadlift', sets: '3×12', cue: 'Hinge at hip, flat back, feel hamstring stretch. This builds posterior chain power for explosive acceleration.', benefit: 'Hamstring & glute strength for sprinting' },
            { exercise: 'Squat Jumps', sets: '3×8', cue: 'Land softly with knees bent. This trains the reactive power used in every split-step.', benefit: 'Explosive power development' },
          ].map(({ exercise, sets, cue, benefit }) => (
            <div key={exercise} className="border border-slate-100 rounded-xl p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="font-bold text-slate-900 text-sm">{exercise}</span>
                <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded shrink-0">{sets}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-2">{cue}</p>
              <p className="text-xs font-medium text-slate-700">→ {benefit}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Upper Body — Shoulder Health & Racket Power</h3>
        <div className="space-y-4">
          {[
            { exercise: 'Dumbbell External Rotation', sets: '3×15 each', cue: 'Elbow at 90°, rotate outward slowly. Non-negotiable for every tennis player — this directly protects the rotator cuff.', benefit: 'Shoulder external rotator strength' },
            { exercise: 'Cable Woodchop', sets: '3×12 each side', cue: 'Rotate from high to low, engaging the core throughout. Mimics the exact rotation pattern of a forehand or serve.', benefit: 'Rotational power for groundstrokes & serve' },
            { exercise: 'Serratus Wall Slide', sets: '3×12', cue: 'Arms on wall, slide up maintaining pressure. Activates the serratus anterior — critical for overhead stability.', benefit: 'Overhead shoulder stability for serving' },
            { exercise: 'Landmine Press', sets: '3×10 each arm', cue: 'Single arm press in a staggered stance. Combines shoulder strength with core rotational stability.', benefit: 'Unilateral pressing strength & stability' },
          ].map(({ exercise, sets, cue, benefit }) => (
            <div key={exercise} className="border border-slate-100 rounded-xl p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="font-bold text-slate-900 text-sm">{exercise}</span>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded shrink-0">{sets}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-2">{cue}</p>
              <p className="text-xs font-medium text-slate-700">→ {benefit}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Core — The Transfer Station</h3>
        <p className="text-slate-500 text-xs leading-relaxed mb-4">
          Power generated by the legs must pass through the core before reaching the racket. A strong core doesn't mean a six-pack — it means stiffness and control under rotational load.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { exercise: 'Pallof Press', sets: '3×12 each side', note: 'Anti-rotation — resists twisting force, directly relevant to groundstroke follow-through' },
            { exercise: 'Dead Bug', sets: '3×10 each side', note: 'Core stability with opposite limb movement — mimics the coordination demand of hitting on the run' },
            { exercise: 'Copenhagen Plank', sets: '3×20s each', note: 'Adductor and lateral core — prevents groin injuries from wide court coverage' },
            { exercise: 'Farmers Carry', sets: '3×30m each hand', note: 'Loaded carry with a single arm — builds grip, shoulder, and lateral core stability simultaneously' },
          ].map(({ exercise, sets, note }) => (
            <div key={exercise} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="font-bold text-slate-900 text-sm">{exercise}</span>
                <span className="text-xs text-teal-600 font-semibold shrink-0">{sets}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AgilityTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">Speed & Agility for Tennis</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          Tennis agility is not a straight-line sprint. It's the ability to accelerate, decelerate, change direction, and immediately re-accelerate — often multiple times in a single point. These drills train the specific movement patterns the sport demands.
        </p>
        <div className="bg-amber-50 rounded-xl p-4 border-l-4 border-amber-400">
          <p className="text-amber-800 font-semibold text-sm">Quality over quantity: 6 explosive, focused reps beat 20 lazy ones. Always rest fully between agility sets — fatigue in speed training produces slow athletes.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Footwork Drills</h3>
        <div className="space-y-4">
          {[
            { drill: 'Split-Step to Sprint', reps: '6×4 steps', how: 'Begin in athletic stance. Coach claps or calls direction. Perform a split-step (small jump landing on both feet simultaneously), then explode into 3–4 sprint steps toward the called direction.', why: 'Trains the exact timing and explosiveness of court movement response.' },
            { drill: 'Lateral Shuffle + Cross Step', reps: '3×10m each way', how: 'Start in low athletic stance. Shuffle 3 steps right, then cross-over step, shuffle 3 steps, cross-over step. Move fluidly without feet crossing during the shuffle phase.', why: 'Combines the two primary lateral movement patterns used in baseline rallying.' },
            { drill: 'Cone T-Drill (Tennis Variation)', reps: '5 runs', how: 'Cones in a T formation 5m each arm. Sprint forward, shuffle right, shuffle left, shuffle back to center, backpedal to start. Time each run. Rest 60s between runs.', why: 'Tests and trains multi-directional movement efficiency.' },
            { drill: 'Spider Drill', reps: '5 runs', how: '6 balls placed at corners of service box and baseline. Sprint from center, touch ball position, return to center each time. Touch all 6 as fast as possible.', why: 'The benchmark agility test used in professional tennis academies worldwide.' },
          ].map(({ drill, reps, how, why }) => (
            <div key={drill} className="border border-slate-100 rounded-xl p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="font-bold text-slate-900 text-sm">{drill}</span>
                <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded shrink-0">{reps}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-2"><span className="font-medium text-slate-700">How: </span>{how}</p>
              <p className="text-xs text-teal-700 font-medium">Why it works: {why}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Plyometric Power</h3>
        <p className="text-slate-500 text-xs leading-relaxed mb-4">
          Plyometrics train the stretch-shortening cycle — the elastic rebound that makes great movers look effortless. Do these after a full warmup and never when fatigued.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { name: 'Box Jumps', reps: '4×6', note: 'Step down (don\'t jump down) to protect joints. Focus on explosive takeoff, not landing height.' },
            { name: 'Lateral Bounds', reps: '3×8 each', note: 'Single-leg lateral jump with controlled landing. Directly mimics the force production in lateral court movement.' },
            { name: 'Depth Drops', reps: '3×6', note: 'Step off box (30cm), absorb landing silently. Teaches deceleration — the most injury-prone phase of court movement.' },
            { name: 'Medicine Ball Rotational Throws', reps: '3×10 each', note: 'Explosive hip rotation throw against a wall. The most direct power transfer exercise for groundstrokes.' },
          ].map(({ name, reps, note }) => (
            <div key={name} className="bg-orange-50 rounded-xl p-4 border border-orange-100">
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="font-bold text-slate-900 text-sm">{name}</span>
                <span className="text-xs text-orange-600 font-semibold shrink-0">{reps}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RecoveryTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">Recovery Is Training</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          Adaptation happens during rest, not during the workout itself. Players who skip recovery protocols get injured, plateau, and burn out. The best athletes are not the ones who train hardest — they're the ones who recover best.
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { label: 'Sleep', value: '8–9 hrs', note: 'The single most powerful recovery tool. Cannot be replaced by anything else.' },
            { label: 'Protein', value: '1.6–2g/kg', note: 'Per kilogram of bodyweight daily. Non-negotiable for muscle repair after training.' },
            { label: 'Rest Days', value: '2–3/week', note: 'At least one full rest day per week. Two during heavy competition periods.' },
          ].map(({ label, value, note }) => (
            <div key={label} className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
              <p className="text-xs text-slate-500 font-medium mb-1">{label}</p>
              <p className="text-xl font-extrabold text-teal-600 mb-1">{value}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Post-Training Mobility Routine (12 minutes)</h3>
        <p className="text-slate-500 text-xs leading-relaxed mb-4">
          Do this immediately after every court session or gym workout. Hold each stretch 45–60 seconds. Never stretch cold.
        </p>
        <div className="space-y-3">
          {[
            { stretch: 'Hip Flexor Stretch', hold: '60s each', area: 'Hip flexors', note: 'Kneeling lunge position. Posterior tuck of the pelvis to fully open the hip flexor. Critical for players who sit between sessions.' },
            { stretch: 'Sleeper Stretch', hold: '60s each shoulder', area: 'Posterior shoulder capsule', note: 'Lying on the hitting-arm side, use other arm to gently press the forearm down. Directly prevents shoulder internal rotation restriction.' },
            { stretch: 'Thoracic Rotation', hold: '45s each side', area: 'Upper back', note: 'Seated or kneeling, rotate upper back maximally. Maintains the trunk rotation range required for full power generation.' },
            { stretch: 'Figure-4 Glute Stretch', hold: '60s each', area: 'Glutes & piriformis', note: 'Lying on back, cross one ankle over the opposite knee, pull knees to chest. Counteracts the compression from explosive court movement.' },
            { stretch: 'Standing Calf & Achilles', hold: '45s each', area: 'Calf & Achilles', note: 'Against a wall. Bend knee slightly in second rep to target the soleus. Tennis puts extreme load on the Achilles — keep it flexible.' },
          ].map(({ stretch, hold, area, note }) => (
            <div key={stretch} className="flex gap-4 border border-slate-100 rounded-xl p-4">
              <div className="w-20 shrink-0 text-center">
                <p className="text-xs font-semibold text-teal-600">{hold}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{area}</p>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm mb-1">{stretch}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-3">Match Day Recovery Protocol</h3>
        <div className="space-y-2">
          {[
            { time: 'Within 30 min of match', action: 'Ingest 20–40g protein + simple carbs. Chocolate milk, yogurt with fruit, or a protein shake with a banana are all effective.' },
            { time: '1–2 hrs after', action: 'Full mixed meal with protein, complex carbs (rice, pasta, potatoes), and vegetables. This is when the bulk of glycogen replenishment occurs.' },
            { time: 'Before bed', action: 'Casein protein (cottage cheese, Greek yogurt) slows overnight muscle breakdown and supports repair during sleep.' },
            { time: 'Next morning', action: 'Light movement — a 15-minute walk or easy spin on a bike accelerates blood flow to sore muscles and speeds clearance of metabolic waste.' },
          ].map(({ time, action }) => (
            <div key={time} className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-800">{time}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProgramsTab() {
  const [activeProgram, setActiveProgram] = useState(0)

  const PROGRAMS = [
    {
      name: 'Foundation (Beginners)',
      sessions: '2×/week',
      focus: 'Movement quality, injury prevention, base strength',
      color: 'bg-teal-50 border-teal-200 text-teal-800',
      days: [
        {
          day: 'Day A',
          exercises: [
            'Warm-up: 5 min light cardio + arm circles',
            'Lateral Band Walks — 3×15',
            'Bodyweight Split Squat — 3×10 each',
            'Dead Bug — 3×8 each side',
            'Dumbbell External Rotation — 3×15',
            'Serratus Wall Slide — 3×12',
            'Cool-down: 12-min mobility routine',
          ],
        },
        {
          day: 'Day B',
          exercises: [
            'Warm-up: 5 min + dynamic leg swings',
            'Goblet Squat — 3×12',
            'Romanian Deadlift (light) — 3×12',
            'Pallof Press — 3×10 each side',
            'Face Pulls — 3×15',
            'Step-ups — 3×10 each leg',
            'Cool-down: 12-min mobility routine',
          ],
        },
      ],
    },
    {
      name: 'In-Season (Intermediate)',
      sessions: '2×/week',
      focus: 'Maintain strength, peak power, manage fatigue',
      color: 'bg-blue-50 border-blue-200 text-blue-800',
      days: [
        {
          day: 'Day A — Power',
          exercises: [
            'Warm-up: 8 min movement prep',
            'Medicine Ball Rotational Throws — 3×8',
            'Box Jumps — 4×5',
            'Bulgarian Split Squat — 3×8 each',
            'Landmine Press — 3×8 each',
            'Copenhagen Plank — 3×20s',
            'Cool-down: mobility + foam roll',
          ],
        },
        {
          day: 'Day B — Maintenance',
          exercises: [
            'Warm-up: 8 min activation',
            'Lateral Bounds — 3×6 each',
            'Cable Woodchop — 3×10 each',
            'Single-leg RDL — 3×10 each',
            'External Rotation — 3×15',
            'Farmers Carry — 3×30m each hand',
            'Cool-down: 12-min full mobility',
          ],
        },
      ],
    },
    {
      name: 'Off-Season Build',
      sessions: '3×/week',
      focus: 'Maximum strength & power development',
      color: 'bg-purple-50 border-purple-200 text-purple-800',
      days: [
        {
          day: 'Day A — Lower Power',
          exercises: [
            'Warm-up: 10 min full activation',
            'Squat Jumps — 4×6',
            'Barbell Back Squat — 4×6',
            'Bulgarian Split Squat — 3×8 each',
            'Lateral Bounds — 4×6 each',
            'Copenhagen Plank — 3×25s',
            'Cool-down: lower body mobility',
          ],
        },
        {
          day: 'Day B — Upper Power',
          exercises: [
            'Med Ball Overhead Slam — 4×6',
            'Landmine Press — 4×8 each',
            'Cable Woodchop (heavy) — 4×10 each',
            'Dumbbell Row — 3×10 each',
            'External Rotation — 4×15',
            'Dead Bug (weighted) — 3×8',
            'Cool-down: upper body mobility',
          ],
        },
        {
          day: 'Day C — Agility & Conditioning',
          exercises: [
            'T-Drill — 5 runs (rest 60s)',
            'Spider Drill — 5 runs (rest 60s)',
            'Shuttle Runs — 6×30m',
            'Pallof Press — 3×12 each',
            'Depth Drops — 3×6',
            'Serratus Wall Slide — 3×12',
            'Cool-down: full 12-min routine',
          ],
        },
      ],
    },
  ]

  const program = PROGRAMS[activeProgram]

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-4">Gym Programs</h2>
        <div className="flex flex-wrap gap-2">
          {PROGRAMS.map((p, i) => (
            <button
              key={i}
              onClick={() => setActiveProgram(i)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeProgram === i ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className={`rounded-2xl border p-5 ${program.color}`}>
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className="font-extrabold text-base">{program.name}</h3>
          <span className="text-sm font-semibold opacity-80 shrink-0">{program.sessions}</span>
        </div>
        <p className="text-sm opacity-80">{program.focus}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {program.days.map(({ day, exercises }) => (
          <div key={day} className="bg-white rounded-2xl border border-slate-100 p-5">
            <h4 className="font-bold text-slate-900 mb-3">{day}</h4>
            <ul className="space-y-2">
              {exercises.map((ex, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  <p className="text-xs text-slate-600">{ex}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-3">Progression Guidelines</h3>
        <div className="space-y-3">
          {[
            'Weeks 1–2: Learn movements, use light weights, focus on form',
            'Weeks 3–4: Add 5% load to lower body, 2.5% to upper body exercises',
            'Week 5: Deload — reduce volume by 40%, maintain intensity',
            'Weeks 6+: Restart cycle with heavier starting weights',
          ].map((rule, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
              <p className="text-sm text-slate-600">{rule}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function GymTraining() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('why-gym')

  return (
    <div className="min-h-screen bg-gray-950 pt-14">
      <div className="sticky top-14 z-30 bg-gray-950/95 backdrop-blur border-b border-gray-800 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-white font-semibold text-sm">Tennis in the Gym</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-6 pb-12">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-teal-900/50 text-teal-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
            Add-On
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Tennis in the Gym</h1>
          <p className="text-gray-400 text-sm mt-1.5 max-w-xl">
            Sport-specific conditioning to sharpen your game off the court.
          </p>
        </div>

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

        {activeTab === 'why-gym' && <WhyGymTab />}
        {activeTab === 'strength' && <StrengthTab />}
        {activeTab === 'agility' && <AgilityTab />}
        {activeTab === 'recovery' && <RecoveryTab />}
        {activeTab === 'programs' && <ProgramsTab />}
      </div>
    </div>
  )
}
