import { Card, SectionTitle, Lead, Body, Callout, CueGrid, DataTable, TimeBlocks, Checklist } from '../../../components/dashboard/content/Blocks'

export default function Green() {
  return (
    <>
      <Card>
        <SectionTitle>The whole game, slightly softened</SectionTitle>
        <Lead>
          Green ball is real tennis: the full 23.77-metre court, the regulation net, and a ball
          only 25% slower than yellow. Everything the adult game contains — spin, serve patterns,
          net play, point construction — is now teachable. The green ball’s slightly friendlier
          bounce is the last piece of scaffolding, and it exists for one reason: so nine- and
          ten-year-olds can play the whole game with technique intact instead of surviving the
          bounce with technique abandoned.
        </Lead>
        <div className="mt-4">
          <CueGrid
            cols={4}
            items={[
              { label: 'Ball', value: 'Green dot — 25% reduced compression, full size.' },
              { label: 'Court', value: 'Full court, 23.77 m × 8.23 m singles.' },
              { label: 'Net', value: 'Regulation, 91.4 cm at centre.' },
              { label: 'Racket', value: '63–66 cm (25–26") — approaching adult length, still junior weight.' },
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
              label: 'Topspin arrives',
              value: 'The low-to-high swing now becomes deliberate spin — rally height over the net as a dial, not an accident. Spin is control at this stage, not power.',
            },
            {
              label: 'Serve variety begins',
              value: 'First serve with intent, second serve with shape — the first slice or topspin-leaning second serves. Double-fault-free games become a trainable goal.',
            },
            {
              label: 'Point construction',
              value: 'Serve +1 patterns, approach on short balls, defend deep and attack short. Green players can hold a two-shot plan in their head; give them one every session.',
            },
            {
              label: 'The full court’s footwork',
              value: 'Split step on every opponent contact, recovery to the correct (not central) position, first crossover step. The court got big; movement is now a syllabus item of its own.',
            },
          ]}
        />
        <div className="mt-4">
          <Callout label="The trap of this stage">
            Green players look ready for adult training — feeds, baskets, technical rebuilds. They
            are not. The ratio stays games-first: at nine and ten the engine of improvement is
            still play, competition and problem-solving, with technique coached inside it. Save
            the hour-long basket sessions for players who ask for them.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle>Signature games</SectionTitle>
        <DataTable
          headers={['Game', 'How it works', 'What it secretly trains']}
          rows={[
            [
              'Height dial',
              'Rally where the coach calls “over the strap” or “three balls high” mid-point; pairs must change trajectory without missing.',
              'Topspin as a controllable dial — the core green-ball skill.',
            ],
            [
              'Serve +1 tennis',
              'Points where the server must hit their called pattern (wide serve, next ball to the open court) to score double.',
              'Patterns as habits before opponents get good enough to punish their absence.',
            ],
            [
              '11-point pressure sets',
              'First to 11, but you start each “set” 0–2 down on your own serve.',
              'Serving from behind — the scoreboard situation juniors meet most and practise least.',
            ],
            [
              'Attack–defend',
              'One player starts every point inside the baseline off a short feed; the other starts two metres behind. Swap roles each game.',
              'The attacking and defending identities every green player needs to try on before puberty picks one for them.',
            ],
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="60–75 minutes. This is also the stage where a second weekly session earns its place.">
          The green-ball session shape
        </SectionTitle>
        <TimeBlocks
          blocks={[
            { time: '0–10 min', title: 'Athletic warm-up', body: 'Now with intent: split-step rhythm, lateral shuffles, two accelerations — the movement syllabus warming up the day’s tennis.' },
            { time: '10–25 min', title: 'Technical block', body: 'The day’s focus with live feeds and rally constraints. One mechanical cue per player maximum; green ears still hold one thing at a time.' },
            { time: '25–45 min', title: 'Situation block', body: 'The same skill inside a game situation: serve +1, approach and finish, defend-to-neutral. Constraint scoring (double points for the pattern) does the coaching.' },
            { time: '45–70 min', title: 'Match play', body: 'Tiebreaks, 11-point games, doubles once a fortnight. Coach watches silently and banks observations for the circle — mid-point coaching stops at green.' },
            { time: '70–75 min', title: 'Circle & wins', body: 'Each player names one thing that worked and one they will try next week. Self-review is a green-ball skill too.' },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle>Ready for yellow when…</SectionTitle>
        <Checklist
          items={[
            'Rallies 15+ balls with topspin shape on the full court, moving and recovering correctly.',
            'Holds serve in practice sets more often than not, with a second serve that has shape rather than a prayer.',
            'Constructs points on purpose — you can name the pattern they were attempting even when it fails.',
            'Competes in green events comfortably: wins some, loses some, and can tell you why afterwards.',
            'Usually 11+, with the physical growth to cover the court. The green-to-yellow move is the one most worth delaying — a year “too long” at green costs nothing; a year too early at yellow rebuilds technique that was already built.',
          ]}
        />
        <Body className="mt-4">
          Green is the last stage where every player in the group shares one curriculum. From
          yellow onward, paths split — competitive, social, late-starting — and the coaching gets
          individual. Bank the shared foundations now.
        </Body>
      </Card>
    </>
  )
}
