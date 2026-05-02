import { ArrowRight, ShieldCheck } from 'lucide-react'

export default function StickyMobileBar({ onCtaClick }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-slate-200 shadow-2xl shadow-slate-900/20 px-4 py-3 flex flex-col items-center">
      <button
        onClick={onCtaClick}
        className="w-full inline-flex items-center justify-center rounded-xl font-bold bg-green-600 hover:bg-green-500 text-white px-6 py-3.5 text-base shadow-lg shadow-green-500/30 transition-all duration-200 group"
      >
        Get Pro Access — $27
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
      <div className="flex items-center gap-1.5 mt-1.5">
        <ShieldCheck className="w-3 h-3 text-orange-500 shrink-0" />
        <span className="text-slate-400 text-[10px] font-medium">7-day money back guarantee</span>
      </div>
    </div>
  )
}
