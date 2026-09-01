// ─────────────────────────────────────────────────────────────────────────────
// PRICE EXPERIMENT CONFIG
//
//   GET   public  — which two ladders are running and how traffic splits.
//                   Called once per cold visitor by src/context/PricingContext.
//   POST  admin   — set them. Bumps `version`, which re-buckets every visitor
//                   so a change reaches people who have already been here.
//
// The allocation lives in Supabase rather than an env var so the slider in the
// admin panel takes effect without a redeploy.
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from '@supabase/supabase-js'
import {
  isVariant,
  isSellable,
  missingPriceIds,
  variantConflicts,
  describeConflict,
} from '../stripe.config.js'

const ADMIN_EMAIL = 'joaopintobakermeio@gmail.com'
const SETTINGS_KEY = 'price_experiment'

// What we serve when the row is missing or Supabase is unreachable. Everyone
// on control: a pricing experiment is never worth failing a page load over.
const FALLBACK = { variantA: 'control', variantB: 'control', split: 0, version: 0 }

function admin() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

async function verifyAdmin(req) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) throw Object.assign(new Error('Unauthorized'), { status: 401 })
  const supabase = admin()
  const { data, error } = await supabase.auth.getUser(token)
  if (error || data?.user?.email !== ADMIN_EMAIL) {
    throw Object.assign(new Error('Forbidden'), { status: 403 })
  }
  return supabase
}

function shape(row) {
  const v = row?.value ?? {}
  return {
    variantA: isVariant(v.variantA) ? v.variantA : FALLBACK.variantA,
    variantB: isVariant(v.variantB) ? v.variantB : FALLBACK.variantB,
    split: Number.isInteger(v.split) ? Math.min(100, Math.max(0, v.split)) : 0,
    version: Number(row?.version ?? 0),
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Short CDN cache: a config change reaches everyone within ~30–90s, which
    // is instant next to an experiment that runs for weeks, and keeps a burst
    // of traffic from turning into a function invocation each.
    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60')

    try {
      const { data, error } = await admin()
        .from('app_settings')
        .select('value, version')
        .eq('key', SETTINGS_KEY)
        .maybeSingle()

      if (error) throw error
      return res.status(200).json(shape(data))
    } catch (err) {
      // Degrade to control rather than 500 — a broken experiment table must
      // not take the pricing section of the sales page down with it.
      console.error('[pricing-config] read failed, serving control:', err.message)
      return res.status(200).json(FALLBACK)
    }
  }

  if (req.method === 'POST') {
    let supabase
    try {
      supabase = await verifyAdmin(req)
    } catch (err) {
      return res.status(err.status || 500).json({ error: err.message })
    }

    const { variantA, variantB, split } = req.body || {}

    if (!isVariant(variantA) || !isVariant(variantB)) {
      return res.status(400).json({ error: 'variantA and variantB must be known variant names.' })
    }

    const pct = Number(split)
    if (!Number.isInteger(pct) || pct < 0 || pct > 100) {
      return res.status(400).json({ error: 'split must be a whole number between 0 and 100.' })
    }

    // Never point traffic at a ladder whose Stripe prices don't exist yet —
    // the cards would render inert and the visitor simply couldn't buy. Only
    // enforced for a side actually receiving traffic, so you can stage a
    // variant at 0% while you finish creating its prices.
    const receiving = [
      ...(pct < 100 ? [variantA] : []),
      ...(pct > 0 ? [variantB] : []),
    ]
    for (const variant of new Set(receiving)) {
      if (isSellable(variant)) continue

      // A pasted id that already belongs to another product is the dangerous
      // case — the page would advertise one price and Stripe would take a
      // different one — so it's reported ahead of a merely missing id.
      const conflicts = variantConflicts(variant)
      if (conflicts.length > 0) {
        return res.status(400).json({
          error:
            `Variant "${variant}" would charge a different amount than it shows. ` +
            conflicts.map(describeConflict).join(' '),
        })
      }

      return res.status(400).json({
        error:
          `Variant "${variant}" has no Stripe price id for ${missingPriceIds(variant).join(', ')}. ` +
          `Paste the ids into PRICE_VARIANTS in stripe.config.js and deploy before sending it traffic.`,
      })
    }

    try {
      // Update first so the version trigger fires; insert only if absent.
      const value = { variantA, variantB, split: pct }
      const { data, error } = await supabase
        .from('app_settings')
        .update({ value })
        .eq('key', SETTINGS_KEY)
        .select('value, version')
        .maybeSingle()

      if (error) throw error
      if (data) return res.status(200).json(shape(data))

      const { data: inserted, error: insertError } = await supabase
        .from('app_settings')
        .insert({ key: SETTINGS_KEY, value })
        .select('value, version')
        .single()

      if (insertError) throw insertError
      return res.status(200).json(shape(inserted))
    } catch (err) {
      console.error('[pricing-config] write failed:', err.message)
      return res.status(500).json({ error: err.message })
    }
  }

  res.setHeader('Allow', 'GET, POST')
  return res.status(405).json({ error: 'Method not allowed' })
}
