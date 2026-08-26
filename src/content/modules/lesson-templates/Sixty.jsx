import { Card, SectionTitle, Lead, Body, Callout, TimeBlocks, CueGrid } from '../../../components/dashboard/content/Blocks'

export default function Sixty() {
  return (
    <>
      <Card>
        <SectionTitle>The full lesson</SectionTitle>
        <Lead>
          Sixty minutes is the classic — room for a proper warm-up, a real technical block, live
          ball AND a competitive finish without rushing any of them. It is also long enough to
          develop the session’s second act: the tactical layer on top of the technical one. The
          templates below run that two-act structure — build the skill, then deploy it — for a
          private and for a group.
        </Lead>
        <div className="mt-4">
          <Callout label="The 60-minute law">
            The technical act ends at half-time, no exceptions. Every coach has lost minutes 30–55
            to “one more basket”; the players who needed those live-ball and game minutes lost
            them too. Set a phone timer at 30 — the second act starts on the beep.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle sub="Adult or junior private — the day’s focus: backhand consistency into a directional weapon.">
          Template A · Private lesson
        </SectionTitle>
        <TimeBlocks
          blocks={[
            { time: '0–8 min', title: 'Warm-up', body: 'Two minutes movement, then rally warm-up through all strokes — mini-tennis, full court, five volleys and serves each. Watch their backhand silently; diagnose while they groove.' },
            { time: '8–22 min', title: 'Technical block', body: 'Basket then hand-feeds on the backhand: one cue, filmed once on your phone at minute 15 for a 30-second look together. End with 10 consecutive cooperative backhands cross-court.' },
            { time: '22–30 min', title: 'Direction block', body: 'Same stroke, now steered: alternating cross and line to cone targets off your feeds, then off your rally balls. Standard: 6 of 10 to the called side.' },
            { time: '30–45 min', title: 'Live-ball act', body: 'Pattern rallies — backhand cross until the short ball, then line + approach. Then constraint games to 11: backhand winners double, backhand errors cost nothing (aggression is being bought this week).' },
            { time: '45–57 min', title: 'The set', body: 'A first-to-4 games set, one constraint live (“second serves attacked with the backhand return”). Coach plays honestly at their level +5%.' },
            { time: '57–60 min', title: 'Close', body: 'The win named, the homework set, the note written. Sixty-minute privates deserve a two-line email that evening — it renews more lessons than any discount.' },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="Group of 4–6 — the day’s focus: net game, built from approach to finish.">
          Template B · Group lesson
        </SectionTitle>
        <TimeBlocks
          blocks={[
            { time: '0–8 min', title: 'Warm-up', body: 'Movement lines, then pair rallies with a twist: every fifth ball taken early inside the baseline. The theme walks in with the warm-up.' },
            { time: '8–22 min', title: 'Technical stations', body: 'Two stations, swap at 15 minutes: coach feeds approach → volley → smash sequences at one; pairs run volley-volley rallies and target volleys at the other.' },
            { time: '22–38 min', title: 'Situation block', body: 'Approach games in waves: rally from the baseline until the coach calls “short!”, feed the short ball, point plays out with the approacher at net. Rotate roles; net points score double.' },
            { time: '38–56 min', title: 'Match play', body: 'Doubles tiebreaks (or singles on two courts): any point won at the net counts double, both teams must serve-and-stay-back once per tiebreak to feel the difference. Coach commentates the tactic, not the technique.' },
            { time: '56–60 min', title: 'Circle & close', body: 'Wins named, the week’s challenge set (“win 5 net points in your league match”), balls collected to the countdown.' },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle>Shrink & stretch</SectionTitle>
        <CueGrid
          cols={2}
          items={[
            { label: 'The player who talks', value: 'Some privates want conversation — it is their hour. Move the chat to ball-collecting minutes and keep feeding through it; you can listen and feed simultaneously, and they still leave having hit 400 balls.' },
            { label: 'Technique falls apart mid-plan', value: 'If the new cue degrades under live ball, drop back one block without apology: “good — that told us the pattern needs another week of feeds.” Regression on schedule is progress.' },
            { label: 'Tournament week', value: 'Flip the ratio: 15 minutes technique maximum, 45 minutes patterns, serves and scenario points. Nobody rebuilds a grip on Thursday for a Saturday final.' },
            { label: 'The rained-out hour', value: 'Half court under cover or a lobby: serve tosses, shadow sequences filmed and reviewed, grip changes, the mental-game module’s routines taught properly for once. A written plan for this day makes it a feature, not a refund.' },
          ]}
        />
        <Body className="mt-4">
          The 60-minute template is the module’s reference arc — the 30 and 45-minute plans are
          compressions of it, the 90-minute plan is its extension. Master this one and the others
          are arithmetic.
        </Body>
      </Card>
    </>
  )
}
