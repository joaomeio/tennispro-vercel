import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { sessionId, email, password } = req.body
  if (!sessionId || !email || !password) return res.status(400).json({ error: 'Missing required fields' })
  if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' })

  // Verify the Stripe session is paid and belongs to this email
  let session
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId)
  } catch {
    return res.status(400).json({ error: 'Invalid session' })
  }

  if (session.payment_status !== 'paid') {
    return res.status(400).json({ error: 'Payment not completed' })
  }

  if (session.customer_details?.email?.toLowerCase() !== email.toLowerCase()) {
    return res.status(403).json({ error: 'Email does not match session' })
  }

  // Find the user by email
  let userId
  let page = 1
  while (true) {
    const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 1000 })
    if (error) return res.status(500).json({ error: 'User lookup failed' })
    const found = users.find((u) => u.email?.toLowerCase() === email.toLowerCase())
    if (found) { userId = found.id; break }
    if (users.length < 1000) return res.status(404).json({ error: 'User not found' })
    page++
  }

  // Set the password using the admin client (no session required)
  const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(userId, { password })
  if (updateError) return res.status(500).json({ error: updateError.message })

  return res.status(200).json({ success: true })
}
