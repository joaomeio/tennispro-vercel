import { useState, useEffect } from 'react'
import { Zap, Check, ShieldCheck, Gift, ArrowRight } from 'lucide-react'
import GuaranteeBadge from '../GuaranteeBadge'

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

const EN_CONTENT = {
  heading: 'Invest in Your Career',
  bannerLabel: 'COACHES SPECIAL OFFER — ENDS IN:',
  hours: 'Hours',
  minutes: 'Minutes',
  seconds: 'Seconds',
  basicTag: 'Starter',
  basicTitle: 'Basic Plan',
  basicSub: 'For new coaches getting started.',
  basicPrice: '$17',
  basicPayment: 'One-time payment',
  basicFeatures: [
    { included: true, label: '50 Essential Drills' },
    { included: true, label: 'Instant Platform Access' },
    { included: false, label: 'Exclusive Bonuses' },
    { included: false, label: 'New Drill Updates' },
  ],
  basicBtn: 'Choose Basic Access',
  premiumTag: 'Grand Slam',
  premiumBadge: 'Best Seller',
  premiumTitle: 'Pro Premium Plan',
  premiumSub: "The coach's complete drill platform.",
  premiumPrice: '$27',
  premiumPayment: 'One-time & lifetime',
  premiumFeatures: [
    '200+ Drills with Visual Diagrams',
    'Organized by Stroke, Level & Situation',
  ],
  premiumGuarantee: '7-Day Money Back Guarantee',
  bonusTitle: 'Bonus Pack Included',
  bonusItems: ['Tennis Kids Manual', 'Lesson Planning Templates', 'Mental Game Mastery'],
  premiumBtn: 'Get Pro Access',
}

export default function Pricing({ lang = 'pt', onPremiumClick }) {
  const { hours, minutes, seconds } = useCountdown()
  const c = lang === 'en' ? EN_CONTENT : PT_CONTENT

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
                {lang === 'en' ? 'Get Pro Access — $27' : c.premiumBtn}
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
