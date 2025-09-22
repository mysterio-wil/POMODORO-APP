// src/services/authService.ts
import api from './api'

export interface AuthResponse {
  token: string
}

export async function loginUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/login', {
    email,
    password,
  })
  return data
}

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/register', {
    name,
    email,
    password,
  })
  return data
}
