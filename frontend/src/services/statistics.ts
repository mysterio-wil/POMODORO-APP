import { apiFetch } from './api'

export async function getDailyStats(days = 7) {
  return apiFetch(`/api/statistics/daily?days=${days}`)
}

export async function getWeeklySummary() {
  return apiFetch('/api/statistics/weekly')
}
