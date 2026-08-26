import { Card, SectionTitle, Lead, Body, Callout, StepList, CueGrid, FaultFix, Figure } from '../../../components/dashboard/content/Blocks'

export default function Poaching() {
  return (
    <>
      <Card>
        <SectionTitle>The most profitable move in doubles</SectionTitle>
        <Lead>
          The poach — the net player cutting across to intercept a cross-court return — is
          doubles’ version of the steal. Done well it wins the point outright at the net, where
          84% of winners already live. But its real value is invisible: a returner who has been
          poached on twice stops hitting their best return, aims closer to the alley, and donates
          errors for the rest of the match. You poach to win points; you keep poaching to own the
          returner’s mind.
        </Lead>
        <div className="mt-4">
          <Figure
            src="/diagrams/doubles/poach-window.webp"
            alt="Top-down diagram of the net player's diagonal poach path intercepting a cross-court return"
            caption="The poach runs diagonally forward, through the centre window where cross-court returns cross lowest — never sideways along the net. Contact happens in front of the centre line, moving toward the ball."
          />
        </div>
      </Card>

      <Card>
        <SectionTitle sub="A poach is a prediction. These are the tells that make it a safe one.">
          Reading the green light
        </SectionTitle>
        <CueGrid
          cols={2}
          items={[
            {
              label: 'Your serve found the target',
              value: 'T serves and body serves squeeze the return into the middle — right through your window. Wide serves open the alley; poach less behind them.',
            },
            {
              label: 'The returner is stretched',
              value: 'Late contact, reaching, off the back foot — stretched returners hit safe cross-court balls. That ball is yours before they hit it.',
            },
            {
              label: 'A grooved cross-court habit',
              value: 'Three identical cross-court returns is not consistency, it is an appointment. Keep the fourth.',
            },
            {
              label: 'Second-serve attack posture',
              value: 'Returner stepping in to crush a second serve rarely changes direction. They are committed; commit with them.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle>The mechanics of the move</SectionTitle>
        <StepList
          steps={[
            {
              title: 'Go on the returner’s downswing',
              body: 'Leave as their racket starts forward — they can no longer change the shot. Leaving on the serve bounce is early enough to be seen; leaving at their contact is too late to arrive.',
            },
            {
              title: 'Move diagonally forward',
              body: 'The path is toward the net strap, not along the net. Forward motion turns a reach into a punch and closes the angle the returner has left.',
            },
            {
              title: 'Take it out of the air, middle-height or higher',
              body: 'Volley the intercept at the feet of the opposing net player or through the middle gap. You arrived with momentum — use it; a poach placed softly invites the counter.',
            },
            {
              title: 'Your partner crosses behind',
              body: 'The server flows into the half you left the moment you commit. A called poach (“I’m going”) means the switch is automatic — no hole, no discussion.',
            },
          ]}
        />
        <div className="mt-4">
          <Callout label="Commit or stay">
            The only fatal poach is the half poach — drifting two steps, reaching, and covering
            nothing. Decide before the serve: going or staying. If going, go all the way across;
            the ball behind you is your partner’s problem by prior agreement.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle sub="The fake costs nothing and taxes every future return.">
          Faking the poach
        </SectionTitle>
        <Body>
          A fake is the full poach start — the same first step and shoulder turn on the returner’s
          downswing — followed by a push back to your base. Do it early in the match, before you
          have poached at all: the returner’s eyes will flick to you on every return afterwards,
          and a returner watching you is not watching the ball. Mix roughly one real poach for
          every two fakes, and never repeat the same pattern three times in a row. Signals make
          this free: agree each point — stay, fake, or go — so your server always knows which
          half of the court is theirs.
        </Body>
      </Card>

      <Card>
        <SectionTitle>Faults and fixes</SectionTitle>
        <FaultFix
          items={[
            {
              fault: 'Poached and got passed down the line',
              fix: 'Budgeted cost, not failure. If the line pass never comes, you are not poaching enough — the returner should have to prove they can hit it under pressure, repeatedly.',
            },
            {
              fault: 'Always arriving late on the ball',
              fix: 'You are leaving on their contact. Rehearse the trigger: eyes on the returner’s racket, move on the downswing. Two practice sets watching only that will recalibrate it.',
            },
            {
              fault: 'Server surprised by the poach',
              fix: 'Uncalled poaches break teams. No poach without a signal or a call — the move is a team rotation, not a solo raid.',
            },
            {
              fault: 'Poaching every point',
              fix: 'Predictable aggression is just a hole in the alley. The pattern only works because it is a pattern the returner cannot solve: stay, fake, go — in an order only your team knows.',
            },
          ]}
        />
      </Card>
    </>
  )
}
