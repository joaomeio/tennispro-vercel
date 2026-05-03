import { Link } from 'react-router-dom'

export default function TermsOfService() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: May 2025</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the TennisPro platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service. These Terms apply to all users, visitors, and others who access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
            <p>
              TennisPro is a digital platform that provides tennis coaches and instructors with structured training drills, lesson templates, tactical guides, and educational content. The Service is delivered via a web-based application accessible at tennispro.site.
            </p>
            <p className="mt-2">
              We reserve the right to modify, suspend, or discontinue the Service (or any portion thereof) at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Accounts</h2>
            <p>
              To access certain features of the Service, you must create an account. You are responsible for:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and up-to-date information</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
            </ul>
            <p className="mt-2">
              We reserve the right to terminate accounts that violate these Terms or for any other reason at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Payments and Billing</h2>
            <p>
              Certain features of the Service require payment. By providing payment information, you authorize us to charge the applicable fees to your payment method. All payments are processed securely through Stripe.
            </p>
            <p className="mt-2">
              <strong>Refund Policy:</strong> Due to the digital nature of the content, all sales are final. We do not offer refunds once access to the platform has been granted, except where required by applicable law. If you believe you have been charged in error, please contact us at <a href="mailto:support@tennispro.site" className="text-brand-600 hover:underline">support@tennispro.site</a> within 7 days of the charge.
            </p>
            <p className="mt-2">
              Prices are subject to change with reasonable notice. Continued use of the Service after a price change constitutes acceptance of the new pricing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Intellectual Property</h2>
            <p>
              All content on the Service — including but not limited to drills, lesson templates, videos, text, graphics, logos, and software — is the exclusive property of TennisPro or its content licensors and is protected by applicable intellectual property laws.
            </p>
            <p className="mt-2">
              You are granted a limited, non-exclusive, non-transferable license to access and use the content solely for your personal, non-commercial use as a tennis coach. You may not:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Reproduce, distribute, or publicly display any content without written permission</li>
              <li>Create derivative works based on our content</li>
              <li>Use the content for commercial resale or redistribution</li>
              <li>Remove any copyright or proprietary notices from any content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Prohibited Uses</h2>
            <p>You agree not to use the Service to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Violate any applicable law or regulation</li>
              <li>Share your account credentials with third parties</li>
              <li>Scrape, copy, or reproduce platform content for redistribution</li>
              <li>Engage in any activity that disrupts or interferes with the Service</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Use automated tools to access or interact with the Service without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p className="mt-2">
              We do not warrant that the Service will be uninterrupted, error-free, or free of viruses or other harmful components. We do not guarantee any specific results from the use of the Service, including but not limited to improvements in tennis coaching performance or student outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, TENNISPRO AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE.
            </p>
            <p className="mt-2">
              IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU EXCEED THE AMOUNT PAID BY YOU FOR THE SERVICE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless TennisPro and its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising from your use of the Service, your violation of these Terms, or your violation of any third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable law. Any disputes arising under these Terms shall be resolved through binding arbitration or in a court of competent jurisdiction. By using the Service, you waive any right to a jury trial in connection with any dispute relating to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms at any time. We will notify registered users of material changes via email or by posting a notice on the Service. Your continued use of the Service after any changes constitutes acceptance of the updated Terms. It is your responsibility to review these Terms periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Contact</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
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
