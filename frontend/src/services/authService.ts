import api from './api'

export async function loginUser(email: string, password: string) {
  const { data } = await api.post('/auth/login', { email, password })
  return data
}

export async function registerUser(email: string, password: string) {
  const { data } = await api.post('/auth/register', { email, password })
  return data
}

export async function getProfile() {
  const { data } = await api.get('/auth/me')
  return data
}
