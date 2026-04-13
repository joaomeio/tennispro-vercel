import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'

const PT_NAMES = ['André L.', 'Marcos T.', 'Fernanda S.', 'Carlos J.', 'Ricardo M.']
const PT_LOCS = ['Rio de Janeiro, RJ', 'Curitiba, PR', 'Belo Horizonte, MG', 'Florianópolis, SC', 'São Paulo, SP']

const EN_NAMES = ['Richard M.', 'James T.', 'Sarah K.', 'Michael B.', 'Emily R.']
const EN_LOCS = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Miami, FL']

export default function FloatingNotification({ lang = 'pt' }) {
  const names = lang === 'en' ? EN_NAMES : PT_NAMES
  const locs = lang === 'en' ? EN_LOCS : PT_LOCS
  const productLabel = lang === 'en' ? 'Pro Coach Kit' : 'Kit Treinador Pro'
  const timeLabel = lang === 'en' ? 'moments ago' : 'há poucos instantes'
  const boughtLabel = lang === 'en' ? 'Purchased:' : 'Comprou:'

  const [visible, setVisible] = useState(false)
  const [name, setName] = useState(names[0])
  const [loc, setLoc] = useState(locs[0])
  const intervalRef = useRef(null)

  function showNotif(n, l) {
    setName(n)
    setLoc(l)
    setVisible(true)
    setTimeout(() => setVisible(false), 5000)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      showNotif(names[0], locs[0])
    }, 3000)

    intervalRef.current = setInterval(() => {
      const rand = Math.floor(Math.random() * names.length)
      showNotif(names[rand], locs[rand])
    }, 15000)

    return () => {
      clearTimeout(timer)
      clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div
      className={`fixed top-14 right-2 z-50 transition-all duration-700 ease-in-out transform ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white/95 border border-emerald-400 rounded-md shadow-lg shadow-emerald-900/10 p-2 flex items-center gap-2.5 backdrop-blur-sm">
        <div className="bg-emerald-500 rounded-full p-0.5 shrink-0 flex items-center justify-center shadow-sm">
          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
        </div>
        <div className="flex flex-col">
          <p className="text-slate-900 font-bold text-[10px] leading-tight">{name}</p>
          <p className="text-slate-500 text-[9px] mt-0.5 leading-none">
            {boughtLabel} <span className="font-bold text-slate-700">{productLabel}</span>
          </p>
          <p className="text-slate-400 text-[8px] mt-0.5 font-medium leading-none">
            {loc} • {timeLabel}
          </p>
        </div>
      </div>
    </div>
  )
}
