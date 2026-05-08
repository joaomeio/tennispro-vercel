import { useEffect, useState } from 'react'
import { trackingFetch } from './api'

interface FunnelChartProps {
  range: number
}

interface FunnelStep {
  name: string
  count: number
}

const STEP_COLORS = ['#1D9E75', '#17876A', '#126F56', '#0d5843']

export default function FunnelChart({ range }: FunnelChartProps) {
  const [steps, setSteps] = useState<FunnelStep[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    trackingFetch(`/api/posthog/funnel?range=${range}`)
      .then(res => {
        const raw: FunnelStep[] = res?.steps ?? []
        if (!raw.length) {
          setSteps([
            { name: 'Visitors', count: 0 },
            { name: 'Leads', count: 0 },
            { name: 'Checkout Started', count: 0 },
            { name: 'Purchases', count: 0 },
          ])
        } else {
          setSteps(raw)
        }
      })
      .catch(e => setError(e?.response?.data?.error || e.message))
      .finally(() => setLoading(false))
  }, [range])

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-2xl p-5 animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-24 mb-4" />
        <div className="space-y-2">
          {[100, 75, 55, 35].map((w, i) => (
            <div key={i} className="h-10 bg-gray-800 rounded-lg" style={{ width: `${w}%`, margin: '0 auto' }} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-900 rounded-2xl p-5">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Conversion Funnel</p>
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    )
  }

  const maxCount = steps[0]?.count || 1

  return (
    <div className="bg-gray-900 rounded-2xl p-5">
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-5">Conversion Funnel</p>
      <div className="space-y-1.5">
        {steps.map((step, i) => {
          const pct = Math.round((step.count / maxCount) * 100)
          const conversionFromPrev = i > 0 && steps[i - 1].count > 0
            ? ((step.count / steps[i - 1].count) * 100).toFixed(1)
            : null

          return (
            <div key={step.name}>
              {conversionFromPrev !== null && (
                <div className="flex items-center justify-center py-1">
                  <span className="text-xs text-gray-600">↓ {conversionFromPrev}% conversion</span>
                </div>
              )}
              <div
                className="rounded-lg flex items-center justify-between px-4 py-3 mx-auto transition-all duration-500"
                style={{
                  width: `${Math.max(pct, 25)}%`,
                  backgroundColor: STEP_COLORS[i] || STEP_COLORS[STEP_COLORS.length - 1],
                  minWidth: 220,
                }}
              >
                <span className="text-white text-sm font-medium truncate">{step.name}</span>
                <span className="text-white/80 text-sm font-bold ml-3 shrink-0">
                  {step.count.toLocaleString()}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
