import { Link } from 'react-router-dom'

export default function Footer({ lang = 'pt' }) {
  const year = new Date().getFullYear()

  if (lang === 'en') {
    return (
      <footer className="bg-brand-900 text-brand-100 py-12 text-sm text-center">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 mb-8 items-center">
            <div className="flex flex-col items-center">
              <p className="max-w-sm opacity-80 mx-auto">
                Our mission is to elevate the quality of tennis coaching worldwide, providing
                practical and accessible tools for passionate coaches.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="mb-2 opacity-80">Questions? Contact us:</p>
              <a
                href="mailto:support@tennispro.site"
                className="text-white hover:text-brand-200 font-medium"
              >
                support@tennispro.site
              </a>
            </div>
          </div>
          <div className="border-t border-brand-800 pt-8 flex flex-col items-center gap-4">
            <p className="opacity-70">© {year} All rights reserved.</p>
            <div className="flex gap-6 opacity-70 justify-center">
              <span className="hover:text-white cursor-pointer transition-colors">
                Terms of Service
              </span>
              <span className="hover:text-white cursor-pointer transition-colors">
                Privacy Policy
              </span>
              <Link
                to="/aviso-legal"
                className="hover:text-white cursor-pointer transition-colors"
              >
                Legal Notice
              </Link>
            </div>
          </div>
          <div className="mt-8 text-xs text-center text-brand-300 max-w-4xl mx-auto opacity-60">
            <p>
              This product does not guarantee immediate financial or athletic results. Success
              depends on consistent application of the methods.
            </p>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-brand-900 text-brand-100 py-12 text-sm text-center">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 mb-8 items-center">
          <div className="flex flex-col items-center">
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
            <span className="hover:text-white cursor-pointer transition-colors">Termos de Uso</span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Política de Privacidade
            </span>
            <Link to="/aviso-legal" className="hover:text-white cursor-pointer transition-colors">
              Aviso Legal
            </Link>
          </div>
        </div>
        <div className="mt-8 text-xs text-center text-brand-300 max-w-4xl mx-auto opacity-60">
          <p>
            Este produto não garanta resultados financeiros ou esportivos imediatos. O sucesso
            depende da aplicação consistente dos métodos.
          </p>
          <p>
            O coach Rafael Santos é um personagem fícticio criado para fins ilustrativos, o ebook
            foi desenvolvido a base de pesquisas na internet e tem o intuito de ajudar os
            treinadores de tênis.
          </p>
        </div>
      </div>
    </footer>
  )
}
