import { useEffect, useState } from 'react'
import { getWeeklySummary, getDailyStats } from '../services/statistics'

interface WeeklySummary {
  totalSessions: number
  totalFocusTime: number
  avgPerDay: number
}

interface DailyStat {
  id: number
  date: string
  totalSessions: number
  totalFocusTime: number
}

export default function Dashboard() {
  const [weekly, setWeekly] = useState<WeeklySummary | null>(null)
  const [daily, setDaily] = useState<DailyStat[]>([])

  useEffect(() => {
    getWeeklySummary().then(setWeekly).catch(console.error)
    getDailyStats().then(setDaily).catch(console.error)
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Estadísticas</h2>
      {weekly && (
        <p>
          Sesiones: {weekly.totalSessions} | Minutos: {weekly.totalFocusTime} |
          Prom/día: {weekly.avgPerDay.toFixed(1)}
        </p>
      )}
      <h3 className="mt-4 font-semibold">Últimos días</h3>
      <ul className="mt-4">
        {daily.map((d) => (
          <li key={d.id}>
            {new Date(d.date).toLocaleDateString()} → {d.totalSessions} sesiones
            ({d.totalFocusTime} min)
          </li>
        ))}
      </ul>
    </div>
  )
}
