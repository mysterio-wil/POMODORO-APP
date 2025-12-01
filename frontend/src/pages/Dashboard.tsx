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
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

        {/* Pomodoro Timer */}
        <PomodoroTimer />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Welcome Back!">
            <p className="text-gray-600">
              Hello <span className="font-semibold text-gray-900">{user.name}</span>!
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Ready to boost your productivity with the Pomodoro technique?
            </p>
          </Card>

          <Card title="Quick Stats">
            <div className="space-y-2">
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

          <Card title="Quick Actions">
            <div className="space-y-2">
              <button
                onClick={() => navigate('/tasks')}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Manage Tasks
              </button>
              <button
                onClick={() => navigate('/statistics')}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
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
