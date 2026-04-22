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
    // Specific allowed prices
    if (module.allowedPriceIds?.length > 0) {
      return module.allowedPriceIds.some(price => 
        purchases.some((p) => p.price_id === price)
      )
    }
    return false
  }

  return { purchases, loading, hasAccess }
}
