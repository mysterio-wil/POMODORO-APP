import api from './api'
import type { Task, CreateTaskDTO, UpdateTaskDTO } from '../types/task.types'

export async function getTasks(): Promise<Task[]> {
  const { data } = await api.get<Task[]>('/tasks')
  return data
}

export async function createTask(taskData: CreateTaskDTO): Promise<Task> {
  const { data } = await api.post<Task>('/tasks', taskData)
  return data
}

export async function updateTask(id: string, updates: UpdateTaskDTO): Promise<Task> {
  const { data } = await api.patch<Task>(`/tasks/${id}`, updates)
  return data
}

export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/tasks/${id}`)
}
