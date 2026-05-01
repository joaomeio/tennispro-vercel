import { ShieldCheck } from 'lucide-react'

export default function GuaranteeBadge() {
  return (
    <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs font-medium mt-3">
      <ShieldCheck className="w-3.5 h-3.5 text-orange-500 shrink-0" />
      <span>7-Day Money Back Guarantee — No Questions Asked</span>
    </div>
  )
}
