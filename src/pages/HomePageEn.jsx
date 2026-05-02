import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import OrderBumpModal from '../components/OrderBumpModal'
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
import { EN_PRICE_IDS } from '../config/checkout'

export default function HomePageEn() {
  const navigate = useNavigate()
  useEffect(() => {
    if (window.location.hash.includes('type=recovery')) {
      navigate('/welcome' + window.location.hash, { replace: true })
    }
  }, [navigate])

  const [orderBumpPriceId, setOrderBumpPriceId] = useState(null)

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }

  function goToCheckout(priceId) {
    setOrderBumpPriceId(priceId)
  }

  const onPremiumClick = () => goToCheckout(EN_PRICE_IDS.PREMIUM)

  return (
    <div className="bg-white text-slate-800 w-full overflow-x-hidden relative">
      {/* Discrete sign-in link */}
      <div className="fixed top-3 right-4 z-50">
        <button
          onClick={() => navigate('/welcome')}
          className="text-xs text-slate-400 hover:text-slate-600 transition-colors px-3 py-1.5 rounded-full hover:bg-slate-100"
        >
          Sign in
        </button>
      </div>

      <OrderBumpModal
        isOpen={orderBumpPriceId !== null}
        priceId={orderBumpPriceId}
        onCancel={() => setOrderBumpPriceId(null)}
        lang="en"
      />

      {/* Nav → Hero (with video) → Authority bar → Features → Drill preview → Testimonials → Pricing → FAQ → Final CTA → Footer */}
      <Hero lang="en" onCtaClick={scrollToPricing} onPremiumClick={onPremiumClick} />
      <AuthorityBar />
      <Features lang="en" />
      <Bonuses lang="en" />
      <DrillPreview onCtaClick={onPremiumClick} />
      <Testimonials />
      <Pricing lang="en" onPremiumClick={onPremiumClick} />
      <FAQ lang="en" />
      <FinalCTA onPremiumClick={onPremiumClick} />
      <Footer lang="en" />

    </div>
  )
}
