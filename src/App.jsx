import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { useAuth } from './context/AuthContext'
import HomePageEn from './pages/HomePageEn'
import ObrigadoEn from './pages/ObrigadoEn'
import UpsellEn from './pages/UpsellEn'
import Welcome from './pages/Welcome'
import Dashboard from './pages/Dashboard'
import DashboardHome from './pages/dashboard/Home'
import Drills from './pages/dashboard/Drills'
import Settings from './pages/dashboard/Settings'
import ModuleLanding from './pages/dashboard/ModuleLanding'
import ModulePart from './pages/dashboard/ModulePart'
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import LegalNotice from './pages/LegalNotice'
import Admin from './pages/Admin'
import OfferEn from './pages/OfferEn'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/" replace />
  return children
}

function AuthRedirect() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (user) {
      navigate('/dashboard', { replace: true })
      return
    }
    const hash = window.location.hash
    if (hash.includes('access_token') && hash.includes('type=recovery')) {
      navigate('/welcome' + hash, { replace: true })
    }
  }, [navigate, user, loading])

  if (loading || user) return null
  return <HomePageEn />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRedirect />} />
        <Route path="/en" element={<Navigate to="/" replace />} />
        <Route path="/obrigado" element={<ObrigadoEn />} />
        <Route path="/en/obrigado" element={<ObrigadoEn />} />
        <Route path="/upsell-courtly" element={<UpsellEn />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/legal" element={<LegalNotice />} />
        <Route path="/aviso-legal" element={<LegalNotice />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/offer" element={<OfferEn />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="drills" element={<Drills />} />
          <Route path="settings" element={<Settings />} />
          {/* Content modules: a landing (part index) + one screen per part.
              Part keys come from config/catalog.js via src/content/modules. */}
          {[
            'tennis-kids',
            'lesson-templates',
            'mental-game',
            'gym-training',
            'serve-masterclass',
            'doubles-tactics',
          ].map((id) => (
            <Route key={id} path={id}>
              <Route index element={<ModuleLanding moduleId={id} />} />
              <Route path=":partKey" element={<ModulePart moduleId={id} />} />
            </Route>
          ))}
        </Route>
      </Routes>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  )
}
