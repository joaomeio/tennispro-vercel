import { Check, Mail, Download, Lock } from 'lucide-react'

export default function Obrigado() {
  const date = new Date().toLocaleDateString('pt-BR')

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="h-2 bg-gradient-to-r from-emerald-400 to-emerald-600 w-full" />

        <div className="p-8 md:p-12">
          {/* Success Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6 shadow-inner">
              <Check className="w-10 h-10 text-emerald-600" strokeWidth={3} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Obrigado pela sua compra!
            </h1>
            <p className="text-lg text-gray-600 max-w-lg mx-auto">
              Seu pedido foi confirmado com sucesso. Você receberá um e-mail com os detalhes da
              transação em instantes.
            </p>
          </div>

          {/* Order Date */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-10 border border-gray-100 flex justify-center items-center">
            <div className="text-center">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Data da Compra
              </span>
              <p className="text-gray-900 font-medium mt-1">{date}</p>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">
              Como acessar seu material
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="relative p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute -top-3 left-6 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded">
                  PASSO 1
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Verifique o E-mail</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Enviamos um link de acesso para o seu endereço de e-mail cadastrado. Verifique
                  também a caixa de spam.
                </p>
              </div>

              <div className="relative p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute -top-3 left-6 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded">
                  PASSO 2
                </div>
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mb-4 text-purple-600">
                  <Download className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Faça o Download</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Clique no botão de download dentro do e-mail para baixar o arquivo do seu
                  material (PDF ou ZIP).
                </p>
              </div>

              <div className="relative p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute -top-3 left-6 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded">
                  PASSO 3
                </div>
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mb-4 text-orange-600">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Acesse</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Se o arquivo estiver protegido, utilize a senha enviada junto com o comprovante
                  para desbloquear.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Precisa de ajuda?{' '}
              <a
                href="mailto:suporte@tennispro.site"
                className="text-emerald-600 underline hover:text-emerald-700"
              >
                Fale com o suporte
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
