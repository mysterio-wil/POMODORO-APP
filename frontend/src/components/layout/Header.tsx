import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <header className="bg-transparent py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl md:text-2xl font-bold text-white">
                            🍅 Pomofocus
                        </h1>
                        <nav className="hidden md:flex gap-2">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="px-3 py-1.5 text-sm text-white/90 hover:text-white transition-colors"
                            >
                                📊 Report
                            </button>
                            <button
                                onClick={() => navigate('/tasks')}
                                className="px-3 py-1.5 text-sm text-white/90 hover:text-white transition-colors"
                            >
                                ⚙️ Setting
                            </button>
                        </nav>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <span className="text-sm md:text-base text-white/90 hidden sm:inline">
                            {user?.name}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
