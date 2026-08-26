import { Card, SectionTitle, Lead, Body, Callout, DataTable, StepList, Figure } from '../../../components/dashboard/content/Blocks'

export default function Formations() {
  return (
    <>
      <Card>
        <SectionTitle>Three shapes, one purpose</SectionTitle>
        <Lead>
          A formation is a message to the returner: here is what you are allowed to see before
          you swing. The standard formation shows everything, the Australian hides the cross-court
          lane, and the I-formation hides both. Teams that can play all three make every return a
          guess — and a returner who is guessing has already lost half a step.
        </Lead>
        <div className="mt-4">
          <Figure
            src="/diagrams/doubles/formations.webp"
            alt="Top-down diagrams of standard, Australian and I-formation serving setups"
            caption="The three serving shapes. Standard: partner opposite the returner. Australian: partner on the server’s side, blocking cross-court. I-formation: partner crouched on the centre line, direction decided by signal."
          />
        </div>
      </Card>

      <Card>
        <SectionTitle>When to use which</SectionTitle>
        <DataTable
          headers={['Formation', 'Best when', 'The trade']}
          rows={[
            [
              'Standard',
              'Your default — simplest coverage, natural angles, nothing to remember under pressure.',
              'The returner sees a clean cross-court lane and can groove it all match.',
            ],
            [
              'Australian',
              'The returner has grooved the cross-court return — classically on the ad side against a strong cross-court backhand (or forehand returner cheating in).',
              'The server must cover the line side after serving; fitness and a good first volley required.',
            ],
            [
              'I-formation',
              'Your second serve is getting attacked, or a tiebreak needs disruption. The crouched net player breaks every visual habit the returner has.',
              'Highest coordination cost — signals must be automatic, and the server needs an accurate serve to the called side.',
            ],
          ]}
        />
        <div className="mt-4">
          <Callout label="The 50–50 gift">
            In the I-formation the returner must commit before knowing which way the net player
            breaks. Half their choices send the ball straight into a waiting volley — a coin flip
            you arranged. Even when it loses a point, it plants hesitation that discounts every
            later return.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle sub="The Australian, played properly, is a set of assignments — not just a place to stand.">
          Running the Australian
        </SectionTitle>
        <StepList
          steps={[
            {
              title: 'Set up',
              body: 'Net player moves to the server’s side of the court, in the service box near the centre line. Server stands close to the centre mark — the recovery run is shorter from there.',
            },
            {
              title: 'Serve the T',
              body: 'The T serve shrinks the returner’s angle for the down-the-line return — the only lane the formation concedes. A wide serve here hands them an easy pass.',
            },
            {
              title: 'Server covers the open line',
              body: 'After serving, the server moves diagonally to cover the vacated side. First priority is any down-the-line return; cross-court belongs to the net player now.',
            },
            {
              title: 'Net player hunts',
              body: 'Anything floating through the middle or cross-court is the net player’s to kill. The formation exists to feed them exactly that ball.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="The I-formation is 80% signals, 20% serve. Get the ritual right and the tennis is easy.">
          Running the I
        </SectionTitle>
        <StepList
          steps={[
            {
              title: 'Signal before every point',
              body: 'Net player shows two signals behind their back: serve direction (T / body / wide) and their break (left / right / stay). Server confirms verbally — “yep” — before tossing.',
            },
            {
              title: 'Crouch on the centre line',
              body: 'Net player squats below net height astride the centre service line. Stay genuinely low; the whole trick is the returner seeing no one.',
            },
            {
              title: 'Break on contact',
              body: 'The net player moves the instant the serve is struck — not before (the returner sees it) and not after (the window closes). One decisive crossover step, racket up.',
            },
            {
              title: 'Server fills the other half',
              body: 'Whichever way the net player broke, the server flows to the opposite half. Both players moving on serve contact, court fully covered by the time the return crosses the net.',
            },
          ]}
        />
        <Body className="mt-4">
          Rehearse both formations in practice sets before using them in matches — ten minutes of
          walk-through, then play games where every second serve uses the I. The first live match
          should be the twentieth time you have run the signals, not the first.
        </Body>
      </Card>
    </>
  )
}
