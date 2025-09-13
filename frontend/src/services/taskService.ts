import { Task } from './tasks'

export async function getTasks() {
  const { data } = await api.get('/tasks')
  return data
}

export async function createTask(task: {
  title: string
  description?: string
}) {
  const { data } = await api.post('/tasks', task)
  return data
}

export async function updateTask(id: string, updates: Partial<Task>) {
  const { data } = await api.put(`/tasks/${id}`, updates)
  return data
}

export async function deleteTask(id: string) {
  const { data } = await api.delete(`/tasks/${id}`)
  return data
}
