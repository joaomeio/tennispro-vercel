import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const PT_FAQS = [
  {
    q: 'Serve para aulas individuais e em grupo?',
    a: 'Sim! O material classifica os exercícios. Você terá opções específicas para drill feed (aluno único) e live ball games (grupos e clínicas).',
  },
  {
    q: 'Preciso de muitos materiais (cones, escadas)?',
    a: 'Não necessariamente. 80% das dinâmicas utilizam apenas a quadra, bolas e a raquete. Materiais extras são opcionais para variações.',
  },
  {
    q: 'Sou recém-formado, consigo aplicar?',
    a: 'Com certeza. O guia funciona como um mentor de bolso. As explicações são passo-a-passo com diagramas, facilitando a aplicação imediata.',
  },
  {
    q: 'Como recebo o acesso?',
    a: 'Imediatamente após a confirmação do pagamento, você recebe um e-mail com o link para baixar todo o material e acessar a área de membros.',
  },
  {
    q: 'Tem garantia?',
    a: 'Sim, garantia incondicional de 7 dias. Se você achar que o material não elevou o nível das suas aulas, devolvemos 100% do valor.',
  },
]

const EN_FAQS = [
  {
    q: 'Does it work for private and group lessons?',
    a: "Yes! Every drill on the platform is tagged — drill feed (solo), live ball, or group game — so you always find what fits your session format.",
  },
  {
    q: 'Do I need a lot of equipment (cones, ladders)?',
    a: '80% of drills only require the court, balls, and a racket. Extra equipment is optional for variations and is noted in the drill diagram.',
  },
  {
    q: "I'm a new coach — can I use this platform?",
    a: 'Absolutely. Each drill includes a visual court diagram and step-by-step instructions. You can walk on court confident in what you\'re running.',
  },
  {
    q: 'How do I get access?',
    a: 'Immediately after payment confirmation, you receive an email with your login credentials to access the platform on any device.',
  },
  {
    q: 'Is there a guarantee?',
    a: "Yes, an unconditional 7-day guarantee. If you feel the platform didn't elevate your lessons, we'll refund 100% of your money.",
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        className="w-full py-6 flex items-center justify-between text-center focus:outline-none group gap-4"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="w-5 hidden md:block" />
        <span className="text-lg font-medium transition-colors flex-1 text-slate-800 group-hover:text-brand-600 text-left md:text-center">
          {q}
        </span>
        <div
          className={`p-2 rounded-full transition-all duration-300 shrink-0 text-slate-400 group-hover:bg-slate-50 ${open ? 'rotate-180 bg-slate-50' : ''}`}
        >
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-slate-500 leading-relaxed px-4 text-center md:px-12 pb-6">{a}</p>
      </div>
    </div>
  )
}

export default function FAQ({ lang = 'pt' }) {
  const items = lang === 'en' ? EN_FAQS : PT_FAQS
  const heading = lang === 'en' ? 'Frequently Asked Questions' : 'Dúvidas Frequentes'

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12 tracking-tight">
          {heading}
        </h2>
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
          {items.map((item) => (
            <FAQItem key={item.q} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
