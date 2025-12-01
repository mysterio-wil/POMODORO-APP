import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/tasks', label: 'Tasks', icon: '✅' },
    { path: '/statistics', label: 'Statistics', icon: '📊' },
  ]

  const closeSidebar = () => setIsOpen(false)

  return (
    <>
      {/* Hamburger Button - Visible en todas las pantallas */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Overlay - Solo visible cuando sidebar está abierto */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - Siempre oculto por defecto, se abre con hamburger */}
      <aside
        className={`
          fixed
          top-0 left-0
          h-full
          w-64
          bg-white
          shadow-2xl
          transform transition-transform duration-300 ease-in-out
          z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <nav className="py-8 mt-12">
          <ul className="space-y-2 px-4" style={{ listStyle: 'none' }}>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
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
    </>
  )
}
