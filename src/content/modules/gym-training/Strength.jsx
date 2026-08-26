import { Card, SectionTitle, Lead, Body, Callout, DataTable, CueGrid, TimeBlocks, FaultFix } from '../../../components/dashboard/content/Blocks'

export default function Strength() {
  return (
    <>
      <Card>
        <SectionTitle>Strength is the platform</SectionTitle>
        <Lead>
          Every explosive quality you want on court — first-step speed, serve pace, stability in a
          stretched forehand — sits on top of basic strength. Tennis strength is not bodybuilding:
          the goal is force you can transfer through the ground, one leg at a time, while
          rotating. That means lower-body and single-leg work, hinge patterns, pulling more than
          pushing, and a trunk trained to resist rotation as well as create it.
        </Lead>
        <div className="mt-4">
          <Callout label="The rule">
            Lift heavy enough to matter — the last two reps of a set should feel genuinely hard —
            but never to failure. You are training to play tennis, not to survive the gym; leave
            every session able to practice tomorrow.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle sub="The whole program is six movements. Two sessions a week, 40 minutes each.">
          The six lifts
        </SectionTitle>
        <DataTable
          headers={['Exercise', 'Sets × reps', 'Form cue']}
          rows={[
            [
              'Goblet squat',
              '3 × 8',
              'Dumbbell at the chest, elbows inside the knees at the bottom, drive the floor away. Progress to front squat.',
            ],
            [
              'Rear-foot-elevated split squat',
              '3 × 8 / leg',
              'Back foot on a bench, torso tall, front knee tracking over the toes — the closest lift to an open-stance forehand base.',
            ],
            [
              'Romanian deadlift',
              '3 × 8',
              'Soft knees, hips travel back until the hamstrings load, flat back throughout. Builds the posterior chain every sprint uses.',
            ],
            [
              'One-arm dumbbell row',
              '3 × 10 / arm',
              'Pull the elbow to the hip, no torso twist. Serving shoulders need twice as much pulling volume as pushing.',
            ],
            [
              'Half-kneeling overhead press',
              '3 × 8 / arm',
              'One knee down, ribs stacked over hips, press without leaning. Overhead strength with the trunk doing its match job.',
            ],
            [
              'Pallof press',
              '3 × 10 / side',
              'Band at chest height, press out and resist the pull to rotate. Anti-rotation strength is what keeps the trunk stable at contact.',
            ],
          ]}
        />
      </Card>

      <Card>
        <SectionTitle>Progression that never stalls</SectionTitle>
        <CueGrid
          items={[
            {
              label: 'Weeks 1–2',
              value: 'Learn the movements with light loads. Every rep smooth, filmed once to check form. Boring on purpose.',
            },
            {
              label: 'Weeks 3–6',
              value: 'Add a small amount of weight each week while reps stay at 8. When all sets finish clean, the load goes up next session.',
            },
            {
              label: 'Week 7+',
              value: 'Alternate a heavier week (3 × 5, more load) with a standard week (3 × 8). Deload every fourth week: same lifts, 60% weight.',
            },
          ]}
        />
        <Body className="mt-4">
          Track every session in your phone — exercise, weight, reps. Strength training without a
          log is guesswork, and the log is also your early-warning system: when planned weights
          suddenly feel heavy for two sessions running, you are under-recovered, not weak. See
          Part 5.
        </Body>
      </Card>

      <Card>
        <SectionTitle sub="A complete session, timed. Warm-up included — it is not optional.">
          The 40-minute session
        </SectionTitle>
        <TimeBlocks
          blocks={[
            {
              time: '0–8 min',
              title: 'Warm-up',
              body: 'Two minutes easy bike or rope, then leg swings, hip openers, bodyweight squats, band pull-aparts. Finish with one light set of the first lift.',
            },
            {
              time: '8–22 min',
              title: 'Lower body pair',
              body: 'Goblet squat and RDL as alternating sets — a set of one, rest 90 seconds, a set of the other. Heavier work while you are freshest.',
            },
            {
              time: '22–34 min',
              title: 'Single-leg + pull pair',
              body: 'Split squats alternated with rows, same rhythm. The split squat is the set most worth fighting for — it is the most tennis-specific lift you own.',
            },
            {
              time: '34–40 min',
              title: 'Press + trunk pair',
              body: 'Half-kneeling press alternated with Pallof presses. Finish with 60 seconds of easy stretching for whatever felt tightest.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle>Common mistakes</SectionTitle>
        <FaultFix
          items={[
            {
              fault: 'Training like a bodybuilder',
              fix: 'Isolation curls and machine circuits build beach muscle, not court force. Six compound movements, progressively loaded, beat any 12-exercise machine tour.',
            },
            {
              fault: 'Only bilateral lifts',
              fix: 'Tennis is played one leg at a time. If your program has squats but no split squats or step-ups, half the transfer is missing.',
            },
            {
              fault: 'Heavy legs the day before matches',
              fix: 'Lower-body strength work leaves 48 hours of heaviness. Schedule it immediately after match days, never before.',
            },
            {
              fault: 'Chasing soreness',
              fix: 'Soreness measures novelty, not progress. The log measures progress. If the numbers climb and you can still practice, the program is working.',
            },
          ]}
        />
      </Card>
    </>
  )
}
