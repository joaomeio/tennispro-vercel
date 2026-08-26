import { Card, SectionTitle, Lead, Body, Callout, TimeBlocks, CueGrid } from '../../../components/dashboard/content/Blocks'

export default function Thirty() {
  return (
    <>
      <Card>
        <SectionTitle>The tune-up session</SectionTitle>
        <Lead>
          Thirty minutes is not a short lesson — it is a different discipline. There is no time
          for two topics, a leisurely warm-up or a long chat: one player (occasionally two), one
          clearly named focus, and a session that moves like a pit stop. Done well, the 30-minute
          private is the best value in coaching: weekly tune-ups compound faster than monthly
          marathons.
        </Lead>
        <div className="mt-4">
          <Callout label="The 30-minute law">
            Decide the focus BEFORE the session — from last week’s notes or a 30-second question
            at the gate — and say it in one sentence: “Today we get your rally forehand landing
            past the service line.” If you are still choosing a topic at minute five, the lesson
            is already over.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle sub="Beginner private — building the rally habit.">
          Template A · Beginner
        </SectionTitle>
        <TimeBlocks
          blocks={[
            { time: '0–4 min', title: 'Moving warm-up with racket', body: 'Jog and shuffle to the service line and back, then racket-and-ball skills: dribbles, edge balances, self-rally. Talk while they move — ask about their week here, not later.' },
            { time: '4–12 min', title: 'Technical block', body: 'The one focus, fed from a basket at cooperative pace. One cue only (“low to high”). 30+ balls; hold position between feeds so the shape settles.' },
            { time: '12–22 min', title: 'Live-ball block', body: 'The same stroke in a rally with you: cooperative to 5, then 10, then a big-target game — “three past the service line wins a point”.' },
            { time: '22–28 min', title: 'The game', body: 'Play points where the day’s stroke starts every rally (you feed the first ball to it). First to 7. Let them win on merit — count out loud.' },
            { time: '28–30 min', title: 'Close', body: 'Name the win specifically, set the homework (shadow swings, wall rallies), preview next week. Write your note before the next student arrives.' },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="Intermediate/advanced private — sharpening a weapon or patching a leak.">
          Template B · Intermediate & advanced
        </SectionTitle>
        <TimeBlocks
          blocks={[
            { time: '0–4 min', title: 'Rally warm-up with intent', body: 'Straight into cooperative hitting: mini-tennis 2 minutes, full court 2 minutes, last 30 seconds at match height and depth. Advanced players warm up by playing, not queuing.' },
            { time: '4–14 min', title: 'Focus block under live conditions', body: 'The named focus inside rally patterns, not basket feeds — e.g., inside-out forehands from your deep cross feeds; approach shots off short balls. Quality bar stated: 7 of 10 past the service line.' },
            { time: '14–24 min', title: 'Pressure block', body: 'The focus with a score attached: pattern games to 11 where the day’s shot earns double, or serve +1 patterns if the focus is the serve. This block is why they pay for coaching instead of ball machines.' },
            { time: '24–30 min', title: 'Competitive close', body: 'One tiebreak to 7 with the constraint live. Then the note: what held under pressure, what gets the next session.' },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle>Shrink & stretch</SectionTitle>
        <CueGrid
          cols={2}
          items={[
            { label: 'Two players show up', value: 'Same skeleton; you feed less, they rally more. Technical block becomes stations (one on basket, one on targets), and every game is played against each other, not you.' },
            { label: 'Player arrives flat', value: 'Double the warm-up game content and halve the technical talk. A low-energy 30 minutes that ends in laughing points beats a grim technical grind every time.' },
            { label: 'Breakthrough happening', value: 'Cut the game block, ride the technical block to minute 26 — but tell them you are doing it: “this is too good to stop, we’ll play first thing next week.”' },
            { label: 'Recurring weekly slot', value: 'Run a 4-week arc on one theme (build → live ball → pressure → test), not four disconnected fixes. The note you write at minute 30 is the curriculum.' },
          ]}
        />
        <Body className="mt-4">
          The 30-minute session lives and dies on your notes. One line per week per player —
          focus, what worked, next step — turns a string of tune-ups into a program.
        </Body>
      </Card>
    </>
  )
}
