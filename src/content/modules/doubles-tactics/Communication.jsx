import { Card, SectionTitle, Lead, Body, Callout, CueGrid, DataTable, Checklist } from '../../../components/dashboard/content/Blocks'

export default function Communication() {
  return (
    <>
      <Card>
        <SectionTitle>Two players, one nervous system</SectionTitle>
        <Lead>
          Every doubles match contains a hidden third opponent: silence. Uncalled balls dropping
          between two rackets, two players lunging for the same volley, a poach nobody agreed to —
          none of these are tennis errors. They are communication errors, and they are the
          cheapest points you will ever give away or claim back. Good teams are rarely quiet;
          great teams are never quiet.
        </Lead>
        <div className="mt-4">
          <Callout label="The baseline standard">
            Talk before every point, every point, both of you. Serve target, net player’s plan,
            return plan. It takes four seconds, it is legal, and it is the single habit that most
            separates real teams from two singles players sharing a court.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle sub="Five words cover ninety-five percent of doubles. Agree on them before the warm-up ends.">
          The in-point vocabulary
        </SectionTitle>
        <DataTable
          headers={['Call', 'Means', 'Who says it']}
          rows={[
            ['“Mine”', 'I am taking this ball — stop moving toward it.', 'Whoever is better positioned, called early and loud.'],
            ['“Yours”', 'The ball is yours — I am recovering to position.', 'The player conceding, so there is never silence.'],
            ['“Switch”', 'Crossing sides — you cover mine.', 'The player who leaves their half (lob chases, poaches).'],
            ['“Bounce”', 'Let it go — I read it sailing out.', 'The player with the better view, usually behind.'],
            ['“Up”', 'Short ball or drop shot coming — move forward now.', 'Either player reading it first.'],
          ]}
        />
        <Body className="mt-4">
          Middle balls have a standing rule so “mine” is rarely needed: the player moving forward
          takes it, and if both are level, the forehand in the middle takes it. Agree once,
          then the seam ball is never a debate again.
        </Body>
      </Card>

      <Card>
        <SectionTitle sub="Signals let you coordinate without informing the returner. Keep them stupid-simple.">
          Hand signals
        </SectionTitle>
        <CueGrid
          items={[
            {
              label: 'Behind the back',
              value: 'Net player signals before each serve: open hand = I’m poaching, fist = staying, one finger wiggle = fake. Server confirms out loud every time.',
            },
            {
              label: 'Serve target second',
              value: 'For I-formation play, add the target: one finger = T, two = body, three = wide. Direction first, target second, same order every point.',
            },
            {
              label: 'No memory games',
              value: 'Three signals maximum. A missed signal at 5–5 costs more than a clever system ever earns. If either player blanks, default is: stay, serve T.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="What you say between points decides what your partner’s body does during them.">
          The between-point huddle
        </SectionTitle>
        <Checklist
          items={[
            'After every point, reconnect — a word, a fist bump, eye contact. Especially after your partner’s error; the silence after a miss is where teams dissolve.',
            'Talk plans, not post-mortems: “kick to the backhand, I’m poaching” beats any analysis of the volley just missed. The next point is the only coachable one.',
            'One correction per changeover, maximum — phrased as the team’s: “let’s take the middle more” not “you keep leaving the middle open.”',
            'Assign the emotional job: the steadier player that day carries the energy. Both players flat is how 4–1 leads evaporate.',
            'Losing badly? Change something together and say it out loud — both back on returns, I-formation, lob everything. A shared bad plan beats two private good ones.',
          ]}
        />
        <div className="mt-4">
          <Callout label="The partnership rule">
            You will never win a match angry at the other side of your own net. The opponents are
            over there. Every word across your side of the court is either fuel or friction —
            choose fuel, every point, and the tennis takes care of itself more often than seems
            reasonable.
          </Callout>
        </div>
      </Card>
    </>
  )
}
