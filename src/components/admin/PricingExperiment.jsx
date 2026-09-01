import { useState, useEffect, useMemo } from 'react'
import { Loader2, AlertTriangle, Check, FlaskConical, RotateCcw } from 'lucide-react'
import {
  PRICE_VARIANTS,
  missingPriceIds,
  isSellable,
  variantConflicts,
  describeConflict,
} from '../../../stripe.config'
import { plansFor, ADDON_PRICE, ladderWarnings } from '../../config/plans'

// ─────────────────────────────────────────────────────────────────────────────
// PRICE EXPERIMENT CONTROL
//
// Pick two ladders, drag the slider, save. 0 sends everyone to A, 100 sends
// everyone to B, anything between splits live traffic.
//
// Saving bumps the config version, which re-buckets every visitor — including
// people who have been here before and already have an assignment. That is
// what makes "put everyone on B" actually mean everyone.
// ─────────────────────────────────────────────────────────────────────────────

const VARIANT_NAMES = Object.keys(PRICE_VARIANTS)

function LadderPreview({ variant, share, side }) {
  const plans = plansFor(variant)
  const missing = missingPriceIds(variant)
  const conflicts = variantConflicts(variant)
  const warnings = ladderWarnings(plans, ADDON_PRICE)

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
          {side} · {variant}
        </span>
        <span className="text-sm font-bold text-white tabular-nums">{share}%</span>
      </div>

      <div className="space-y-1.5">
        {plans.map((p) => (
          <div key={p.id} className="flex items-baseline justify-between text-sm">
            <span className="text-gray-400">{p.name}</span>
            <span className="font-bold text-white tabular-nums">${p.price}</span>
          </div>
        ))}
      </div>

      {conflicts.length > 0 && (
        <div className="mt-3 rounded-lg border border-red-900/60 bg-red-950/40 p-2.5">
          {conflicts.map((c) => (
            <p key={c.id} className="flex items-start gap-1.5 text-[11px] leading-relaxed text-red-300">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-px" />
              <span>
                <strong>Shows one price, charges another.</strong> {describeConflict(c)}
              </span>
            </p>
          ))}
        </div>
      )}

      {missing.length > 0 && (
        <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-relaxed text-amber-400">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-px" />
          <span>
            No Stripe price for {missing.join(', ')}. Paste the ids into
            PRICE_VARIANTS in stripe.config.js and deploy — until then this
            ladder can&rsquo;t take traffic.
          </span>
        </p>
      )}

      {warnings.length > 0 && (
        <ul className="mt-3 space-y-1">
          {warnings.map((w) => (
            <li key={w} className="flex items-start gap-1.5 text-[11px] leading-relaxed text-gray-500">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-px text-gray-600" />
              <span>{w}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function PricingExperiment({ apiFetch }) {
  const [config, setConfig] = useState(null)
  const [draft, setDraft] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/pricing-config')
      .then((res) => res.json())
      .then((data) => {
        setConfig(data)
        setDraft({ variantA: data.variantA, variantB: data.variantB, split: data.split })
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const dirty = useMemo(() => {
    if (!config || !draft) return false
    return (
      config.variantA !== draft.variantA ||
      config.variantB !== draft.variantB ||
      config.split !== draft.split
    )
  }, [config, draft])

  // Mirrors the server rule in api/pricing-config.js: a side only needs real
  // Stripe prices once it is actually receiving traffic, so you can stage a
  // ladder at 0% while you finish setting it up.
  const blocking = useMemo(() => {
    if (!draft) return []
    const receiving = new Set([
      ...(draft.split < 100 ? [draft.variantA] : []),
      ...(draft.split > 0 ? [draft.variantB] : []),
    ])
    return [...receiving].filter((v) => !isSellable(v))
  }, [draft])

  async function save() {
    setSaving(true)
    setError(null)
    setSaved(false)
    try {
      const updated = await apiFetch('/api/pricing-config', {
        method: 'POST',
        body: JSON.stringify(draft),
      })
      setConfig(updated)
      setDraft({
        variantA: updated.variantA,
        variantB: updated.variantB,
        split: updated.split,
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-5 h-5 text-green-400 animate-spin" />
      </div>
    )
  }

  if (!draft) {
    return (
      <p className="text-sm text-red-400 py-8 text-center">
        Couldn&rsquo;t load the pricing config. {error}
      </p>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h2 className="flex items-center gap-2 text-base font-bold text-white mb-1">
          <FlaskConical className="w-4 h-4 text-green-400" />
          Price experiment
        </h2>
        <p className="text-xs text-gray-500 leading-relaxed">
          Which price ladder visitors see. Takes effect within ~a minute — no
          deploy. Saving re-buckets everyone, including returning visitors, so
          moving the slider to 0 or 100 really does put everybody on one side.
        </p>
      </div>

      {/* Variant pickers */}
      <div className="grid grid-cols-2 gap-3">
        {['variantA', 'variantB'].map((key) => (
          <label key={key} className="block">
            <span className="block text-xs font-medium text-gray-500 mb-1.5">
              {key === 'variantA' ? 'Side A' : 'Side B'}
            </span>
            <select
              value={draft[key]}
              onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:border-green-600 focus:outline-none"
            >
              {VARIANT_NAMES.map((name) => (
                <option key={name} value={name}>
                  {name}
                  {missingPriceIds(name).length > 0 ? '  (no Stripe prices)' : ''}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>

      {/* Slider */}
      <div>
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-xs font-medium text-gray-500">Traffic split</span>
          <span className="text-xs text-gray-400 tabular-nums">
            {100 - draft.split}% <span className="text-gray-600">{draft.variantA}</span>
            {'  ·  '}
            {draft.split}% <span className="text-gray-600">{draft.variantB}</span>
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={draft.split}
          onChange={(e) => setDraft({ ...draft, split: Number(e.target.value) })}
          className="w-full accent-green-500 cursor-pointer"
        />

        <div className="flex justify-between mt-2">
          {[0, 25, 50, 75, 100].map((v) => (
            <button
              key={v}
              onClick={() => setDraft({ ...draft, split: v })}
              className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
                draft.split === v
                  ? 'bg-green-600/20 text-green-400'
                  : 'text-gray-600 hover:text-gray-400'
              }`}
            >
              {v}%
            </button>
          ))}
        </div>
      </div>

      {/* Live preview of both ladders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <LadderPreview variant={draft.variantA} share={100 - draft.split} side="Side A" />
        <LadderPreview variant={draft.variantB} share={draft.split} side="Side B" />
      </div>

      {blocking.length > 0 && (
        <p className="flex items-start gap-2 rounded-lg border border-amber-900/50 bg-amber-950/30 px-3 py-2.5 text-xs text-amber-300">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-px" />
          <span>
            <strong>{blocking.join(' and ')}</strong>{' '}
            {blocking.length > 1 ? "aren't" : "isn't"} safe to sell yet (see
            above), so {blocking.length > 1 ? 'they' : 'it'} can&rsquo;t receive
            traffic. Move the slider fully to the other side, or fix the Stripe
            prices first.
          </span>
        </p>
      )}

      {error && (
        <p className="rounded-lg border border-red-900/50 bg-red-950/30 px-3 py-2.5 text-xs text-red-300">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={!dirty || saving || blocking.length > 0}
          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-600"
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
          {saving ? 'Saving…' : 'Save & apply'}
        </button>

        {dirty && !saving && (
          <button
            onClick={() =>
              setDraft({
                variantA: config.variantA,
                variantB: config.variantB,
                split: config.split,
              })
            }
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300"
          >
            <RotateCcw className="w-3 h-3" />
            Discard
          </button>
        )}

        {saved && (
          <span className="inline-flex items-center gap-1.5 text-xs text-green-400">
            <Check className="w-3.5 h-3.5" />
            Applied — config v{config.version}
          </span>
        )}
      </div>

      <p className="text-[11px] leading-relaxed text-gray-600 border-t border-gray-800 pt-4">
        Judge the result on <strong className="text-gray-500">revenue per visitor</strong>,
        not conversion rate — a cheaper ladder nearly always wins on conversion
        and can still make less money. Break down{' '}
        <code className="text-gray-500">purchase_completed</code> by{' '}
        <code className="text-gray-500">price_variant</code> in PostHog and
        divide by the visitors each side received.
      </p>
    </div>
  )
}
