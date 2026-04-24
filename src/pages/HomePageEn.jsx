import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FloatingNotification from '../components/FloatingNotification'
import UpsellModal from '../components/UpsellModal'
import OrderBumpModal from '../components/OrderBumpModal'
import Hero from '../components/sections/Hero'
import Features from '../components/sections/Features'
import Benefits from '../components/sections/Benefits'
import Bonuses from '../components/sections/Bonuses'
import Pricing from '../components/sections/Pricing'
import FAQ from '../components/sections/FAQ'
import Guarantee from '../components/sections/Guarantee'
import Footer from '../components/Footer'
import { EN_PRICE_IDS } from '../config/checkout'

export default function HomePageEn() {
  const navigate = useNavigate()
  useEffect(() => {
    if (window.location.hash.includes('type=recovery')) {
      navigate('/welcome' + window.location.hash, { replace: true })
    }
  }, [navigate])

  const [upsellOpen, setUpsellOpen] = useState(false)
  // priceId queued for the order-bump step; null = modal closed
  const [orderBumpPriceId, setOrderBumpPriceId] = useState(null)

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Opens the order-bump modal for a given price
  function goToCheckout(priceId) {
    setUpsellOpen(false)
    setOrderBumpPriceId(priceId)
  }

  // Pricing section
  const onBasicClick = () => setUpsellOpen(true)
  const onPremiumClick = () => goToCheckout(EN_PRICE_IDS.PREMIUM)

  // Upsell modal actions
  const onUpsellConfirm = () => goToCheckout(EN_PRICE_IDS.DOWNSELL)
  const onUpsellDecline = () => goToCheckout(EN_PRICE_IDS.BASIC)

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

      <FloatingNotification lang="en" />

      {/* Step 1: upsell when basic is chosen */}
      <UpsellModal
        isOpen={upsellOpen}
        onClose={() => setUpsellOpen(false)}
        onConfirm={onUpsellConfirm}
        onDecline={onUpsellDecline}
        lang="en"
      />

      {/* Step 2: order bump before every Stripe redirect */}
      <OrderBumpModal
        isOpen={orderBumpPriceId !== null}
        priceId={orderBumpPriceId}
        onCancel={() => setOrderBumpPriceId(null)}
        lang="en"
      />

      <Hero lang="en" onCtaClick={scrollToPricing} />
      <Features lang="en" />
      <Benefits lang="en" />
      <Bonuses lang="en" />
      <Pricing lang="en" onBasicClick={onBasicClick} onPremiumClick={onPremiumClick} />
      <FAQ lang="en" />
      <Guarantee lang="en" onBuyClick={onPremiumClick} />
      <Footer lang="en" />
    </div>
  )
}
