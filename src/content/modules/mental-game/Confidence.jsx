import { Card, SectionTitle, Lead, Body, Callout, CueGrid, StepList } from '../../../components/dashboard/content/Blocks'

export default function Confidence() {
  return (
    <>
      <Card>
        <SectionTitle>Confidence is a ledger, not a mood</SectionTitle>
        <Lead>
          Players talk about confidence like weather — it came, it went, nothing to be done. In
          reality, confidence is your brain’s running estimate of “can I do this?”, and it is fed
          by evidence: training you completed, shots you have made under pressure, problems you
          have solved in matches before. Moods fluctuate; the ledger only grows or shrinks with
          deposits. That makes confidence buildable on purpose — and protectable when results dip.
        </Lead>
        <div className="mt-4">
          <Callout label="The deep source">
            Durable confidence comes from preparation, not from winning. Results borrow against
            the ledger; training funds it. A player whose belief rests only on their last result
            is one bad afternoon from bankruptcy — a prepared player walks on court already paid.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle>Making deposits</SectionTitle>
        <StepList
          steps={[
            {
              title: 'Keep an evidence log',
              body: 'After every session, one line: what you did well, what you completed. Before tournaments, read the last month. This is not positive thinking — it is accurate remembering, which anxiety is famously bad at.',
            },
            {
              title: 'Bank pressure reps',
              body: 'Every consequence drill survived (Part 2) is a deposit with interest. “I have made this serve at 30–40 in practice forty times” is a sentence that holds weight on match day.',
            },
            {
              title: 'Rehearse success, specifically',
              body: 'Five minutes of imagery: your serve patterns landing, your response after an error, the tight game you close. The brain files vivid rehearsal alongside experience — imagery is a legal counterfeit of match play.',
            },
            {
              title: 'Prepare the body',
              body: 'Fitness is confidence you can feel in the third set. Knowing you will not tire before they do changes shot selection at 4–4 more than any pep talk.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="Everyone’s ledger gets raided — by losses, slumps, and comparison. Protection is a skill too.">
          Defending the ledger
        </SectionTitle>
        <CueGrid
          cols={2}
          items={[
            {
              label: 'After losses',
              value: 'Separate result from evidence: “I lost AND my second serve held up under pressure” can both be true. A loss deletes nothing you trained — refuse the false accounting.',
            },
            {
              label: 'In slumps',
              value: 'Shrink the frame. Confidence rebuilds from small completed promises: ten quality sessions, one pattern grooved, one fitness benchmark. Win the week, then the month; the tennis follows.',
            },
            {
              label: 'Against comparison',
              value: 'Their highlight reel versus your inner monologue is a rigged match. The only comparison with signal: you, this month, versus you, last month — which is exactly what the log shows.',
            },
            {
              label: 'Body first, always',
              value: 'Confident posture is not decoration — shoulders back and head up between points feed the estimate the brain is running. Act like a player who belongs, and the belief has something to stand on.',
            },
          ]}
        />
        <Body className="mt-4">
          Coaches: catch players succeeding, specifically — “that recovery step after the wide
          forehand was perfect” lands deposits a generic “great job” never reaches. Specific
          praise is evidence; vague praise is noise.
        </Body>
      </Card>
    </>
  )
}
