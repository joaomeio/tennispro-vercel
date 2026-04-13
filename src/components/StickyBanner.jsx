export default function StickyBanner({ text }) {
  const today = new Date().toLocaleDateString('pt-BR')
  const label = text ? text.replace('{date}', today) : `DESCONTO EXCLUSIVO HOJE (${today})`

  return (
    <div className="bg-brand-900 text-white py-2 px-4 text-center text-sm md:text-base font-medium sticky top-0 z-50 shadow-lg">
      <div className="flex items-center justify-center gap-2">
        <span className="text-base">⚠️</span>
        <span className="font-bold tracking-wide">{label}</span>
      </div>
    </div>
  )
}
