// src/pages/Login.tsx
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message)
      else setError('Error desconocido al iniciar sesión')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Correo electrónico"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="Contraseña"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  )
}
