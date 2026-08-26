import { Card, SectionTitle, Lead, Callout, CueGrid, StatRow } from '../../../components/dashboard/content/Blocks'
import Formations from './Formations'
import Net from './Net'
import Poaching from './Poaching'
import Returns from './Returns'
import Communication from './Communication'

// ─────────────────────────────────────────────────────────────────────────────
// DOUBLES TACTICS GUIDE
// Part keys match DOUBLES_CARDS in config/catalog.js.
// ─────────────────────────────────────────────────────────────────────────────

function Intro() {
  return (
    <div className="space-y-5">
      <Card>
        <SectionTitle sub="Three numbers that should reorganise how your team plays.">
          Doubles is a different sport
        </SectionTitle>
        <Lead>
          Doubles is not singles with company. The court is nine feet wider but each player covers
          half of it; the net is where points die; and the first four shots decide almost
          everything. Teams that internalise those three facts beat stronger hitters every
          weekend.
        </Lead>
        <div className="mt-4">
          <StatRow
            stats={[
              { value: '84%', label: 'of doubles winners are struck by the player at the net — 16% from the baseline' },
              { value: '81%', label: 'of points end within the first four shots: serve, return, and one ball each' },
              { value: '74%', label: 'of first-serve points are won by the serving team — protect first-serve percentage above all' },
            ]}
          />
        </div>
        <div className="mt-4">
          <Callout label="The one-line strategy">
            Get to the net before your opponents do, behind a first serve or a deep return —
            everything in this module is a route to that sentence.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle sub="Where each player stands before anyone swings — the grammar every part ahead builds on.">
          Positioning fundamentals
        </SectionTitle>
        <CueGrid
          cols={2}
          items={[
            {
              label: 'Server',
              value: 'Halfway between the centre mark and the sideline — wider than singles. The serve travels diagonally; the recovery is straight ahead to cover your half.',
            },
            {
              label: 'Server’s partner',
              value: 'Middle of the service box, slightly nearer the centre line than the alley. Close enough to threaten the middle; deep enough to cover the lob over your head.',
            },
            {
              label: 'Returner',
              value: 'On or inside the baseline, positioned to make the cross-court return the easy one. Against big servers, one step back buys time; against kickers, one step in beats the bounce.',
            },
            {
              label: 'Returner’s partner',
              value: 'On the service line, not glued to the net — your first job is reading whether the return clears the net player. Return succeeds: move in. Return sits up: turn and cover.',
            },
            {
              label: 'Move as a wall',
              value: 'Ball on your side, both shift that way; ball deep, both hold the line; partner pulled wide, you own the middle. Two players, one elastic band.',
            },
            {
              label: 'The middle is the money',
              value: 'Most winning shots in doubles travel through the centre window over the low part of the net. Attack the middle, defend the middle, argue later about the alleys.',
            },
          ]}
        />
      </Card>
    </div>
  )
}

export default {
  accent: '#a5b4fc',
  washFrom: '#1e1b4b',
  tagline:
    'Formations, net play, poaching, return games and communication — the patterns that beat better hitters.',
  Intro,
  parts: [
    {
      key: 'formations',
      minutes: 10,
      summary: 'Standard, Australian and I-formation — what each one is for and when to switch.',
      Component: Formations,
    },
    {
      key: 'net',
      minutes: 9,
      summary: 'Owning the front of the court: first volleys, angles, and covering the lob.',
      Component: Net,
    },
    {
      key: 'poaching',
      minutes: 9,
      summary: 'The intercept that wins games and plants doubt — reads, timing, and the fake.',
      Component: Poaching,
    },
    {
      key: 'returns',
      minutes: 9,
      summary: 'Breaking serve as a team: targets, the 80% rule, and return formations.',
      Component: Returns,
    },
    {
      key: 'communication',
      minutes: 8,
      summary: 'Calls, signals, and the between-point huddle that turns two players into a team.',
      Component: Communication,
    },
  ],
}
