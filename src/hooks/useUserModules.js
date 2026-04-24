import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export function useUserModules() {
  const { user } = useAuth()
  const [unlockedModules, setUnlockedModules] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchModules = useCallback(() => {
    if (!user) { setLoading(false); return }
    supabase
      .from('user_modules')
      .select('module_id')
      .eq('user_id', user.id)
      .then(({ data }) => {
        setUnlockedModules(data?.map(d => d.module_id) ?? [])
        setLoading(false)
      })
  }, [user])

  useEffect(() => { fetchModules() }, [fetchModules])

  function hasAccess(module) {
    if (!module) return false
    // If it's a module explicitly locked with comingSoon
    if (module.comingSoon) return false
    
    // Always trust the database first
    if (unlockedModules.includes(module.id)) return true
    
    // Fallback: if it's set as included in any purchase on the frontend, AND they own at least one module
    if (module.includedInAnyPurchase && unlockedModules.length > 0) return true
    
    return false
  }

  return { unlockedModules, loading, hasAccess, refresh: fetchModules }
}
