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
import { PT_LINKS, handlePtCheckout } from '../config/checkout'

export default function HomePage() {
  const [upsellOpen, setUpsellOpen] = useState(false)

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }

  const openUpsell = () => setUpsellOpen(true)
  const closeUpsell = () => setUpsellOpen(false)

  const onPremium = () => handlePtCheckout(PT_LINKS.PREMIUM)
  const onUpsellConfirm = () => handlePtCheckout(PT_LINKS.PREMIUM_DISCOUNT)
  const onUpsellDecline = () => {
    closeUpsell()
    handlePtCheckout(PT_LINKS.BASIC)
  }

  return (
    <div className="bg-white text-slate-800 w-full overflow-x-hidden relative">
      <StickyBanner />
      <FloatingNotification lang="pt" />

      <UpsellModal
        isOpen={upsellOpen}
        onClose={closeUpsell}
        onConfirm={onUpsellConfirm}
        onDecline={onUpsellDecline}
        lang="pt"
      />

      <Hero lang="pt" onCtaClick={scrollToPricing} />
      <Features lang="pt" />
      <Benefits lang="pt" />
      <Bonuses lang="pt" />
      <Pricing lang="pt" onBasicClick={openUpsell} onPremiumClick={onPremium} />
      <FAQ lang="pt" />
      <Guarantee lang="pt" onBuyClick={onPremium} />
      <Footer lang="pt" />
    </div>
  )
}
