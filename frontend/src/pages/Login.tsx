import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { loginUser } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await loginUser(email, password)
      alert('Login exitoso 🚀')
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
    </form>
  )
}
