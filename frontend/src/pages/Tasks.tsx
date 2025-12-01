import { useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import Layout from '../components/layout/Layout'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Loading from '../components/common/Loading'
import type { Priority } from '../types/task.types'

export default function Tasks() {
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('MEDIA')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    try {
      await createTask({ title, description, priority })
      setTitle('')
      setDescription('')
      setPriority('MEDIA')
    } catch (err) {
      console.error('Error creating task:', err)
    }
  }

  const handleToggleStatus = async (taskId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'DONE' ? 'PENDING' : 'DONE'
    try {
      await updateTask(taskId, { status: newStatus as any })
    } catch (err) {
      console.error('Error updating task:', err)
    }
  }

  const handleDelete = async (taskId: number) => {
    if (!confirm('Are you sure you want to delete this task?')) return
    try {
      await deleteTask(taskId)
    } catch (err) {
      console.error('Error deleting task:', err)
    }
  }

  if (loading && tasks.length === 0) return <Loading />

  return (
    <Layout>
      <div className="space-y-4 md:space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Tasks</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm md:text-base">
            {error}
          </div>
        )}

        <Card title="Create New Task">
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 md:py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter task title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 md:py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter task description (optional)"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full px-3 py-2 md:py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="BAJA">Low</option>
                <option value="MEDIA">Medium</option>
                <option value="ALTA">High</option>
              </select>
            </div>

            <Button type="submit" isLoading={loading} className="w-full sm:w-auto">
              Create Task
            </Button>
          </form>
        </Card>

        <Card title={`Tasks (${tasks.length})`}>
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center py-8 text-sm md:text-base">
              No tasks yet. Create your first task above!
            </p>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="border border-gray-200 rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={task.status === 'DONE'}
                          onChange={() => handleToggleStatus(task.id, task.status)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0"
                        />
                        <h3
                          className={`text-base md:text-lg font-semibold break-words ${task.status === 'DONE'
                              ? 'line-through text-gray-500'
                              : 'text-gray-900'
                            }`}
                        >
                          {task.title}
                        </h3>
                      </div>
                      {task.description && (
                        <p className="text-sm md:text-base text-gray-600 mt-1 ml-7 break-words">
                          {task.description}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-2 mt-2 ml-7">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${task.priority === 'ALTA'
                              ? 'bg-red-100 text-red-700'
                              : task.priority === 'MEDIA'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-green-100 text-green-700'
                            }`}
                        >
                          {task.priority}
                        </span>
                        <span className="text-xs text-gray-500">{task.status}</span>
                      </div>
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(task.id)}
                      className="flex-shrink-0"
                    >
                      <span className="hidden sm:inline">Delete</span>
                      <span className="sm:hidden">✕</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </Layout>
  )
}
