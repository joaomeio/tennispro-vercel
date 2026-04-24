import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

const TABS = [
  { id: 'positioning', label: 'Positioning' },
  { id: 'formations', label: 'Formations' },
  { id: 'net-game', label: 'Net Game' },
  { id: 'return', label: 'Return of Serve' },
  { id: 'communication', label: 'Communication' },
]

function PositioningTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">Court Positioning — The Foundation of Doubles</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          Doubles is fundamentally a geometry game. Where you stand on the court determines which shots are available to your opponents and which angles are open to you. Most amateur doubles is lost — not through bad shots — but through passive, incorrect positioning that creates unnecessary vulnerabilities.
        </p>
        <div className="bg-indigo-50 rounded-xl p-4 border-l-4 border-indigo-500">
          <p className="text-indigo-800 font-semibold text-sm">The goal of doubles positioning: make the opponents hit to a place you already cover. Every step you take should close an angle, not create one.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">The Four Court Positions</h3>
        <div className="space-y-4">
          {[
            {
              position: 'Both Up — At the Net',
              color: 'bg-green-50 border-green-200',
              badge: 'Offensive',
              badgeColor: 'bg-green-600',
              desc: 'The dominant offensive position. Both players at the service line or closer, controlling the court with volleys. Forces opponents to hit perfect passing shots or lobs to win points.',
              when: 'After you land a deep approach shot, after a strong serve + volley, or after transitioning from any short ball.',
              danger: 'Vulnerable to lobs. Both players must immediately recognize a lob and one splits to cover.',
            },
            {
              position: 'One Up, One Back',
              color: 'bg-blue-50 border-blue-200',
              badge: 'Neutral',
              badgeColor: 'bg-blue-600',
              desc: 'The default formation for most rallies. Server starts at the baseline, net partner at the net. This is the starting formation, not a permanent state — always look to transition.',
              when: 'During groundstroke exchanges while looking for a short ball to approach.',
              danger: 'The middle is often exposed. Net player must be active, not passive. If you\'re just standing at the net, you\'re decoration.',
            },
            {
              position: 'Both Back',
              color: 'bg-amber-50 border-amber-200',
              badge: 'Defensive',
              badgeColor: 'bg-amber-600',
              desc: 'A defensive reset position used when the net has been lost. Both players retreat to the baseline to neutralize an aggressive net team.',
              when: 'After a lob is hit and both players are out of position, or when the net team has clearly established dominance.',
              danger: 'You cannot win from both back. Use it to reset and immediately look to transition back to one up, one back.',
            },
            {
              position: 'I-Formation Setup',
              color: 'bg-purple-50 border-purple-200',
              badge: 'Tactical',
              badgeColor: 'bg-purple-600',
              desc: 'The net player crouches low at the center of the service box (T-position) while the server can go either direction after serving. A deliberate pattern-breaking tactic.',
              when: 'Against returners who have established a dominant cross-court return pattern. Forces them to re-think.',
              danger: 'Requires clear pre-serve communication and practiced movement — otherwise it creates confusion for your own team.',
            },
          ].map(({ position, color, badge, badgeColor, desc, when, danger }) => (
            <div key={position} className={`rounded-xl border p-5 ${color}`}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <h4 className="font-bold text-slate-900 text-sm">{position}</h4>
                <span className={`${badgeColor} text-white text-[9px] font-black px-2 py-0.5 rounded shrink-0 uppercase tracking-wider`}>{badge}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">{desc}</p>
              <p className="text-xs text-slate-700 mb-1"><span className="font-semibold">When to use: </span>{when}</p>
              <p className="text-xs text-rose-700"><span className="font-semibold">Watch out: </span>{danger}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-3">Stacking</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          Stacking means positioning both players on the same side of the court during the serve, then moving to preferred positions after the serve. Used to keep the stronger player's forehand in the middle, or to force a specific return.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { scenario: 'Two left-handers', reason: 'Stack so both forehands cover the middle — creates the strongest possible coverage of the center corridor.' },
            { scenario: 'Strong forehand player', reason: 'Stack so the dominant forehand is always in the center of the court, not pushed to the sidelines.' },
            { scenario: 'Return team vs. weak backhand', reason: 'Stack to force the serve to go to the weaker shot, then have the better returner covering the stronger cross-court return side.' },
            { scenario: 'Breaking opponent pattern', reason: 'Use stacking late in a match when opponents have established a comfortable return routine — the unfamiliar position breaks their rhythm.' },
          ].map(({ scenario, reason }) => (
            <div key={scenario} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="font-semibold text-slate-900 text-xs mb-2">{scenario}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FormationsTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">Serve Formations & Patterns</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          Elite doubles teams don't just serve and react — they execute pre-planned formations that dictate the entire point from the first ball. Understanding and using formations converts your serve game from reactive to proactive.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Standard Formation (Default)</h3>
        <p className="text-slate-500 text-xs leading-relaxed mb-4">
          Server at baseline, net player positioned halfway between the center service line and the singles sideline, roughly at the service line. This is where all doubles starts. The net player's job is to poach on weak returns — not to stand still.
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { role: 'Server', job: 'Serve with purpose — target T, body, or wide. Have a plan for the first ball after the return lands.' },
            { role: 'Net Partner', job: 'Watch the returner\'s contact point. Move forward if the return is weak. Poach if a cross-court return is predictable.' },
            { role: 'Both together', job: 'If return goes cross-court to server, net partner shifts slightly toward middle. If return goes down the line, net partner moves toward sideline.' },
          ].map(({ role, job }) => (
            <div key={role} className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
              <p className="font-bold text-indigo-800 text-xs mb-2">{role}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{job}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">I-Formation</h3>
        <p className="text-slate-500 text-xs leading-relaxed mb-4">
          The I-formation is one of the most effective pattern-disrupting tools in doubles. The net player crouches at the center strap (T-position) and signals before the serve which direction they'll move after the serve is struck.
        </p>
        <div className="space-y-3">
          {[
            { step: 'Pre-serve signal', detail: 'Net player signals with fingers behind the back (out of returner\'s sight): 1 finger = going right, 2 fingers = going left, fist = staying.' },
            { step: 'Server adjusts', detail: 'Server commits to serving cross-court (opposite of net player\'s movement) to cover the court after the net player moves.' },
            { step: 'Execution', detail: 'On the serve, net player moves immediately to the pre-signaled direction. Server covers the opposite half. The returner must hit past a closing net player.' },
            { step: 'Why it works', detail: 'It forces the returner to make a decision under time pressure with an unusual visual — the net player\'s movement right at contact forces errors or high balls.' },
          ].map(({ step, detail }, i) => (
            <div key={step} className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
              <div>
                <p className="text-sm font-semibold text-slate-800 mb-0.5">{step}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Australian Formation</h3>
        <p className="text-slate-500 text-xs leading-relaxed mb-4">
          The Australian formation means the net player stands on the same side as the server (instead of the diagonal). This forces the returner to hit down the line if they want to avoid the net player — a much lower percentage shot.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
            <p className="font-bold text-teal-800 text-sm mb-2">When to use it</p>
            <ul className="space-y-1">
              {['Opponent has a dominant cross-court return that\'s winning points', 'You want to force them to hit a low-percentage down-the-line return', 'Early in a new set to change the pattern'].map(p => (
                <li key={p} className="flex items-start gap-1.5 text-xs text-slate-600"><div className="w-1 h-1 rounded-full bg-teal-500 mt-1.5 shrink-0" />{p}</li>
              ))}
            </ul>
          </div>
          <div className="bg-rose-50 rounded-xl p-4 border border-rose-100">
            <p className="font-bold text-rose-800 text-sm mb-2">Coverage responsibility</p>
            <ul className="space-y-1">
              {['Net player covers the entire side they\'re standing on', 'Server must cover the entire opposite side after the serve', 'Clear communication about who covers the middle is essential'].map(p => (
                <li key={p} className="flex items-start gap-1.5 text-xs text-slate-600"><div className="w-1 h-1 rounded-full bg-rose-500 mt-1.5 shrink-0" />{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function NetGameTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">Net Game Mastery</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          Winning doubles teams dominate the net. Not by standing there — by actively intercepting balls, creating angles, and making the baseline player feel like every shot will be picked off. The net player's activity level changes everything about how a doubles match is played.
        </p>
        <div className="bg-indigo-50 rounded-xl p-4 border-l-4 border-indigo-500">
          <p className="text-indigo-800 font-semibold text-sm">An active net player who poaches once every three service games is three times more effective than one who poaches every game but telegraphs it. Unpredictability is the weapon.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Poaching — Decision Making</h3>
        <div className="space-y-3">
          {[
            { signal: 'Return that floats up or is hit softly', action: 'Move immediately — this is a makeable volley. Hesitation on floating returns is the most costly mistake.' },
            { signal: 'Return aimed cross-court (predictable)', action: 'Step across to intercept. If you\'ve seen this cross-court return pattern 3+ times, it\'s time to poach.' },
            { signal: 'Returner\'s racket face opens up (indicating cross-court)', action: 'Read the racket face — start moving before the ball is even struck. Anticipation beats reaction.' },
            { signal: 'After you\'ve been beaten down the line', action: 'Don\'t stop poaching. Start faking the poach instead — the fake itself can pull the returner into errors.' },
          ].map(({ signal, action }) => (
            <div key={signal} className="border border-slate-100 rounded-xl p-4">
              <p className="text-xs text-slate-700 mb-1"><span className="font-semibold">Signal: </span>{signal}</p>
              <p className="text-xs text-indigo-700 font-medium">→ {action}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Volleys at the Net</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { type: 'Punch Volley', desc: 'Short, firm punch through the ball — no backswing. Aim for the feet of the opposing net player or the open court. The most common net volley.', key: 'Keep the wrist firm, contact in front of the body at all times.' },
            { type: 'Drop Volley', desc: 'A soft touch volley that lands short in the service box, often unreachable for the opposing baseline player. High-reward when both opponents are deep.', key: 'Absorb the pace by loosening the grip slightly at contact. Opens the face early.' },
            { type: 'Half Volley', desc: 'The shot you hit when the ball catches you between positions — half-way between a volley and a groundstroke. Stay low, soft hands.', key: 'Don\'t panic — stay low and play it out in front. Half-volleys deep and centrally keep you in the point.' },
            { type: 'Overhead', desc: 'The lob answer. Step back, non-dominant hand up pointing to the ball, scissor-kick or rotate into position. Aim for the open court or directly at the net player\'s feet.', key: 'Most overhead errors happen from wrong positioning, not swing errors. Judge the depth first.' },
          ].map(({ type, desc, key }) => (
            <div key={type} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="font-bold text-slate-900 text-sm mb-2">{type}</p>
              <p className="text-xs text-slate-600 leading-relaxed mb-2">{desc}</p>
              <p className="text-xs text-indigo-700 font-medium">Key: {key}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-3">Lob Coverage System</h3>
        <p className="text-slate-500 text-xs leading-relaxed mb-4">
          When a lob is hit over the net team, most amateur teams freeze. Professional teams have a pre-set system.
        </p>
        <div className="space-y-3">
          {[
            { rule: 'The player closest to the lob calls it', detail: '"Mine!" takes priority. If no call is made, the player on the same side as the lob takes it.' },
            { rule: 'The other player moves to cover the net', detail: 'While one player chases the lob, the partner covers the net — or also retreats if the lob is over both players.' },
            { rule: 'If you can\'t reach the lob cleanly, lob it back', detail: 'Trying a hero shot from a defensive position on a deep lob loses points. Reset with your own lob and re-establish.' },
            { rule: 'After a lob chase, switch sides immediately', detail: 'Once the lob is retrieved, both players should transition back to their preferred positions — don\'t stay on the wrong side.' },
          ].map(({ rule, detail }, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
              <div>
                <p className="text-xs font-semibold text-slate-800 mb-0.5">{rule}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ReturnTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">Return of Serve</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          The return game is where most doubles matches are won or lost. Breaking serve requires the return team to neutralize the net player, create errors, or produce winners on return. Understanding exactly how to neutralize the net player changes your break opportunities dramatically.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">The 3 Return Targets</h3>
        <div className="space-y-3">
          {[
            {
              target: 'Cross-court at the server\'s feet',
              rating: 'High percentage',
              ratingColor: 'text-green-600 bg-green-50',
              desc: 'The safest and most common return — sends the ball to the baseline player and avoids the net player entirely. Aim low over the net to force an upward volley or approach.',
              use: 'Default return when the net player is stationary. Creates time and forces the server to play from a neutral position.',
            },
            {
              target: 'Down the line at the net player',
              rating: 'High reward, lower %',
              ratingColor: 'text-amber-600 bg-amber-50',
              desc: 'Hitting past or through the net player down the line. This is the highest percentage when the net player is actively poaching cross-court. Use it as a counter-pattern.',
              use: 'When the net player has poached cross-court twice or more. One down-the-line return stops poaching for the rest of the set.',
            },
            {
              target: 'Lob over the net player',
              rating: 'Pattern breaker',
              ratingColor: 'text-indigo-600 bg-indigo-50',
              desc: 'A topspin lob over the net player that forces the server (who has advanced to net) to retreat under pressure. Highly effective against serve-and-volley teams.',
              use: 'When both players have established themselves at the net, or as a surprise 2–3 times per set to keep them guessing.',
            },
          ].map(({ target, rating, ratingColor, desc, use }) => (
            <div key={target} className="border border-slate-100 rounded-xl p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="font-bold text-slate-900 text-sm">{target}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded shrink-0 ${ratingColor}`}>{rating}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-2">{desc}</p>
              <p className="text-xs text-indigo-700 font-medium">Use when: {use}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Return Partner — What to Do</h3>
        <p className="text-slate-500 text-xs leading-relaxed mb-4">
          The non-returning player positions at the service line while their partner returns. This is not a passive role.
        </p>
        <div className="space-y-3">
          {[
            { action: 'If the return goes cross-court and is good', do: 'Move forward toward the net immediately. Your team should transition to both-up.' },
            { action: 'If the return is short or weak', do: 'Stay at the service line — the server may approach. Be ready to retreat to protect the lob.' },
            { action: 'If the return goes down the line', do: 'Move toward the center T. Your partner has hit past the net player and you both should advance.' },
            { action: 'After a lob return goes deep', do: 'Both players advance — the opposing team is retreating. Move in behind the lob.' },
          ].map(({ action, do: doAction }, i) => (
            <div key={i} className="flex gap-3 border border-slate-100 rounded-xl p-3">
              <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
              <div>
                <p className="text-xs font-semibold text-slate-800 mb-0.5">{action}</p>
                <p className="text-xs text-slate-500">→ {doAction}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-3">Breaking a Strong Serve Team</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { tactic: 'Chip and charge', note: 'Chip the return low at the net player\'s feet and charge the net behind it. Forces a defensive half-volley from the server.' },
            { tactic: 'Lob the net player early', note: 'Even one successful lob over the net player in game 1 plants doubt for the rest of the set.' },
            { tactic: 'Stand inside the baseline', note: 'Move inside the baseline to take time away from a strong server. Works especially well against heavy topspin serves.' },
            { tactic: 'Target the weaker server', note: 'Hold your best return game for the weaker server. Play solid maintenance returns against the strong server. Save energy for the right game.' },
          ].map(({ tactic, note }) => (
            <div key={tactic} className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
              <p className="font-bold text-indigo-800 text-sm mb-2">{tactic}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CommunicationTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-extrabold text-slate-900 text-lg mb-2">Communication — The Invisible Game</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          Two players who communicate clearly, support each other after errors, and have a shared game plan will consistently beat technically superior players who play as individuals. Communication is a tactical skill, not a soft skill — and it can be trained.
        </p>
        <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 border border-slate-200">
          Between-point conversations (every single point) + between-game strategy adjustments + pre-match alignment = a functioning partnership.
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">What to Say and When</h3>
        <div className="space-y-3">
          {[
            { timing: 'Before the serve', say: '"T or wide?" / "I\'m poaching right." / "Stay." / "Switch after the return."', why: 'Eliminates confusion. Both players know the plan before the point starts.' },
            { timing: 'During the point', say: '"Mine!" / "Yours!" / "Switch!" / "Back!"', why: 'Quick, clear directional calls prevent collision and defensive hesitation on overheads and lobs.' },
            { timing: 'After won points', say: '"Let\'s go" / "Good call" / "Yes — again."', why: 'Reinforces successful patterns. Builds momentum and reinforces what\'s working.' },
            { timing: 'After lost points', say: '"My fault" / "Next one" / "What did you see?"', why: 'Taking ownership (even when shared) defuses tension. Problem-solve briefly, then reset.' },
            { timing: 'Between games', say: 'Target review: "Their backhand is our target." / "Let\'s try the I-formation on deuce court."', why: 'Short, specific tactical adjustments. No lectures — one idea per game change maximum.' },
          ].map(({ timing, say, why }) => (
            <div key={timing} className="border border-slate-100 rounded-xl p-4">
              <div className="mb-2">
                <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wide">{timing}</span>
              </div>
              <p className="text-xs text-slate-800 font-semibold mb-1">Say: "{say}"</p>
              <p className="text-xs text-slate-500 leading-relaxed">Why: {why}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Building a Doubles Partnership</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { principle: 'Know each other\'s tendencies', detail: 'Does your partner struggle with high balls? Do they favor their forehand? Knowing this lets you cover their weaknesses automatically.' },
            { principle: 'Establish a default formation', detail: 'Agree before the match: "We\'re starting standard. I-formation on second serves if we fall behind in games." Reduces in-match decisions.' },
            { principle: 'Debrief after every loss', detail: 'Not in anger — in analysis. 3 things that didn\'t work, 1 thing that did. 10 minutes. Then let it go.' },
            { principle: 'Celebrate small wins', detail: 'A great poach, a perfect lob, a clutch return. Celebrating builds the shared identity that separates good teams from great ones.' },
          ].map(({ principle, detail }) => (
            <div key={principle} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="font-bold text-slate-900 text-sm mb-2">{principle}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-slate-900 mb-3">Pre-Match Alignment Checklist</h3>
        <p className="text-slate-500 text-xs leading-relaxed mb-3">Run through this before every competitive doubles match.</p>
        <div className="space-y-2">
          {[
            'Who serves first? Which side does each player prefer?',
            'What is our default formation (standard, I, Australian)?',
            'What is our primary serve target (T, wide, body) on deuce and ad courts?',
            'Who has the stronger backhand return — which side does each player return from?',
            'What is our lob coverage system — who calls "mine," how do we switch?',
            'What tactical adjustment do we make if we fall a break down?',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded border border-indigo-300 bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] text-indigo-600 font-bold">{i + 1}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function DoublesTactics() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('positioning')

  return (
    <div className="min-h-screen bg-gray-950 pt-14">
      <div className="sticky top-14 z-30 bg-gray-950/95 backdrop-blur border-b border-gray-800 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-white font-semibold text-sm">Doubles Tactics Guide</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-6 pb-12">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-indigo-900/50 text-indigo-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
            Add-On
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Doubles Tactics Guide</h1>
          <p className="text-gray-400 text-sm mt-1.5 max-w-xl">
            Formations, net game, and communication systems for competitive doubles.
          </p>
        </div>

        <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'positioning' && <PositioningTab />}
        {activeTab === 'formations' && <FormationsTab />}
        {activeTab === 'net-game' && <NetGameTab />}
        {activeTab === 'return' && <ReturnTab />}
        {activeTab === 'communication' && <CommunicationTab />}
      </div>
    </div>
  )
}
