// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import * as authService from '../services/authService'
import api from '../services/api'

interface AuthContextType {
  user: { token: string } | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('auth_token')
  )

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete api.defaults.headers.common['Authorization']
    }
  }, [token])

  async function login(email: string, password: string) {
    const data = await authService.loginUser(email, password)
    localStorage.setItem('auth_token', data.token)
    setToken(data.token)
  }

  async function register(name: string, email: string, password: string) {
    const data = await authService.registerUser(name, email, password)
    localStorage.setItem('auth_token', data.token)
    setToken(data.token)
  }

  function logout() {
    localStorage.removeItem('auth_token')
    setToken(null)
  }

  const user = token ? { token } : null

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
