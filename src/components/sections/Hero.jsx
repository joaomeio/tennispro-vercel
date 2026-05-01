import { useEffect } from 'react'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import GuaranteeBadge from '../GuaranteeBadge'

// PT hero with vturb video
function HeroPt({ onCtaClick }) {
  useEffect(() => {
    const s = document.createElement('script')
    s.src =
      'https://scripts.converteai.net/9bd390f0-c3f7-4946-b784-12be56743228/players/697a46c3b5d3eb3ff7976983/v4/player.js'
    s.async = true
    document.head.appendChild(s)
    return () => {
      document.head.removeChild(s)
    }
  }, [])

  return (
    <section className="relative bg-gradient-to-b from-white to-brand-50 pt-20 pb-24 md:pt-32 md:pb-40 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full shadow-md border border-brand-100 mb-8 hover:scale-105 transition-transform duration-300 cursor-default">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs md:text-sm font-bold text-slate-600 uppercase tracking-widest">
              PARA PROFESSORES E TREINADORES DE TÊNIS
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.2] max-w-5xl mx-auto tracking-tight drop-shadow-sm">
            <span className="md:block py-1">
              Pare De <span style={{ color: 'red' }}>Perder Alunos</span>
            </span>
            <span className="md:block py-1">Por Improvisar</span>
            <span className="md:block">
              Todas As
              <span className="inline-block bg-green-50 text-green-700 px-4 py-1 rounded-2xl border border-green-200 shadow-sm transform rotate-2 hover:rotate-0 transition-all duration-300 cursor-default ml-1">
                Suas Aulas
              </span>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
            Nunca mais entre em quadra sem saber o que passar. Tenha um arsenal de exercícios
            técnicos, táticos e lúdicos para fidelizar seus alunos, desde a bola vermelha até o
            alto rendimento.
          </p>

          <div className="w-full max-w-[340px] md:max-w-[500px] mx-auto mb-12 relative z-20">
            <vturb-smartplayer
              id="vid-697a46c3b5d3eb3ff7976983"
              style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px' }}
            />
          </div>

          <div className="flex flex-col items-center gap-6 w-full">
            <button
              onClick={onCtaClick}
              className="inline-flex items-center justify-center rounded-2xl font-bold transition-all duration-200 transform hover:-translate-y-0.5 animate-heartbeat bg-green-600 hover:bg-green-500 text-white shadow-xl shadow-green-500/30 px-10 py-5 text-lg md:text-xl w-auto group hover:shadow-2xl hover:shadow-green-500/40"
            >
              Quero Revolucionar Minhas Aulas
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center justify-center gap-3 text-sm font-medium text-slate-500 bg-white/60 backdrop-blur-sm py-2 px-6 rounded-full border border-slate-100 shadow-sm hover:bg-white transition-colors">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>Material 100% Digital</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full" />
              <span>Acesso Vitalício</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-200 rounded-full blur-[120px] mix-blend-multiply animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-100 rounded-full blur-[100px] mix-blend-multiply animate-float-delayed" />
      </div>
    </section>
  )
}

// EN hero
function HeroEn({ onPremiumClick }) {
  return (
    <section className="relative bg-gradient-to-b from-white to-brand-50 pt-20 pb-24 md:pt-32 md:pb-40 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full shadow-md border border-brand-100 mb-8 hover:scale-105 transition-transform duration-300 cursor-default">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs md:text-sm font-bold text-slate-600 uppercase tracking-widest">
              FOR TENNIS COACHES &amp; INSTRUCTORS
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.2] max-w-5xl mx-auto tracking-tight drop-shadow-sm">
            <span className="md:block py-1">The Drill Platform</span>
            <span className="md:block py-1">Built for</span>
            <span className="md:block">
              <span className="inline-block bg-green-50 text-green-700 px-4 py-1 rounded-2xl border border-green-200 shadow-sm transform rotate-2 hover:rotate-0 transition-all duration-300 cursor-default mr-2">
                Tennis
              </span>
              Coaches
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
            200+ drills with visual court diagrams, organized by stroke, level, and situation.
            Walk on court prepared — every single session.
          </p>

          <div className="flex flex-col items-center w-full">
            <button
              onClick={onPremiumClick}
              className="inline-flex items-center justify-center rounded-2xl font-bold transition-all duration-200 transform hover:-translate-y-0.5 animate-heartbeat bg-green-600 hover:bg-green-500 text-white shadow-xl shadow-green-500/30 px-10 py-5 text-lg md:text-xl w-auto group hover:shadow-2xl hover:shadow-green-500/40"
            >
              Get Pro Access — $27
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <GuaranteeBadge />
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-200 rounded-full blur-[120px] mix-blend-multiply animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-100 rounded-full blur-[100px] mix-blend-multiply animate-float-delayed" />
      </div>
    </section>
  )
}

export default function Hero({ lang = 'pt', onCtaClick, onPremiumClick }) {
  if (lang === 'en') return <HeroEn onPremiumClick={onPremiumClick} />
  return <HeroPt onCtaClick={onCtaClick} />
}
