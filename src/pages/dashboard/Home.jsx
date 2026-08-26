import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play, Lock, ChevronRight, ChevronLeft } from 'lucide-react'
import AddonPaywallModal from '../../components/AddonPaywallModal'
import CardArt, { HeroArt } from '../../components/dashboard/CardArt'
import { MODULES } from '../../config/modules'
import { MODULE_CARDS, MODULES_WITH_CONTENT, DRILL_CATEGORIES } from '../../config/catalog'
import { useUserModules } from '../../hooks/useUserModules'

// ─────────────────────────────────────────────────────────────────────────────
// Browse screen: a featured hero, then one horizontal row per module.
//
// Cards are square art tiles with the caption set below the artwork rather
// than overlaid on it — the generated posters keep their lower half dark for
// overlay text, and stacking a caption there made every card read half-empty.
//
// Rows come from config/modules.js; the cards inside them from config/catalog.js.
// ─────────────────────────────────────────────────────────────────────────────

const DRILL_COUNT = DRILL_CATEGORIES.reduce((n, c) => n + (c.count ?? 0), 0)

// ── Tile card ───────────────────────────────────────────────────────────────

// Artwork is drawn SVG (CardArt) — motif and palette come from the card's
// entry in config/catalog.js.
function TileCard({ card, vi = 0, locked, onOpen }) {
  return (
    <button
      onClick={() => onOpen(card)}
      className="group shrink-0 w-[136px] sm:w-[168px] snap-start text-left focus:outline-none cursor-pointer"
      aria-label={locked ? `${card.title} — locked` : card.title}
    >
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-ink-850 border border-white/[0.06] transition duration-300 group-hover:border-white/[0.2] group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-green-500">
        <div
          className={`w-full h-full transition duration-300 group-hover:scale-[1.05] ${
            locked ? 'opacity-55 saturate-[0.55]' : ''
          }`}
        >
          <CardArt card={card} vi={vi} />
        </div>

        {locked && (
          <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center">
            <Lock className="w-3.5 h-3.5 text-amber-300" />
          </span>
        )}

        {/* Hover affordance, pointer devices only */}
        <span className="absolute inset-0 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/25">
          <span className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            {locked ? (
              <Lock className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            )}
          </span>
        </span>
      </div>

      <p className="mt-2.5 text-[13px] font-semibold text-gray-200 leading-snug truncate group-hover:text-white transition-colors">
        {card.title}
      </p>
      <p className="text-[11px] text-gray-500 mt-0.5 tabular-nums">
        {card.count != null ? `${card.count} drills` : card.subtitle ?? 'Soon'}
      </p>
    </button>
  )
}

// ── Row ─────────────────────────────────────────────────────────────────────

function Row({ module, cards, locked, onOpen, onTitleClick }) {
  const scroller = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const sync = useCallback(() => {
    const el = scroller.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    sync()
    const el = scroller.current
    if (!el) return
    el.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      el.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [sync])

  function nudge(direction) {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section className="mb-9 sm:mb-11">
      <div className="flex items-center justify-between px-4 sm:px-8 mb-3">
        <button
          onClick={onTitleClick}
          className="group flex items-center gap-2 min-w-0 cursor-pointer"
        >
          <h2 className="text-white font-bold text-[15px] sm:text-lg tracking-tight truncate">
            {module.title}
          </h2>
          {locked && (
            <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-300/90 bg-amber-500/10 border border-amber-500/20 rounded-full px-2 py-0.5">
              <Lock className="w-2.5 h-2.5" />
              {module.isAddon ? 'Add-on' : 'Locked'}
            </span>
          )}
          <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-green-400 group-hover:translate-x-0.5 transition shrink-0" />
        </button>

        {/* Arrows are a pointer-device affordance; touch users just swipe */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={() => nudge(-1)}
            disabled={atStart}
            aria-label={`Scroll ${module.title} left`}
            className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.1] disabled:opacity-25 disabled:pointer-events-none transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => nudge(1)}
            disabled={atEnd}
            aria-label={`Scroll ${module.title} right`}
            className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.1] disabled:opacity-25 disabled:pointer-events-none transition cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* scroll-pl must match the horizontal padding: with `snap-mandatory` the
          browser aligns the first card to the scrollport edge and swallows the
          padding, leaving the row visibly out of line with its own heading.
          pt/-mt keep the hover lift from clipping against the scrollport. */}
      <div
        ref={scroller}
        className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-pl-4 sm:scroll-pl-8 px-4 sm:px-8 pt-2 -mt-2 pb-1"
      >
        {cards.map((card, i) => (
          <TileCard key={card.key} card={card} vi={i} locked={locked} onOpen={onOpen} />
        ))}
      </div>
    </section>
  )
}

// ── Hero ────────────────────────────────────────────────────────────────────

function Hero({ onOpen }) {
  const [artFailed, setArtFailed] = useState(false)

  return (
    <div className="relative w-full h-[320px] sm:h-[420px] overflow-hidden">
      <div className="absolute inset-0">
        {artFailed ? (
          <HeroArt />
        ) : (
          <img
            src="/cards/hero.webp"
            alt=""
            onError={() => setArtFailed(true)}
            className="w-full h-full object-cover object-right"
          />
        )}
      </div>

      {/* Two scrims: bottom for the copy, left for wide screens */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/25 to-transparent" />

      <div className="relative h-full flex flex-col justify-end px-4 sm:px-8 pb-8 sm:pb-10 max-w-xl">
        <span className="text-green-400 text-[10px] font-black uppercase tracking-[0.22em] mb-2.5">
          Your library
        </span>
        <h1 className="text-white text-[28px] sm:text-[42px] font-extrabold tracking-tight leading-[1.08] mb-3">
          {DRILL_COUNT} drills, ready
          <br />
          for your next lesson
        </h1>
        <p className="text-gray-300/90 text-[13px] sm:text-[15px] mb-5 max-w-sm leading-relaxed">
          Every drill with setup, step-by-step instructions, coaching cues and
          court diagrams.
        </p>
        <button
          onClick={() => onOpen(null)}
          className="inline-flex items-center gap-2 bg-white text-ink-950 font-bold text-sm px-5 py-2.5 rounded-xl w-fit hover:bg-gray-200 active:scale-[0.97] transition cursor-pointer"
        >
          <Play className="w-4 h-4 fill-ink-950" />
          Browse drills
        </button>
      </div>
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  const { hasAccess, loading, refresh } = useUserModules()
  const [paywallModule, setPaywallModule] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sessionId = params.get('session_id')
    if (!sessionId) return

    // Clean the URL immediately so a refresh doesn't re-provision
    navigate('/dashboard', { replace: true })

    fetch('/api/provision-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    })
      .then((r) => r.json())
      .then((data) => { if (data.success) refresh() })
      .catch(() => {})
  }, [])

  if (loading) return null

  // Owned modules first, locked ones after — locked rows stay visible so they
  // remain a route to purchase rather than disappearing.
  const rows = MODULES.filter((m) => MODULE_CARDS[m.id]?.length)
  const owned = rows.filter((m) => hasAccess(m))
  const lockedRows = rows.filter((m) => !hasAccess(m))

  function openModule(module) {
    if (!hasAccess(module)) {
      if (module.isAddon) return setPaywallModule(module)
      return navigate('/dashboard/settings')
    }
    navigate(module.route)
  }

  function openCard(module, card) {
    if (!hasAccess(module)) {
      if (module.isAddon) return setPaywallModule(module)
      return navigate('/dashboard/settings')
    }
    // Every card deep-links now: drills scope the library via query param,
    // content modules open the part's own screen.
    if (MODULES_WITH_CONTENT.has(module.id) && card?.key) {
      return navigate(
        module.id === 'drills'
          ? `${module.route}?c=${card.key}`
          : `${module.route}/${card.key}`
      )
    }
    navigate(module.route)
  }

  const drills = MODULES.find((m) => m.id === 'drills')

  return (
    <div className="min-h-full bg-ink-950 pb-14">
      <Hero
        onOpen={() => (drills && hasAccess(drills) ? navigate(drills.route) : navigate('/dashboard/settings'))}
      />

      {/* Rows lift over the hero's lower edge */}
      <div className="relative -mt-2">
        {[...owned, ...lockedRows].map((module) => (
          <Row
            key={module.id}
            module={module}
            cards={MODULE_CARDS[module.id]}
            locked={!hasAccess(module)}
            onOpen={(card) => openCard(module, card)}
            onTitleClick={() => openModule(module)}
          />
        ))}
      </div>

      {paywallModule && (
        <AddonPaywallModal module={paywallModule} onClose={() => setPaywallModule(null)} />
      )}
    </div>
  )
}
