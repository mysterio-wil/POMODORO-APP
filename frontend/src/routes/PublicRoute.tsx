import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function PublicRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth()
  return token ? <Navigate to="/dashboard" replace /> : children
}
