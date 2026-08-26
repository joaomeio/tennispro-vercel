import { Card, SectionTitle, Lead, Body, Callout, CueGrid, StepList, FaultFix, TimeBlocks, Figure } from '../../../components/dashboard/content/Blocks'

export default function SliceServe() {
  return (
    <>
      <Card>
        <SectionTitle>The tool serve</SectionTitle>
        <Lead>
          The slice serve spins sideways — the strings cut around the outside of the ball and send
          it curving through the air like a frisbee, skidding low and kicking away on the bounce.
          It is the highest-percentage attacking serve in tennis: more margin than a flat serve,
          more immediate damage than a kick. If you master one serve from this module first, make
          it this one.
        </Lead>
        <div className="mt-4">
          <Callout label="Why it wins">
            The wide slice in the deuce court (right-hander) drags the returner beyond the
            doubles alley to make contact. Even a good return leaves the entire ad court open for
            your next ball. You are not trying to ace — you are moving a person off the court
            with one swing.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle>Contact and feel</SectionTitle>
        <CueGrid
          items={[
            {
              label: 'Contact',
              value: 'Picture the ball as a clock face: the strings strike at 3 o’clock (right-hander), cutting around the outside edge rather than through the back.',
            },
            {
              label: 'Toss',
              value: 'A touch further toward the hitting side than the flat serve — it puts the outside of the ball where the swing naturally travels.',
            },
            {
              label: 'Swing path',
              value: 'Out and around, edge leading slightly, like carving a bottle cap off. The follow-through crosses the body lower than the flat serve’s.',
            },
          ]}
        />
        <div className="mt-4">
          <Figure
            src="/diagrams/serve/contact-clock.webp"
            alt="Clock-face contact points for flat, slice and kick serves"
            caption="Contact on the clock face: flat strikes through 12, slice cuts around 3, kick brushes from 7 up to 1. Three serves, one motion — only the strings’ path across the ball changes."
          />
        </div>
        <Body className="mt-4">
          The ball should visibly curve in the air — right to left for a right-hander — and stay
          low off the bounce. On fast or slick courts the skid is severe, which is why the slice
          into the body is such an effective surprise: it chases the returner’s hip and refuses
          to sit up into their strike zone.
        </Body>
      </Card>

      <Card>
        <SectionTitle>The three slice plays</SectionTitle>
        <StepList
          steps={[
            {
              title: 'Deuce wide — the classic',
              body: 'Curve it away from the right-hander’s forehand into the alley. Returner stretches, you step inside the baseline and drive the next ball into the open ad court before they recover.',
            },
            {
              title: 'Into the body — the jam',
              body: 'Aim the curve at the returner’s hitting hip. The ball follows them as they try to clear space, cramping the swing. Expect a floating reply — be ready to move forward onto it.',
            },
            {
              title: 'Ad T — the sneak',
              body: 'From the ad court a slice down the T slides away from a right-hander’s backhand toward the centre, an awkward, skidding ball on the point where most returners cheat wide.',
            },
          ]}
        />
        <div className="mt-4">
          <Callout label="Left-handers">
            Everything mirrors — and gets nastier. The lefty slice swings into the ad court,
            dragging right-handed returners wide on their backhand on the most important points
            (30–40, ad-out land in the ad court). It is the single biggest structural advantage a
            left-handed server owns; build the whole serving identity around it.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle>Faults and fixes</SectionTitle>
        <FaultFix
          items={[
            {
              fault: 'No curve — it just goes slower',
              fix: 'You are still hitting the back of the ball. Exaggerate: try to miss the box sideways with pure sidespin for ten serves, then dial back to 3 o’clock.',
            },
            {
              fault: 'Ball curves but lands short',
              fix: 'All spin, no drive. Keep the leg drive and full extension of the flat serve — the slice is a full-speed swing with a different contact, not a slower swing.',
            },
            {
              fault: 'Toss gives the serve away',
              fix: 'If your slice toss is a foot further right than your flat toss, good returners read it. Narrow the difference until both tosses look identical from across the net.',
            },
            {
              fault: 'Slice sits up and gets punished',
              fix: 'Contact is drifting toward 2 o’clock — half slice, half flat. Commit to cutting around the outside edge; a true slice stays below the returner’s shoulders.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="The slice rewards target practice more than any other serve — the curve needs calibrating, not muscling.">
          Practice block
        </SectionTitle>
        <TimeBlocks
          blocks={[
            {
              time: '0–4 min',
              title: 'Carve for shape',
              body: 'Ten serves, deuce court, half pace. Only goal: visible right-to-left curve. Land anywhere in the box — you are calibrating spin, not placement.',
            },
            {
              time: '4–10 min',
              title: 'Cone hunt, deuce wide',
              body: 'A cone one racket-length inside the sideline, on the service line. Ten slice serves chasing it at 70%. Track your best streak, try to beat it next session.',
            },
            {
              time: '10–15 min',
              title: 'Wide-then-open pattern',
              body: 'Serve wide slice, a partner (or imagination) returns to the middle; play the +1 into the open ad court. The serve only counts if the next ball wins the space it created.',
            },
            {
              time: '15–18 min',
              title: 'Body jam finisher',
              body: 'Six slice serves at the returner’s hip from each court. Watch how late the ball chases them — this is your tiebreak surprise, keep it sharp.',
            },
          ]}
        />
      </Card>
    </>
  )
}
