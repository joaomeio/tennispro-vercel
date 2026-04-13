import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowLeft, Mail, ShieldCheck } from 'lucide-react'

const sections = [
  {
    title: '1) Resultados e desempenho',
    body: 'O Tennis Pro oferece materiais digitais (ex.: drills, roteiros de treino, PDFs e bônus) com objetivo de apoiar professores e treinadores de tênis. Não garantimos resultados específicos (financeiros, esportivos, técnicos ou de fidelização de alunos), pois o desempenho depende de fatores individuais, como aplicação consistente, didática, contexto da turma, nível do aluno, frequência, infraestrutura, condição física, entre outros.',
  },
  {
    title: '2) Conteúdo educacional (não é consultoria individual)',
    body: 'O conteúdo disponibilizado não substitui acompanhamento profissional individual (ex.: avaliação física, fisioterapia, medicina esportiva, nutrição ou psicologia), nem constitui consultoria personalizada para um caso específico. Em caso de dor, lesão ou qualquer condição médica, procure um profissional habilitado.',
  },
  {
    title: '3) Responsabilidade do usuário',
    body: 'Você é responsável por adaptar os exercícios à realidade do aluno (idade, nível, experiência, limitações, histórico de lesões e objetivos). Recomenda-se realizar aquecimento adequado, progressão segura e supervisão durante a execução dos drills. O Tennis Pro não se responsabiliza por uso indevido do material, aplicação sem critérios ou execução sem orientação.',
  },
  {
    title: '4) Depoimentos e exemplos',
    body: 'Depoimentos, simulações e exemplos (quando exibidos) representam experiências individuais e não constituem promessa de resultado. Seus resultados podem variar.',
  },
  {
    title: '5) Direitos autorais e uso do material',
    body: 'Todo o conteúdo (PDFs, vídeos, textos, artes e bônus) é protegido por direitos autorais. É proibida a reprodução, distribuição, revenda, compartilhamento público ou disponibilização em grupos/drive sem autorização expressa. A compra concede uma licença de uso pessoal/profissional para aplicação com seus alunos, sem transferência de propriedade intelectual.',
  },
  {
    title: '6) Atualizações e disponibilidade',
    body: 'Quando mencionamos atualizações, elas podem ocorrer conforme calendário interno, disponibilidade e evolução do produto. Poderemos alterar, atualizar, suspender ou descontinuar conteúdos a qualquer momento, respeitando a legislação aplicável e o que for ofertado no momento da compra.',
  },
  {
    title: '7) Contato',
    body: null,
    contact: true,
  },
]

export default function AvisoLegal() {
  const year = new Date().getFullYear()

  return (
    <div className="bg-white text-slate-800 w-full overflow-x-hidden relative">
      {/* Banner */}
      <div className="bg-brand-900 text-white py-2 px-4 text-center text-sm md:text-base font-medium sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-center gap-2">
          <span className="text-base">ℹ️</span>
          <span className="font-bold tracking-wide">AVISO LEGAL</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-gradient-to-b from-white to-brand-50 pt-16 pb-14 md:pt-20 md:pb-16 overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full shadow-md border border-brand-100 mb-6 cursor-default">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs md:text-sm font-bold text-slate-600 uppercase tracking-widest">
                Tennis Pro Coach
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">
              Aviso Legal
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Leia com atenção as informações abaixo antes de adquirir e/ou utilizar nossos
              materiais digitais.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:-translate-y-0.5"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar ao site
              </Link>
              <a
                href="mailto:suporte@tennispro.site"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-green-500/30 transition-all hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" />
                Falar com suporte
              </a>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 pointer-events-none opacity-40">
          <div className="absolute top-[-20%] left-[-10%] w-[420px] h-[420px] bg-brand-200 rounded-full blur-[120px] mix-blend-multiply animate-float" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[520px] h-[520px] bg-blue-100 rounded-full blur-[100px] mix-blend-multiply animate-float-delayed" />
        </div>
      </section>

      {/* Content */}
      <main className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 animate-fade-in">
            <div className="flex items-start gap-3 mb-6">
              <div className="bg-amber-500 text-white rounded-xl p-2 shadow-sm shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-tight">
                  Declarações importantes
                </h2>
                <p className="text-slate-500 text-sm md:text-base mt-1 leading-relaxed">
                  Este conteúdo tem caráter educativo e informativo. Ao utilizar este site e/ou
                  adquirir nossos produtos, você concorda com os termos abaixo.
                </p>
              </div>
            </div>

            <div className="space-y-8 text-slate-700 leading-relaxed">
              {sections.map(({ title, body, contact }) => (
                <section key={title}>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">{title}</h3>
                  {contact ? (
                    <p className="text-slate-600">
                      Em caso de dúvidas, fale conosco pelo e-mail:{' '}
                      <a
                        href="mailto:suporte@tennispro.site"
                        className="text-brand-600 font-bold underline hover:text-brand-700"
                      >
                        suporte@tennispro.site
                      </a>
                      .
                    </p>
                  ) : (
                    <p className="text-slate-600">{body}</p>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <p className="text-xs md:text-sm text-slate-500">
                Última atualização:{' '}
                <span className="font-bold text-slate-700">30/01/2026</span>
              </p>
              <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span>Conteúdo informativo • Uso responsável</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-brand-900 text-brand-100 py-12 text-sm text-center">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 mb-8 items-center">
            <div className="flex flex-col items-center">
              <h5 className="text-white font-bold text-lg mb-4">Tennis Pro Coach</h5>
              <p className="max-w-sm opacity-80 mx-auto">
                Nossa missão é elevar o nível do ensino de tênis no Brasil, fornecendo ferramentas
                práticas e acessíveis para treinadores apaixonados.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="mb-2 opacity-80">Dúvidas? Entre em contato:</p>
              <a
                href="mailto:suporte@tennispro.site"
                className="text-white hover:text-brand-200 font-medium"
              >
                suporte@tennispro.site
              </a>
            </div>
          </div>
          <div className="border-t border-brand-800 pt-8 flex flex-col items-center gap-4">
            <p className="opacity-70">© {year} Todos os direitos reservados.</p>
            <div className="flex gap-6 opacity-70 justify-center">
              <span className="hover:text-white transition-colors cursor-pointer">Termos de Uso</span>
              <span className="hover:text-white transition-colors cursor-pointer">Política de Privacidade</span>
              <Link to="/aviso-legal" className="hover:text-white transition-colors font-bold text-white">
                Aviso Legal
              </Link>
            </div>
          </div>
          <div className="mt-8 text-xs text-center text-brand-300 max-w-4xl mx-auto opacity-60">
            <p>
              Este produto não garante resultados financeiros ou esportivos imediatos. O sucesso
              depende da aplicação consistente dos métodos.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
