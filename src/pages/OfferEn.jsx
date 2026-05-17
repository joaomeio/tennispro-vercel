import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Check, ShieldCheck, Zap, Star, ChevronDown, ChevronUp, Lock, Gift, Clock, X } from 'lucide-react'
import { EN_PRICE_IDS } from '../config/checkout'
import OrderBumpModal from '../components/OrderBumpModal'

/* ─── Countdown ─────────────────────────────────────────────────────────── */

const OFFER_DURATION_MS = 2 * 60 * 60 * 1000

function getOrCreateExpiry() {
  try {
    const stored = localStorage.getItem('tp_offer_expiry')
    if (stored) {
      const t = Number(stored)
      if (t > Date.now()) return t
    }
    const expiry = Date.now() + OFFER_DURATION_MS
    localStorage.setItem('tp_offer_expiry', String(expiry))
    return expiry
  } catch {
    return Date.now() + OFFER_DURATION_MS
  }
}

function useOfferCountdown() {
  const expiryRef = useRef(getOrCreateExpiry())
  const [remaining, setRemaining] = useState(Math.max(0, expiryRef.current - Date.now()))
  useEffect(() => {
    const id = setInterval(() => {
      const left = Math.max(0, expiryRef.current - Date.now())
      setRemaining(left)
      if (left === 0) clearInterval(id)
    }, 1000)
    return () => clearInterval(id)
  }, [])
  const totalSecs = Math.floor(remaining / 1000)
  const h = Math.floor(totalSecs / 3600)
  const m = Math.floor((totalSecs % 3600) / 60)
  const s = totalSecs % 60
  const pad = (n) => String(n).padStart(2, '0')
  return { h: pad(h), m: pad(m), s: pad(s), expired: remaining === 0 }
}

/* ─── Data ───────────────────────────────────────────────────────────────── */

const FEATURES = [
  '200+ structured drills with visual court diagrams',
  'Organized by stroke, level, and game situation',
  'Tennis Kids module — ages 4–10 made easy',
  'Mental Game Mastery guide included',
  'Lesson Planning Templates (save 3h/week)',
  'New drills added regularly — access forever',
]

const TESTIMONIALS = [
  {
    name: 'Marcus Rivera',
    city: 'Austin, TX',
    initials: 'MR',
    quote: "I've been coaching for 8 years and always struggled with lesson planning. Now I open TennisPro before every session and I'm done in 5 minutes. Retention went from 60% to 90%.",
  },
  {
    name: 'Claire Thompson',
    city: 'London, UK',
    initials: 'CT',
    quote: 'The visual court diagrams are a game-changer. I can show my students exactly what the drill looks like — they understand instantly and we spend more time actually playing.',
  },
  {
    name: "James O'Brien",
    city: 'Toronto, Canada',
    initials: 'JO',
    quote: "Best investment I've ever made in coaching resources. The Approach Shot Ladder drill alone transformed how my intermediate players handle mid-court situations.",
  },
]

const FAQS = [
  {
    q: 'Is this a subscription or one-time payment?',
    a: 'Completely one-time. Pay $21 once and you own lifetime access — no monthly fees, no renewals. Every future drill update is included at no extra cost.',
  },
  {
    q: "I already have drills from YouTube. Why do I need this?",
    a: "YouTube gives you random, unorganized clips. TennisPro gives you 200+ drills sorted by stroke, level, age, and situation — all with visual court diagrams and coaching cues. You'll plan any session in minutes, not hours.",
  },
  {
    q: "What if it's not right for me?",
    a: "You're covered by a 7-day money-back guarantee, no questions asked. Try everything, and if it doesn't work for your sessions, just email us for a full refund.",
  },
  {
    q: 'How quickly will I get access?',
    a: 'Instant. The moment your payment clears you get login credentials and full platform access. Most coaches complete their first session plan within the hour.',
  },
]

/* ─── Helpers ────────────────────────────────────────────────────────────── */

function scrollToOffer() {
  document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' })
}

function StarRow() {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full px-5 py-4 text-left bg-white hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-800 text-sm pr-4">{q}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
          : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-4 bg-white">
          <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function OfferEn() {
  const { h, m, s, expired } = useOfferCountdown()
  const [bumpOpen, setBumpOpen] = useState(false)

  return (
    <div className="bg-white text-slate-800 w-full overflow-x-hidden">
      <OrderBumpModal
        isOpen={bumpOpen}
        priceId={EN_PRICE_IDS.DOWNSELL}
        onCancel={() => setBumpOpen(false)}
        lang="en"
      />

      {/* ── Urgency banner ─────────────────────────────────────── */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-center gap-3 flex-wrap text-center">
          <div className="flex items-center gap-1.5 font-semibold text-sm">
            <Clock className="w-4 h-4 shrink-0" />
            <span>{expired ? 'Offer may have expired — grab it now' : 'Your exclusive discount expires in:'}</span>
          </div>
          {!expired && (
            <div className="flex items-center gap-1 font-extrabold text-sm tabular-nums">
              <span className="bg-white/20 rounded px-2 py-0.5">{h}</span>
              <span>:</span>
              <span className="bg-white/20 rounded px-2 py-0.5">{m}</span>
              <span>:</span>
              <span className="bg-white/20 rounded px-2 py-0.5">{s}</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-white to-slate-50 pt-14 pb-16 md:pt-20 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 max-w-2xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">Returning Visitor Offer</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-5 leading-[1.15] tracking-tight">
            Still thinking it over,{' '}
            <span className="inline-block bg-green-50 text-green-700 px-3 py-1 rounded-2xl border border-green-200 transform -rotate-1">
              Coach?
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-6 max-w-xl mx-auto leading-relaxed font-medium">
            You visited TennisPro but didn't grab access. So we're dropping the price —
            just for you, just for the next 2 hours.
          </p>

          <div className="inline-flex flex-col items-center bg-white border border-slate-200 shadow-xl rounded-3xl px-8 py-6 mb-8">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Special returning visitor price</p>
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-2xl font-bold text-slate-400 line-through">$27</span>
              <span className="text-6xl font-extrabold text-green-600">$21</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">One-time · Lifetime access</p>
            <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>7-Day Money-Back Guarantee</span>
            </div>
          </div>

          <button
            onClick={scrollToOffer}
            className="inline-flex items-center justify-center rounded-2xl font-bold transition-all duration-200 transform hover:-translate-y-0.5 animate-heartbeat bg-green-600 hover:bg-green-500 text-white shadow-xl shadow-green-500/30 px-10 py-5 text-xl w-full sm:w-auto group"
          >
            Claim My $21 Access <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-xs text-slate-400 mt-4 flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3" />
            Secure checkout · Instant access · No subscriptions
          </p>
        </div>

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 pointer-events-none opacity-30">
          <div className="absolute top-[-20%] right-[-5%] w-[500px] h-[500px] bg-green-100 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-orange-100 rounded-full blur-[100px]" />
        </div>
      </section>

      {/* ── Authority bar ──────────────────────────────────────── */}
      <div className="bg-slate-900 py-4 px-4">
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-6 text-slate-300 text-xs font-semibold uppercase tracking-widest">
          {['200+ Drills', 'Lifetime Access', 'Court Diagrams', '7-Day Guarantee', 'Instant Access'].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <span className="text-green-400">✓</span> {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── What you get ───────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-1.5 rounded-full mb-4">
              <Gift className="w-3.5 h-3.5 text-green-600" />
              <span className="text-xs font-bold text-green-700 uppercase tracking-widest">Everything included at $21</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything You Need,<br />Nothing You Don't
            </h2>
            <p className="text-slate-500 mt-3 text-base max-w-lg mx-auto">
              One platform. Every drill. Walk on court prepared — every single session.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FEATURES.map((f) => (
              <div key={f} className="flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                </div>
                <span className="text-slate-700 text-sm font-medium leading-snug">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Before / After ─────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Most Coaches Are Flying Blind
            </h2>
            <p className="text-slate-500 text-base max-w-md mx-auto">
              Here's the difference one tool makes.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-lg">
            {/* Header row */}
            <div className="grid grid-cols-2">
              <div className="bg-slate-800 px-6 py-4 flex items-center gap-2">
                <X className="w-4 h-4 text-red-400 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Without TennisPro</span>
              </div>
              <div className="bg-green-600 px-6 py-4 flex items-center gap-2">
                <Check className="w-4 h-4 text-white shrink-0" strokeWidth={3} />
                <span className="text-xs font-bold uppercase tracking-widest text-white">With TennisPro</span>
              </div>
            </div>

            {/* Comparison rows */}
            {[
              {
                before: 'Improvising drills on the spot every session',
                after: '200+ ready-to-run drills at your fingertips',
              },
              {
                before: 'Students getting bored — same old exercises',
                after: 'Fresh, level-matched drills that keep groups engaged',
              },
              {
                before: 'Hours on YouTube hunting for ideas each week',
                after: 'Full week planned in under 10 minutes',
              },
              {
                before: 'No structure for kids — guessing what works',
                after: 'Dedicated Tennis Kids module for ages 4–10',
              },
              {
                before: 'Students quit because sessions feel stale',
                after: 'Coaches report 90%+ student retention',
              },
            ].map(({ before, after }, i) => (
              <div key={i} className={`grid grid-cols-2 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}`}>
                <div className="px-6 py-4 border-r border-slate-200 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-2.5 h-2.5 text-red-500" strokeWidth={3} />
                  </div>
                  <p className="text-slate-500 text-sm leading-snug">{before}</p>
                </div>
                <div className="px-6 py-4 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-green-600" strokeWidth={3} />
                  </div>
                  <p className="text-slate-800 text-sm font-semibold leading-snug">{after}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Coaches Who Made the Switch
            </h2>
            <p className="text-slate-500 text-base">Real results from real coaches.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map(({ name, city, initials, quote }) => (
              <div key={name} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col gap-3">
                <StarRow />
                <p className="text-slate-700 text-sm leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
                <div className="flex items-center gap-2.5 pt-3 border-t border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-[10px]">{initials}</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-xs">{name}</p>
                    <p className="text-slate-400 text-[10px]">{city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Offer card ─────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50" id="offer">
        <div className="container mx-auto px-4 max-w-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Grab Your Spot Before This Expires
            </h2>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
            {/* Card header */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 px-8 py-8 text-center text-white relative">
              <div className="absolute top-4 right-4 bg-orange-400 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-widest">
                22% off
              </div>
              <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full mb-4">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span className="text-[11px] font-bold uppercase tracking-widest">Grand Slam</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">Pro Premium Plan</h3>
              <p className="text-green-100 text-sm">The coach's complete drill platform.</p>
              <div className="mt-5 flex items-baseline justify-center gap-3">
                <span className="text-2xl font-bold text-green-200 line-through">$27</span>
                <span className="text-6xl font-extrabold">$21</span>
              </div>
              <p className="text-green-200 text-xs font-semibold mt-1">One-time payment · Lifetime access</p>
            </div>

            {/* Card body */}
            <div className="px-8 py-7 flex flex-col gap-5">
              {/* Features */}
              <ul className="space-y-2.5">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                    <Check className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-dashed border-slate-200" />

              {/* Countdown */}
              <div className="bg-orange-50 border border-orange-200 rounded-2xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-orange-600">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wide">Offer expires in</span>
                </div>
                <span className="font-extrabold text-orange-600 text-sm tabular-nums">{h}:{m}:{s}</span>
              </div>

              <button
                onClick={() => setBumpOpen(true)}
                className="inline-flex items-center justify-center rounded-xl font-bold transition-all duration-200 transform hover:-translate-y-0.5 animate-heartbeat bg-green-600 hover:bg-green-500 text-white py-4 px-8 text-lg w-full shadow-lg shadow-green-600/25 group"
              >
                Get Access for $21 <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex flex-col items-center gap-1 text-center">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                  <span>7-Day Money Back Guarantee — No Questions Asked</span>
                </div>
                <p className="text-xs text-slate-400">Secure payment · Instant access · No subscriptions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Common Questions
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq) => <FaqItem key={faq.q} {...faq} />)}
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
            Your next great session starts here.
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-lg mx-auto">
            Join hundreds of coaches who walk on court prepared, every single time.
            This $21 offer won't last.
          </p>
          <button
            onClick={scrollToOffer}
            className="inline-flex items-center justify-center rounded-2xl font-bold transition-all duration-200 transform hover:-translate-y-0.5 bg-white text-green-700 hover:bg-green-50 shadow-xl px-10 py-5 text-xl group"
          >
            Yes, I Want Access for $21 <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center justify-center gap-1.5 mt-4 text-green-200 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>7-Day Money Back Guarantee · No Questions Asked</span>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="bg-slate-900 py-8 px-4 text-center">
        <p className="text-slate-500 text-xs">
          © {new Date().getFullYear()} TennisPro. All rights reserved. ·{' '}
          <a href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
          {' · '}
          <a href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</a>
        </p>
        <p className="text-slate-600 text-xs mt-2 max-w-xl mx-auto">
          This special $21 offer is available exclusively to returning visitors for a limited time.
          Regular price is $27. Offer subject to change without notice.
        </p>
      </footer>
    </div>
  )
}
