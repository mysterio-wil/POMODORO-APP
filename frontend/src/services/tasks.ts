import api from './api'

// Tipo de tarea
export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

// Obtener todas las tareas
export async function getTasks(): Promise<Task[]> {
  const { data } = await api.get<Task[]>('/tasks')
  return data
}

// Crear tarea
export async function createTask(
  title: string,
  description?: string
): Promise<Task> {
  const { data } = await api.post<Task>('/tasks', { title, description })
  return data
}

// Actualizar tarea
export async function updateTask(
  id: string,
  updates: Partial<Task>
): Promise<Task> {
  const { data } = await api.patch<Task>(`/tasks/${id}`, updates)
  return data
}

// Eliminar tarea
export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/tasks/${id}`)
}
