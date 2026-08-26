import { Card, SectionTitle, Lead, Callout, CueGrid, StatRow } from '../../../components/dashboard/content/Blocks'
import Strength from './Strength'
import Power from './Power'
import Agility from './Agility'
import Prevention from './Prevention'
import Recovery from './Recovery'

// ─────────────────────────────────────────────────────────────────────────────
// TENNIS IN THE GYM
// Part keys match GYM_CARDS in config/catalog.js.
// ─────────────────────────────────────────────────────────────────────────────

function Intro() {
  return (
    <div className="space-y-5">
      <Card>
        <SectionTitle sub="Why the strongest version of your tennis is built off the court.">
          The off-court advantage
        </SectionTitle>
        <Lead>
          Tennis is a sprint sport wearing an endurance costume: a match is hundreds of 3–8 second
          explosive efforts — sprint, plant, rotate, decelerate — separated by short rests, for
          hours. The gym is where you build the qualities the court demands but cannot itself
          train: maximal strength, explosive power, elastic ankles, and shoulders that survive a
          thousand serves a month.
        </Lead>
        <div className="mt-4">
          <StatRow
            stats={[
              { value: '26%', label: 'reduction in overuse problems from kinetic-chain, core and eccentric rotator-cuff training in players' },
              { value: '6 wks', label: 'of structured conditioning measurably increased junior players’ serve velocity in a controlled study' },
              { value: '2–3×', label: 'per week is enough — quality explosive work beats volume every time' },
            ]}
          />
        </div>
      </Card>

      <Card>
        <SectionTitle sub="The five programs are designed to run together. This is the weekly skeleton they plug into.">
          How to schedule around court time
        </SectionTitle>
        <CueGrid
          cols={2}
          items={[
            {
              label: 'Hard days hard, easy days easy',
              value: 'Stack gym power work on the same day as intense court sessions and keep genuine rest days clean — two medium days help you less than one hard and one easy.',
            },
            {
              label: 'Strength after court, never before',
              value: 'Heavy lifting before practice degrades stroke quality and reaction time. Court first, gym after — or separate them by 6+ hours.',
            },
            {
              label: 'Power fresh, always',
              value: 'Jumps, throws and sprints are nervous-system work. Do them fresh, first in any session, and stop while every rep is still fast.',
            },
            {
              label: 'Prevention is daily, not weekly',
              value: 'The shoulder and core routine in Part 4 takes 12 minutes and belongs in every week of the year — including tournament weeks.',
            },
          ]}
        />
        <div className="mt-4">
          <Callout label="In season vs off season">
            Off-season: 3 gym sessions a week, building. In-season: 2 shorter sessions maintaining
            — strength disappears in about three weeks of neglect, but one hard full-body session
            and one power session a week will hold everything you built.
          </Callout>
        </div>
      </Card>
    </div>
  )
}

export default {
  accent: '#2dd4bf',
  washFrom: '#042f2e',
  tagline:
    'Five programs that build a tennis body: strength, explosive power, agility, injury-proofing, and the recovery that ties a training week together.',
  Intro,
  parts: [
    {
      key: 'strength',
      minutes: 10,
      summary: 'The foundation program — six lifts that carry to the court, with sets, reps and form cues.',
      Component: Strength,
    },
    {
      key: 'power',
      minutes: 9,
      summary: 'Turn strength into first-step speed and serve velocity with jumps and medicine-ball throws.',
      Component: Power,
    },
    {
      key: 'agility',
      minutes: 9,
      summary: 'Split step, change of direction, reactive movement — training the two metres that decide points.',
      Component: Agility,
    },
    {
      key: 'prevention',
      minutes: 10,
      summary: 'The 12-minute shoulder, elbow and core routine that keeps you on court year-round.',
      Component: Prevention,
    },
    {
      key: 'recovery',
      minutes: 8,
      summary: 'Sleep, cooldowns and the between-session habits that decide whether training becomes progress.',
      Component: Recovery,
    },
  ],
}
