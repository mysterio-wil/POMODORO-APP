import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { ReactNode } from 'react' // 👈 import type

interface PrivateRouteProps {
  children: ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { token } = useAuth()
  return token ? <>{children}</> : <Navigate to="/login" replace />
}
