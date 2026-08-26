import { Card, SectionTitle, Lead, Body, Callout, CueGrid, StatRow, FaultFix, TimeBlocks, Figure } from '../../../components/dashboard/content/Blocks'

export default function Flat() {
  return (
    <>
      <Card>
        <SectionTitle>The weapon serve</SectionTitle>
        <Lead>
          The flat serve is tennis at its most direct: minimal spin, maximum pace, hit straight
          through the back of the ball at full stretch. It wins the quickest free points in the
          game — and misses more than any other serve. That trade is the whole story of this part:
          learn to hit it properly, then learn to spend it wisely.
        </Lead>
        <div className="mt-4">
          <StatRow
            stats={[
              { value: '~40%', label: 'of professional aces are struck out wide, close to the line' },
              { value: '35%+', label: 'of aces go down the T — the two corners do almost all the work' },
              { value: '1st', label: 'serve only — the flat serve is never a second-serve choice' },
            ]}
          />
        </div>
      </Card>

      <Card>
        <SectionTitle>Contact and grip</SectionTitle>
        <CueGrid
          items={[
            {
              label: 'Grip',
              value: 'Continental, always. A forehand grip caps your ceiling: it forces contact behind the head and makes pronation impossible.',
            },
            {
              label: 'Contact point',
              value: 'Think 12-to-1 o’clock on the ball face — through the back, at the very top of your reach, slightly in front of the baseline.',
            },
            {
              label: 'Toss',
              value: 'Slightly in front of the body and toward the hitting side. The forward toss lets your weight carry into the court.',
            },
          ]}
        />
        <div className="mt-4">
          <Figure
            src="/diagrams/serve/toss-positions.webp"
            alt="Overhead view of toss positions for flat, slice and kick serves"
            caption="Toss placement from above (right-hander): flat lands in front and slightly right of the head, slice a touch further right, kick above or slightly behind. Same motion — the toss selects the serve."
          />
        </div>
        <div className="mt-4">
          <Callout label="Key feel">
            Reach up and hit the ball at your absolute highest useful contact — then pronate hard
            through it, palm finishing toward the outside. The snap comes from the forearm rolling
            over, not from the wrist flicking down. If your serves “clip the tape constantly,”
            you are almost certainly contacting the ball as it drops instead of at its peak.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle sub="Height decides who is allowed to hit flat serves. The geometry is unforgiving.">
          The margin problem
        </SectionTitle>
        <Body>
          A flat serve travels in nearly a straight line, so the window between the net tape and
          the service line is razor thin — and it shrinks with the server’s height. At 6&#8202;ft
          plus of contact height the window is workable; for shorter players a pure flat serve has
          almost no margin at full pace, which is why the pros you watch mixing 200&#8202;km/h
          bombs are tall, and why shorter elite servers live on slice and kick first serves. Be
          honest about your contact height: the flat serve may be your third serve, not your first.
        </Body>
      </Card>

      <Card>
        <SectionTitle>When to pull the trigger</SectionTitle>
        <CueGrid
          cols={2}
          items={[
            {
              label: 'Ahead in the game',
              value: '40–0, 40–15, 30–0 — score situations where a miss costs little. Spend your lowest-percentage serve when the scoreboard subsidises it.',
            },
            {
              label: 'Pattern break',
              value: 'After a run of slice and kick serves, one flat bomb down the T arrives a metre earlier than the returner’s feet are set for.',
            },
            {
              label: 'Into the body',
              value: 'A flat serve at the returner’s hip is higher-percentage than the corners and jams big swings — the safest way to use raw pace.',
            },
            {
              label: 'Never on break point',
              value: 'Down 30–40, percentage wins. A missed first serve on a pressure point hands the returner a free look at your second.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle>Faults and fixes</SectionTitle>
        <FaultFix
          items={[
            {
              fault: 'Serves consistently long',
              fix: 'Toss has drifted behind the head, or the elbow is leading the swing. Re-set the toss in front; feel the chest facing the box at contact.',
            },
            {
              fault: 'Serves into the net',
              fix: 'Contact too low — the ball is dropping before you swing, or the legs never drove upward. Toss slightly higher and meet it at the peak.',
            },
            {
              fault: 'Pace without accuracy',
              fix: 'You are aiming with the arm. Pick the target before the toss, keep the head still through contact, and let the same swing repeat.',
            },
            {
              fault: 'Shoulder or elbow soreness',
              fix: 'Almost always incomplete pronation or a forehand grip. Check the grip first, then finish with the palm facing out — never braking the arm mid-swing.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="Fifteen focused minutes. Stop before fatigue — tired reps groove compensations.">
          Practice block
        </SectionTitle>
        <TimeBlocks
          blocks={[
            {
              time: '0–3 min',
              title: 'Toss only',
              body: 'Ten tosses to the flat-serve spot — in front, hitting-side, peak at full reach. Catch without moving the feet.',
            },
            {
              time: '3–8 min',
              title: 'Half-speed channel serves',
              body: 'Ten serves at 50% pace down the T, deuce court. The only goal is clean 12 o’clock contact at full extension. Count clean strikes, not makes.',
            },
            {
              time: '8–13 min',
              title: 'Corners at match pace',
              body: 'Alternate T and wide, five each per court, at 80–90%. Call the target out loud before every toss — aiming silently breeds drift.',
            },
            {
              time: '13–15 min',
              title: 'Score simulation',
              body: 'Serve six “40–0 points”: flat first serve, full commitment. Miss? No second serve, next point — this trains the free-swing mentality the flat serve needs.',
            },
          ]}
        />
      </Card>
    </>
  )
}
