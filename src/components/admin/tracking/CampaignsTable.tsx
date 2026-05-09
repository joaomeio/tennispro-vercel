import { useEffect, useState } from 'react'
import { trackingFetch } from './api'

interface CampaignsTableProps {
  range: number
}

interface Campaign {
  name: string
  spend: number
  impressions: number
  clicks: number
  purchases: number
}

type SortKey = 'name' | 'spend' | 'impressions' | 'clicks' | 'ctr' | 'purchases' | 'cpa' | 'roas'

function fmt$(n: number) { return `$${n.toFixed(2)}` }
function fmtPct(n: number) { return `${n.toFixed(2)}%` }
function fmtNum(n: number) { return n.toLocaleString() }

function derived(c: Campaign) {
  const ctr = c.clicks > 0 && c.impressions > 0 ? (c.clicks / c.impressions) * 100 : 0
  const cpa = c.purchases > 0 ? c.spend / c.purchases : 0
  const roas = c.spend > 0 ? (c.purchases * 97) / c.spend : 0 // assume $97 AOV if unknown
  return { ...c, ctr, cpa, roas }
}

const COLS: { key: SortKey; label: string }[] = [
  { key: 'name', label: 'Campaign' },
  { key: 'spend', label: 'Spend' },
  { key: 'impressions', label: 'Impressions' },
  { key: 'clicks', label: 'Clicks' },
  { key: 'ctr', label: 'CTR' },
  { key: 'purchases', label: 'Purchases' },
  { key: 'cpa', label: 'CPA' },
  { key: 'roas', label: 'ROAS' },
]

export default function CampaignsTable({ range }: CampaignsTableProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>('spend')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    setLoading(true)
    setError(null)
    trackingFetch(`/api/admin/analytics?source=meta_campaigns&range=${range}`)
      .then(res => setCampaigns(res?.campaigns ?? []))
      .catch(e => setError(e?.response?.data?.error || e.message))
      .finally(() => setLoading(false))
  }, [range])

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const rows = campaigns
    .map(derived)
    .sort((a, b) => {
      const aVal = a[sortKey] as number | string
      const bVal = b[sortKey] as number | string
      const cmp = typeof aVal === 'string'
        ? aVal.localeCompare(bVal as string)
        : (aVal as number) - (bVal as number)
      return sortDir === 'asc' ? cmp : -cmp
    })

  return (
    <div className="bg-gray-900 rounded-2xl p-5">
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Campaigns</p>

      {loading && (
        <div className="animate-pulse space-y-2">
          {[1, 2, 3].map(i => <div key={i} className="h-10 bg-gray-800 rounded-lg" />)}
        </div>
      )}

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr>
                {COLS.map(col => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3 pr-4 cursor-pointer hover:text-gray-300 transition-colors select-none whitespace-nowrap"
                  >
                    {col.label}
                    {sortKey === col.key && (
                      <span className="ml-1 text-green-400">{sortDir === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-600 text-sm">No campaign data</td>
                </tr>
              ) : (
                rows.map((row, i) => {
                  const roasColor =
                    row.roas >= 2 ? 'text-green-400 font-semibold' :
                    row.roas < 1 && row.roas > 0 ? 'text-red-400 font-semibold' :
                    'text-gray-300'
                  return (
                    <tr key={i} className="hover:bg-gray-800/40 transition-colors">
                      <td className="py-3 pr-4 text-white font-medium truncate max-w-[180px]">{row.name}</td>
                      <td className="py-3 pr-4 text-gray-300">{fmt$(row.spend)}</td>
                      <td className="py-3 pr-4 text-gray-300">{fmtNum(row.impressions)}</td>
                      <td className="py-3 pr-4 text-gray-300">{fmtNum(row.clicks)}</td>
                      <td className="py-3 pr-4 text-gray-300">{fmtPct(row.ctr)}</td>
                      <td className="py-3 pr-4 text-gray-300">{row.purchases}</td>
                      <td className="py-3 pr-4 text-gray-300">{row.cpa > 0 ? fmt$(row.cpa) : '—'}</td>
                      <td className={`py-3 pr-4 ${roasColor}`}>
                        {row.roas > 0 ? row.roas.toFixed(2) + 'x' : '—'}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
