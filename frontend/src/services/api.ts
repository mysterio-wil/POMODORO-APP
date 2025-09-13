import axios from 'axios'

// URL base de la API
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
})

// Interceptor request: agrega token si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor response: maneja errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

export default api
