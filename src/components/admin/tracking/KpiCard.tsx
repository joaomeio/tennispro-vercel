interface KpiCardProps {
  title: string
  value: string | number | null
  change?: number
  loading?: boolean
}

export default function KpiCard({ title, value, change, loading }: KpiCardProps) {
  if (loading) {
    return (
      <div className="bg-gray-900 rounded-2xl p-4 animate-pulse">
        <div className="h-3 bg-gray-700 rounded w-2/3 mb-3" />
        <div className="h-7 bg-gray-700 rounded w-1/2 mb-2" />
        <div className="h-3 bg-gray-800 rounded w-1/3" />
      </div>
    )
  }

  const hasChange = change !== undefined && change !== null
  const isPositive = hasChange && change! >= 0

  return (
    <div className="bg-gray-900 rounded-2xl p-4">
      <p className="text-xs text-gray-500 font-medium mb-1">{title}</p>
      <p className="text-2xl font-bold text-white leading-tight">{value ?? '—'}</p>
      {hasChange && (
        <span
          className={`inline-flex items-center gap-0.5 text-xs font-semibold mt-1.5 px-1.5 py-0.5 rounded-md ${
            isPositive ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'
          }`}
        >
          {isPositive ? '↑' : '↓'} {Math.abs(change!).toFixed(1)}%
        </span>
      )}
    </div>
  )
}
