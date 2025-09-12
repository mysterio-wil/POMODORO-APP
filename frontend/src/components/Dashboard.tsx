import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user, logoutUser } = useAuth()

  if (!user) {
    return <p>No estás autenticado. Inicia sesión.</p>
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Bienvenido {user.name}</h2>
      <button
        onClick={logoutUser}
        className="bg-red-500 text-white p-2 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  )
}
