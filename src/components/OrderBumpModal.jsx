import { useState } from 'react'
import { ArrowRight, Gift, Loader2, X, CheckSquare, Square } from 'lucide-react'
import { createCheckoutSession } from '../config/checkout'

const COPY = {
  en: {
    title: 'One last step before checkout',
    bumpHeading: 'Add to your order:',
    bumpName: 'Coaching Planner Kit',
    bumpDesc:
      'A complete season planner with periodization templates, lesson structure sheets, and a student progress tracker. Everything a professional coach needs to stay organised.',
    bumpPrice: '+$9',
    bumpOriginal: '$29',
    checkLabel: 'Yes! Add the Coaching Planner Kit to my order for just $9.',
    ctaDefault: 'Complete Purchase',
    ctaLoading: 'Redirecting...',
    errorPrefix: 'Something went wrong:',
    cancel: 'Cancel',
  },
  pt: {
    title: 'Último passo antes do pagamento',
    bumpHeading: 'Adicione ao seu pedido:',
    bumpName: 'Kit Planner do Treinador',
    bumpDesc:
      'Um planejador completo da temporada com modelos de periodização, fichas de estrutura de aula e rastreador de progresso dos alunos. Tudo que um treinador profissional precisa para se organizar.',
    bumpPrice: '+R$29',
    bumpOriginal: 'R$97',
    checkLabel: 'Sim! Adicionar o Kit Planner ao meu pedido por apenas R$29.',
    ctaDefault: 'Finalizar Compra',
    ctaLoading: 'Redirecionando...',
    errorPrefix: 'Algo deu errado:',
    cancel: 'Cancelar',
  },
}

export default function OrderBumpModal({ isOpen, priceId, onCancel, lang = 'en' }) {
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const c = COPY[lang] ?? COPY.en

  if (!isOpen) return null

  async function handleProceed() {
    setLoading(true)
    setError(null)
    try {
      await createCheckoutSession(priceId, checked)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm cursor-pointer"
        onClick={!loading ? onCancel : undefined}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-zoom-in">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between border-b border-slate-100">
          <div>
            <p className="font-bold text-slate-900 text-base">{c.title}</p>
            <p className="text-slate-400 text-xs mt-0.5 uppercase tracking-wider">{c.bumpHeading}</p>
          </div>
          {!loading && (
            <button
              onClick={onCancel}
              className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600 ml-4 shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="p-6 flex flex-col gap-5">
          {/* Product card */}
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            {/* Product info row */}
            <div className="p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                <Gift className="w-5 h-5 text-amber-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 text-base leading-tight">{c.bumpName}</p>
                <p className="text-slate-500 text-sm leading-relaxed mt-1.5">{c.bumpDesc}</p>
              </div>
              <div className="text-right shrink-0 pl-2">
                <p className="text-slate-400 line-through text-xs font-medium">{c.bumpOriginal}</p>
                <p className="text-green-600 font-extrabold text-xl leading-tight">{c.bumpPrice}</p>
              </div>
            </div>

            {/* Checkbox row */}
            <button
              onClick={() => setChecked((v) => !v)}
              disabled={loading}
              className="w-full flex items-center gap-3 px-5 py-3.5 border-t transition-colors text-left disabled:opacity-60"
              style={{
                backgroundColor: checked ? '#f0fdf4' : '#f8fafc',
                borderColor: checked ? '#bbf7d0' : '#e2e8f0',
              }}
            >
              {checked ? (
                <CheckSquare className="w-5 h-5 text-green-600 shrink-0" />
              ) : (
                <Square className="w-5 h-5 text-slate-400 shrink-0" />
              )}
              <span
                className="text-sm font-semibold leading-snug"
                style={{ color: checked ? '#166534' : '#64748b' }}
              >
                {c.checkLabel}
              </span>
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              {c.errorPrefix} {error}
            </p>
          )}

          {/* CTA */}
          <button
            onClick={handleProceed}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-base shadow-lg shadow-green-500/30 flex items-center justify-center gap-2 transition-all animate-heartbeat"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {c.ctaLoading}
              </>
            ) : (
              <>
                {c.ctaDefault}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
