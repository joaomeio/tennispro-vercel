// Temporary debug endpoint — delete after diagnosing inbound email format
// Visit: POST https://tennispro.site/api/debug-inbound (configure as Resend webhook temporarily)
// Then check Vercel function logs to see the exact payload shape

export default async function handler(req, res) {
  console.log('DEBUG INBOUND PAYLOAD:', JSON.stringify(req.body, null, 2))
  console.log('DEBUG HEADERS:', JSON.stringify(req.headers, null, 2))
  return res.status(200).json({ received: true, body: req.body })
}
