import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import Dashboard from './components/Dashboard'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'

function App() {
  const { user } = useAuth()
  const [showLogin, setShowLogin] = useState(true)

  if (user) {
    return <Dashboard />
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Pomodoro App</h1>
      {showLogin ? (
        <>
          <LoginPage />
          <p className="text-center mt-4">
            ¿No tienes cuenta?{' '}
            <button
              onClick={() => setShowLogin(false)}
              className="text-blue-500 hover:underline"
            >
              Regístrate
            </button>
          </p>
        </>
      ) : (
        <>
          <RegisterPage />
          <p className="text-center mt-4">
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={() => setShowLogin(true)}
              className="text-blue-500 hover:underline"
            >
              Inicia sesión
            </button>
          </p>
        </>
      )}
    </div>
  )
}

export default App
