import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import express from 'express'

// Dynamic imports — must come after dotenv.config() so module-level Stripe/Supabase
// clients pick up the env vars from .env.local before they initialise.
const [
  { default: createCheckout },
  { default: provisionAccess },
  { default: activateAccount },
  { default: stripeWebhook },
  { default: sessionEmail },
  { default: sendEmail },
  { default: adminStats },
  { default: inboundEmail },
  { default: emails },
  { default: stripeSummary },
  { default: stripeTransactions },
  { default: posthogFunnel },
  { default: metaCampaigns },
] = await Promise.all([
  import('./api/create-checkout.js'),
  import('./api/provision-access.js'),
  import('./api/activate-account.js'),
  import('./api/stripe-webhook.js'),
  import('./api/session-email.js'),
  import('./api/send-email.js'),
  import('./api/admin-stats.js'),
  import('./api/inbound-email.js'),
  import('./api/emails.js'),
  import('./api/stripe/summary.js'),
  import('./api/stripe/transactions.js'),
  import('./api/posthog/funnel.js'),
  import('./api/meta/campaigns.js'),
])

const app = express()

// Stripe webhook must be registered BEFORE the JSON body parser — its handler
// reads the raw request stream itself to verify the Stripe signature.
app.post('/api/stripe-webhook', (req, res) => stripeWebhook(req, res))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.all('/api/create-checkout',      (req, res) => createCheckout(req, res))
app.all('/api/provision-access',     (req, res) => provisionAccess(req, res))
app.all('/api/activate-account',     (req, res) => activateAccount(req, res))
app.all('/api/session-email',        (req, res) => sessionEmail(req, res))
app.all('/api/send-email',           (req, res) => sendEmail(req, res))
app.all('/api/admin-stats',          (req, res) => adminStats(req, res))
app.all('/api/inbound-email',        (req, res) => inboundEmail(req, res))
app.all('/api/emails',               (req, res) => emails(req, res))
app.all('/api/stripe/summary',       (req, res) => stripeSummary(req, res))
app.all('/api/stripe/transactions',  (req, res) => stripeTransactions(req, res))
app.all('/api/posthog/funnel',       (req, res) => posthogFunnel(req, res))
app.all('/api/meta/campaigns',       (req, res) => metaCampaigns(req, res))

app.listen(3000, () => {
  console.log('[api] ready → http://localhost:3000')
})
