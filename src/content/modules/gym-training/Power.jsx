import { Card, SectionTitle, Lead, Body, Callout, DataTable, TimeBlocks, FaultFix, Figure } from '../../../components/dashboard/content/Blocks'

export default function Power() {
  return (
    <>
      <Card>
        <SectionTitle>From strong to fast</SectionTitle>
        <Lead>
          Strength is how much force you can produce; power is how fast you can produce it. On
          court you get 100–200 milliseconds to use whatever force you own — a first step, a
          jump serve, a recovery push-off. Power training closes that gap with two tools: jumps
          for the lower body, medicine-ball throws for the rotational and overhead patterns. The
          research is encouraging for busy players: even one quality plyometric session per week
          measurably improves strength, power and serve velocity in young players.
        </Lead>
        <div className="mt-4">
          <Callout label="The iron law of power work">
            Every rep at maximum intent, every session ending while you are still fast. Eight
            explosive throws beat twenty tired ones — the moment reps slow down, the session is
            over. Power work is practiced, never ground out.
          </Callout>
        </div>
      </Card>

      <Card>
        <SectionTitle sub="A 3–4 kg medicine ball is the single best serve-speed investment in the gym.">
          Medicine-ball throws
        </SectionTitle>
        <div className="mb-4">
          <Figure
            src="/diagrams/gym/med-ball-power.webp"
            alt="Rotational medicine ball throw sequence against a wall"
            caption="The rotational throw: load the hips away from the wall, drive the back hip through, release at chest height. The sequence — ground, hip, trunk, arm — is the forehand’s kinetic chain with a scoreboard."
          />
        </div>
        <DataTable
          headers={['Throw', 'Sets × reps', 'What it builds']}
          rows={[
            [
              'Rotational throw',
              '3 × 5 / side',
              'Side-on to a wall, load the back hip, throw through the hips. Forehand and backhand drive.',
            ],
            [
              'Overhead slam',
              '3 × 6',
              'Ball overhead, full extension, slam through the floor. The serve’s downswing pattern under load.',
            ],
            [
              'Chest pass',
              '3 × 6',
              'Explosive push from the chest, stepping in. General upper-body speed and volley punch.',
            ],
            [
              'Scoop toss (granny throw)',
              '3 × 5',
              'Squat, then throw the ball up and back overhead for height. Total-body triple extension — the serve’s leg drive.',
            ],
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="Low volume, high quality, full recovery between sets — jumps are sprint work, not conditioning.">
          Jump training
        </SectionTitle>
        <DataTable
          headers={['Jump', 'Sets × reps', 'Focus']}
          rows={[
            [
              'Counter-movement jump',
              '3 × 5',
              'Dip fast, jump maximally, stick the landing quietly. The base vertical pattern.',
            ],
            [
              'Lateral bound',
              '3 × 4 / side',
              'Push sideways off one leg, land stable on the other, hold one second. The wide-forehand recovery push, isolated.',
            ],
            [
              'Split-squat jump',
              '2 × 4 / side',
              'Lunge stance, jump and switch softly. Court coverage strength at speed.',
            ],
            [
              'Low box drop + rebound',
              '2 × 5',
              'Step off a low box (30 cm), touch down, jump instantly. Teaches the elastic, minimal-contact bounce the split step uses. Add only after 6 weeks of the other jumps.',
            ],
          ]}
        />
      </Card>

      <Card>
        <SectionTitle sub="Twenty-five minutes, done fresh — before court practice or on its own day.">
          The power session
        </SectionTitle>
        <TimeBlocks
          blocks={[
            {
              time: '0–6 min',
              title: 'Ramp up',
              body: 'Easy skipping, leg swings, two progressively higher jumps, two easy throws. You should feel springy, not sweaty.',
            },
            {
              time: '6–14 min',
              title: 'Jumps',
              body: 'Counter-movement jumps, then lateral bounds. Full 90-second rests. Every jump measured against your best intent, not the clock.',
            },
            {
              time: '14–24 min',
              title: 'Throws',
              body: 'Rotational throws, then overhead slams or scoop tosses. Throw as if the wall owes you money; rest fully between sets.',
            },
            {
              time: '24–25 min',
              title: 'One sprint',
              body: 'Finish with 2 × 10 m from a split-step start. It stitches the session back to the court.',
            },
          ]}
        />
      </Card>

      <Card>
        <SectionTitle>Common mistakes</SectionTitle>
        <FaultFix
          items={[
            {
              fault: 'Turning power work into cardio',
              fix: 'Circuits with 30-second rests train fatigue, not speed. Rest 90 seconds minimum; the quality of each rep is the entire point.',
            },
            {
              fault: 'Heavy medicine balls',
              fix: 'Above 4 kg the throw slows down and the pattern stops matching a swing. Lighter and faster carries; heavier and slower does not.',
            },
            {
              fault: 'Plyometrics on concrete, cold',
              fix: 'Jumps belong on a court, track or gym floor after a real warm-up. Achilles and patellar tendons pay for shortcuts here.',
            },
            {
              fault: 'Skipping strength to chase power',
              fix: 'Power is strength expressed quickly — with nothing underneath, jumps plateau in a month. Run Part 1 alongside, always.',
            },
          ]}
        />
        <Body className="mt-4">
          Benchmark monthly: standing broad jump, a rotational throw for distance, and a 10-metre
          sprint timed on your phone. Three numbers, first session of every month — power you do
          not measure is power you cannot see arriving.
        </Body>
      </Card>
    </>
  )
}
