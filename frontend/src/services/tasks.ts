import { apiFetch } from './api'

export async function getTasks() {
  return apiFetch('/api/tasks')
}

export async function createTask(title: string) {
  return apiFetch('/api/tasks', {
    method: 'POST',
    body: JSON.stringify({ title }),
  })
}
