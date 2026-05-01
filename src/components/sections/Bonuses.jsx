const PT_BONUSES = [
  {
    img: '/capa_infantil.png',
    title: 'Manual do Tennis Kids',
    originalPrice: 'R$47.90',
    desc: 'Guia completo com jogos lúdicos para crianças de 4 a 8 anos. Aprender brincando é o segredo da retenção infantil.',
  },
  {
    img: '/capa_planilha.png',
    title: 'Planilha de Periodização',
    originalPrice: 'R$34.90',
    desc: 'Modelo editável para organizar o macrociclo dos seus atletas de competição. Organize a temporada como um pro.',
  },
  {
    img: '/capa_mentalidade.png',
    title: 'Certificado Mental Game',
    originalPrice: 'R$87.90',
    desc: 'Ebook extra sobre psicologia do tênis: rituais, controle de ansiedade e foco para passar aos seus alunos.',
  },
]

const EN_BONUSES = [
  {
    img: '/en/tenniskids.png',
    title: 'Tennis Kids Manual',
    originalPrice: '$47.90',
    desc: 'How to keep young players engaged with age-appropriate games, progressions, and motivation strategies for ages 4–8.',
  },
  {
    img: '/en/templates.png',
    title: 'Lesson Planning Templates',
    originalPrice: '$34.90',
    desc: 'Pre-built structures for 30, 45, 60, and 90-minute sessions. Just plug in drills and walk on court ready.',
  },
  {
    img: '/en/mental.png',
    title: 'Mental Game Mastery',
    originalPrice: '$87.90',
    desc: 'Teach resilience, focus, and pressure management. Visualization and mindset techniques to pass on to your students.',
  },
]

export default function Bonuses({ lang = 'pt' }) {
  const items = lang === 'en' ? EN_BONUSES : PT_BONUSES
  const freeLabel = lang === 'en' ? 'Free' : 'Grátis'
  const headingLine1 =
    lang === 'en' ? '3 Exclusive Bonus Guides — Completely Free' : '3 Bônus Exclusivos Gratuitamente'
  const subLine =
    lang === 'en'
      ? 'Added value of $167 — 100% FREE for Coaches!'
      : 'Valor agregado de R$167 — 100% GRÁTIS para Treinadores!'
  const note = lang === 'en' ? '*Included with your membership' : '*Disponível no Plano Premium'

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2 animate-bounce">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{headingLine1}</h2>
          </div>
          <p className="text-lg text-slate-600">
            {lang === 'en' ? (
              <>
                Added value of <span className="line-through text-slate-400">$167</span> —{' '}
                <span className="text-accent-500 font-bold">100% FREE for Coaches!</span>
              </>
            ) : (
              <>
                Valor agregado de <span className="line-through text-slate-400">R$167</span> —{' '}
                <span className="text-accent-500 font-bold">100% GRÁTIS para Treinadores!</span>
              </>
            )}
          </p>
          <p className="text-xs text-slate-400 mt-1">{note}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map(({ img, title, originalPrice, desc }) => (
            <div key={title}>
              <div className="h-full bg-white rounded-3xl border-2 border-teal-400 p-6 flex flex-col items-center text-center hover:shadow-2xl hover:shadow-teal-100 transition-all duration-300 group hover:-translate-y-1">
                <div className="w-full aspect-[4/3] bg-slate-50 rounded-xl mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-teal-500/0 group-hover:bg-teal-500/10 transition-colors z-10 duration-300" />
                  <img
                    src={img}
                    alt={title}
                    className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                  {title}
                </h3>
                <div className="flex flex-col items-center mb-4">
                  <span className="text-slate-400 line-through text-lg font-medium">
                    {originalPrice}
                  </span>
                  <span className="text-green-600 font-bold text-xl uppercase tracking-wider animate-pulse">
                    {freeLabel}
                  </span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
