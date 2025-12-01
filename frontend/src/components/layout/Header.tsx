import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Button from '../common/Button'

export default function Header() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center ml-12 md:ml-0">
                        <h1 className="text-xl md:text-2xl font-bold text-blue-600">
                            Pomodoro App
                        </h1>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <span className="text-sm md:text-base text-gray-700 hidden sm:inline">
                            Welcome, <span className="font-semibold">{user?.name}</span>
                        </span>
                        <Button variant="secondary" size="sm" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}
