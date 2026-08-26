import { Card, SectionTitle, Lead, Body, Callout, DataTable, StepList } from '../../../components/dashboard/content/Blocks'

export default function Goals() {
  return (
    <>
      <Card>
        <SectionTitle>Direction beats motivation</SectionTitle>
        <Lead>
          Goal setting is the least glamorous mental skill and the one with the deepest research
          base: specific goals with feedback and revision reliably outperform “do your best”, in
          sport as everywhere else. But tennis punishes the naive version — a season goal of
          “win the club championship” gives you exactly one scoring event a year and hands your
          motivation to draws, opponents and weather. The fix is a three-layer system where the
          layers you fully control do the daily work.
        </Lead>
        <div className="mt-4">
          <DataTable
            headers={['Layer', 'Example', 'Your control']}
            rows={[
              ['Outcome', 'Reach division two; win the spring event.', 'Partial — opponents get a vote. Sets direction; never judges a week.'],
              ['Performance', 'First-serve percentage above 60%; win 40% of second-serve return points.', 'Mostly — measurable in every match, opponent-resistant.'],
              ['Process', 'Full 16-second routine every point; three quality sessions a week; kick serve grooved by June.', 'Total — succeed by doing. This layer runs your actual days.'],
            ]}
          />
        </div>
        <div className="mt-4">
          <Callout label="The research verdict">
            Studies of process-focused athletes keep finding the same pattern: better performance,
            higher confidence, lower anxiety. The outcome goal points the ship; the process goals
            row it — and a lost match cannot capsize a rowing schedule.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle sub="A goal system is only alive if it cycles. This loop takes twenty minutes a month.">
          The working loop
        </SectionTitle>
        <StepList
          steps={[
            {
              title: 'Set the season line',
              body: 'One outcome goal, honest and exciting. Write why it matters to you — the why is the fuel gauge you will check in February.',
            },
            {
              title: 'Translate into numbers',
              body: 'Two or three performance markers that would make the outcome likely: serve percentages, return points, net points won. If you cannot measure it in a match, it is not a marker.',
            },
            {
              title: 'Contract the week',
              body: 'Process goals as a weekly checklist: sessions, drills, routines, fitness. Small enough to complete in a bad week — a system that only survives good weeks is a wish.',
            },
            {
              title: 'Review and revise monthly',
              body: 'Twenty minutes with the numbers: what moved, what stalled, what needs a new plan. Goals adjust; abandonment is the only failure mode. The revision meeting IS the system.',
            },
          ]}
        />
        <Body className="mt-4">
          For juniors, keep the ratio visible: one dream goal on the wall, three process goals in
          the bag. And when a player hits a performance marker in a losing match, say so on the
          way home — that sentence, repeated for a season, builds an athlete who can lose a match
          without losing the plot.
        </Body>
      </Card>
    </>
  )
}
