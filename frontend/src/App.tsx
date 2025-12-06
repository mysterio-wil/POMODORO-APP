import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Routes>
      {/* Ruta principal - Dashboard directo */}
      <Route path="/" element={<Dashboard />} />

      {/* Redirigir cualquier otra ruta al Dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
