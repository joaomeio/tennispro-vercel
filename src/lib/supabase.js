import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  console.warn(
    '[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY — create a .env.local file. Auth and database features will not work.'
  )
}

export const supabase =
  url && key
    ? createClient(url, key, {
        auth: { detectSessionInUrl: true, persistSession: true },
      })
    : null
