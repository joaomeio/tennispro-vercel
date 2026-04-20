import { Zap, MapPin, Smartphone } from 'lucide-react'

const PT_FEATURES = [
  {
    icon: Zap,
    title: 'Drills de Alta Intensidade',
    desc: 'Acabe com a fila parada. Dinâmicas de movimentação e cardio que mantêm o aluno ativo 100% do tempo.',
  },
  {
    icon: MapPin,
    title: 'Progressões por Nível',
    desc: 'Exercícios adaptáveis desde a iniciação (bola vermelha/laranja) até o nível competitivo avançado.',
  },
  {
    icon: Smartphone,
    title: 'Planejamento de Bolso',
    desc: 'Faltou criatividade antes da aula? Abra o PDF no celular e monte um treino campeão em 2 minutos.',
  },
]

const EN_FEATURES = [
  {
    icon: Zap,
    title: '200+ Drills with Visual Diagrams',
    desc: 'Every drill includes a court diagram so you can visualize the setup instantly — no guesswork, no wasted time.',
  },
  {
    icon: MapPin,
    title: 'Organized by Stroke, Level & Situation',
    desc: 'Filter by forehand, serve, volleys, beginners, advanced, warm-up, match play — find the right drill in seconds.',
  },
  {
    icon: Smartphone,
    title: 'Access From Any Device',
    desc: 'Open the platform on your phone, tablet, or laptop. Your entire drill library is always one tap away on the court.',
  },
]

export default function Features({ lang = 'pt' }) {
  const items = lang === 'en' ? EN_FEATURES : PT_FEATURES
  const heading = lang === 'en' ? "What's Inside the Platform" : 'O que você vai receber'

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
            {heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title}>
              <div className="bg-slate-50 p-8 rounded-2xl hover:bg-white border border-transparent hover:border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col items-center text-center h-full cursor-default">
                <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mb-6 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300 group-hover:rotate-6">
                  <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">
                  {title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
