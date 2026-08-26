import { Card, SectionTitle, Lead, Body, Callout, CueGrid, DataTable } from '../../../components/dashboard/content/Blocks'

export default function Focus() {
  return (
    <>
      <Card>
        <SectionTitle>Concentration is aim, not effort</SectionTitle>
        <Lead>
          Focus is not gritting your teeth and “concentrating harder” — it is pointing attention
          at the right thing at the right time, and noticing quickly when it drifts. In a tennis
          point the right thing is almost always the ball and the immediate task; the wrong
          things are the score, the last error, the next round, and the person watching from the
          fence. Every player’s attention drifts. Trained players notice in one second; untrained
          players notice three points later.
        </Lead>
        <div className="mt-4">
          <Callout label="The core skill">
            Catch and return. You cannot stop thoughts arriving mid-match — you can catch the
            drift and return to the ball, hundreds of times if needed. That catch-and-return rep
            is concentration training; the drills below exist to force it.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle sub="Attention has places it should live at each moment of a point. Teach it the address.">
          Where attention belongs
        </SectionTitle>
        <CueGrid
          cols={2}
          items={[
            {
              label: 'Before serving',
              value: 'One target, one pattern — nothing else. The decision is made standing behind the baseline, so the body serves free of debate.',
            },
            {
              label: 'Before returning',
              value: 'The server’s toss and racket face. Watching their body posture, their mood, or the net player is information; the toss is the answer.',
            },
            {
              label: 'During the rally',
              value: 'The ball — its height, spin and depth — plus one word of intent (“deep”, “cross”). Rally thoughts longer than one word arrive after the ball does.',
            },
            {
              label: 'Between points',
              value: 'This is the only legal thinking time: score, tactics, breathing. Part 3’s routine structures it — thinking belongs between points, not during them.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle>Focus drills that actually stretch it</SectionTitle>
        <DataTable
          headers={['Drill', 'How', 'What it builds']}
          rows={[
            [
              'Bounce–hit',
              'Say “bounce” at every bounce and “hit” at every contact — theirs and yours — for a whole rally set.',
              'The classic external-focus anchor. The mouth occupies the mind so the eyes can work.',
            ],
            [
              'Seam watching',
              'Try to see the ball’s seams (or logo) from the opponent’s contact to yours for five consecutive points.',
              'Impossible to fully do — which is the point. Chasing it drags attention to the ball completely.',
            ],
            [
              'Distraction sets',
              'Practice partner or coach talks, calls fake scores, drops balls mid-point. Play through it, no reactions.',
              'Inoculation. Match distractions are milder than the ones you rehearsed.',
            ],
            [
              'The 20-ball ladder',
              'Cooperative rally counting aloud; an attention lapse (short ball, wrong target) resets to zero. Reach 20 twice.',
              'Sustained attention with a consequence — the tennis version of holding a plank.',
            ],
          ]}
        />
        <Body className="mt-4">
          Off court, ten minutes of daily breath-focused sitting — attention on the breath, catch
          the drift, return, repeat — is the same rep in its purest form. Players who think
          meditation is soft have never tried to do it for ten minutes.
        </Body>
      </Card>
    </>
  )
}
