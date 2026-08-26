import { Card, SectionTitle, Lead, Callout, CueGrid, Figure } from '../../../components/dashboard/content/Blocks'
import Red from './Red'
import Orange from './Orange'
import Green from './Green'
import Yellow from './Yellow'

// ─────────────────────────────────────────────────────────────────────────────
// KIDS TENNIS MANUAL
// Part keys match KIDS_CARDS in config/catalog.js.
// ─────────────────────────────────────────────────────────────────────────────

function Intro() {
  return (
    <div className="space-y-5">
      <Card>
        <SectionTitle sub="Scaled courts, slower balls, shorter rackets — the ITF progression the whole module follows.">
          Why the colours exist
        </SectionTitle>
        <Lead>
          Hand a six-year-old a full-size court and a yellow ball and you have designed a game
          they cannot play: the ball bounces over their head, rallies never happen, and technique
          becomes pure survival. The colour stages scale the game to the child — red, orange,
          green, then yellow — so that at every age the ball arrives at hip height, rallies are
          possible on day one, and real tactics can be taught years earlier. Kids do not graduate
          by getting older; they graduate by outgrowing the stage.
        </Lead>
        <div className="mt-4">
          <Figure
            src="/diagrams/kids/court-scaling.webp"
            alt="Court size comparison for red, orange and green ball stages"
            caption="One full court, three games inside it: red plays 11 m across the court, orange plays 18 m with a lowered net, green uses the full 23.77 m court with a slower ball. The equipment shrinks; the sport stays whole."
          />
        </div>
      </Card>

      <Card>
        <SectionTitle sub="The real job description — everything in the four parts hangs off this.">
          The mission of a kids coach
        </SectionTitle>
        <Callout label="The mission">
          Your job is not to produce champions. It is to make tennis the highlight of a child’s
          week — because the player who is still on court at sixteen beats every polished
          nine-year-old who quit. Retention is the metric; joy is the method; technique rides
          along.
        </Callout>
        <div className="mt-4">
          <CueGrid
            cols={2}
            items={[
              {
                label: 'Maximum balls, minimum queues',
                value: 'A child in a line is a child leaving the sport in slow motion. Stations, pairs, and rally games — never six kids watching one hit.',
              },
              {
                label: 'Demonstrate, don’t lecture',
                value: 'Under-10s copy what they see and lose the thread after two sentences. Show it, name it in three words, play it.',
              },
              {
                label: 'Praise the behaviour, not the talent',
                value: '“Great racing back to position” builds a habit. “You’re so talented” builds fear of the day it stops being true.',
              },
              {
                label: 'Every child leaves with a win',
                value: 'One thing they did better than last week, said out loud, by name, in front of the parent when possible.',
              },
            ]}
          />
        </div>
      </Card>

      <Card>
        <SectionTitle sub="Groups are where kids coaching is won or lost. Three structures cover every session.">
          Running the group
        </SectionTitle>
        <CueGrid
          items={[
            {
              label: 'Stations',
              value: 'Three activities, kids rotate every 5–6 minutes. Perfect for mixed levels — each station scales up or down without anyone noticing.',
            },
            {
              label: 'Waves',
              value: 'Two lines flowing through one task — hit, run, rejoin. Keeps a big group moving with one coach and one basket.',
            },
            {
              label: 'The magic ratio',
              value: 'Four kids per coach at red, six at orange and green. Beyond that, add a helper or add a station — attention does not stretch, it tears.',
            },
          ]}
        />
      </Card>
    </div>
  )
}

export default {
  accent: '#fdba74',
  washFrom: '#431407',
  tagline:
    'The four ITF stages, each on its own page: specs, what to teach, signature games, and when a child is ready to move up.',
  Intro,
  parts: [
    {
      key: 'red',
      minutes: 9,
      summary: 'Ages 4–6 on the 11-metre court — coordination first, rallies from day one.',
      Component: Red,
    },
    {
      key: 'orange',
      minutes: 9,
      summary: 'Ages 7–8 on the 18-metre court — real technique, first tactics, first competition.',
      Component: Orange,
    },
    {
      key: 'green',
      minutes: 9,
      summary: 'Ages 9–10 on the full court — the whole game arrives: spin, serves, points, patterns.',
      Component: Green,
    },
    {
      key: 'yellow',
      minutes: 9,
      summary: 'Ages 11–14 with the full ball — training structure, competition, and surviving puberty.',
      Component: Yellow,
    },
  ],
}
