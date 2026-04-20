import { useState } from 'react'
import { CheckCircle2, ChevronRight, Play, Calendar, DollarSign, Users, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function UpsellEn() {
  const [selectedPlan, setSelectedPlan] = useState('annual') // 'monthly' | 'annual'

  // Placeholder links for now
  const NEXT_STEP_LINK = '#'
  const ALL_GOOD_LINK = '/en/obrigado' 

  return (
    <div className="min-h-screen bg-slate-50 pb-20" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Progress Bar Header */}
      <div className="bg-amber-500 w-full p-3 flex justify-center items-center shadow-md sticky top-0 z-50">
        <div className="max-w-4xl w-full flex items-center justify-between px-4">
          <div className="flex-1">
            <p className="text-white font-bold text-sm md:text-base animate-pulse">
              ⚠️ WAIT! Your order is not complete yet...
            </p>
          </div>
          <div className="flex gap-1">
            <div className="h-2 w-8 bg-white rounded-full"></div>
            <div className="h-2 w-16 bg-white/40 rounded-full"></div>
            <div className="h-2 w-8 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-12 md:pt-16">
        {/* Main Headline */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            How The <span className="text-emerald-600">Top 1%</span> Of Coaches Manage Their Business
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Before you access your drills library, I want to show you the secret software top professionals use to eliminate admin work and make more money.
          </p>
        </div>

        {/* Video / Image Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 p-2 md:p-4 mb-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center p-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Meet <span className="text-emerald-600">Courtly</span>
              </h2>
              <p className="text-slate-600 leading-relaxed">
                As a tennis coach, you shouldn't spend hours tracking payments, managing spreadsheets, or planning lessons on scratchpad paper. Courtly is your "business-in-a-box" app.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Calendar className="w-6 h-6 text-emerald-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Smart Scheduling</h4>
                    <p className="text-xs text-slate-600">Manage all your lessons seamlessly across your devices.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <DollarSign className="w-6 h-6 text-emerald-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Payment & Analytics Tracking</h4>
                    <p className="text-xs text-slate-600">Never lose track of who paid you and check your monthly revenue in seconds.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-emerald-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Student Roster</h4>
                    <p className="text-xs text-slate-600">A dedicated profile for every student with their history and stats.</p>
                  </div>
                </li>
                 <li className="flex items-start gap-3">
                  <BookOpen className="w-6 h-6 text-emerald-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Drill Library Integration</h4>
                    <p className="text-xs text-slate-600">Create programs easily on the go.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Mockups */}
            <div className="relative flex justify-center items-center h-full min-h-[400px]">
              {/* Placeholders for the uploaded images. The user must add them to /public */}
              <div className="relative w-[220px] h-[450px] bg-slate-100 rounded-[2.5rem] shadow-2xl border-8 border-white mr-10 z-10 overflow-hidden shadow-emerald-500/20">
                 <img src="/courtly-mockup-1.jpg" alt="Courtly Dashboard" className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://placehold.co/400x800/e2e8f0/64748b?text=Add+Mobile+Mockup+1' }} />
              </div>
              <div className="absolute top-10 right-0 w-[200px] h-[420px] bg-slate-100 rounded-[2.5rem] shadow-xl border-8 border-white opacity-80 overflow-hidden transform rotate-6 hover:rotate-0 transition-transform">
                 <img src="/courtly-mockup-2.jpg" alt="Courtly Analytics" className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://placehold.co/400x800/e2e8f0/64748b?text=Add+Mobile+Mockup+2' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing / Offer Section */}
        <div id="offer" className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden text-center p-8 md:p-12">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Upgrade To Courtly Today</h2>
          <p className="text-slate-500 mb-8">Choose your plan and start organizing your business instantly.</p>

          {/* Toggle */}
          <div className="inline-flex bg-slate-100 p-1 rounded-xl mb-10 w-full max-w-sm relative">
             <div className="absolute -top-3 -right-4 bg-emerald-500 text-white text-[10px] uppercase font-bold py-1 px-2 rounded-full shadow-lg transform rotate-6">
                SAVE 16%
             </div>
             <button 
                onClick={() => setSelectedPlan('monthly')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${selectedPlan === 'monthly' ? 'bg-white shadow-md text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
             >
               Monthly
             </button>
             <button 
                onClick={() => setSelectedPlan('annual')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${selectedPlan === 'annual' ? 'bg-white shadow-md text-emerald-700' : 'text-slate-500 hover:text-slate-700'}`}
             >
               Annual (Best Value)
             </button>
          </div>

          <div className="mb-8">
            <span className="text-5xl font-extrabold text-slate-900">
               ${selectedPlan === 'annual' ? '290' : '29'}
            </span>
            <span className="text-slate-500 text-lg font-medium">/{selectedPlan === 'annual' ? 'year' : 'mo'}</span>
          </div>

          <a 
            href={NEXT_STEP_LINK}
            className="block w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xl py-5 px-8 rounded-2xl shadow-xl shadow-emerald-600/30 transition-all hover:-translate-y-1 group"
          >
            <span className="flex items-center justify-center gap-2">
              YES! ADD COURTLY TO MY ORDER <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="block text-xs font-normal text-emerald-100 mt-2 opacity-80">
               Clicking here will {selectedPlan === 'annual' ? 'charge you $290 yearly' : 'charge you $29 monthly'}.
            </span>
          </a>

          <div className="mt-8">
             <Link 
                to={ALL_GOOD_LINK} 
                className="text-slate-400 hover:text-slate-600 text-sm underline transition-colors"
              >
                No thanks, I will manage my students and payments on paper. Take me to my downloads.
              </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
