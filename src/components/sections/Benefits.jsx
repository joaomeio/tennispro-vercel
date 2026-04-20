import { Users, Star, Brain, RefreshCw } from 'lucide-react'

const PT_BENEFITS = [
  {
    icon: Users,
    iconColor: 'text-brand-500',
    title: 'Aulas em Grupo Engajadas',
    desc: 'Jogos e situações reais de jogo que funcionam perfeitamente para clínicas e aulas coletivas com níveis mistos.',
  },
  {
    icon: Star,
    iconColor: 'text-yellow-500',
    title: 'Fidelização de Alunos',
    desc: 'A novidade gera dopamina. Seus alunos vão esperar ansiosos pela próxima aula com exercícios que eles nunca fizeram.',
  },
  {
    icon: Brain,
    iconColor: 'text-purple-500',
    title: 'Treino Tático & Cognitivo',
    desc: 'Exercícios desenhados não só para técnica, mas para tomada de decisão e inteligência de jogo.',
  },
  {
    icon: RefreshCw,
    iconColor: 'text-blue-500',
    title: 'Atualizações Trimestrais',
    desc: 'O tênis evolui, e você também. Receba novos pacotes de exercícios a cada 3 meses gratuitamente.',
  },
]

const EN_BENEFITS = [
  {
    icon: Users,
    iconColor: 'text-brand-500',
    title: 'Built for Group & Private Lessons',
    desc: 'Every drill is tagged for drill-feed (solo), live ball, or group games — so you always pick what fits your session.',
  },
  {
    icon: Star,
    iconColor: 'text-yellow-500',
    title: 'Students Keep Coming Back',
    desc: "Novelty drives dopamine. Your students will look forward to every lesson because no two sessions feel the same.",
  },
  {
    icon: Brain,
    iconColor: 'text-purple-500',
    title: 'Tactical & Cognitive Drills',
    desc: 'Not just technique — the platform includes decision-making and game-intelligence drills for smarter players.',
  },
  {
    icon: RefreshCw,
    iconColor: 'text-blue-500',
    title: 'New Drills Added Regularly',
    desc: 'The platform keeps growing. New drills with fresh diagrams are added every quarter — included in your membership.',
  },
]

export default function Benefits({ lang = 'pt' }) {
  const items = lang === 'en' ? EN_BENEFITS : PT_BENEFITS
  const heading = lang === 'en' ? 'Exclusive Benefits' : 'Benefícios Exclusivos'

  return (
    <section className="py-24 bg-brand-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
            {heading}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {items.map(({ icon: Icon, iconColor, title, desc }) => (
            <div key={title}>
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-brand-200 h-full flex flex-col items-center text-center hover:-translate-y-1 group">
                <div className="bg-slate-50 p-4 rounded-xl mb-6 group-hover:bg-brand-50 transition-colors duration-300">
                  <Icon className={`w-8 h-8 ${iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-700 transition-colors">
                  {title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
