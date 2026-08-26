import { Card, SectionTitle, Lead, Body, Callout, DataTable, CueGrid, FaultFix } from '../../../components/dashboard/content/Blocks'

export default function Prevention() {
  return (
    <>
      <Card>
        <SectionTitle>Availability is the first ability</SectionTitle>
        <Lead>
          The best training program is the one injury never interrupts. Tennis overloads the same
          tissue every session — the serving shoulder decelerates thousands of internal rotations,
          the elbow absorbs every off-centre contact, the trunk and hips take asymmetric rotation
          all match. Prevention work targets exactly those sites, and the evidence is unusually
          strong: combined kinetic-chain, core-stability and eccentric rotator-cuff programs cut
          overuse problems by roughly a quarter in tennis players while preserving shoulder range.
        </Lead>
        <div className="mt-4">
          <Callout label="The paradox worth knowing">
            Studies of elite players keep finding weak, even visibly atrophied, infraspinatus
            muscles in the serving shoulder — the very muscle that brakes the serve. High-level
            tennis does not strengthen the decelerators; it drains them. Nobody gets this work
            from playing. It has to be added, deliberately, forever.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle sub="Every exercise needs only a light resistance band and 12 minutes. Do it daily, or at minimum every training day.">
          The daily dozen minutes
        </SectionTitle>
        <DataTable
          headers={['Exercise', 'Dose', 'Cue']}
          rows={[
            [
              'Band external rotation',
              '2 × 15 / arm',
              'Elbow pinned to the ribs, rotate the forearm out slowly — three seconds out, three back. The eccentric half is the medicine.',
            ],
            [
              'Band W-raise',
              '2 × 12',
              'Elbows bent, squeeze the shoulder blades down and together into a W. Wakes the mid-back that holds serving posture.',
            ],
            [
              'Sleeper stretch',
              '3 × 30 s / side',
              'Side-lying, shoulder and elbow at 90°, gently press the forearm toward the floor. Restores the internal rotation serving steals.',
            ],
            [
              'Wrist extensor eccentric',
              '2 × 12 / arm',
              'Light dumbbell, palm down; lift the wrist with help, lower alone for four slow seconds. The proven tennis-elbow vaccine.',
            ],
            [
              'Side plank + reach',
              '2 × 30 s / side',
              'Stacked, hips tall, thread the top arm under and back. Lateral trunk endurance — the anti-collapse muscle for open-stance hitting.',
            ],
            [
              'Single-leg calf raise',
              '2 × 12 / leg',
              'Full range, slow down phase, off a step. Achilles capacity for ten thousand split steps a season.',
            ],
          ]}
        />
      </Card>

      <Card>
        <SectionTitle>Know your load</SectionTitle>
        <CueGrid
          cols={2}
          items={[
            {
              label: 'Spike rule',
              value: 'Injuries follow sudden jumps in workload. Adding a tournament week? Trim practice volume that week. The body tolerates a lot — gradually.',
            },
            {
              label: 'Serve counting',
              value: 'The shoulder tracks serves the way a pitcher’s tracks pitches. Big serving day yesterday means technique or return practice today, not another basket of serves.',
            },
            {
              label: 'Surface switches',
              value: 'First week on clay after months of hard courts (or the reverse) is a classic injury window. Halve the intensity for three sessions while tissues re-learn the surface.',
            },
            {
              label: 'Growth spurts',
              value: 'For juniors: rapid growth phases make tendons and attachment points temporarily fragile. Volume down, technique focus up — the spurt passes, the habit of listening stays.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle>Warning signs, ranked</SectionTitle>
        <FaultFix
          items={[
            {
              fault: 'Stiffness that fades once warm',
              fix: 'Amber. Train, but flag it: this is where overuse stories begin. Double the prevention dose for that area and watch it for a week.',
            },
            {
              fault: 'Pain that changes your technique',
              fix: 'Red. The compensation will injure something else within weeks. Stop loading the pattern and get it assessed — a shortened layoff now beats a long one later.',
            },
            {
              fault: 'Night pain or pain at rest',
              fix: 'Full stop. Tissue that complains without load is asking for professional help, not another band routine.',
            },
            {
              fault: '“It’s just tennis elbow, it always goes away”',
              fix: 'Untreated, it averages 6–24 months of on-off pain. The eccentric wrist work above resolves most cases in 8–12 weeks. Boring, proven, worth it.',
            },
          ]}
        />
        <Body className="mt-4">
          One habit ties this whole part together: the two-minute morning scan. Shoulder, elbow,
          knees, back — anything above a two out of ten gets its prevention exercise doubled that
          day. Players who listen at volume two never have to hear volume eight.
        </Body>
      </Card>
    </>
  )
}
