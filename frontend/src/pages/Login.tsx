import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginPage() {
  const { loginUser } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await loginUser(email, password)
      navigate('/dashboard') // ✅ corregido
    } catch {
      alert('Error en login')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-sm mx-auto flex flex-col gap-4"
    >
      <h2 className="text-xl font-bold">Login</h2>
      <input
        className="border p-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2 rounded">Entrar</button>

      {/* ✅ Enlace a registro */}
      <p className="text-sm text-center">
        ¿No tienes cuenta?{' '}
        <Link to="/register" className="text-blue-600 underline">
          Regístrate aquí
        </Link>
      </p>
    </form>
  )
}
