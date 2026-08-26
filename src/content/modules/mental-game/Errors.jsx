import { Card, SectionTitle, Lead, Body, Callout, StepList, CueGrid } from '../../../components/dashboard/content/Blocks'

export default function Errors() {
  return (
    <>
      <Card>
        <SectionTitle>The error after the error</SectionTitle>
        <Lead>
          Tennis is an error game — even dominant match winners lose close to half the points they
          play. The miss itself is priced in; what separates players is the next thirty seconds.
          One error carried into the following point becomes two, becomes a lost service game,
          becomes “I always collapse after leading”. The skill of this part is making every error
          exactly one point wide.
        </Lead>
        <div className="mt-4">
          <Callout label="The 10-second rule">
            You get the walk back to the baseline to feel it — frustration, disbelief, the
            groan. Fully, honestly, ten seconds. Then the point is filed. Suppressing the feeling
            fails as reliably as marinating in it; the routine is feel → file → next.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle sub="A reset you can run on the worst point of the match — built from the routine in Part 3.">
          The reset protocol
        </SectionTitle>
        <StepList
          steps={[
            {
              title: 'Body first',
              body: 'Turn away, racket to the other hand, shoulders back, head level. Slumped shoulders are not expressing the error — they are extending it. The posture is the first line of the file-away.',
            },
            {
              title: 'One breath, long exhale',
              body: 'The physiological line-break. Heart rate down a notch, grip pressure released — tension from the last point is technical sabotage of the next one.',
            },
            {
              title: 'One factual sentence',
              body: '“Contact was late.” Not a verdict about you — information about the ball. If there is a fix, name it (“earlier prep”); if it was the right shot that missed, say exactly that and change nothing.',
            },
            {
              title: 'Reset word, next plan',
              body: '“Next.” Then the only legal thought remaining: the plan for the coming point. Two thoughts about the past per point is one over budget.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle>Error triage</SectionTitle>
        <CueGrid
          cols={2}
          items={[
            {
              label: 'Right shot, missed',
              value: 'The wide slice on break point that clipped the tape — applaud yourself internally and repeat the choice next time. Changing correct decisions after bad outcomes is how good players get worse.',
            },
            {
              label: 'Wrong shot, any result',
              value: 'The drop shot from two metres behind the baseline — this is the one to fix, even when it works. Note it for the between-set review; do not re-litigate it mid-game.',
            },
            {
              label: 'Execution slippage',
              value: 'Three late forehands in a row is not three errors, it is one message: feet or preparation. One technical word from your phrase kit, then trust it.',
            },
            {
              label: 'The unforgivable only',
              value: 'Reserve real self-criticism for effort failures — not running for a ball, quitting on a game. Misses are tennis; not competing is a choice. Judge choices, forgive tennis.',
            },
          ]}
        />
        <Body className="mt-4">
          Train the reset like a stroke: in practice sets, run the full protocol after every
          error, exaggerated — coaches can even score it, points for posture and reset speed.
          Two weeks of deliberate reps and the file-away starts running before you decide it
          should. That automaticity, on a bad day, is worth three games a set.
        </Body>
      </Card>
    </>
  )
}
