import { ArrowRight } from 'lucide-react'
import GuaranteeBadge from '../GuaranteeBadge'

export default function FinalCTA({ onPremiumClick }) {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-brand-50">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Ready to stop scrambling before every lesson?
        </h2>
        <p className="text-slate-500 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          Join coaches in 30+ countries who&rsquo;ve already upgraded their sessions with
          TennisPro. One-time $27. Lifetime access.
        </p>
        <div className="flex flex-col items-center">
          <button
            onClick={onPremiumClick}
            className="inline-flex items-center justify-center rounded-2xl font-bold transition-all duration-200 transform hover:-translate-y-0.5 animate-heartbeat bg-green-600 hover:bg-green-500 text-white shadow-xl shadow-green-500/30 px-10 py-5 text-lg md:text-xl group hover:shadow-2xl hover:shadow-green-500/40"
          >
            Get Pro Access — $27
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <GuaranteeBadge />
        </div>
      </div>
    </section>
  )
}
