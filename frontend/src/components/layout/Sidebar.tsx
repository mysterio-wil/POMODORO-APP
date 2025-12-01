import { NavLink } from 'react-router-dom'

export default function Sidebar() {
    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
        { path: '/tasks', label: 'Tasks', icon: '✓' },
        { path: '/statistics', label: 'Statistics', icon: '📊' },
    ]

    return (
        <aside className="w-64 bg-gray-800 min-h-screen">
            <nav className="mt-8">
                <ul className="space-y-2 px-4">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`
                                }
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}
