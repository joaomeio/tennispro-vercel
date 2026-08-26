import { Card, SectionTitle, Lead, Body, Callout, StepList, DataTable, TimeBlocks, FaultFix } from '../../../components/dashboard/content/Blocks'

export default function Agility() {
  return (
    <>
      <Card>
        <SectionTitle>The two-metre sport</SectionTitle>
        <Lead>
          Most points are decided inside two metres: the half-step that turns a stretch into a
          strike, the recovery that arrives before the next ball, the split step that fires at
          the right instant. Research on elite movers points at the ankle: better players
          pre-load lower, react from the ground faster and waste less time between decision and
          first step. All of it is trainable — but only if you train reaction and deceleration,
          not just foot speed.
        </Lead>
        <div className="mt-4">
          <Callout label="Order of operations">
            Braking before accelerating. The player who can stop in one step owns every change of
            direction; the player who cannot is still sliding when the next ball leaves the
            opponent’s strings. Deceleration strength is the unglamorous half of agility — train
            it first.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle sub="The split step is timing, not jumping — land as the opponent’s strings meet the ball.">
          Rebuilding the split step
        </SectionTitle>
        <StepList
          steps={[
            {
              title: 'Groove the hop',
              body: 'Small, narrow hop — feet barely leave the ground, landing slightly wider than the hips, weight on the balls of the feet. Big jumps arrive late.',
            },
            {
              title: 'Attach it to a trigger',
              body: 'Shadow it against a wall or TV: split as the hitter’s racket accelerates to contact. The step is a prediction, not a reaction — you are airborne while the ball is struck.',
            },
            {
              title: 'Load it directionally',
              body: 'A partner points left or right mid-hop; land already pushing that way. The landing leg is the launch leg — one motion, no stutter.',
            },
            {
              title: 'Take it into live balls',
              body: 'Every fed drill, every rally, every return. A split step that only exists in footwork drills does not exist.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="Closed drills build mechanics; reactive drills build tennis. The session needs both.">
          The drill menu
        </SectionTitle>
        <DataTable
          headers={['Drill', 'Dose', 'What it trains']}
          rows={[
            [
              'Lateral shuffle + stick',
              '3 × 5 / side',
              'Three hard shuffle steps, stop dead in one outside-leg plant, hold. Pure braking strength in the tennis stance.',
            ],
            [
              '5-10-5 pro agility',
              '4 runs',
              'Sprint 5 m, turn, 10 m back, turn, 5 m through. The full accelerate–brake–reaccelerate cycle, timed monthly.',
            ],
            [
              'Spider drill',
              '3 rounds',
              'From the centre mark, touch a ball at each of five court positions and recover between each. Match-shaped movement endurance.',
            ],
            [
              'Reactive cone touch',
              '3 × 30 s',
              'Partner calls or points to cones at random; explode, touch, recover to centre. The decision component ladders never train.',
            ],
            [
              'Mirror drill',
              '3 × 20 s',
              'Face a partner across the doubles alley; shadow their lateral movement. Reading a human, not a pattern — closest thing to a rally without a ball.',
            ],
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="Twenty minutes, twice a week, legs fresh — before court work or standalone.">
          The agility session
        </SectionTitle>
        <TimeBlocks
          blocks={[
            {
              time: '0–5 min',
              title: 'Warm-up',
              body: 'Jog, side shuffles, carioca, three progressive accelerations. Ankles awake, hips open.',
            },
            {
              time: '5–10 min',
              title: 'Split-step circuit',
              body: 'Two of the four split-step progressions, whichever stage you are on. Quality hops only.',
            },
            {
              time: '10–16 min',
              title: 'Closed drills',
              body: 'Shuffle-and-stick plus one timed 5-10-5 block. Full rest between runs — this is speed work.',
            },
            {
              time: '16–20 min',
              title: 'Reactive block',
              body: 'Cone touches or mirror drill. End on the most game-like drill so the nervous system files it under tennis.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle>Common mistakes</SectionTitle>
        <FaultFix
          items={[
            {
              fault: 'Living on the speed ladder',
              fix: 'Ladders train fast feet in a known pattern — useful for warm-ups, nearly useless for reading a ball. If a drill has no decision in it, it is coordination, not agility.',
            },
            {
              fault: 'Agility work while exhausted',
              fix: 'Sloppy, slow change-of-direction reps groove sloppy, slow patterns. Fresh legs, full rests; conditioning is a different session.',
            },
            {
              fault: 'Always turning off the same leg',
              fix: 'Everyone has a favourite pivot leg and a blind side. Count reps per side in every drill — the weak side gets the extra set.',
            },
            {
              fault: 'No timing, no progress',
              fix: 'Time the 5-10-5 on the first session of each month, same shoes, same surface. Movement that is not measured quietly stops improving.',
            },
          ]}
        />
        <Body className="mt-4">
          One more free gain: watch your own match footage and count how often you hit without
          having split-stepped. Most club players are shocked — and fixing that number costs
          nothing but attention.
        </Body>
      </Card>
    </>
  )
}
