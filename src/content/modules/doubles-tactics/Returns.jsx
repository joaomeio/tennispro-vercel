import { Card, SectionTitle, Lead, Body, Callout, CueGrid, DataTable, StepList } from '../../../components/dashboard/content/Blocks'

export default function Returns() {
  return (
    <>
      <Card>
        <SectionTitle>Break points are built, not found</SectionTitle>
        <Lead>
          The serving team wins around three-quarters of first-serve points, so return games are
          not about heroics — they are about making the server play. The returning team’s job is
          brutally simple: get the ball in play, low, away from the net player, and force the
          serving team to win the point with a hard volley from below the tape. Free points for
          the server are the only unforgivable donation.
        </Lead>
        <div className="mt-4">
          <Callout label="The 80% rule">
            Any return in play beats the best return in the fence. Aim for eight of ten returns in
            play, whatever pace that requires — a blocked return at the server’s feet creates more
            break points per set than three clean winners and seven misses ever will.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle>The return target map</SectionTitle>
        <DataTable
          headers={['Return', 'When', 'Why it works']}
          rows={[
            [
              'Cross-court, low and deep',
              'Default on every first serve.',
              'Longest court, lowest net, away from the net player — the percentage spine of the return game.',
            ],
            [
              'At the incoming server’s feet',
              'Server rushes the net behind the serve.',
              'A half-volley from the service line is the hardest ball in doubles. Low beats hard here — take pace off if needed.',
            ],
            [
              'Down the line',
              'The net player has poached twice, or leans early.',
              'The punishment lane. It only needs to land once a set to buy the middle back for your cross-courts.',
            ],
            [
              'The lob return',
              'Second serve, aggressive net player, or sun in their eyes.',
              'Over the net player’s backhand shoulder, landing beyond the service line, and the serving team’s formation is instantly inside out.',
            ],
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="Second serves are the returning team’s power play — the posture must change before the ball is tossed.">
          Attacking the second serve
        </SectionTitle>
        <StepList
          steps={[
            {
              title: 'Step in two feet',
              body: 'Take the return earlier, on the rise if the kick allows it. The message to the server matters as much as the ball: there is no safe second serve here.',
            },
            {
              title: 'Pick a target before the toss',
              body: 'Default: hard cross-court at the server’s feet as they recover, or drive through the middle seam. Decided in advance — the swing is committed, not negotiated.',
            },
            {
              title: 'Your partner creeps forward',
              body: 'As you attack, your partner edges from the service line toward the net. A strong return turns them into the poacher; the point flips from defending to hunting in one shot.',
            },
            {
              title: 'Follow the good ones in',
              body: 'A return that lands at the server’s feet earns you the net. Move in behind it as a pair — the returning team at the net is the break point, materialised.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle>Return-side teamwork</SectionTitle>
        <CueGrid
          cols={2}
          items={[
            {
              label: 'Partner reads, not watches',
              value: 'The returner’s partner watches the opposing net player, never the return. Poacher moving? Call “switch” early and cover the vacated line.',
            },
            {
              label: 'Both back against fire',
              value: 'Against a huge server with a killer poacher, start both players on the baseline. It concedes the net but removes the free intercept — then work in behind the first neutral ball.',
            },
            {
              label: 'Change what they see',
              value: 'Stand a step wider one point, a step deeper the next; lob the first second serve of every set. Servers groove on rhythm — the return game’s job is to deny it.',
            },
            {
              label: 'Break-point discipline',
              value: 'On break point, the percentage return, always — cross-court, in play, low. The server is the one who should feel the score; hand the pressure back with a made ball.',
            },
          ]}
        />
        <Body className="mt-4">
          Chart one match: count returns in play versus free points donated. Most teams discover
          they lose return games 0–15 before the point even starts. Fix the donation rate and the
          breaks arrive on their own.
        </Body>
      </Card>
    </>
  )
}
