import { Card, SectionTitle, Lead, Body, Callout, CueGrid, DataTable, Checklist } from '../../../components/dashboard/content/Blocks'

export default function Yellow() {
  return (
    <>
      <Card>
        <SectionTitle>Full ball, full game, changing bodies</SectionTitle>
        <Lead>
          At eleven to fourteen the scaffolding is gone: yellow ball, full court, real
          tournaments. What arrives instead is puberty — growth spurts that scramble
          coordination, motivation that suddenly runs through friendships and identity, and the
          first players who train because they chose to rather than because Tuesday is tennis
          day. Coaching this stage is half tennis, half navigation.
        </Lead>
        <div className="mt-4">
          <Callout label="The number one rule">
            During a growth spurt, expect the wheels to wobble: the serve that worked in April
            misfires in June because the arm is three centimetres longer. Say this out loud to
            the player and the parents before it happens — a 12-year-old who knows clumsiness is
            temporary keeps training; one who thinks they “lost it” quits.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle>What to actually teach</SectionTitle>
        <CueGrid
          cols={2}
          items={[
            {
              label: 'Weapons and identities',
              value: 'Every player leaves this stage with a game identity — big serve, grinding backhand wall, net rusher — chosen from their strengths. Generic tennis is the enemy; a 13-year-old with a weapon beats a 13-year-old with seven adequate strokes.',
            },
            {
              label: 'The complete serve',
              value: 'Flat, slice and the beginnings of kick; second-serve confidence as a trained quality. Serve practice becomes a standing session item, measured and logged.',
            },
            {
              label: 'Tactical literacy',
              value: 'Score-based decisions (what changes at 30–40), opponent scouting in the warm-up, surface adjustments. Watch professional matches together and ask “why that shot?” — analysis is a teachable habit.',
            },
            {
              label: 'Physical training begins properly',
              value: 'Bodyweight strength, landing mechanics, trunk work — the gym module scaled to age. Post-spurt players can begin light load; pre-spurt players own their bodyweight first.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="Three players, three paths — the group curriculum splits at yellow and pretending otherwise loses all three.">
          Coaching the split
        </SectionTitle>
        <DataTable
          headers={['Path', 'What they need', 'What loses them']}
          rows={[
            [
              'Competitive',
              'Individual plans, periodised weeks, tournament scheduling with recovery built in, honest match review.',
              'Being drilled identically to the social group — and burnout from parents scheduling like it is a job.',
            ],
            [
              'Social',
              'Great sessions with friends, team competitions, visible improvement without ranking pressure.',
              'Being treated as failed competitive players. Social players fund clubs and become lifelong members — coach them like they matter, because they do.',
            ],
            [
              'Late starters',
              'Fast-tracked fundamentals using the same progression (orange, green) compressed into months, in age-appropriate groups.',
              'Being dropped into yellow-ball groups to drown, or parked with eight-year-olds to be humiliated.',
            ],
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="The mental game gets its first formal seat at yellow — these habits, taught now, last a career.">
          Competition craft
        </SectionTitle>
        <Checklist
          items={[
            'A between-point routine (breathe, decide, ready position) taught and rehearsed in practice sets — see the Mental Game module for the full framework.',
            'Match review by question, not verdict: what worked, what would you try differently, what will we train this week because of it.',
            'Losing protocols: shake hands properly, feel it for ten minutes, then find the lesson. Parents get this briefing too — the car ride home decides more careers than any coach.',
            'Realistic scheduling: one tournament level where they win about half their matches. All winning teaches nothing; all losing teaches quitting.',
            'Own equipment, own water, own warm-up by fourteen. Independence is a trained skill and referees notice the players who have it.',
          ]}
        />
        <Body className="mt-4">
          The yellow stage ends with a player who can train with adults, compete without a coach
          courtside, and — most importantly — still loves the game enough to keep choosing it.
          Every decision at this stage should be run through that last test.
        </Body>
      </Card>
    </>
  )
}
