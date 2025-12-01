```
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/tasks', label: 'Tasks', icon: '✅' },
    { path: '/statistics', label: 'Statistics', icon: '📊' },
  ]

  return (
    <aside 
      className="w-64 bg-gray-800 min-h-screen shadow-lg"
      style={{ 
        width: '256px',
        backgroundColor: '#1f2937',
        minHeight: '100vh'
      }}
    >
      <nav className="py-8">
        <ul className="space-y-2 px-4" style={{ listStyle: 'none', padding: '0 1rem' }}>
          {navItems.map((item) => (
            <li key={item.path} style={{ marginBottom: '0.5rem' }}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items - center gap - 3 px - 4 py - 3 rounded - lg transition - colors ${
    isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
} `
                }
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  backgroundColor: isActive ? '#2563eb' : 'transparent',
                  color: isActive ? '#ffffff' : '#d1d5db',
                })}
              >
                <span className="text-xl" style={{ fontSize: '1.25rem' }}>
                  {item.icon}
                </span>
                <span className="font-medium" style={{ fontWeight: 500 }}>
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
```
