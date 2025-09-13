import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import axios from 'axios'

// Tipos de la respuesta de login/registro
interface AuthResponse {
  token: string
}

interface AuthContextType {
  token: string | null
  loginUser: (email: string, password: string) => Promise<void>
  registerUser: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('auth_token')
  )

  // Sincroniza token con Axios
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete api.defaults.headers.common['Authorization']
    }
  }, [token])

  // Login
  async function loginUser(email: string, password: string) {
    try {
      const { data } = await api.post<AuthResponse>('/auth/login', {
        email,
        password,
      })
      localStorage.setItem('auth_token', data.token)
      setToken(data.token)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || error.message || 'Error en login'
        )
      }
      throw new Error('An unexpected error occurred during login.')
    }
  }

  // Registro
  async function registerUser(name: string, email: string, password: string) {
    try {
      const { data } = await api.post<AuthResponse>('/auth/register', {
        name,
        email,
        password,
      })
      localStorage.setItem('auth_token', data.token)
      setToken(data.token)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || error.message || 'Error en registro'
        )
      }
      throw new Error('An unexpected error occurred during registration.')
    }
  }

  // Logout
  function logout() {
    localStorage.removeItem('auth_token')
    setToken(null)
    delete api.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider value={{ token, loginUser, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return context
}
