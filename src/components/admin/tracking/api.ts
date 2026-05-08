import { supabase } from '../../../lib/supabase'
import axios from 'axios'

export async function trackingFetch(url: string) {
  const { data: { session } } = await supabase.auth.getSession()
  const token = session?.access_token
  const { data } = await axios.get(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  return data
}
