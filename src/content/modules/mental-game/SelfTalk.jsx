import { Card, SectionTitle, Lead, Body, Callout, DataTable, CueGrid } from '../../../components/dashboard/content/Blocks'

export default function SelfTalk() {
  return (
    <>
      <Card>
        <SectionTitle>You are always coaching yourself</SectionTitle>
        <Lead>
          There is a voice narrating every match you play, and it is either coaching you or
          heckling you — there is no neutral. Research across sports shows self-talk reliably
          improves focus, effort control and skill execution, with instructional talk (“low to
          high”) sharpening technique and motivational talk (“strong legs, let’s go”) sustaining
          intensity. The heckler — “you always miss these”, “here we go again” — measurably does
          the opposite. The skill is editing the script.
        </Lead>
        <div className="mt-4">
          <Callout label="The rule of thumb">
            Talk to yourself the way a great coach talks to a player they believe in: honest about
            the ball, generous about the person, always pointing at the next action. You would
            fire a coach who spoke to you the way many players speak to themselves.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle sub="The edit is mechanical: catch the heckle, swap in the instruction. Same situations, new lines.">
          The script swap
        </SectionTitle>
        <DataTable
          headers={['Situation', 'The heckler says', 'The coach says']}
          rows={[
            ['Missed easy ball', '“How do you miss THAT?”', '“Feet were late — move first, swing second.”'],
            ['Double fault', '“Don’t double fault again.”', '“Big brush, target the backhand.” (The brain cannot aim at a don’t.)'],
            ['Losing to a weaker player', '“This is embarrassing.”', '“They’re beating me with depth — time to change something: heavier cross-courts, come in more.”'],
            ['Break point down', '“Don’t choke this.”', '“Slice wide, first volley middle. Nothing new.”'],
            ['Long tight rally lost', '“I can’t win these.”', '“That’s the pattern — I’ll win my share if I keep playing it.”'],
          ]}
        />
      </Card>

      <Card>
        <SectionTitle>Building your phrase kit</SectionTitle>
        <CueGrid
          cols={2}
          items={[
            {
              label: 'Two technique words',
              value: 'Your personal cues for the strokes that wobble under pressure — “long finish”, “up and through”. Agreed with your coach, worn smooth with use.',
            },
            {
              label: 'One reset word',
              value: 'A single word that closes the last point — “next”, “done”, “play”. Said with the physical routine from Part 3, it becomes a conditioned line-break.',
            },
            {
              label: 'One identity phrase',
              value: '“I compete for every point.” Not a lie about being the best — a true statement about behaviour you control, available on your worst day.',
            },
            {
              label: 'A tone check',
              value: 'The same words in a flat mutter or a firm voice are different drugs. Say the phrase like you mean it or it reads as sarcasm to your own nervous system.',
            },
          ]}
        />
        <Body className="mt-4">
          Train it visibly: for one practice set, say every between-point phrase out loud. It
          feels absurd and it works — audible talk cannot be skipped, and after two weeks the
          silent version runs on rails. For juniors, make it a game: the coach catches heckles,
          players catch the coach’s.
        </Body>
      </Card>
    </>
  )
}
