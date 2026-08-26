import { Card, SectionTitle, Lead, Body, Callout, CueGrid, DataTable, TimeBlocks, Checklist } from '../../../components/dashboard/content/Blocks'

export default function Red() {
  return (
    <>
      <Card>
        <SectionTitle>The stage where athletes are made</SectionTitle>
        <Lead>
          Red ball is not mini tennis — it is the athletic foundation window. Between four and
          six, children build the movement vocabulary every later stroke stands on: running,
          jumping, balancing, throwing, catching, tracking a moving ball. The red stage wraps all
          of that in a racket game, on a court where a rally is genuinely possible in week one.
        </Lead>
        <div className="mt-4">
          <CueGrid
            cols={4}
            items={[
              { label: 'Ball', value: 'Red — foam or felt, ~75% slower than yellow, big and bright.' },
              { label: 'Court', value: '11 m × 5.5 m (36 × 18 ft), across the doubles court.' },
              { label: 'Net', value: '80 cm (2 ft 9 in) — portable nets or a band.' },
              { label: 'Racket', value: '43–58 cm (17–23"), chosen so the child can swing with a bent arm.' },
            ]}
          />
        </div>
      </Card>

      <Card>
        <SectionTitle sub="At this age, tennis skills ARE movement skills. The stroke list is short on purpose.">
          What to actually teach
        </SectionTitle>
        <CueGrid
          cols={2}
          items={[
            {
              label: 'Ball tracking',
              value: 'Catching after one bounce, trapping on the racket, rolling rallies. The eyes learn tennis before the arms do.',
            },
            {
              label: 'Send and receive',
              value: 'Throw-and-catch rallies before hit-and-hope. A child who can throw to a target learns the serve in half the time at orange.',
            },
            {
              label: 'Simple shapes',
              value: 'Low-to-high forehand and backhand with a shake-hands grip, ready position, watching the ball to contact. That is the entire technical syllabus.',
            },
            {
              label: 'Rally habit',
              value: 'Cooperative rallies — coach-to-child, then child-to-child — counted out loud. The first ten-ball rally is a bigger milestone than any technique.',
            },
          ]}
        />
        <div className="mt-4">
          <Callout label="What NOT to teach">
            No grips lectures, no full serve motion, no topspin mechanics, no lines drills. Every
            minute spent perfecting technique a four-year-old’s nervous system cannot hold is a
            minute stolen from the coordination window that closes at this age and never reopens.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle sub="Four games that carry the whole stage. Every one is secretly a drill.">
          Signature games
        </SectionTitle>
        <DataTable
          headers={['Game', 'How it works', 'What it secretly trains']}
          rows={[
            [
              'Traffic lights',
              'Kids dribble a ball around cones; coach calls green (run), amber (walk), red (freeze with ball trapped on racket).',
              'Racket control, listening, stopping in balance.',
            ],
            [
              'Clean your room',
              'Two teams either side of the net, court covered in balls; throw or hit everything to the other side before time runs out.',
              'Throwing mechanics, scanning, joyful chaos that fills the ball-tracking bank.',
            ],
            [
              'Caterpillar rally',
              'Pairs rally cooperatively; every successful rally ball earns a cone segment for their caterpillar. Longest caterpillar wins.',
              'The rally habit, counting, playing WITH a partner before against one.',
            ],
            [
              'Beat the coach',
              'Coach feeds; any ball a child lands in the court scores against the coach, who protests theatrically.',
              'Targets, scoring, and the discovery that hitting past a grown-up is the best feeling in sport.',
            ],
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="45 minutes is the ceiling at this age. The clock below assumes four to six kids per coach.">
          The red-ball session shape
        </SectionTitle>
        <TimeBlocks
          blocks={[
            { time: '0–8 min', title: 'Movement game', body: 'Tag, relays, animal walks — hearts up, giggles started, zero rackets. Arriving energy has to go somewhere before skills can land.' },
            { time: '8–18 min', title: 'Ball skills station', body: 'Throwing, catching, balancing, racket dribbles. The athletic vocabulary block — vary it every week, never skip it.' },
            { time: '18–33 min', title: 'The tennis bit', body: 'One simple hitting task in stations or waves: forehand shapes to a big target, rally attempts over the low net. One coaching point, three words long.' },
            { time: '33–43 min', title: 'The game that matters', body: 'Finish with a scored team game using the day’s skill. This is the part they tell their parents about — never run out of time for it.' },
            { time: '43–45 min', title: 'Circle & wins', body: 'One thing each child did better than last week, said by name. High-fives out the gate.' },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="Age is the entry ticket; these are the exit criteria.">
          Ready for orange when…
        </SectionTitle>
        <Checklist
          items={[
            'Rallies 8–10 balls cooperatively over the red net with a partner, forehand and backhand.',
            'Serves the point started underarm (or a simple overarm throw-hit) into the court most attempts.',
            'Moves to a fed ball, hits, and recovers to the middle without being reminded every time.',
            'Can play — and score — a simple first-to-7 tiebreak with a partner, without an adult feeding.',
            'Usually 7–8 years old — but competence, not birthdays, opens the door. A dominant six-year-old red-baller who ticks every box is ready; an eight-year-old who cannot rally is not.',
          ]}
        />
        <Body className="mt-4">
          Keep late-developers at red without shame and fast-developers challenged within red —
          smaller targets, non-dominant-hand games, first-to-15 rallies — before moving anyone up
          early. The stage is a foundation, and foundations are the one thing you cannot pour
          twice.
        </Body>
      </Card>
    </>
  )
}
