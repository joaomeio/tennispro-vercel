import { Card, SectionTitle, Lead, Callout, CueGrid, StepList } from '../../../components/dashboard/content/Blocks'
import Thirty from './Thirty'
import FortyFive from './FortyFive'
import Sixty from './Sixty'
import Ninety from './Ninety'

// ─────────────────────────────────────────────────────────────────────────────
// LESSON TEMPLATES
// Part keys match TEMPLATE_CARDS in config/catalog.js.
// ─────────────────────────────────────────────────────────────────────────────

function Intro() {
  return (
    <div className="space-y-5">
      <Card>
        <SectionTitle sub="Every template in this module is built from the same five phases. Learn the skeleton once and every session plans itself.">
          The universal session skeleton
        </SectionTitle>
        <Lead>
          Good lessons are not a pile of drills — they are an arc: arrive, warm up, learn one
          thing, use it under pressure, leave wanting more. The four parts of this module are
          that arc poured into 30, 45, 60 and 90-minute moulds, each with ready-to-run templates
          for beginner, intermediate and advanced players. Print, coach, adjust.
        </Lead>
        <div className="mt-4">
          <StepList
            steps={[
              { title: 'Warm-up (15% of the session)', body: 'Movement first, then rackets: raise the heart rate, open hips and shoulders, groove easy contact. The warm-up predicts the session — flat start, flat lesson.' },
              { title: 'Technical block (25%)', body: 'ONE focus, stated in one sentence at the start. Demonstration, then maximum quality reps with a single cue. Two technical points per session is one too many.' },
              { title: 'Live-ball block (25%)', body: 'The same skill inside rallies with constraints — targets, height rules, bonus scoring. This is where technique becomes tennis.' },
              { title: 'Game block (25%)', body: 'Competitive play rigged so the day’s skill scores extra. The part players remember; never sacrifice it to overrun technique.' },
              { title: 'Close (10%)', body: 'Cool-down, one named win per player, next session’s preview. The last two minutes decide what the lesson feels like in memory.' },
            ]}
          />
        </div>
      </Card>

      <Card>
        <SectionTitle>Rules that survive contact with real lessons</SectionTitle>
        <CueGrid
          cols={2}
          items={[
            {
              label: 'Plan B lives on the same page',
              value: 'Rain moves you to half a court, one player of four shows up, the group is tired from school sport. Every template below notes its shrink-and-stretch options.',
            },
            {
              label: 'Talk less than you think you are',
              value: 'Thirty seconds of instruction, minutes of doing. If your explanation needs a paragraph, it needs a demonstration instead.',
            },
            {
              label: 'Count the hits',
              value: 'The honest quality metric of any lesson is balls struck per player. Queues, long explanations and elaborate setups all tax it. Aim for a ball every 30 seconds, minimum.',
            },
            {
              label: 'End on the game',
              value: 'Whatever gets cut when time runs short, it is never the game block. A lesson that ends mid-drill feels unfinished; one that ends mid-laughter gets rebooked.',
            },
          ]}
        />
        <div className="mt-4">
          <Callout label="How to use the four parts">
            The durations are not just lengths — they are different products. 30 minutes is a
            private tune-up, 45 the standard junior group, 60 the full lesson, 90 a training
            session with fitness inside. Each part explains who it serves before handing you the
            plans.
          </Callout>
        </div>
      </Card>
    </div>
  )
}

export default {
  accent: '#93c5fd',
  washFrom: '#172554',
  tagline:
    'Ready-to-run lesson plans for every session length — beginner to advanced, each with its own page and printable structure.',
  Intro,
  parts: [
    { key: '30', minutes: 8, summary: 'The tune-up: private-lesson plans that fix one thing well.', Component: Thirty },
    { key: '45', minutes: 9, summary: 'The junior standard: group plans with maximum balls per child.', Component: FortyFive },
    { key: '60', minutes: 9, summary: 'The full lesson: complete arcs for privates and groups at every level.', Component: Sixty },
    { key: '90', minutes: 9, summary: 'The training session: technique, tactics and fitness in one block.', Component: Ninety },
  ],
}
