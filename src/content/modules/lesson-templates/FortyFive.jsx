import { Card, SectionTitle, Lead, Body, Callout, TimeBlocks, CueGrid } from '../../../components/dashboard/content/Blocks'

export default function FortyFive() {
  return (
    <>
      <Card>
        <SectionTitle>The junior group standard</SectionTitle>
        <Lead>
          Forty-five minutes is the natural length for junior groups: long enough for a complete
          arc, short enough that eight-year-old attention arrives at the end intact. The whole
          game at this length is ball count per child — four kids watching one hit is a lesson
          for one child and a queue for three. Stations, waves and rally pairs are not
          nice-to-haves here; they are the format.
        </Lead>
        <div className="mt-4">
          <Callout label="The group law">
            Every child hits within the first three minutes, and no child waits more than 30
            seconds for their next ball, all session. Plan the rotation before you plan the
            drills — the logistics ARE the lesson plan.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle sub="Red/orange group of 4–6 — the day’s focus: forehand direction.">
          Template A · Beginner juniors
        </SectionTitle>
        <TimeBlocks
          blocks={[
            { time: '0–7 min', title: 'Arrival game', body: 'Tag with ball-balance, relay dribbles, clean-your-room. Hearts up, rules simple, coach loud and playful. Late arrivals fold in without restarting.' },
            { time: '7–17 min', title: 'Skill stations', body: 'Two stations: coach feeds the day’s stroke at one (one cue, big targets); assistant or task card runs rally/throwing skills at the other. Swap at 12 minutes.' },
            { time: '17–27 min', title: 'Wave rallies', body: 'Whole group in waves: hit two balls to a target zone, run around, rejoin. Score as teams — “first team to 20 zone-hits”. Feed fast; the queue must never settle.' },
            { time: '27–41 min', title: 'The game', body: 'Team game using the skill: deep-sea (depth scores), beat-the-coach, or champions court in pairs. Real scores, theatrical commentary, everyone plays every round.' },
            { time: '41–45 min', title: 'Circle & wins', body: 'Ball collection as a countdown race, then the circle: one named win each, next week’s teaser, high-fives out.' },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="Green/yellow group of 4–6 — the day’s focus: serve + first ball.">
          Template B · Intermediate juniors
        </SectionTitle>
        <TimeBlocks
          blocks={[
            { time: '0–6 min', title: 'Dynamic warm-up', body: 'Movement lines (shuffle, carioca, accelerations), then racket warm-up in pairs: mini-tennis to full court, counting rallies aloud.' },
            { time: '6–18 min', title: 'Technical block', body: 'Serve focus in two waves — one wave serves to targets while the other shadow-serves or does toss practice behind them, swap each basket. One cue: trophy shape, or brush for the older ones.' },
            { time: '18–30 min', title: 'Serve +1 live ball', body: 'Server serves and plays the fed +1 ball to a called target; returner plays it out. Rotate every four points. Pattern scored: serve in + first ball deep = bonus point.' },
            { time: '30–42 min', title: 'Match play with the constraint', body: 'Tiebreaks to 7 where holding serve earns double. Coach referees one court, banks observations, rotates players between courts by score.' },
            { time: '42–45 min', title: 'Circle & wins', body: 'Each player: one thing that worked, one target for the week. Twenty seconds each, coach last, out on time.' },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle>Shrink & stretch</SectionTitle>
        <CueGrid
          cols={2}
          items={[
            { label: 'Eight kids, one coach', value: 'Waves and team games only — stations without a second adult become unsupervised chaos. Halve the technical block, double the game block, keep everyone visible.' },
            { label: 'Mixed levels in one group', value: 'Same game, different jobs: bigger targets and drop feeds for the newest, smaller zones and no-second-bounce rules for the strongest. Never split by level publicly.' },
            { label: 'Half the group is new', value: 'Run the beginner template and give veterans “captain” roles — demonstrating, feeding, scoring. Leadership reps are progress too, and they buy you feeding time.' },
            { label: 'Adults at 45 minutes', value: 'Template B works unchanged for adult groups — swap the circle for a two-line summary and shift praise from effort to specifics. Adults queue politely and hate it just as much.' },
          ]}
        />
        <Body className="mt-4">
          Parents judge the lesson by the face at pickup; children judge it by the game block.
          Protect both and the group fills itself by word of mouth.
        </Body>
      </Card>
    </>
  )
}
