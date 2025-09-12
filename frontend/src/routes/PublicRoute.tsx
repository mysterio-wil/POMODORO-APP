import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { ReactNode } from 'react' // 👈 import type

interface PublicRouteProps {
  children: ReactNode
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { token } = useAuth()
  return token ? <Navigate to="/dashboard" replace /> : <>{children}</>
}
