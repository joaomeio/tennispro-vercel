const ITEMS = [
  '200+ Drills',
  'Coaches in 30+ Countries',
  'Lifetime Access',
  'All Skill Levels',
  '7-Day Guarantee',
]

export default function AuthorityBar() {
  return (
    <div className="bg-slate-100 border-y border-slate-200 py-3.5">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:gap-x-10">
          {ITEMS.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
              <span className="text-slate-600 font-semibold text-xs md:text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
