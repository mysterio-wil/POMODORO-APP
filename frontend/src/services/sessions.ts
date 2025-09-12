import { apiFetch } from './api'

export async function startSession(taskId?: number) {
  return apiFetch('/api/sessions/start', {
    method: 'POST',
    body: JSON.stringify({ taskId }),
  })
}

export async function endSession(sessionId: number, endTime: string) {
  return apiFetch(`/api/sessions/${sessionId}/end`, {
    method: 'POST',
    body: JSON.stringify({ endTime }),
  })
}

export async function listSessions() {
  return apiFetch('/api/sessions')
}
