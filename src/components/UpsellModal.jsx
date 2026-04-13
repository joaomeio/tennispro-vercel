import { AlertTriangle, ArrowRight, CheckCircle2, X } from 'lucide-react'

const PT_CONTENT = {
  header: 'Espere! Oferta Única',
  title: (
    <>
      Não vá embora com <br /> <span className="text-red-500">apenas um terço</span> do conteúdo!
    </>
  ),
  body: (
    <>
      Você escolheu o plano básico por <span className="font-bold text-slate-900">R$ 17,00</span>.
      Mas, <strong>apenas agora</strong>, queremos te oferecer o acesso vitalício ao{' '}
      <strong>Plano Premium</strong> (com +100 drills, vídeos e todos os bônus).
    </>
  ),
  discountBadge: 'Desconto de 36%',
  regularLabel: 'Normal',
  regularPrice: 'R$ 37',
  offerLabel: 'Oferta VIP',
  offerPrice: 'R$ 27',
  features: [
    '+100 Drills Extras (Total 150+)',
    '3 Bônus Exclusivos Inclusos',
    'Acesso Vitalício Garantido',
  ],
  confirmBtn: 'SIM! Quero Acesso Premium por R$ 27',
  declineBtn: 'Não, obrigado. Eu entendo que vou perder essa oferta e quero apenas o básico por R$ 17.',
}

const EN_CONTENT = {
  header: 'Wait! One-Time Offer',
  title: (
    <>
      Don't leave with <br />
      <span className="text-red-500">only a third</span> of the content!
    </>
  ),
  body: (
    <>
      You chose the basic plan for <span className="font-bold text-slate-900">$17</span>. But,{' '}
      <strong>right now</strong>, we want to offer you the <strong>Complete Library</strong> (with
      200+ drills and all 3 bonus guides).
    </>
  ),
  discountBadge: 'Save 51%',
  regularLabel: 'Regular',
  regularPrice: '$43',
  offerLabel: 'VIP Offer',
  offerPrice: '$21',
  features: [
    '200+ Professional Drills (vs 50)',
    '3 Exclusive Bonus Guides Included',
    'Lifetime Support',
  ],
  confirmBtn: 'YES! I Want Full Access for $21',
  declineBtn: "No thanks. I understand I'll miss this offer and just want the basic access for $17.",
}

export default function UpsellModal({ isOpen, onClose, onConfirm, onDecline, lang = 'pt' }) {
  const c = lang === 'en' ? EN_CONTENT : PT_CONTENT

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-zoom-in flex flex-col">
        <div className="bg-amber-500 text-white p-4 text-center font-bold text-lg uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm">
          <AlertTriangle className="w-6 h-6 fill-white text-amber-500" />
          <span>{c.header}</span>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 bg-white/10 hover:bg-black/10 rounded-full text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8 text-center flex-1 flex flex-col items-center">
          <h3 className="text-2xl font-extrabold text-slate-900 mb-2 leading-tight">{c.title}</h3>

          <p className="text-slate-600 mb-6 text-sm leading-relaxed">{c.body}</p>

          <div className="w-full mb-8 bg-green-50 border-2 border-green-200 border-dashed rounded-xl p-4 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              {c.discountBadge}
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="text-center opacity-50 grayscale">
                <span className="block text-xs font-medium">{c.regularLabel}</span>
                <span className="block text-xl font-bold line-through decoration-red-500">
                  {c.regularPrice}
                </span>
              </div>
              <ArrowRight className="text-green-500 w-5 h-5" />
              <div className="text-center transform scale-110">
                <span className="block text-xs font-bold text-green-700">{c.offerLabel}</span>
                <span className="block text-4xl font-extrabold text-green-600 tracking-tighter">
                  {c.offerPrice}
                </span>
              </div>
            </div>
          </div>

          <ul className="text-left text-sm text-slate-600 space-y-2 mb-8 w-full bg-slate-50 p-4 rounded-lg">
            {c.features.map((f, i) => (
              <li key={i} className="flex gap-2 items-center">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={onConfirm}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-green-500/30 flex items-center justify-center gap-2 mb-4 animate-heartbeat group transition-all"
          >
            {c.confirmBtn}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onDecline}
            className="text-slate-400 hover:text-slate-600 text-xs md:text-sm font-medium underline transition-colors px-4 py-2"
          >
            {c.declineBtn}
          </button>
        </div>
      </div>
    </div>
  )
}
