import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import {
  loginUser as loginService,
  registerUser as registerService,
} from '../services/authService'

interface AuthContextType {
  token: string | null
  loginUser: (email: string, password: string) => Promise<void>
  registerUser: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)

  // ✅ Al iniciar, revisamos si hay token en localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token')
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])

  async function loginUser(email: string, password: string) {
    const data = await loginService(email, password)
    localStorage.setItem('auth_token', data.token)
    setToken(data.token)
  }

  async function registerUser(name: string, email: string, password: string) {
    const data = await registerService(name, email, password)
    localStorage.setItem('auth_token', data.token)
    setToken(data.token)
  }

  function logout() {
    localStorage.removeItem('auth_token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, loginUser, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
