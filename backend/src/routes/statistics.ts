import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

export default function createStatisticsRouter(prisma: PrismaClient) {
  const router = Router()

  // Estadísticas diarias (últimos N días)
  router.get('/daily', async (req, res) => {
    const userId = req.query.userId ? Number(req.query.userId) : 1
    const days = req.query.days ? Number(req.query.days) : 7

    try {
      const since = new Date()
      since.setDate(since.getDate() - days)

      const stats = await prisma.statistic.findMany({
        where: {
          userId,
          date: { gte: since },
        },
        orderBy: { date: 'asc' },
      })

      res.json(stats)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Server error' })
    }
  })

  // Resumen semanal (última semana)
  router.get('/weekly', async (req, res) => {
    const userId = req.query.userId ? Number(req.query.userId) : 1

    try {
      const today = new Date()
      const startOfWeek = new Date(today)
      startOfWeek.setDate(today.getDate() - 7)

      const stats = await prisma.statistic.findMany({
        where: { userId, date: { gte: startOfWeek } },
      })

      const totalSessions = stats.reduce((sum, s) => sum + s.totalSessions, 0)
      const totalFocusTime = stats.reduce((sum, s) => sum + s.totalFocusTime, 0)

      res.json({
        totalSessions,
        totalFocusTime,
        avgPerDay: totalFocusTime / 7,
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Server error' })
    }
  })

  return router
}
