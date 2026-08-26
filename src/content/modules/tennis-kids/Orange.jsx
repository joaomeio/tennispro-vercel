import { Card, SectionTitle, Lead, Body, Callout, CueGrid, DataTable, TimeBlocks, Checklist } from '../../../components/dashboard/content/Blocks'

export default function Orange() {
  return (
    <>
      <Card>
        <SectionTitle>The stage where tennis players are made</SectionTitle>
        <Lead>
          If red builds athletes, orange builds tennis players. At seven and eight, children can
          hold real technique for the first time — proper grips, full swing shapes, a genuine
          overarm serve — and the 18-metre court is big enough that where you hit the ball starts
          to matter. Orange is where the sport’s two languages, technique and tactics, get taught
          together from the first lesson.
        </Lead>
        <div className="mt-4">
          <CueGrid
            cols={4}
            items={[
              { label: 'Ball', value: 'Orange — 50% compression, regular size, real bounce at kid height.' },
              { label: 'Court', value: '18 m × 6.4 m (60 × 21 ft) singles; doubles uses the 8.23 m width.' },
              { label: 'Net', value: '80 cm at the centre — the lowered net keeps serving honest but possible.' },
              { label: 'Racket', value: '58–63 cm (23–25") — big enough to generate pace, light enough to accelerate.' },
            ]}
          />
        </div>
      </Card>

      <Card>
        <SectionTitle>What to actually teach</SectionTitle>
        <CueGrid
          cols={2}
          items={[
            {
              label: 'Real grips, gently',
              value: 'Eastern-to-semi-western forehand, two-handed backhand, continental for serves and volleys. Fix grips through games and feeds, not lectures — hands change willingly at this age and defensively at twelve.',
            },
            {
              label: 'The full serve',
              value: 'Throwing action first, always: kids who can throw far can serve. Then trophy shape, then toss, then targets. Underarm serving retires this year.',
            },
            {
              label: 'Rally with direction',
              value: 'Cross-court versus down the line, deep versus short. The first tactical pair — “hit where they aren’t” — becomes trainable the moment the court is 18 metres long.',
            },
            {
              label: 'The net exists',
              value: 'Volleys as a game (catch it on the strings, punch it past), approach-and-volley points. Orange kids who visit the net become green kids who own it.',
            },
          ]}
        />
        <div className="mt-4">
          <Callout label="The golden rule of orange">
            Technique gets taught in the first half of the session and hidden inside a game in
            the second. A stroke that only exists in the lines drill does not exist — every
            technical point earns a game where using it scores double.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle>Signature games</SectionTitle>
        <DataTable
          headers={['Game', 'How it works', 'What it secretly trains']}
          rows={[
            [
              'Around the world',
              'Two teams, one court; each child hits and runs to the other end of the line (or around the net). Miss twice and you cheer from the side until the round ends.',
              'Rally consistency under movement, and twenty hits a minute for a group of eight.',
            ],
            [
              'Deep sea',
              'Court split into shallow (service boxes) and deep water. Rally balls landing deep score; three shallow balls in a row and you are “eaten”.',
              'Depth as the first tactic — the single most valuable habit in junior tennis.',
            ],
            [
              'Serve tennis',
              'Points must start with a legal overarm serve; server gets two, then plays the point to 11.',
              'Serve reps with consequences — a basket of 50 serves teaches less than 15 served points.',
            ],
            [
              'Champions of the court',
              'Winners stay, challengers rotate in, king/queen court format on two or three courts by level.',
              'Competition in doses, and self-run scoring — the referee skills of green ball start here.',
            ],
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="60 minutes works at this age. Six kids per coach, two courts if you can get them.">
          The orange-ball session shape
        </SectionTitle>
        <TimeBlocks
          blocks={[
            { time: '0–8 min', title: 'Dynamic warm-up game', body: 'Movement plus ball skills — rally relays, catch-and-shuffle. Rackets in hand from minute one at this stage.' },
            { time: '8–23 min', title: 'Technical block', body: 'The day’s stroke focus in stations and waves: demonstration (30 seconds), then maximum reps with one cue. Film one child a week on a phone — they self-correct at replay speed.' },
            { time: '23–38 min', title: 'Live-ball block', body: 'The same stroke inside rally situations: cooperative to seven, then competitive with the day’s shot scoring double.' },
            { time: '38–55 min', title: 'The game block', body: 'Deep sea, serve tennis, champions court — full points, real scores, coach as commentator not instructor.' },
            { time: '55–60 min', title: 'Circle & wins', body: 'Name the improvements, preview next week, collect the balls to a countdown — the tidy-up is a race, not a chore.' },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle>Ready for green when…</SectionTitle>
        <Checklist
          items={[
            'Rallies 10+ balls with direction on the 18 m court — can hit cross-court or down the line on request.',
            'Serves overarm from the baseline with a continental-ish grip and lands first or second serve reliably.',
            'Plays and scores full tiebreak sets independently, including calling their own lines honestly.',
            'Uses depth on purpose — you can see them push an opponent back, not just keep the ball in.',
            'Usually 9–10 years old with two seasons of orange behind them. Moving up early because a parent is impatient is the classic error of this stage — the full court punishes it for years.',
          ]}
        />
        <Body className="mt-4">
          Orange is also where competition begins: team formats first, individual later, always
          with more matches per event than eliminations. A child’s first ten tournaments decide
          whether competing feels like an adventure or an exam — schedule them accordingly.
        </Body>
      </Card>
    </>
  )
}
