import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LandingPage from './components/LandingPage.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LandingPage />
  </StrictMode>,
)
