import { createContext, useContext, useState, useEffect } from 'react'
import { login, register, saveToken, logout, getToken } from '../services/auth'

interface User {
  id: number
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  loginUser: (email: string, password: string) => Promise<void>
  registerUser: (name: string, email: string, password: string) => Promise<void>
  logoutUser: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(getToken())

  useEffect(() => {
    if (token) {
      // ⚠️ Aquí podrías decodificar el token para cargar info del usuario
      // Por simplicidad, se asume que ya está en localStorage.
      setUser(null)
    }
  }, [token])

  async function loginUser(email: string, password: string) {
    const data = await login(email, password)
    saveToken(data.token)
    setToken(data.token)
    setUser(data.user)
  }

  async function registerUser(name: string, email: string, password: string) {
    const data = await register(name, email, password)
    saveToken(data.token)
    setToken(data.token)
    setUser(data.user)
  }

  function logoutUser() {
    logout()
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, token, loginUser, registerUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
