import { useEffect, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts'
import { trackingFetch } from './api'

interface RevenueChartProps {
  range: number
}

interface DayPoint {
  date: string
  revenue: number
  adSpend: number
}

function fmtMMDD(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function CurrencyTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-xs shadow-xl">
      <p className="text-gray-400 mb-1">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.dataKey} style={{ color: entry.color }} className="font-semibold">
          {entry.name}: ${Number(entry.value).toFixed(2)}
        </p>
      ))}
    </div>
  )
}

export default function RevenueChart({ range }: RevenueChartProps) {
  const [data, setData] = useState<DayPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    trackingFetch(`/api/admin/analytics?source=stripe_summary&range=${range}`)
      .then(res => setData(res?.daily ?? []))
      .catch(e => setError(e?.response?.data?.error || e.message))
      .finally(() => setLoading(false))
  }, [range])

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-2xl p-5 animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-32 mb-4" />
        <div className="h-52 bg-gray-800 rounded-xl" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-900 rounded-2xl p-5">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Revenue vs Ad Spend</p>
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    )
  }

  const chartData = data.map(d => ({ ...d, label: fmtMMDD(d.date) }))

  return (
    <div className="bg-gray-900 rounded-2xl p-5">
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Revenue vs Ad Spend</p>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis
            dataKey="label"
            tick={{ fill: '#6b7280', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: '#6b7280', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `$${v}`}
            width={50}
          />
          <Tooltip content={<CurrencyTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 12, color: '#9ca3af', paddingTop: 8 }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke="#1D9E75"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#1D9E75' }}
          />
          <Line
            type="monotone"
            dataKey="adSpend"
            name="Ad Spend"
            stroke="#378ADD"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#378ADD' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
