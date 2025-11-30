// src/services/authService.ts
import api from './api'

export interface User {
  id: string
  name: string
  email: string
}

export interface AuthResponse {
  token: string
  user: User
}

export async function loginUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const { data } = await api.post<AuthResponse>('/auth/login', {
      email,
      password,
    })
    return data
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: { message?: string } } }
      throw new Error(
        axiosError.response?.data?.message || 'Credenciales inválidas'
      )
    }
    throw new Error('Credenciales inválidas')
  }
}

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const { data } = await api.post<AuthResponse>('/auth/register', {
      name,
      email,
      password,
    })
    return data
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: { message?: string } } }
      throw new Error(
        axiosError.response?.data?.message || 'Error al registrar'
      )
    }
    throw new Error('Error al registrar')
  }
}
