import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from './context/AuthContext'
import HomePageEn from './pages/HomePageEn'
import ObrigadoEn from './pages/ObrigadoEn'
import UpsellEn from './pages/UpsellEn'
import Welcome from './pages/Welcome'
import Dashboard from './pages/Dashboard'
import DashboardHome from './pages/dashboard/Home'
import Drills from './pages/dashboard/Drills'
import TennisKids from './pages/dashboard/TennisKids'
import LessonTemplates from './pages/dashboard/LessonTemplates'
import MentalGame from './pages/dashboard/MentalGame'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/" replace />
  return children
}

function AuthRedirect() {
  const navigate = useNavigate()
  useEffect(() => {
    const hash = window.location.hash
    if (hash.includes('access_token') && hash.includes('type=recovery')) {
      navigate('/welcome' + hash, { replace: true })
    }
  }, [navigate])
  return <HomePageEn />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRedirect />} />
        <Route path="/obrigado" element={<ObrigadoEn />} />
        <Route path="/en/obrigado" element={<ObrigadoEn />} />
        <Route path="/upsell-courtly" element={<UpsellEn />} />
        <Route path="/welcome" element={<Welcome />} />

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
          <Route path="tennis-kids" element={<TennisKids />} />
          <Route path="lesson-templates" element={<LessonTemplates />} />
          <Route path="mental-game" element={<MentalGame />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
