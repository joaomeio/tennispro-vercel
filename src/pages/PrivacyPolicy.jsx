import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <header className="border-b border-gray-200 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-brand-700 font-bold text-lg hover:text-brand-900 transition-colors">
            <span className="bg-brand-700 text-white text-xs font-bold px-2 py-1 rounded">TP</span>
            TennisPro
          </Link>
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: May 2025</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
            <p>
              TennisPro ("we", "our", or "us") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform at tennispro.site.
            </p>
            <p className="mt-2">
              Please read this policy carefully. If you disagree with its terms, please discontinue use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Account information:</strong> name, email address, and password when you register</li>
              <li><strong>Payment information:</strong> billing details processed securely through Stripe (we do not store card numbers)</li>
              <li><strong>Communications:</strong> messages you send us via email or support channels</li>
            </ul>
            <p className="mt-3">We also collect information automatically when you use the Service:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Usage data:</strong> pages visited, features used, time spent on the platform</li>
              <li><strong>Device information:</strong> browser type, operating system, IP address</li>
              <li><strong>Cookies and tracking technologies:</strong> session identifiers and analytics data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Provide, operate, and maintain the Service</li>
              <li>Process payments and manage your subscription</li>
              <li>Send transactional emails (account confirmation, password reset, receipts)</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Monitor and analyze usage patterns to improve the Service</li>
              <li>Detect, prevent, and address technical issues or fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-2">
              We do not sell your personal information to third parties. We do not use your data for targeted advertising on third-party platforms beyond the analytics services described below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Third-Party Services</h2>
            <p>We use the following third-party services that may process your data:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <strong>Supabase</strong> — Authentication and database hosting. Your email and account data are stored on Supabase infrastructure. See their privacy policy at supabase.com/privacy.
              </li>
              <li>
                <strong>Stripe</strong> — Payment processing. Your payment information is handled directly by Stripe. See their privacy policy at stripe.com/privacy.
              </li>
              <li>
                <strong>PostHog</strong> — Product analytics. We use PostHog to understand how users interact with the platform. Data is anonymized where possible. See their privacy policy at posthog.com/privacy.
              </li>
              <li>
                <strong>Vercel</strong> — Hosting and web analytics. Our platform is hosted on Vercel infrastructure. See their privacy policy at vercel.com/legal/privacy-policy.
              </li>
              <li>
                <strong>Meta (Facebook) Pixel</strong> — Conversion tracking for advertising purposes. This tracks visits to certain pages to measure ad effectiveness. You can opt out via your Facebook ad settings.
              </li>
              <li>
                <strong>Resend</strong> — Transactional email delivery. Your email address is used to send you account-related communications.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to improve your experience on our platform. Cookies are small text files stored on your device.
            </p>
            <p className="mt-2">We use:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Essential cookies:</strong> required for authentication and session management</li>
              <li><strong>Analytics cookies:</strong> to understand usage patterns (PostHog, Vercel Analytics)</li>
              <li><strong>Marketing cookies:</strong> for advertising measurement (Meta Pixel)</li>
            </ul>
            <p className="mt-2">
              You can control cookies through your browser settings. Disabling certain cookies may affect the functionality of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Data Retention</h2>
            <p>
              We retain your personal information for as long as your account is active or as needed to provide you with the Service. We may also retain and use your information to comply with our legal obligations, resolve disputes, and enforce our agreements.
            </p>
            <p className="mt-2">
              If you request account deletion, we will delete your personal information within 30 days, except where we are required to retain it by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data in transit is encrypted via HTTPS/TLS.
            </p>
            <p className="mt-2">
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Access:</strong> request a copy of the personal data we hold about you</li>
              <li><strong>Correction:</strong> request correction of inaccurate or incomplete data</li>
              <li><strong>Deletion:</strong> request deletion of your personal data</li>
              <li><strong>Portability:</strong> request your data in a portable format</li>
              <li><strong>Objection:</strong> object to certain processing of your data</li>
              <li><strong>Withdrawal of consent:</strong> withdraw consent where processing is based on consent</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, contact us at <a href="mailto:support@tennispro.site" className="text-brand-600 hover:underline">support@tennispro.site</a>. We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Children's Privacy</h2>
            <p>
              The Service is intended for adults (18 years or older). We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected information from a child, please contact us immediately so we can delete it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. These countries may have different data protection laws. By using the Service, you consent to this transfer. We ensure appropriate safeguards are in place through standard contractual clauses and reliance on reputable, GDPR-compliant service providers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material changes by email or by posting a prominent notice on the Service. Your continued use of the Service after the effective date of any changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Contact Us</h2>
            <p>
              If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="mt-2">
              <a href="mailto:support@tennispro.site" className="text-brand-600 hover:underline">support@tennispro.site</a>
            </p>
          </section>

        </div>
      </main>

      <footer className="border-t border-gray-200 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} TennisPro. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-gray-800 transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-gray-800 transition-colors">Privacy</Link>
            <Link to="/legal" className="hover:text-gray-800 transition-colors">Legal Notice</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
