import { Card, SectionTitle, Lead, Body, Callout, CueGrid, StepList } from '../../../components/dashboard/content/Blocks'

export default function Pressure() {
  return (
    <>
      <Card>
        <SectionTitle>What pressure actually is</SectionTitle>
        <Lead>
          Pressure is not the situation — it is your body’s response to caring about the outcome:
          faster heart, shallow breath, tight forearm, shrinking swings. That response is
          identical in every player at every level; Grand Slam finalists get it on break points
          too. The difference is interpretation and training: elite players read arousal as fuel
          and have rehearsed what to do with it. Choking is not a character flaw — it is an
          untrained response running wild.
        </Lead>
        <div className="mt-4">
          <Callout label="Reframe the signal">
            A racing heart before a big point is your body delivering extra resources — oxygen,
            alertness, speed. Players who label it “I’m ready” outperform players who label it
            “I’m nervous”, with identical physiology. The label is trainable; start using the
            words on purpose.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle sub="Big points are not the moment for your best tennis — they are the moment for your most reliable tennis.">
          The big-point playbook
        </SectionTitle>
        <CueGrid
          cols={2}
          items={[
            {
              label: 'Slow everything down',
              value: 'Pressure accelerates you — walking, breathing, serving. Deliberately take the full time between points. The player who controls the tempo of a tight game usually controls its result.',
            },
            {
              label: 'Play your pattern, not a hero ball',
              value: 'Break point is the scoreboard asking “what do you trust?” The answer was decided in practice: your highest-percentage serve, your grooved return, your favourite pattern. Nothing new after 30–30.',
            },
            {
              label: 'Target the middle of margins',
              value: 'Under pressure, aim two feet inside the lines and over the low net. Big targets keep swings long; small targets shrink muscles first.',
            },
            {
              label: 'Exhale at contact',
              value: 'Breath-holding is pressure’s signature tell and it locks the arm. Exhale audibly through the hit — grunting is not a style choice, it is arousal management.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="Courage under pressure is a training effect. Build the exposure ladder.">
          Training with stakes
        </SectionTitle>
        <StepList
          steps={[
            {
              title: 'Score handicaps',
              body: 'Start practice sets 0–30 down every service game, or 2–4 down in sets. Serving from behind becomes a Tuesday feeling, not a crisis.',
            },
            {
              title: 'Consequence points',
              body: 'Loser collects balls, buys the drinks, does the sprints. Mild, laughable stakes — but real enough that your body rehearses caring.',
            },
            {
              title: 'One-chance drills',
              body: 'One second serve at a called target to end the session — miss and the group does a fitness finisher. A single rep with witnesses teaches more pressure skill than fifty quiet ones.',
            },
            {
              title: 'Simulated finals',
              body: 'Monthly: full match protocol — warm-up, umpired scoring, no coaching, changeover rules. The tournament environment, rehearsed until it is furniture.',
            },
          ]}
        />
        <Body className="mt-4">
          Review pressure points afterwards with one question: did I play my plan? Not did I win
          — pressure points are lost while playing correctly all the time. Judging process keeps
          the training loop honest; judging outcomes teaches fear.
        </Body>
      </Card>
    </>
  )
}
