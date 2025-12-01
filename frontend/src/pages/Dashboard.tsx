import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Layout from '../components/layout/Layout'
import PomodoroTimer from '../components/pomodoro/PomodoroTimer'

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showTaskInput, setShowTaskInput] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (!user) return null

  return (
    <Layout>
      <div className="space-y-8">
        {/* Pomodoro Timer */}
        <PomodoroTimer />

        {/* Tasks Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Tasks</h2>
            <button className="text-gray-400 hover:text-gray-600">
              ⋮
            </button>
          </div>

          {!showTaskInput ? (
            <button
              onClick={() => setShowTaskInput(true)}
              className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-2xl">+</span>
              <span>Add Task</span>
            </button>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="What are you working on?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                autoFocus
              />
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
                  Save
                </button>
                <button
                  onClick={() => setShowTaskInput(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm mb-2">Act / Est Pomodoros</p>
            <p className="text-3xl font-bold text-gray-800">0 / 0</p>
            <button className="mt-4 text-gray-500 hover:text-gray-700 text-sm underline">
              Finish
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
