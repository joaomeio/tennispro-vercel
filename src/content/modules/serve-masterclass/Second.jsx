import { Card, SectionTitle, Lead, Callout, CueGrid, StatRow, StepList, TimeBlocks } from '../../../components/dashboard/content/Blocks'

export default function Second() {
  return (
    <>
      <Card>
        <SectionTitle>The serve that decides close matches</SectionTitle>
        <Lead>
          Most club players’ second serve is their biggest competitive liability — and it has
          nothing to do with mental weakness. Afraid of the double fault, they slow the arm,
          push the ball in, and hand over a free attacking ball. The fix is not courage; it is
          owning a second serve that is structurally safe to hit aggressively. That serve is the
          kick from Part 3. This part is about deploying it.
        </Lead>
        <div className="mt-4">
          <StatRow
            stats={[
              { value: '80%', label: 'of professional second serves are aimed at a corner — not floated to the middle' },
              { value: '57.9%', label: 'second-serve points won led the ATP in 2023 (Djokovic) — placement, not pace' },
              { value: '60%+', label: 'the second-serve make rate to hold before adding pace — below it, add spin' },
            ]}
          />
        </div>
      </Card>

      <Card>
        <SectionTitle>Reframe it</SectionTitle>
        <Callout label="The mindset shift">
          A second serve is not a safe serve — it is an aggressive serve with higher margin. You
          swing faster than on your first serve, with the speed converted into spin instead of
          pace. The moment “don’t miss” replaces “brush hard to the backhand,” the arm slows and
          the fault you feared becomes likely.
        </Callout>
        <div className="mt-4">
          <CueGrid
            cols={2}
            items={[
              {
                label: 'Pick a target, every time',
                value: 'Standing at the line with no plan creates last-second decisions, and last-second decisions create faults. Target first, then toss.',
              },
              {
                label: 'Spin is the safety net',
                value: 'If your make-rate drops under pressure, the answer is more brush, never a slower arm. Racket-head speed is what keeps the ball in.',
              },
              {
                label: 'Measure it',
                value: 'Count every second serve in practice: makes, target hits, double faults. You cannot trust what you have never measured.',
              },
              {
                label: 'One pattern you own',
                value: 'Kick to the backhand is your home base. One grooved, trusted pattern beats five hopeful options when the score is 30–40.',
              },
            ]}
          />
        </div>
      </Card>

      <Card>
        <SectionTitle sub="Where to aim when only the second serve is left.">
          Second-serve placement
        </SectionTitle>
        <StepList
          steps={[
            {
              title: 'Default: kick to the backhand',
              body: 'Ad court wide, deuce court T (against right-handers). High bounce to the weaker wing — the percentage play that wins the neutral exchange that follows.',
            },
            {
              title: 'Change-up: kick into the body',
              body: 'Aimed at the returner’s non-dominant hip, the kick climbs into them. Especially effective against players who step in to attack second serves — there is no room to swing.',
            },
            {
              title: 'Surprise: slider to the forehand',
              body: 'Once a set, on a comfortable point. Its job is not to win the point but to plant doubt — a returner who cannot camp on the backhand side returns everything worse.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="Pressure is a training variable, like weight on a bar. Load it deliberately.">
          Pressure protocol
        </SectionTitle>
        <TimeBlocks
          blocks={[
            {
              time: 'Drill 1',
              title: 'Second serves only',
              body: 'Play a practice set with no first serve. Every point starts on your second. Nothing builds trust in the kick faster — and nothing exposes a pushed second serve more honestly.',
            },
            {
              time: 'Drill 2',
              title: 'The 0–30 start',
              body: 'Every service game of a practice set begins at 0–30. You will hit second serves on big points constantly — exactly the reps a real match never gives you enough of.',
            },
            {
              time: 'Drill 3',
              title: 'Double-fault ladder',
              body: 'Ten second serves to a called target. A double fault resets the count to zero. Finish the ladder two sessions in a row before adding pace.',
            },
            {
              time: 'Drill 4',
              title: 'Score call-outs',
              body: 'Before each serve, call a score out loud — “30–40”, “ad-out, tiebreak”. Say it, feel the tightness it creates, then run your full routine and serve. Simulated stakes transfer better than silent reps.',
            },
          ]}
        />
        <div className="mt-4">
          <Callout label="The standard">
            A trustworthy second serve is one you would hit at 4–5, 30–40 without your motion
            changing. Until then it is a practice-court serve — keep loading pressure in training
            until the match version and the practice version are the same swing.
          </Callout>
        </div>
      </Card>
    </>
  )
}
