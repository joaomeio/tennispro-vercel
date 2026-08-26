import { Card, SectionTitle, Lead, Body, Callout, CueGrid, TimeBlocks, DataTable } from '../../../components/dashboard/content/Blocks'

export default function Recovery() {
  return (
    <>
      <Card>
        <SectionTitle>Training is the question, recovery is the answer</SectionTitle>
        <Lead>
          Nothing you do in the gym or on court makes you better while you are doing it — the
          adaptation happens afterwards, and only if recovery allows it. Recovery is not foam
          rollers and ice baths; in order of importance it is sleep, food, easy movement, and
          stress management. The gadgets fight over the last five percent.
        </Lead>
        <div className="mt-4">
          <Callout label="Priority order">
            Sleep beats everything else combined. Athletes sleeping under seven hours get injured
            more, learn skills slower and decide worse under fatigue. If you change one thing
            after reading this module, make it a consistent sleep window — same hour to bed, same
            hour up, eight hours inside it.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle>The four pillars</SectionTitle>
        <CueGrid
          cols={2}
          items={[
            {
              label: 'Sleep',
              value: '8 hours in a consistent window; cool, dark room; screens out of the last 30 minutes. Junior players in growth phases need 9+.',
            },
            {
              label: 'Fuel',
              value: 'Protein at every meal (palm-sized portion), carbohydrate scaled to that day’s training, and a real meal within two hours of hard sessions. Hydration starts the day before a match.',
            },
            {
              label: 'Easy movement',
              value: 'The day after a hard match, a 20-minute walk, swim or spin clears more heaviness than a day on the couch. Blood flow is the mechanism; gentle is the dose.',
            },
            {
              label: 'Stress budget',
              value: 'The body runs one recovery account for training, work and life stress together. Exam week or a brutal work sprint is a physiological training load — plan lighter sessions around it.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="Ten minutes that decide how tomorrow feels.">
          The post-session cooldown
        </SectionTitle>
        <TimeBlocks
          blocks={[
            {
              time: '0–3 min',
              title: 'Downshift',
              body: 'Easy jog or walk until breathing is conversational. The nervous system needs an off-ramp, not a hard stop at the net post.',
            },
            {
              time: '3–8 min',
              title: 'Stretch what worked',
              body: 'Hip flexors, hamstrings, chest and forearms — 30 seconds each, easy holds. After serving days add the sleeper stretch from Part 4.',
            },
            {
              time: '8–10 min',
              title: 'Refuel + one note',
              body: 'Drink, eat something with carbs and protein, and write one line in the training log: what you did and how it felt, 1–10. That number becomes your most useful graph.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="What to do in the 24 hours around competition.">
          Match-day protocols
        </SectionTitle>
        <DataTable
          headers={['When', 'Do', 'Skip']}
          rows={[
            [
              'Night before',
              'Normal dinner with extra carbs, bag packed, normal bedtime. Familiarity is the strategy.',
              'New foods, late scouting of the opponent, extra practice “just in case”.',
            ],
            [
              'Between matches',
              'Shade, feet up, sip carbs and fluids, 20 minutes quiet. Re-warm up fully before the next round.',
              'Sitting in the sun analysing the last match point by point.',
            ],
            [
              'After the match',
              'Cooldown, refuel within the hour, easy walk in the evening.',
              'Ice baths by default — save cold water for tournaments with same-day matches; routine icing may blunt training adaptation.',
            ],
            [
              'Next morning',
              '20 minutes easy movement, mobility, honest 1–10 body scan.',
              'A full-intensity practice to “work off” a loss. The body does not know the score; it only knows the load.',
            ],
          ]}
        />
        <Body className="mt-4">
          A last word on the training week: schedule recovery like it is a session, because it is
          one. The plan from this module’s intro — hard days hard, easy days easy — only works if
          the easy days actually stay easy. The discipline to rest is the same discipline that
          finishes the last set; most players only ever develop one of the two.
        </Body>
      </Card>
    </>
  )
}
