import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function RegisterPage() {
  const { registerUser } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await registerUser(name, email, password)
      navigate('/dashboard') // ✅ corregido
    } catch {
      alert('Error en registro')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-sm mx-auto flex flex-col gap-4"
    >
      <h2 className="text-xl font-bold">Registro</h2>
      <input
        className="border p-2"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button className="bg-green-500 text-white p-2 rounded">
        Crear cuenta
      </button>

      {/* ✅ Enlace a login */}
      <p className="text-sm text-center">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="text-blue-600 underline">
          Inicia sesión
        </Link>
      </p>
    </form>
  )
}
