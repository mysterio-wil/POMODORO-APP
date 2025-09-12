export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export async function getDailyStats(userId = 1, days = 7) {
  const r = await fetch(
    `${API_URL}/api/statistics/daily?userId=${userId}&days=${days}`
  )
  return r.json()
}

export async function getWeeklySummary(userId = 1) {
  const r = await fetch(`${API_URL}/api/statistics/weekly?userId=${userId}`)
  return r.json()
}
