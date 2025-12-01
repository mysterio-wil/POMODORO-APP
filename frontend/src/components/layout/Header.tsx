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
        <header className="bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center ml-14">
                        <h1 className="text-xl md:text-2xl font-bold text-white">
                            🍅 Pomodoro
                        </h1>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <span className="text-sm md:text-base text-white/90 hidden sm:inline">
                            {user?.name}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
