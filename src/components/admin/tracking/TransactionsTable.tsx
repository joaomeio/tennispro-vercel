import { useEffect, useState } from 'react'
import { trackingFetch } from './api'

interface TransactionsTableProps {
  range: number
}

interface Transaction {
  date: string
  email: string
  amount: number
  status: 'succeeded' | 'failed' | 'refunded'
}

const STATUS_STYLES: Record<string, string> = {
  succeeded: 'bg-green-900/40 text-green-400',
  failed: 'bg-red-900/40 text-red-400',
  refunded: 'bg-gray-700/60 text-gray-400',
}

function fmtDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

export default function TransactionsTable({ range }: TransactionsTableProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    trackingFetch(`/api/admin/analytics?source=stripe_transactions&range=${range}`)
      .then(res => setTransactions((res?.transactions ?? []).slice(0, 20)))
      .catch(e => setError(e?.response?.data?.error || e.message))
      .finally(() => setLoading(false))
  }, [range])

  return (
    <div className="bg-gray-900 rounded-2xl p-5">
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Recent Transactions</p>

      {loading && (
        <div className="animate-pulse space-y-2">
          {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-10 bg-gray-800 rounded-lg" />)}
        </div>
      )}

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr>
                {['Date', 'Email', 'Amount', 'Status'].map(h => (
                  <th key={h} className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3 pr-4">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-600 text-sm">No transactions</td>
                </tr>
              ) : (
                transactions.map((tx, i) => (
                  <tr key={i} className="hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 pr-4 text-gray-400 whitespace-nowrap">{fmtDate(tx.date)}</td>
                    <td className="py-3 pr-4 text-gray-300 truncate max-w-[200px]">{tx.email}</td>
                    <td className="py-3 pr-4 text-white font-semibold">${Number(tx.amount).toFixed(2)}</td>
                    <td className="py-3 pr-4">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[tx.status] || STATUS_STYLES.refunded}`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
