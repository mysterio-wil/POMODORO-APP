import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Layout from '../components/layout/Layout'
import Card from '../components/common/Card'
import PomodoroTimer from '../components/pomodoro/PomodoroTimer'

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (!user) return null

  return (
    <Layout>
      <div className="space-y-4 md:space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>

        {/* Pomodoro Timer */}
        <PomodoroTimer />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Card title="Welcome Back!">
            <p className="text-sm md:text-base text-gray-600">
              Hello <span className="font-semibold text-gray-900">{user.name}</span>!
            </p>
            <p className="mt-2 text-xs md:text-sm text-gray-500">
              Ready to boost your productivity with the Pomodoro technique?
            </p>
          </Card>

          <Card title="Quick Stats">
            <div className="space-y-2 text-sm md:text-base">
              <div className="flex justify-between">
                <span className="text-gray-600">Today's Sessions:</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Focus Time:</span>
                <span className="font-semibold">0 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tasks Completed:</span>
                <span className="font-semibold">0</span>
              </div>
            </div>
          </Card>

          <Card title="Quick Actions" className="sm:col-span-2 lg:col-span-1">
            <div className="space-y-2">
              <button
                onClick={() => navigate('/tasks')}
                className="w-full px-4 py-2 md:py-2.5 text-sm md:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Manage Tasks
              </button>
              <button
                onClick={() => navigate('/statistics')}
                className="w-full px-4 py-2 md:py-2.5 text-sm md:text-base bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                View Statistics
              </button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
