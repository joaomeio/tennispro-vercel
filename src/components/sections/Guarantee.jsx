import { Lock } from 'lucide-react'

const PT_CONTENT = {
  title: 'Garantia de 7 Dias',
  body: 'Teste o Playbook por 7 dias. Aplique nas suas aulas. Se não ver resultado na motivação dos alunos, devolvemos seu dinheiro.',
  btn: 'COMPRAR COM SEGURANÇA',
}

const EN_CONTENT = {
  title: '7-Day Money Back Guarantee',
  body: "Test the Playbook for 7 days. Apply it in your lessons. If you don't see results in student engagement, we'll refund your money.",
  btn: 'BUY WITH CONFIDENCE',
}

export default function Guarantee({ lang = 'pt', onBuyClick }) {
  const c = lang === 'en' ? EN_CONTENT : PT_CONTENT

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="border-2 border-orange-500 rounded-3xl p-8 pt-12 pb-10 text-center bg-gradient-to-b from-orange-50/30 to-white relative overflow-hidden shadow-2xl shadow-orange-100/50">
          <div className="flex justify-center mb-8 relative z-10">
            <div className="relative w-32 h-36 drop-shadow-xl hover:scale-105 transition-transform duration-300">
              <svg
                viewBox="0 0 100 120"
                className="w-full h-full text-orange-500 fill-current"
                preserveAspectRatio="none"
              >
                <path d="M50 0 L95 15 V55 C95 90 50 120 50 120 C50 120 5 90 5 55 V15 L50 0 Z" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white pt-2">
                <span className="text-6xl font-extrabold leading-none tracking-tighter drop-shadow-sm">
                  7
                </span>
                <span className="text-sm font-bold uppercase tracking-[0.15em] mt-1 text-orange-50">
                  {lang === 'en' ? 'Days' : 'Dias'}
                </span>
              </div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
            {c.title}
          </h2>
          <p className="text-slate-600 mb-10 leading-relaxed max-w-md mx-auto font-medium text-lg">
            {c.body}
          </p>
          <button
            onClick={onBuyClick}
            className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 px-10 rounded-full text-sm md:text-base shadow-lg shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl uppercase tracking-wider w-full md:w-auto"
          >
            <Lock className="w-4 h-4 md:w-5 md:h-5" />
            {c.btn}
          </button>
        </div>
      </div>
    </section>
  )
}
