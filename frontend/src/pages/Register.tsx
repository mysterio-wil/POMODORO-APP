// src/pages/Register.tsx
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    try {
      await register(name, email, password)
      navigate('/dashboard')
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message)
      else setError('Error desconocido al registrar')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Registro</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            placeholder="Nombre"
            className="w-full border px-3 py-2 rounded"
            required
          />
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
            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Registrarse
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  )
}
