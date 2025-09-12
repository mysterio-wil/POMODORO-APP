import { getToken } from './auth'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = getToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers })

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${await res.text()}`)
  }

  return res.json()
}
