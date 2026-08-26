import { Card, SectionTitle, Lead, Callout, StatRow } from '../../../components/dashboard/content/Blocks'
import Focus from './Focus'
import Pressure from './Pressure'
import Routine from './Routine'
import SelfTalk from './SelfTalk'
import Confidence from './Confidence'
import Errors from './Errors'
import Goals from './Goals'
import Mindset from './Mindset'

// ─────────────────────────────────────────────────────────────────────────────
// MENTAL GAME MASTERY
// Part keys match MENTAL_CARDS in config/catalog.js.
// ─────────────────────────────────────────────────────────────────────────────

function Intro() {
  return (
    <div className="space-y-5">
      <Card>
        <SectionTitle sub="The most trainable skill in tennis is the one almost nobody trains.">
          Why the mental game is a skill, not a gift
        </SectionTitle>
        <Lead>
          A tennis match lasts two hours; the ball is in play for around twenty minutes. The rest
          — most of the match — is you alone with your thoughts between points, and that is where
          matches are actually won and lost. Sport-psychology research is unambiguous: structured
          mental training programs measurably improve junior players’ self-confidence and reduce
          competitive anxiety, using teachable skills — routines, self-talk, imagery, arousal
          control and goal setting. This module turns each into practice-court material.
        </Lead>
        <div className="mt-4">
          <StatRow
            stats={[
              { value: '~80%', label: 'of match time happens between points — the part of tennis nobody drills' },
              { value: '16 s', label: 'the between-point window Jim Loehr mapped into a four-stage recovery routine' },
              { value: '5', label: 'trainable skills in validated mental-training programs: goals, self-talk, routines, arousal control, imagery' },
            ]}
          />
        </div>
        <div className="mt-4">
          <Callout label="How to use these eight parts">
            Read Part 3 (Pre-Match Routine) and Part 6 (After Errors) first — they give the
            fastest wins. Then add one skill at a time to practice sets for two weeks before
            taking it into tournaments. Mental skills obey training law like forehands do: what
            is not rehearsed under mild pressure does not survive real pressure.
          </Callout>
        </div>
      </Card>
    </div>
  )
}

export default {
  accent: '#c4b5fd',
  washFrom: '#2e1065',
  tagline:
    'Eight trainable skills — focus, pressure, routines, self-talk, confidence, error recovery, goals and competing — each on its own page.',
  Intro,
  parts: [
    { key: 'focus', minutes: 8, summary: 'What concentration actually is, and the drills that stretch it.', Component: Focus },
    { key: 'pressure', minutes: 9, summary: 'Big points, tight scores — playing well when it matters most.', Component: Pressure },
    { key: 'routine', minutes: 9, summary: 'The 16-second between-point reset and the pre-match hour, scripted.', Component: Routine },
    { key: 'self-talk', minutes: 8, summary: 'Coaching the voice in your head — instruction beats judgement.', Component: SelfTalk },
    { key: 'confidence', minutes: 8, summary: 'Belief built from evidence, not mood — and how to protect it.', Component: Confidence },
    { key: 'errors', minutes: 8, summary: 'The reset: ending one point before the next one starts.', Component: Errors },
    { key: 'goals', minutes: 8, summary: 'Process over outcome — goal setting that survives losing.', Component: Goals },
    { key: 'mindset', minutes: 9, summary: 'The competitor’s identity: playing to win against playing not to lose.', Component: Mindset },
  ],
}
