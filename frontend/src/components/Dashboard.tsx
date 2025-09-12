import { useEffect, useState } from 'react'
import { getDailyStats, getWeeklySummary } from '../services/statistics'

interface DailyStat {
  id: number
  date: string
  totalSessions: number
  totalFocusTime: number
  userId: number
}

interface WeeklySummary {
  totalSessions: number
  totalFocusTime: number
  avgPerDay: number
}

function Dashboard() {
  const [daily, setDaily] = useState<DailyStat[]>([])
  const [weekly, setWeekly] = useState<WeeklySummary | null>(null)

  useEffect(() => {
    getDailyStats(1, 7).then(setDaily)
    getWeeklySummary(1).then(setWeekly)
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Estadísticas</h2>
      {weekly && (
        <p>
          Total sesiones: {weekly.totalSessions}, Tiempo total:{' '}
          {weekly.totalFocusTime} min, Promedio/día:{' '}
          {weekly.avgPerDay.toFixed(1)} min
        </p>
      )}
      <ul>
        {daily.map((d) => (
          <li key={d.id}>
            {new Date(d.date).toLocaleDateString()} → {d.totalSessions}{' '}
            sesiones, {d.totalFocusTime} min
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard
