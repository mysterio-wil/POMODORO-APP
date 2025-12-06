import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PomodoroProvider } from './context/PomodoroContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PomodoroProvider>
        <App />
      </PomodoroProvider>
    </BrowserRouter>
  </StrictMode>
)
