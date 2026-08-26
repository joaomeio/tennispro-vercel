import { Card, SectionTitle, Lead, Body, Callout, TimeBlocks, CueGrid } from '../../../components/dashboard/content/Blocks'

export default function Ninety() {
  return (
    <>
      <Card>
        <SectionTitle>The training session</SectionTitle>
        <Lead>
          Ninety minutes is not a longer lesson — it is a different animal: a training session
          with technique, tactics, competition and physical work living in one block. It is the
          format for squads, performance juniors and ambitious adults. The risk is unique to the
          length: energy management. Ninety flat-out minutes breaks quality by the hour mark;
          the template’s job is to wave intensity up and down so the last block is still sharp.
        </Lead>
        <div className="mt-4">
          <Callout label="The 90-minute law">
            Build in the dip. Minutes 45–60 are the session’s natural trough — schedule the
            lower-intensity, higher-thinking work there (patterns, serving blocks, tactical
            walk-throughs) and save the competition for the final third, when scores wake
            everyone back up.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle sub="Performance juniors or adult squad, 4–6 players — the day’s theme: second-serve attack and defence.">
          Template A · Squad session
        </SectionTitle>
        <TimeBlocks
          blocks={[
            { time: '0–12 min', title: 'Physical warm-up', body: 'The full activation menu: jog, dynamic stretches, lateral shuffles, split-step rhythm, three accelerations. At 90 minutes there is no excuse for a cold start — this block is load-bearing.' },
            { time: '12–24 min', title: 'Rally warm-up with standards', body: 'Pair rallies through the strokes with counted targets: 20 cross-courts, 10 volley-volley, 10 serves each. Standards make a warm-up a warm-up; drift makes it a chat.' },
            { time: '24–45 min', title: 'Technical block', body: 'The theme, built: kick and slice second serves to targets in waves; returners work the two responses (step-in drive, deep block) off live serves. Coach rotates court to court with one cue each.' },
            { time: '45–60 min', title: 'Tactical block (the dip)', body: 'Walk-through and pattern play at 70% intensity: server calls the second-serve pattern, returner calls the attack; play three-shot sequences, then discuss on the fence for 90 seconds. Brains on, heart rates down.' },
            { time: '60–82 min', title: 'Competition block', body: 'The theme under full pressure: sets starting every game at 30–30, second serve only on the second point of every game. Ladder courts — winners move up. Full intensity returns on its own.' },
            { time: '82–90 min', title: 'Cool-down & close', body: 'Easy movement, stretching from the gym module, the circle: each player names what they trust more than they did at minute one. Log entries before leaving.' },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="One or two players — the day’s theme chosen by the player’s next competition.">
          Template B · Performance private
        </SectionTitle>
        <TimeBlocks
          blocks={[
            { time: '0–12 min', title: 'Physical warm-up', body: 'As Template A — with 90 minutes booked, the athlete work belongs inside the session, not promised for later.' },
            { time: '12–30 min', title: 'Technical block', body: 'The current build (say, the kick serve progression from the Serve module): feeds, film, standards. Long enough to do real work; ending on a made standard, not a timer.' },
            { time: '30–55 min', title: 'Pattern block', body: 'The player’s two bread-and-butter patterns drilled to fluency against live balls, then against light resistance (coach defends). Include the 16-second routine between every point — rehearsed here, automatic in matches.' },
            { time: '55–80 min', title: 'The match block', body: 'A full practice set, coach or sparring partner, played under match protocol — no coaching, changeovers timed, routines run. Notes taken silently for the review.' },
            { time: '80–90 min', title: 'Review & cool-down', body: 'Five minutes on the fence with the notes: two things that held, one thing that becomes next week’s technical block. Then stretch and log. The review IS the product at this level.' },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle>Shrink & stretch</SectionTitle>
        <CueGrid
          cols={2}
          items={[
            { label: 'Big squads (8–12)', value: 'Three-station rotation with an assistant: technical, tactical, competitive — 20 minutes each after the shared warm-up. The coach owns the technical station; the ladder runs itself.' },
            { label: 'Young juniors at 90', value: 'Only with the dip doubled: two game blocks, snack break at minute 45, and the technical work split into two short hits. Under-10s at 90 minutes is usually a scheduling convenience, not a coaching choice — say so when asked.' },
            { label: 'Heat and summer', value: 'Shade breaks every 20 minutes, the dip block extended, competition shortened to first-to-4 sets. Quality per ball beats totals every time.' },
            { label: 'The pre-tournament 90', value: 'Cut the technical block entirely: warm-up, patterns, serves, one practice set, review. Confidence is built from what already works — file the rebuild for the Monday after.' },
          ]}
        />
        <Body className="mt-4">
          One number to audit any 90-minute session: how many minutes was the intensity
          deliberately DOWN? If the answer is zero, the session was planned for the first hour
          and endured for the last half. The wave is the format.
        </Body>
      </Card>
    </>
  )
}
