import { Card, SectionTitle, Lead, Body, Callout, StepList, CueGrid, Figure } from '../../../components/dashboard/content/Blocks'
import Flat from './Flat'
import SliceServe from './SliceServe'
import Kick from './Kick'
import Second from './Second'
import Placement from './Placement'

// ─────────────────────────────────────────────────────────────────────────────
// SERVE MASTERCLASS
// Part keys match SERVE_CARDS in config/catalog.js.
// ─────────────────────────────────────────────────────────────────────────────

// The primer holds what every serve shares — the kinetic chain, the trophy
// checkpoint, and the toss — so the five part pages can stay specific.
function Intro() {
  return (
    <div className="space-y-5">
      <Card>
        <SectionTitle sub="Read this before any of the five parts — every serve is built on the same engine.">
          Foundations: where serve power actually comes from
        </SectionTitle>
        <Lead>
          The serve is the only shot you control completely — ball, position, pace, spin, timing.
          It is also the most complex skill in tennis: biomechanics research describes it as a
          proximal-to-distal chain that starts at the ground and accelerates segment by segment —
          leg drive, hip rotation, trunk rotation, shoulder internal rotation, then forearm
          pronation and wrist snap at contact.
        </Lead>
        <div className="mt-4">
          <Callout label="The principle">
            Players who try to serve harder with the arm break the chain at its weakest link.
            Elite servers swing a whip; struggling servers swing a stick. One study measured a
            3&#8202;km/h racket-speed loss from insufficient knee bend alone — power leaks start at
            the ground, not the shoulder.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle>The five links of the chain</SectionTitle>
        <StepList
          steps={[
            {
              title: 'Ground — leg drive',
              body: 'Knees load 30–40° in the trophy position and push up into the court. This vertical drive begins the whole energy transfer; without it every later link works overtime.',
            },
            {
              title: 'Hips — rotation leads',
              body: 'The hips unwind first, ahead of the shoulders. The stretch between hips and shoulders is elastic energy — a wound spring the trunk releases.',
            },
            {
              title: 'Trunk — shoulders unwind',
              body: 'Shoulders follow the hips and multiply the rotational speed. More hip–shoulder separation at trophy means more free power later.',
            },
            {
              title: 'Shoulder — internal rotation',
              body: 'The fastest joint action in tennis: elite servers internally rotate the shoulder at 2,000–2,500 degrees per second. The arm is a lever here, not a motor.',
            },
            {
              title: 'Forearm — pronation and snap',
              body: 'The final acceleration. Flat serves snap through the ball; spin serves brush across it. Full pronation also protects the elbow — most serving-arm pain traces back to a chain that stops early.',
            },
          ]}
        />
        <div className="mt-4">
          <Figure
            src="/diagrams/serve/kinetic-chain.webp"
            alt="Five-phase serve kinetic chain from leg drive to pronation"
            caption="The kinetic chain, ground up: leg drive → hip rotation → trunk rotation → shoulder internal rotation → pronation. Each link hands its speed to the next."
          />
        </div>
      </Card>

      <Card>
        <SectionTitle sub="Freeze your motion at trophy and check these four things — it is the diagnostic frame for every fault in this module.">
          The trophy position checkpoint
        </SectionTitle>
        <CueGrid
          cols={2}
          items={[
            {
              label: 'Toss arm',
              value: 'Fully extended, ball released toward a point above or slightly inside the hitting shoulder. A drifting toss forces the body to tilt and chase.',
            },
            {
              label: 'Racket arm',
              value: 'Elbow at shoulder height, racket pointing up or back — never hanging down. A dropped elbow leaks power and loads the shoulder joint.',
            },
            {
              label: 'Coil',
              value: 'Shoulders visibly turned past the hips. Square shoulders at trophy means the spring was never wound.',
            },
            {
              label: 'Balance',
              value: 'Weight flowing back-to-front in one motion. Falling sideways or backward breaks the upward transfer before it starts.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="Each serve in this module begins with its own toss. Fix the toss first, always — the swing can only be as good as the ball it is given.">
          One motion, three tosses
        </SectionTitle>
        <Body>
          A bad toss creates a bad serve every single time: arm, timing and power all start
          compensating, and compensations become both inconsistency and injury. The parts ahead
          give each serve its exact toss location — flat slightly in front and right, slice a
          touch further right, kick above or slightly behind the head. Practice the toss alone,
          as its own skill: stand at a wall and release the ball to peak at full stretched-arm
          height, catching it without moving your feet. Ten quiet tosses before every session.
        </Body>
      </Card>
    </div>
  )
}

export default {
  accent: '#fb7185',
  washFrom: '#4c0519',
  tagline:
    'Five serves deep: flat, slice, kick, the second serve, and placement strategy — mechanics, patterns and practice plans for each.',
  Intro,
  parts: [
    {
      key: 'flat',
      minutes: 9,
      summary: 'Maximum pace through the 12 o’clock contact — and when the risk is worth it.',
      Component: Flat,
    },
    {
      key: 'slice-serve',
      minutes: 9,
      summary: 'Sidespin that drags returners off the court — the highest-percentage weapon in the deuce court.',
      Component: SliceServe,
    },
    {
      key: 'kick',
      minutes: 11,
      summary: 'The 7-to-1 brush, the high bounce, and a five-step build from first feel to match pace.',
      Component: Kick,
    },
    {
      key: 'second',
      minutes: 9,
      summary: 'Turn the biggest liability in club tennis into a serve you trust at 30–40.',
      Component: Second,
    },
    {
      key: 'placement',
      minutes: 10,
      summary: 'T, body, wide: the geometry, the patterns per court, and how to read a returner.',
      Component: Placement,
    },
  ],
}
