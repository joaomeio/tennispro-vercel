import { Check, Mail, Download, Lock } from 'lucide-react'

export default function ObrigadoEn() {
  const date = new Date().toLocaleDateString('en-US')

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="h-2 bg-gradient-to-r from-emerald-400 to-emerald-600 w-full" />

        <div className="p-8 md:p-12">
          {/* Success Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6 shadow-inner">
              <Check className="w-10 h-10 text-emerald-600" strokeWidth={3} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Thank you for your purchase!
            </h1>
            <p className="text-lg text-gray-600 max-w-lg mx-auto">
              Your order has been successfully confirmed. You will receive an email with the transaction details shortly.
            </p>
          </div>

          {/* Order Date */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-10 border border-gray-100 flex justify-center items-center">
            <div className="text-center">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Date of Purchase
              </span>
              <p className="text-gray-900 font-medium mt-1">{date}</p>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">
              How to access your materials
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="relative p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute -top-3 left-6 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded">
                  STEP 1
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Check your Email</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We've sent an access link to your registered email address. Please also check your spam folder.
                </p>
              </div>

              <div className="relative p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute -top-3 left-6 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded">
                  STEP 2
                </div>
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mb-4 text-purple-600">
                  <Download className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Download</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Click the download button inside the email to save your materials (PDF or ZIP file).
                </p>
              </div>

              <div className="relative p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute -top-3 left-6 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded">
                  STEP 3
                </div>
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mb-4 text-orange-600">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Access</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  If the file is protected, use the password sent along with your receipt to unlock it.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Need help?{' '}
              <a
                href="mailto:suporte@tennispro.site"
                className="text-emerald-600 underline hover:text-emerald-700"
              >
                Contact support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
