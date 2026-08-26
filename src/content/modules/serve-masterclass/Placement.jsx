import { Card, SectionTitle, Lead, Body, Callout, CueGrid, DataTable, Figure } from '../../../components/dashboard/content/Blocks'

export default function Placement() {
  return (
    <>
      <Card>
        <SectionTitle>Placement beats power</SectionTitle>
        <Lead>
          Analysis of professional serving keeps landing on the same conclusion: where the serve
          goes predicts free points better than how fast it travels. Nearly all professional aces
          are struck within a racket-length of a line — roughly 40% out wide, over 35% down the
          T — and the tour’s best second-serve numbers are built on corners, not velocity. A
          well-placed serve at 70% pace wins more points than an aimless serve at 100%.
        </Lead>
        <div className="mt-4">
          <Figure
            src="/diagrams/serve/serve-targets.webp"
            alt="Top-down court diagram showing T, body and wide serve target zones in both service boxes"
            caption="The six targets that organise every serving pattern: T, body and wide, in each court. Every point you ever serve starts with a choice between these zones."
          />
        </div>
      </Card>

      <Card>
        <SectionTitle sub="Serving to a right-handed returner. Left-handers: mirror every pattern.">
          Deuce court patterns
        </SectionTitle>
        <DataTable
          headers={['Target', 'Serve', 'What it does', 'Your next ball']}
          rows={[
            [
              'T',
              'Flat or slice',
              'Jams the backhand, kills the sharp cross-court angle — the returner must create their own pace up the middle.',
              'Step in; drive behind them or take the net.',
            ],
            [
              'Body',
              'Flat at the hip',
              'Feet must move at the last instant; swings get cramped and returns float.',
              'Move forward, attack the short reply.',
            ],
            [
              'Wide',
              'Slice (the weapon)',
              'Drags the returner past the alley and opens the whole ad court.',
              'First ball into the open court, before recovery.',
            ],
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="The ad court hosts most pressure points — 30–40, ad-in, ad-out. Your best pattern here matters double.">
          Ad court patterns
        </SectionTitle>
        <DataTable
          headers={['Target', 'Serve', 'What it does', 'Your next ball']}
          rows={[
            [
              'Wide',
              'Kick or slice (the weapon)',
              'Attacks the backhand; the kick climbs into the shoulder, nearly impossible to attack.',
              'Deep cross-court drive, or take the net.',
            ],
            [
              'Body',
              'Flat at the hip',
              'Punishes returners who step in early on pressure points.',
              'Expect a blocked, short reply — be moving in.',
            ],
            [
              'T',
              'Flat or kick',
              'Into the forehand — the surprise, best after wide serves have moved their feet all match.',
              'Cover the line; a stretched forehand goes there.',
            ],
          ]}
        />
        <div className="mt-4">
          <Callout label="Pattern principle">
            The corners win the point; the body serve wins the corners. Every body serve plants
            the doubt that makes the next wide serve arrive half a step later. Serve all three
            zones every set, whatever the score — a serve pattern is only unreadable if it has
            three answers.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle>Reading the returner</SectionTitle>
        <CueGrid
          cols={2}
          items={[
            {
              label: 'Camps deep behind the baseline',
              value: 'They are buying time against pace. Take it away differently: body serves and short-angle slice pull them forward into balls they hate.',
            },
            {
              label: 'Crowds the baseline',
              value: 'They want to intercept early. Kick to the shoulder and heavy body serves — there is no room to handle bounce or jam at that depth.',
            },
            {
              label: 'Shifts wide to guard the backhand',
              value: 'The T is open. Serve into the gap they created until they stop cheating — then the backhand wide serve works again.',
            },
            {
              label: 'Owns a big return forehand',
              value: 'Serve the backhand relentlessly, even when the “natural” pattern says otherwise. Never feed the weapon on a big point.',
            },
          ]}
        />
        <Body className="mt-4">
          Check the returner’s feet between your first and second toss-ready moments: club players
          telegraph their lean two seconds early. And track your own data for one match — a
          notebook column of target and outcome per serve. Most players discover they serve to one
          zone over half the time, and that the zone they avoid is winning the most points.
        </Body>
      </Card>

      <Card>
        <SectionTitle sub="A serving plan you can actually hold in your head at 5–4.">
          The scoreboard rule of thumb
        </SectionTitle>
        <CueGrid
          items={[
            {
              label: 'Ahead 40–0 / 40–15',
              value: 'Spend risk: flat T or a new look. Free points here fund the pattern.',
            },
            {
              label: 'Level or simple',
              value: 'Your two grooved weapons: deuce wide slice, ad wide kick. Percentage tennis.',
            },
            {
              label: 'Break point down',
              value: 'Highest-percentage first serve you own, to the returner’s weaker wing. No experiments — pattern trust is what you trained it for.',
            },
          ]}
        />
      </Card>
    </>
  )
}
