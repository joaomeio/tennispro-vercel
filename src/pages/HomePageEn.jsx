import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PlanCheckoutModal from '../components/PlanCheckoutModal'
import Hero from '../components/sections/Hero'
import AuthorityBar from '../components/sections/AuthorityBar'
import Features from '../components/sections/Features'
import Bonuses from '../components/sections/Bonuses'
import DrillPreview from '../components/sections/DrillPreview'
import Testimonials from '../components/sections/Testimonials'
import Pricing from '../components/sections/Pricing'
import FAQ from '../components/sections/FAQ'
import FinalCTA from '../components/sections/FinalCTA'
import Footer from '../components/Footer'
import Logo from '../components/Logo'
import { PLANS, getPlan, addonsForPlan } from '../config/plans'
import { createCheckoutSession, isPlaceholderPrice } from '../config/checkout'

export default function HomePageEn() {
  const navigate = useNavigate()
  useEffect(() => {
    if (window.location.hash.includes('type=recovery')) {
      navigate('/welcome' + window.location.hash, { replace: true })
    }
  }, [navigate])

  // The plan whose add-on step is open. null = no modal.
  const [planId, setPlanId] = useState(null)
  const [busyPlanId, setBusyPlanId] = useState(null)
  const [checkoutError, setCheckoutError] = useState(null)

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }

  const featuredPlan = PLANS.find((p) => p.featured) ?? PLANS[0]

  // A tier with modules left to offer opens the add-on step; the all-inclusive
  // tier has nothing to choose, so an extra screen would only cost conversions.
  async function selectPlan(plan) {
    if (addonsForPlan(plan).length > 0 || isPlaceholderPrice(plan.priceId)) {
      setPlanId(plan.id)
      return
    }
    setBusyPlanId(plan.id)
    setCheckoutError(null)
    try {
      await createCheckoutSession(plan.priceId)
    } catch (err) {
      setCheckoutError(err.message || 'Something went wrong. Please try again.')
      setBusyPlanId(null)
    }
  }

  return (
    <div className="bg-white text-slate-800 w-full overflow-x-hidden relative">
      {/* Brand mark, and a discrete sign-in link */}
      <div className="fixed top-3 left-4 z-50">
        <Logo size={24} wordmarkClass="text-slate-900 text-[15px]" />
      </div>
      <div className="fixed top-3 right-4 z-50">
        <button
          onClick={() => navigate('/welcome')}
          className="text-xs text-slate-400 hover:text-slate-600 transition-colors px-3 py-1.5 rounded-full hover:bg-slate-100"
        >
          Sign in
        </button>
      </div>

      <PlanCheckoutModal
        plan={getPlan(planId)}
        onChangePlan={setPlanId}
        onClose={() => setPlanId(null)}
      />

      {/* Nav → Hero (app on a phone) → Authority bar → Features → Drill preview
          → Testimonials → Pricing (3 tiers) → FAQ → Final CTA → Footer */}
      <Hero lang="en" onCtaClick={scrollToPricing} />
      <AuthorityBar />
      <Features lang="en" />
      <Bonuses lang="en" />
      <DrillPreview />
      <Testimonials />
      <Pricing
        lang="en"
        onSelectPlan={selectPlan}
        busyPlanId={busyPlanId}
        error={checkoutError}
      />
      <FAQ lang="en" />
      <FinalCTA plan={featuredPlan} onSelectPlan={() => selectPlan(featuredPlan)} />
      <Footer lang="en" />

    </div>
  )
}
