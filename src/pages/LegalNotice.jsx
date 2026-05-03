import { Link } from 'react-router-dom'

export default function LegalNotice() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal Notice</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: May 2025</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Platform Operator</h2>
            <p>
              This website and digital platform ("TennisPro") is operated by the TennisPro team. For any legal or administrative inquiries, please contact us at:
            </p>
            <p className="mt-3">
              <strong>Email:</strong>{' '}
              <a href="mailto:support@tennispro.site" className="text-brand-600 hover:underline">
                support@tennispro.site
              </a>
            </p>
            <p>
              <strong>Website:</strong> tennispro.site
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. No Results Guarantee</h2>
            <p>
              TennisPro provides educational content and tools for tennis coaches. We make no representation or warranty that use of the platform will result in specific improvements in coaching performance, student athletic development, or any financial outcomes.
            </p>
            <p className="mt-2">
              Results depend on individual factors including, but not limited to, the coach's experience level, frequency of use, student aptitude, and dedication to applying the methods. Any testimonials or examples of results on this platform represent individual experiences and are not typical or guaranteed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Educational Purpose</h2>
            <p>
              All content on TennisPro — including drills, lesson plans, tactical guides, video demonstrations, and written materials — is provided for educational and informational purposes only. The content reflects general best practices in tennis coaching and is not a substitute for professional coaching certifications, physical training assessments, or individualized instruction.
            </p>
            <p className="mt-2">
              Always ensure that any drill or exercise is appropriate for the age, physical condition, and skill level of your students before applying it. TennisPro is not liable for any injury, damage, or harm resulting from the application of content found on this platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Health and Safety Disclaimer</h2>
            <p>
              Tennis involves physical activity that carries inherent risks of injury. Users of this platform, and the coaches applying its content, acknowledge these risks and take full responsibility for ensuring that all activities are conducted in a safe environment, with appropriate equipment, and with participants who are physically capable of performing the activities.
            </p>
            <p className="mt-2">
              TennisPro strongly recommends that coaches consult relevant sports medicine professionals and follow their national tennis federation's safety guidelines when working with students of any age or fitness level.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Intellectual Property</h2>
            <p>
              All content on this platform, including but not limited to text, drills, lesson templates, graphics, logos, videos, and software code, is the intellectual property of TennisPro or its licensors. All rights are reserved.
            </p>
            <p className="mt-2">
              Reproduction, distribution, republication, or commercial exploitation of any platform content without prior written permission from TennisPro is strictly prohibited and may result in legal action.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Illustrative Characters and Examples</h2>
            <p>
              Some characters, personas, or example coaches used in marketing materials or platform content may be fictional and created for illustrative purposes only. Any resemblance to real individuals is coincidental. All case studies and testimonials, unless explicitly attributed to a real named individual with their consent, are representative composites and do not represent any specific person's actual experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Third-Party Links</h2>
            <p>
              This platform may contain links to third-party websites or services. TennisPro is not responsible for the content, privacy practices, or terms of any third-party site. The inclusion of any link does not imply endorsement by TennisPro.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, TennisPro, its operators, employees, and agents shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of, or inability to use, the platform or its content. This includes without limitation any loss of revenue, profit, data, or goodwill.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Applicable Law</h2>
            <p>
              This Legal Notice and any disputes arising from it shall be governed by applicable law. By using this platform, you consent to the jurisdiction of the applicable courts for resolution of any disputes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contact</h2>
            <p>For legal inquiries, please contact:</p>
            <p className="mt-2">
              <a href="mailto:support@tennispro.site" className="text-brand-600 hover:underline">
                support@tennispro.site
              </a>
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
