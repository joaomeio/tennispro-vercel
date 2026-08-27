import { useState, useEffect } from 'react'
import { Zap, Check, ShieldCheck, Gift, ArrowRight, Plus, Lock, CreditCard, Loader2 } from 'lucide-react'
import GuaranteeBadge from '../GuaranteeBadge'
import { PLANS, ADDON_PRICE, addonsForPlan, separateTotal } from '../../config/plans'

function useCountdown() {
  const [time, setTime] = useState({ hours: 11, minutes: 20, seconds: 59 })

  useEffect(() => {
    const id = setInterval(() => {
      setTime((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return { hours: 23, minutes: 59, seconds: 59 }
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return time
}

function pad(n) {
  return String(n).padStart(2, '0')
}

const PT_CONTENT = {
  heading: 'Invista na Sua Carreira',
  bannerLabel: 'OFERTA PARA TREINADORES - ACABA EM:',
  hours: 'Horas',
  minutes: 'Minutos',
  seconds: 'Segundos',
  basicTag: 'Start Pack',
  basicTitle: 'Plano Básico',
  basicSub: 'Para estagiários e iniciantes.',
  basicPrice: 'R$ 17,00',
  basicPayment: 'Pagamento único',
  basicFeatures: [
    { included: true, label: '50 Dinâmicas Essenciais' },
    { included: true, label: 'Acesso PDF Imediato' },
    { included: false, label: 'Bônus Exclusivos' },
    { included: false, label: 'Atualizações' },
  ],
  basicBtn: 'Escolher Acesso Básico',
  premiumTag: 'Grand Slam',
  premiumBadge: 'Mais Vendido',
  premiumTitle: 'Plano Pro Premium',
  premiumSub: 'O arsenal completo do treinador.',
  premiumPrice: 'R$ 37,00',
  premiumPayment: 'Pagamento único e vitalício',
  premiumFeatures: [
    '+150 Dinâmicas (PDF + Videos)',
    'Organizado por Idade/Nível',
  ],
  premiumGuarantee: 'Garantia Total de 7 Dias',
  bonusTitle: 'Pack Bônus Incluso',
  bonusItems: ['Manual Tennis Kids', 'Planilhas de Treino', 'Certificado Mental Game'],
  premiumBtn: 'Garantir Acesso Pro',
}

// ─────────────────────────────────────────────────────────────────────────────
// EN — three one-time tiers.
//
// Sales-page palette (white, slate, green-600, amber) in the dashboard's
// shapes: Inter, rounded-3xl cards, hairline borders, tabular figures. The
// popular tier is the one dark card on the page — the same ink surface the
// buyer lands on after paying.
// ─────────────────────────────────────────────────────────────────────────────

function Countdown() {
  const { hours, minutes, seconds } = useCountdown()

  return (
    <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
      <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        Offer ends in
      </span>
      <span className="flex items-center gap-1 tabular-nums font-extrabold text-slate-900">
        {[pad(hours), pad(minutes), pad(seconds)].map((v, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <span className="text-slate-300 -mt-0.5">:</span>}
            <span className="rounded-lg bg-slate-50 border border-slate-200/80 px-2 py-1 text-sm leading-none">
              {v}
            </span>
          </span>
        ))}
      </span>
    </div>
  )
}

function PlanCard({ plan, onSelect, busy }) {
  const featured = !!plan.featured
  const compareAt = separateTotal(plan)
  const saving = compareAt - plan.price
  const extras = addonsForPlan(plan)

  return (
    <div
      className={`relative flex flex-col rounded-3xl transition duration-300 ${
        featured
          ? 'bg-ink-950 border border-white/[0.08] shadow-2xl shadow-slate-900/25 lg:-my-4 lg:scale-[1.03] z-10'
          : 'bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1'
      }`}
    >
      {/* Tag */}
      <div className="absolute -top-3 left-6">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${
            featured
              ? 'bg-green-500 text-ink-950 shadow-lg shadow-green-500/30'
              : plan.id === 'complete'
                ? 'bg-amber-100 text-amber-700 border border-amber-200'
                : 'bg-slate-100 text-slate-500 border border-slate-200'
          }`}
        >
          {featured && <Zap className="w-3 h-3 fill-current" />}
          {plan.tag}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5 pt-8 lg:p-7 lg:pt-9">
        <h3
          className={`text-xl font-extrabold tracking-tight ${featured ? 'text-white' : 'text-slate-900'}`}
        >
          {plan.name}
        </h3>
        <p
          className={`mt-1.5 text-[13px] leading-relaxed min-h-[40px] ${
            featured ? 'text-gray-400' : 'text-slate-500'
          }`}
        >
          {plan.blurb}
        </p>

        {/* Price */}
        <div className="mt-5 flex flex-wrap items-end gap-x-2.5 gap-y-2 tabular-nums">
          <span
            className={`text-[44px] leading-none font-extrabold tracking-tight ${
              featured ? 'text-white' : 'text-slate-900'
            }`}
          >
            ${plan.price}
          </span>
          {saving > 0 && (
            <>
              <span
                className={`mb-1.5 text-sm font-semibold line-through ${
                  featured ? 'text-gray-600' : 'text-slate-400'
                }`}
              >
                ${compareAt}
              </span>
              <span
                className={`mb-1 rounded-full px-2 py-0.5 text-[11px] font-black uppercase tracking-wide ${
                  featured ? 'bg-green-500/15 text-green-400' : 'bg-green-50 text-green-700'
                }`}
              >
                Save ${saving}
              </span>
            </>
          )}
        </div>
        <p className={`mt-2 text-xs font-medium ${featured ? 'text-gray-500' : 'text-slate-400'}`}>
          One-time payment · Lifetime access
        </p>

        {/* CTA sits above the feature list — the decision is the price, not the
            scroll through the bullets. */}
        <button
          onClick={() => onSelect(plan)}
          disabled={busy}
          className={`group mt-6 inline-flex w-full items-center justify-center whitespace-nowrap rounded-xl px-4 py-4 text-[14px] font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.99] disabled:cursor-wait disabled:opacity-80 lg:text-[15px] cursor-pointer ${
            featured
              ? 'bg-green-500 text-ink-950 shadow-lg shadow-green-500/30 hover:bg-green-400'
              : 'bg-slate-900 text-white shadow-lg shadow-slate-900/15 hover:bg-slate-800'
          }`}
        >
          {busy ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Taking you to checkout…
            </>
          ) : (
            <>
              {plan.cta}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        {/* Highlights */}
        <ul className="mt-6 space-y-3">
          {plan.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5">
              <span
                className={`mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                  featured ? 'bg-green-500/15' : 'bg-green-50'
                }`}
              >
                <Check
                  className={`h-2.5 w-2.5 ${featured ? 'text-green-400' : 'text-green-600'}`}
                  strokeWidth={3.5}
                />
              </span>
              <span
                className={`text-[13px] leading-snug ${featured ? 'text-gray-300' : 'text-slate-600'}`}
              >
                {h}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex-1" />

        {/* What's still buyable — the add-on step is signposted before the
            click, so the modal after it isn't a surprise. */}
        <div
          className={`mt-6 rounded-2xl border border-dashed px-4 py-3 ${
            featured ? 'border-white/[0.12] bg-white/[0.03]' : 'border-slate-200 bg-slate-50/70'
          }`}
        >
          {extras.length > 0 ? (
            <p
              className={`flex items-start gap-2 text-[11px] leading-relaxed ${
                featured ? 'text-gray-400' : 'text-slate-500'
              }`}
            >
              <Plus
                className={`mt-[1px] h-3.5 w-3.5 shrink-0 ${featured ? 'text-green-400' : 'text-green-600'}`}
                strokeWidth={3}
              />
              <span>
                Add any of the other {extras.length} modules for{' '}
                <span className={featured ? 'font-bold text-white' : 'font-bold text-slate-700'}>
                  ${ADDON_PRICE} each
                </span>{' '}
                on the next screen.
              </span>
            </p>
          ) : (
            <p
              className={`flex items-center gap-2 text-[11px] font-semibold ${
                featured ? 'text-gray-300' : 'text-slate-600'
              }`}
            >
              <Gift className="h-3.5 w-3.5 shrink-0 text-amber-500" />
              All 7 modules included — nothing left to unlock.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function PricingEn({ onSelectPlan, busyPlanId, error }) {
  return (
    <section id="pricing" className="font-app relative bg-white py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
            Coaches special offer
          </span>
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Pick the pack that fits your court
          </h2>
          <p className="mb-7 max-w-xl text-base leading-relaxed text-slate-500">
            One payment, lifetime access, no subscription. Start with the drills and add
            whatever else you need — before or after checkout.
          </p>
          <Countdown />
        </div>

        <div className="grid items-stretch gap-6 md:grid-cols-3 lg:gap-5">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onSelect={onSelectPlan}
              busy={busyPlanId === plan.id}
            />
          ))}
        </div>

        {error && (
          <p className="mx-auto mt-6 max-w-md rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Trust row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[13px] font-medium text-slate-500">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-green-600" />
            7-day money-back guarantee
          </span>
          <span className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-slate-400" />
            Secure checkout by Stripe
          </span>
          <span className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-slate-400" />
            One-time — never a subscription
          </span>
        </div>
      </div>
    </section>
  )
}

// ── PT — single offer, unchanged ────────────────────────────────────────────

function PricingPt({ onPremiumClick }) {
  const { hours, minutes, seconds } = useCountdown()
  const c = PT_CONTENT

  return (
    <section id="pricing" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            {c.heading}
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center mb-14 max-w-lg mx-auto">
          <div className="bg-brand-600 text-white font-bold py-3 px-6 md:px-10 rounded-lg mb-6 shadow-lg shadow-brand-200 uppercase tracking-wider text-sm md:text-base w-full text-center">
            {c.bannerLabel}
          </div>
          <div className="flex items-start justify-center gap-3 md:gap-4">
            {[
              { val: pad(hours), label: c.hours },
              { val: pad(minutes), label: c.minutes },
              { val: pad(seconds), label: c.seconds },
            ].reduce((acc, item, i, arr) => {
              acc.push(
                <div key={item.label} className="flex flex-col items-center gap-2">
                  <div className="bg-white rounded-xl shadow-md border border-slate-100 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                    <span className="text-3xl md:text-5xl font-extrabold text-slate-900">
                      {item.val}
                    </span>
                  </div>
                  <span className="text-slate-500 text-xs md:text-sm font-medium">{item.label}</span>
                </div>
              )
              if (i < arr.length - 1) {
                acc.push(
                  <div key={`sep-${i}`} className="text-3xl md:text-5xl font-bold text-slate-800 mt-4 md:mt-6">
                    :
                  </div>
                )
              }
              return acc
            }, [])}
          </div>
        </div>

        {/* Single offer — Pro Premium Plan */}
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            {/* Card header */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 px-8 py-8 text-center text-white">
              <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full mb-4">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span className="text-[11px] font-bold uppercase tracking-widest">{c.premiumTag}</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">{c.premiumTitle}</h3>
              <p className="text-green-100 text-sm">{c.premiumSub}</p>
              <div className="mt-6">
                <span className="text-5xl font-extrabold">{c.premiumPrice}</span>
                <p className="text-green-200 text-xs font-semibold mt-1">{c.premiumPayment}</p>
              </div>
            </div>

            {/* Card body */}
            <div className="px-8 py-7 flex flex-col gap-6">
              {/* Features */}
              <ul className="space-y-3">
                {c.premiumFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                    <Check className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
                <li className="flex items-center gap-3 text-slate-700 text-sm font-semibold">
                  <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                  <span>{c.premiumGuarantee}</span>
                </li>
              </ul>

              {/* Divider */}
              <div className="border-t border-dashed border-slate-200" />

              {/* Bonus */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Gift className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{c.bonusTitle}</span>
                </div>
                <ul className="space-y-2">
                  {c.bonusItems.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-slate-600 text-sm">
                      <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <button
                onClick={onPremiumClick}
                className="inline-flex items-center justify-center rounded-xl font-bold transition-all duration-200 transform hover:-translate-y-0.5 animate-heartbeat bg-green-600 hover:bg-green-500 text-white py-4 px-8 text-lg w-full shadow-lg shadow-green-600/25 group"
              >
                {c.premiumBtn}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <GuaranteeBadge />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Pricing({ lang = 'pt', onSelectPlan, busyPlanId, error, onPremiumClick }) {
  if (lang === 'en') {
    return <PricingEn onSelectPlan={onSelectPlan} busyPlanId={busyPlanId} error={error} />
  }
  return <PricingPt onPremiumClick={onPremiumClick} />
}
