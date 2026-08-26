import { Card, SectionTitle, Lead, Body, Callout, CueGrid, StepList, FaultFix } from '../../../components/dashboard/content/Blocks'

export default function Net() {
  return (
    <>
      <Card>
        <SectionTitle>The front of the court is the scoreboard</SectionTitle>
        <Lead>
          Five out of six doubles winners are hit by the player at the net. Not because net
          players are better — because the geometry up there is better: shorter distances, wider
          angles, and opponents with less time. Every tactic in this module funnels toward one
          skill: arriving at the net behind a good ball and knowing what to do with the next one.
        </Lead>
        <div className="mt-4">
          <Callout label="Height and position beat technique">
            More volleys are lost by standing in the wrong place than by swinging the wrong way.
            Two steps inside the service line, racket head above the wrists, weight forward —
            from there an average volley wins; from the service line a great volley barely
            survives.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle sub="The ball that decides whether serving-and-coming-in works at all.">
          The first volley
        </SectionTitle>
        <StepList
          steps={[
            {
              title: 'Split step at the service line',
              body: 'You will not reach the perfect position — split step wherever you are when the returner swings. A volley from balance at the service line beats a volley off-balance three feet closer.',
            },
            {
              title: 'Play it deep, not dead',
              body: 'The first volley is a positioning shot: deep down the middle or at the weaker opponent’s feet. Trying to end the point from below net height is how serve-and-volley dies.',
            },
            {
              title: 'Then take the real estate',
              body: 'After the first volley, advance two more steps. The second volley is the one you get to finish — angled away or punched at the nearer opponent’s hip.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle>Target hierarchy at the net</SectionTitle>
        <CueGrid
          cols={2}
          items={[
            {
              label: '1 — Feet of the closer',
              value: 'The ball at the incoming opponent’s shoelaces must be volleyed up — and anything hit up to you at the net is finished. The point machine.',
            },
            {
              label: '2 — The middle seam',
              value: 'Between two opponents, over the lowest net. Even reached, it produces confusion and a weak reply. When unsure, middle.',
            },
            {
              label: '3 — The short angle',
              value: 'Volley bouncing in the service box and leaving the court sideways. Unreturnable when available — but it opens your own alley, so hit it to end points, not to look clever.',
            },
            {
              label: '4 — At the net player',
              value: 'A firm volley at the opposing net player’s hitting hip wins quickly or draws a reflex error. Body line, never head height on a social court.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="The lob is the tax on aggressive net position. Good teams budget for it.">
          Covering the lob
        </SectionTitle>
        <Body>
          The answer to the lob is never one player backpedalling — it is the team rotating.
          Lob over the net player: the partner crossing behind takes it, the lobbed player
          switches sides, and whoever plays it calls it early — “mine, switch!”. Any lob you can
          reach with an overhead, take in the air; letting it bounce hands the opponents five free
          seconds to reset. And if the overhead is defensive, hit it deep down the middle and
          re-approach behind it. Teams that smash lobs twice in a row stop seeing lobs — that is
          the goal: make the tax too expensive to pay.
        </Body>
      </Card>

      <Card>
        <SectionTitle>Faults and fixes</SectionTitle>
        <FaultFix
          items={[
            {
              fault: 'Camped on top of the net',
              fix: 'One lob teaches the opponents everything. Base two steps inside the service line; close the last metres only when the ball you volley deserves it.',
            },
            {
              fault: 'Watching your partner hit',
              fix: 'Ball-watching at the net is a hole in the wall. When your partner is back, you read the opponents — their shoulders tell you what is coming before the ball does.',
            },
            {
              fault: 'Big swings on volleys',
              fix: 'The pace is already in the ball. Block with a firm wrist, short punch, angle from the racket face. Backswing at the net is a decoration you cannot afford.',
            },
            {
              fault: 'Retreating after every volley',
              fix: 'Volleying then drifting backwards resets your advantage. Volley, advance, split step. The direction of travel at the net is forward until the point ends.',
            },
          ]}
        />
      </Card>
    </>
  )
}
