import { Card, SectionTitle, Lead, Body, Callout, CueGrid, Checklist } from '../../../components/dashboard/content/Blocks'

export default function Mindset() {
  return (
    <>
      <Card>
        <SectionTitle>Playing to win vs playing not to lose</SectionTitle>
        <Lead>
          Every player owns two operating modes. Playing to win: choosing your patterns, taking
          the court position, accepting misses as the cost of pressure applied. Playing not to
          lose: pushing returns, aiming nowhere, waiting for the opponent’s error while your feet
          go quiet. The modes produce different swings from the same technique — and under
          pressure, every player drifts toward the second one. The competitor’s craft is noticing
          the drift and steering back.
        </Lead>
        <div className="mt-4">
          <Callout label="The tell">
            Your swing length is the honest gauge. When follow-throughs shorten and second serves
            float, you have switched modes — no matter what you tell yourself. The fix is
            physical: full swings to big targets, feet moving, first strike intention on the next
            return. Mode is recovered through the body, not through willpower.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle>The competitor’s positions</SectionTitle>
        <CueGrid
          cols={2}
          items={[
            {
              label: 'Respect everyone, fear no one',
              value: 'Fear dresses up as respect (“they’re too good”) and as arrogance (“I should crush this player”). Both surrender the match to the ranking instead of the tennis. Play the ball, not the reputation.',
            },
            {
              label: 'Problems are the game',
              value: 'The lefty spin, the wind, the moonballer — competitive tennis IS problem-solving under stress. Players who treat problems as unfair play worse than players who treat them as the sport.',
            },
            {
              label: 'Score amnesia, both directions',
              value: 'At 5–2 up the danger is coasting; at 2–5 down it is surrender. The competitor plays the same point at every score — the current one, on its own terms.',
            },
            {
              label: 'Win ugly, gladly',
              value: 'Some days the forehand is absent and the win is 90 pushed backhands and every ball run down. Finding a way with what showed up today is the highest competitive skill there is.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="Identity is the deepest layer — the sentences underneath the routines, the self-talk and the goals.">
          The identity audit
        </SectionTitle>
        <Checklist
          items={[
            'I compete for every point of every match — the one behaviour fully in my control, available on my worst day.',
            'My worth is not the scoreboard: I can lose a final and have improved, win a round and have regressed. The log knows; the draw does not.',
            'Nerves mean I care, and I have trained what to do with them — routines, breath, patterns. Arriving nervous is arriving ready.',
            'Opponents are colleagues in the problem — they bring the pressure I need to become the player I am building. A rival is a gift with a ranking.',
            'I would rather lose my way than win someone else’s — my game, sharpened, will beat more players next year than borrowed tennis wins today.',
          ]}
        />
        <Body className="mt-4">
          Read the audit before tournaments — not as affirmation theatre, but as a standard to
          play toward. Mindset is the module’s last part because it is the slowest to build and
          the hardest to lose: routines carry a bad set, but identity carries a bad season. Build
          it in training, one competed point at a time.
        </Body>
      </Card>
    </>
  )
}
