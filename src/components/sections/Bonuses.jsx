const PT_BONUSES = [
  {
    title: 'Manual do Tennis Kids',
    originalPrice: 'R$17',
    desc: 'Jogos e progressões adaptadas para crianças de 4 a 8 anos. Retenção começa na primeira aula.',
  },
  {
    title: 'Planilha de Periodização',
    originalPrice: 'R$17',
    desc: 'Modelo editável para organizar o macrociclo dos seus atletas de competição.',
  },
  {
    title: 'Certificado Mental Game',
    originalPrice: 'R$17',
    desc: 'Psicologia do tênis: rituais, controle de ansiedade e foco para passar aos seus alunos.',
  },
]

const EN_BONUSES = [
  {
    title: 'Tennis Kids Manual',
    originalPrice: '$17',
    desc: 'Age-appropriate games and progressions for players aged 4–8. Keep young students coming back.',
  },
  {
    title: 'Lesson Planning Templates',
    originalPrice: '$17',
    desc: 'Pre-built session structures for 30, 45, 60, and 90-minute lessons. Plug in drills and go.',
  },
  {
    title: 'Mental Game Mastery',
    originalPrice: '$17',
    desc: 'Teach resilience and focus under pressure. Practical mindset tools to pass on to your students.',
  },
]

export default function Bonuses({ lang = 'pt' }) {
  const items = lang === 'en' ? EN_BONUSES : PT_BONUSES
  const freeLabel = lang === 'en' ? 'Free' : 'Grátis'
  const eyebrow = lang === 'en' ? 'Also included' : 'Também incluído'
  const heading = lang === 'en' ? 'Three bonus guides' : 'Três bônus exclusivos'
  const sub =
    lang === 'en'
      ? 'Worth $51 — included at no extra cost.'
      : 'Vale R$51 — incluídos sem custo extra.'

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-10">
          <p className="text-green-600 text-xs font-bold uppercase tracking-widest mb-3">
            {eyebrow}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
            {heading}
          </h2>
          <p className="text-slate-500 text-sm mt-2">{sub}</p>
        </div>

        <div className="divide-y divide-slate-100">
          {items.map(({ title, originalPrice, desc }, i) => (
            <div key={title} className="py-6 flex gap-5">
              <span className="text-slate-300 font-bold text-sm shrink-0 w-4 mt-0.5">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-1.5">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{title}</h3>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-slate-400 line-through text-xs">{originalPrice}</span>
                    <span className="text-green-600 font-bold text-xs uppercase tracking-wide">
                      {freeLabel}
                    </span>
                  </div>
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
