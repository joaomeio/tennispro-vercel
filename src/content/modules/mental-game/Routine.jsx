import { Card, SectionTitle, Lead, Body, Callout, StepList, TimeBlocks, Figure } from '../../../components/dashboard/content/Blocks'

export default function Routine() {
  return (
    <>
      <Card>
        <SectionTitle>Routines are where composure lives</SectionTitle>
        <Lead>
          Watch any professional between points: the same walk, the same string-straightening,
          the same bounce count before serving — every point, win or lose. That sameness is not
          superstition. A routine is a container that carries you through the emotional weather
          of a match: it gives the mind a familiar track to run on precisely when emotions are
          trying to derail it. Nothing in sport psychology is better evidenced than this.
        </Lead>
        <div className="mt-4">
          <Figure
            src="/diagrams/mental/reset-routine.webp"
            alt="Timeline of the four-stage between-point routine across sixteen seconds"
            caption="Loehr’s four stages across the ~16 seconds between points: positive response → relax → prepare → ritual. The point ends; the routine begins immediately."
          />
        </div>
      </Card>

      <Card>
        <SectionTitle sub="Jim Loehr filmed hundreds of players and found the best ones all did the same four things between points — mapped here onto the seconds the rules give you.">
          The 16-second reset
        </SectionTitle>
        <StepList
          steps={[
            {
              title: 'Positive physical response (0–3 s)',
              body: 'The instant the point ends: racket to the non-dominant hand, turn away from the net, head up, shoulders back — regardless of the result. The body leads and the mood follows, not the other way round.',
            },
            {
              title: 'Relax (3–8 s)',
              body: 'Walk your spot behind the baseline, one slow breath — long exhale — grip loose, eyes on strings or ground. This is the physiological recovery; heart rate visibly drops in players who do it.',
            },
            {
              title: 'Prepare (8–12 s)',
              body: 'Now think: score, one tactical decision for the next point — serve target, return intention. One decision only, stated inwardly in words.',
            },
            {
              title: 'Ritual (12–16 s)',
              body: 'Step to the line and run your serve or return ritual — same bounces, same breath, same look at the target. The ritual is the bridge from thinking back to playing; the point starts automatic.',
            },
          ]}
        />
        <div className="mt-4">
          <Callout label="Where it is won">
            The routine matters most exactly when you least feel like doing it — after the double
            fault, the netted sitter, the bad call. Run it then, mechanically if necessary. On the
            worst points, the routine IS the mental game; everything else in this module is
            commentary.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle sub="Confidence at 2pm is built between 12.30 and 1.55. Script the pre-match hour once and reuse it forever.">
          The pre-match hour
        </SectionTitle>
        <TimeBlocks
          blocks={[
            { time: '−90 min', title: 'Fuel and arrive', body: 'Last real meal, arrive with time to spare. Rushing is arousal spent before the first ball.' },
            { time: '−60 min', title: 'Physical warm-up', body: 'The full activation routine — jog, dynamic stretches, shadow swings, accelerations. A warm body is the floor confidence stands on.' },
            { time: '−30 min', title: 'Ball warm-up', body: 'Hit through every shot including serves and returns. Grooving feel, not fixing technique — match day changes nothing technical, ever.' },
            { time: '−10 min', title: 'The quiet block', body: 'Alone: two minutes of slow breathing, visualise your first service game and your patterns working, state your one-line game plan.' },
            { time: '−2 min', title: 'Switch on', body: 'Two explosive movements, one phrase you always use (“my patterns, my pace”), and walk on. Same phrase every match of your career.' },
          ]}
        />
        <Body className="mt-4">
          Build both routines in practice sets for two weeks before touring them: every practice
          point gets the 16-second reset, every practice match gets the hour. A routine that only
          exists on match day is a costume; one built in training is a skin.
        </Body>
      </Card>
    </>
  )
}
