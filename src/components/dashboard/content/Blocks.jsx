import { createContext, useContext } from 'react'
import { Check, X as XIcon, AlertTriangle } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// Shared content blocks for module part pages.
//
// Every non-drill module page is composed from these so the whole set reads as
// one publication: ink surfaces, hairline borders, a single per-module accent
// that flows in via <ModuleTheme>. Blocks never hardcode a hue.
// ─────────────────────────────────────────────────────────────────────────────

const ThemeContext = createContext({ accent: '#4ade80' })

export function ModuleTheme({ accent, children }) {
  return <ThemeContext.Provider value={{ accent }}>{children}</ThemeContext.Provider>
}

export function useAccent() {
  return useContext(ThemeContext).accent
}

// Card — the base surface every block sits on.
export function Card({ children, className = '' }) {
  return (
    <div className={`bg-ink-900 rounded-2xl border border-white/[0.06] p-5 sm:p-6 ${className}`}>
      {children}
    </div>
  )
}

// SectionTitle — accent tick + heading, same grammar as the drill group headings.
export function SectionTitle({ children, sub }) {
  const accent = useAccent()
  return (
    <div className="mb-4">
      <div className="flex items-baseline gap-2.5">
        <span className="w-1 h-4 rounded-full shrink-0 translate-y-[2px]" style={{ backgroundColor: accent }} />
        <h2 className="text-white font-bold text-[15px] sm:text-base tracking-tight">{children}</h2>
      </div>
      {sub && <p className="text-gray-500 text-xs leading-relaxed mt-1.5 ml-3.5">{sub}</p>}
    </div>
  )
}

// Lead — opening paragraph of a page, set larger than body copy.
export function Lead({ children }) {
  return <p className="text-gray-300 text-sm sm:text-[15px] leading-relaxed">{children}</p>
}

export function Body({ children, className = '' }) {
  return <p className={`text-gray-400 text-[13px] leading-relaxed ${className}`}>{children}</p>
}

// Callout — the one thing on the page the reader must not miss.
export function Callout({ children, label }) {
  const accent = useAccent()
  return (
    <div
      className="rounded-xl p-4 border-l-[3px]"
      style={{ backgroundColor: `${accent}14`, borderLeftColor: accent }}
    >
      {label && (
        <p className="text-[10px] font-black uppercase tracking-[0.18em] mb-1.5" style={{ color: accent }}>
          {label}
        </p>
      )}
      <div className="text-gray-200 text-[13px] font-medium leading-relaxed">{children}</div>
    </div>
  )
}

// StatRow — a strip of headline numbers with support lines.
export function StatRow({ stats }) {
  const accent = useAccent()
  return (
    <div className={`grid gap-3 ${stats.length >= 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-3'}`}>
      {stats.map(({ value, label }) => (
        <div key={label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
          <p className="text-2xl font-extrabold tracking-tight tabular-nums" style={{ color: accent }}>
            {value}
          </p>
          <p className="text-gray-400 text-[11px] leading-snug mt-1">{label}</p>
        </div>
      ))}
    </div>
  )
}

// StepList — numbered progression. Items: { title, body }.
export function StepList({ steps }) {
  const accent = useAccent()
  return (
    <div className="space-y-2.5">
      {steps.map(({ title, body }, i) => (
        <div key={title} className="flex gap-3.5 bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-extrabold shrink-0 tabular-nums"
            style={{ backgroundColor: `${accent}1f`, color: accent }}
          >
            {i + 1}
          </span>
          <div className="min-w-0">
            <p className="text-white font-semibold text-[13px] mb-0.5">{title}</p>
            <p className="text-gray-400 text-xs leading-relaxed">{body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// CueGrid — short labelled facts in a responsive grid. Items: { label, value }.
export function CueGrid({ items, cols = 3 }) {
  const accent = useAccent()
  const colClass = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4' }[cols] ?? 'sm:grid-cols-3'
  return (
    <div className={`grid grid-cols-1 ${colClass} gap-3`}>
      {items.map(({ label, value }) => (
        <div key={label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-1" style={{ color: accent }}>
            {label}
          </p>
          <p className="text-gray-300 text-xs leading-relaxed">{value}</p>
        </div>
      ))}
    </div>
  )
}

// DoDont — correct vs fault pairs. Items: { title, do: '…', dont: '…' }.
export function DoDont({ items }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {items.map(({ title, do: good, dont }) => (
        <div key={title} className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
          <p className="text-white font-semibold text-[13px] mb-2.5">{title}</p>
          <div className="flex items-start gap-2 mb-1.5">
            <Check className="w-3.5 h-3.5 text-green-400 shrink-0 mt-[1px]" />
            <p className="text-xs text-gray-300 leading-relaxed">{good}</p>
          </div>
          <div className="flex items-start gap-2">
            <XIcon className="w-3.5 h-3.5 text-red-400/90 shrink-0 mt-[1px]" />
            <p className="text-xs text-gray-500 leading-relaxed">{dont}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// Checklist — flat list with accent ticks.
export function Checklist({ items }) {
  const accent = useAccent()
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-3">
          <span
            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-[1px]"
            style={{ backgroundColor: `${accent}1f` }}
          >
            <Check className="w-3 h-3" style={{ color: accent }} />
          </span>
          <p className="text-[13px] text-gray-300 leading-relaxed">{item}</p>
        </div>
      ))}
    </div>
  )
}

// FaultFix — diagnosis list. Items: { fault, fix }.
export function FaultFix({ items }) {
  return (
    <div className="space-y-2">
      {items.map(({ fault, fix }) => (
        <div key={fault} className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
          <div className="flex items-start gap-2 mb-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-[1px]" />
            <p className="text-[13px] font-semibold text-gray-200 leading-snug">{fault}</p>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed ml-[22px]">{fix}</p>
        </div>
      ))}
    </div>
  )
}

// TimeBlocks — a session laid out on a clock. Items: { time, title, body }.
export function TimeBlocks({ blocks }) {
  const accent = useAccent()
  return (
    <div className="space-y-2.5">
      {blocks.map(({ time, title, body }) => (
        <div key={`${time}-${title}`} className="flex gap-4 bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
          <span
            className="shrink-0 h-fit text-[11px] font-black px-2 py-1 rounded-md whitespace-nowrap tabular-nums"
            style={{ backgroundColor: `${accent}1f`, color: accent }}
          >
            {time}
          </span>
          <div className="min-w-0">
            <p className="text-white font-semibold text-[13px] mb-0.5">{title}</p>
            <p className="text-gray-400 text-xs leading-relaxed">{body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// DataTable — headers: string[], rows: string[][]. First column is the row label.
export function DataTable({ headers, rows }) {
  const accent = useAccent()
  return (
    <div className="overflow-x-auto -mx-1 px-1">
      <table className="w-full text-left border-separate border-spacing-0 min-w-[480px]">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={h}
                className={`text-[10px] font-bold uppercase tracking-[0.12em] pb-2.5 pr-4 ${i === 0 ? '' : ''}`}
                style={{ color: accent }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`text-xs leading-relaxed py-2.5 pr-4 border-t border-white/[0.05] align-top ${
                    ci === 0 ? 'text-gray-200 font-semibold whitespace-nowrap' : 'text-gray-400'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Figure — instructional diagram with caption. Images live in /public/diagrams.
export function Figure({ src, alt, caption }) {
  return (
    <figure>
      <div className="rounded-xl overflow-hidden border border-white/[0.07] bg-ink-850">
        <img src={src} alt={alt} loading="lazy" className="w-full h-auto block" />
      </div>
      {caption && (
        <figcaption className="text-gray-500 text-[11px] leading-relaxed mt-2.5 px-1">{caption}</figcaption>
      )}
    </figure>
  )
}

// Quote — a principle worth remembering, set apart from body copy.
export function Quote({ children, source }) {
  const accent = useAccent()
  return (
    <div className="px-5 py-4">
      <p className="text-gray-200 text-[15px] font-medium leading-relaxed italic" style={{ borderColor: accent }}>
        “{children}”
      </p>
      {source && <p className="text-gray-500 text-[11px] mt-2">— {source}</p>}
    </div>
  )
}
