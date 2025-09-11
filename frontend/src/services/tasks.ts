export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export async function getTasks() {
  const r = await fetch(`${API_URL}/api/tasks`)
  return r.json()
}
export async function createTask(payload) {
  const r = await fetch(`${API_URL}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return r.json()
}
export async function updateTask(id, payload) {
  const r = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return r.json()
}
export async function deleteTask(id) {
  await fetch(`${API_URL}/api/tasks/${id}`, { method: 'DELETE' })
}
