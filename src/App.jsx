import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import HomePageEn from './pages/HomePageEn'
import Obrigado from './pages/Obrigado'
import AvisoLegal from './pages/AvisoLegal'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/en" element={<HomePageEn />} />
        <Route path="/obrigado" element={<Obrigado />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
      </Routes>
    </BrowserRouter>
  )
}
