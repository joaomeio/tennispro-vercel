import { Card, SectionTitle, Lead, Body, Callout, CueGrid, StepList, FaultFix, Figure } from '../../../components/dashboard/content/Blocks'

export default function Kick() {
  return (
    <>
      <Card>
        <SectionTitle>The professional second serve</SectionTitle>
        <Lead>
          The kick serve is heavy topspin — the strings brush up the back of the ball from roughly
          7 o’clock to 1 o’clock, sending it high over the net in an arc that dives into the box
          and bounces up at the returner’s shoulder. It is simultaneously the safest serve in
          tennis (biggest net clearance, most margin) and one of the hardest to attack. That
          combination is why every professional builds their second serve on it.
        </Lead>
        <div className="mt-4">
          <Figure
            src="/diagrams/serve/kick-bounce.webp"
            alt="Side view of kick serve trajectory arcing over the net and bouncing high"
            caption="The kick’s geometry: topspin buys 1–2 metres of net clearance, drops the ball inside the service line, then kicks it up and away — into the backhand shoulder of a right-handed returner."
          />
        </div>
      </Card>

      <Card>
        <SectionTitle>The two non-negotiables</SectionTitle>
        <CueGrid
          cols={2}
          items={[
            {
              label: 'The toss',
              value: 'Above the head or slightly behind it, toward the non-hitting shoulder — noticeably further back than flat or slice. Hold the ball a beat longer on release and it lands there naturally. This is the single most common thing to fix.',
            },
            {
              label: 'The brush',
              value: 'The racket travels low-to-high across the ball face, 7 → 1 o’clock, with the racket edge leading upward. The spin comes from the whole arm accelerating across the ball — the wrist snap is the finish, never the source.',
            },
          ]}
        />
        <div className="mt-4">
          <Callout label="The feel to chase">
            Toss a ball above your head and try to make it spin end-over-end by brushing up its
            back with your strings — no target, no box, just spin. When the ball leaves your
            strings climbing and rotating hard, you have found the kick contact. Everything else
            in this part is that feeling with legs under it.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle sub="Four weeks from first feel to match pace. Do not skip stages — players who jump to full speed revert to flat pushing the moment a match gets tight.">
          Building it, step by step
        </SectionTitle>
        <StepList
          steps={[
            {
              title: 'Fix the toss against a fence',
              body: 'Stand sideways with your back near a fence. Toss for the kick: the ball should peak above or behind your head without touching the fence. Twenty tosses a day until it lands there blind.',
            },
            {
              title: 'Find the brush from the knees',
              body: 'Kneel on the baseline (hitting-side knee down) and serve with pure brush — the position removes the legs and forces the low-to-high path. The ball should clear the net in a visible arc with heavy spin.',
            },
            {
              title: 'Groove at 30% pace, standing',
              body: 'Twenty serves at one-third speed. Watch the flight: high arc, steep drop, ball landing deep in the box and jumping. Slow with spin beats fast and flat at this stage — count spin quality, not misses.',
            },
            {
              title: 'Add speed one notch a week',
              body: 'Week one 30%, week two 50%, week three 70%, week four match pace. If the arc flattens at any stage, the toss has crept forward — go back one notch and re-set it.',
            },
            {
              title: 'Test it where it will live',
              body: 'Play practice points where every second serve must be a kick, and start games at 0–30. Trust under scoreboard pressure is trained, not hoped for — if it only works relaxed, it does not work.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle>Where the kick does damage</SectionTitle>
        <Body>
          The kick’s target is almost always the returner’s backhand shoulder. From the ad court
          (right-hander serving to right-hander) that means wide; from the deuce court it means the
          T. Against a two-handed backhand the ball climbing above shoulder height forces contact
          outside the comfortable strike zone; against a one-hander it is outright brutal. On clay
          and slow hard courts the bounce grows another half metre — the kick is the serve that
          gets better as courts get slower. The one returner it feeds: a player who camps three
          metres behind the baseline and takes it on the drop. Against those, mix in the body slice
          from Part 2 to pull them forward.
        </Body>
      </Card>

      <Card>
        <SectionTitle>Faults and fixes</SectionTitle>
        <FaultFix
          items={[
            {
              fault: 'It spins but doesn’t kick',
              fix: 'Toss has drifted in front — the brush becomes forward, not upward. Re-run the fence drill; the kick lives behind your head.',
            },
            {
              fault: 'Constant netting',
              fix: 'You are decelerating to “guide” it in. The kick needs a faster swing than the flat serve, not slower — commit to full racket-head speed and let the spin bring it down.',
            },
            {
              fault: 'Arc but the ball lands short and sits',
              fix: 'Legs have left the movement. Reload the 30–40° knee bend and drive up through contact; depth comes from the legs, spin from the brush.',
            },
            {
              fault: 'Lower-back soreness after kick sessions',
              fix: 'Too much back arch compensating for a toss that is too far behind. Bring the toss to directly overhead and get the bend from the knees, not the spine. Cap kick practice at 40 balls a session while learning.',
            },
            {
              fault: 'Trying to kick with the wrist',
              fix: 'The classic. The whole arm accelerates across the ball; the wrist only finishes what the arm started. Re-visit the kneeling drill until the arm path is automatic.',
            },
          ]}
        />
      </Card>
    </>
  )
}
