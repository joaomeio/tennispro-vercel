const PT_FEATURES = [
  {
    title: 'Drills de Alta Intensidade',
    desc: 'Dinâmicas de movimentação e cardio que mantêm o aluno ativo 100% do tempo — sem fila parada.',
  },
  {
    title: 'Progressões por Nível',
    desc: 'Exercícios adaptáveis desde a iniciação (bola vermelha/laranja) até o nível competitivo avançado.',
  },
  {
    title: 'Planejamento de Bolso',
    desc: 'Abra no celular antes da aula e monte um treino completo em 2 minutos. Diagramas de quadra inclusos.',
  },
]

const EN_FEATURES = [
  {
    title: '200+ drills, each with a visual court diagram',
    desc: 'See the exact positioning, ball path, and player movement before you step on court. No guesswork.',
  },
  {
    title: 'Filter by stroke, level, or session format',
    desc: 'Forehand, serve, beginner, advanced, solo feed, group game — find the right drill in under 10 seconds.',
  },
  {
    title: 'On your phone, on the court, right now',
    desc: "Your entire drill library in your pocket. Open it between points, between sets, anywhere you coach.",
  },
]

export default function Features({ lang = 'pt' }) {
  const items = lang === 'en' ? EN_FEATURES : PT_FEATURES
  const heading = lang === 'en' ? "What's inside" : 'O que você vai receber'

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 md:mb-14">
          {heading}
        </h2>
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {items.map(({ title, desc }, i) => (
            <div
              key={title}
              className="py-8 md:py-0 md:px-10 first:pt-0 last:pb-0 md:first:pl-0 md:last:pr-0"
            >
              <span className="block text-5xl font-extrabold text-slate-100 mb-5 leading-none select-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 leading-snug">
                {title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
