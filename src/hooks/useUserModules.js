import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export function useUserModules() {
  const { user } = useAuth()
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { setLoading(false); return }
    supabase
      .from('user_purchases')
      .select('price_id, package_name')
      .eq('user_id', user.id)
      .then(({ data }) => {
        setPurchases(data ?? [])
        setLoading(false)
      })
  }, [user])

  function hasAccess(module) {
    if (!module) return false
    // Any paying user unlocks modules marked includedInAnyPurchase
    if (module.includedInAnyPurchase && purchases.length > 0) return true
    // Specific add-on price required
    if (module.addOnPriceId) {
      return purchases.some((p) => p.price_id === module.addOnPriceId)
    }
    return false
  }

  return { purchases, loading, hasAccess }
}
