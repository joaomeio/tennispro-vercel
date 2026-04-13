import { useState } from 'react'
import StickyBanner from '../components/StickyBanner'
import FloatingNotification from '../components/FloatingNotification'
import UpsellModal from '../components/UpsellModal'
import Hero from '../components/sections/Hero'
import Features from '../components/sections/Features'
import Benefits from '../components/sections/Benefits'
import Bonuses from '../components/sections/Bonuses'
import Pricing from '../components/sections/Pricing'
import FAQ from '../components/sections/FAQ'
import Guarantee from '../components/sections/Guarantee'
import Footer from '../components/Footer'
import { EN_PRICE_IDS, handleEnCheckout } from '../config/checkout'

export default function HomePageEn() {
  const [upsellOpen, setUpsellOpen] = useState(false)

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }

  const openUpsell = () => setUpsellOpen(true)
  const closeUpsell = () => setUpsellOpen(false)

  const onPremium = () => handleEnCheckout(EN_PRICE_IDS.PREMIUM)
  const onUpsellConfirm = () => handleEnCheckout(EN_PRICE_IDS.PREMIUM_DISCOUNT)
  const onUpsellDecline = () => {
    closeUpsell()
    handleEnCheckout(EN_PRICE_IDS.BASIC)
  }

  return (
    <div className="bg-white text-slate-800 w-full overflow-x-hidden relative">
      <StickyBanner text="EXCLUSIVE DISCOUNT TODAY" />
      <FloatingNotification lang="en" />

      <UpsellModal
        isOpen={upsellOpen}
        onClose={closeUpsell}
        onConfirm={onUpsellConfirm}
        onDecline={onUpsellDecline}
        lang="en"
      />

      <Hero lang="en" onCtaClick={scrollToPricing} />
      <Features lang="en" />
      <Benefits lang="en" />
      <Bonuses lang="en" />
      <Pricing lang="en" onBasicClick={openUpsell} onPremiumClick={onPremium} />
      <FAQ lang="en" />
      <Guarantee lang="en" onBuyClick={onPremium} />
      <Footer lang="en" />
    </div>
  )
}
