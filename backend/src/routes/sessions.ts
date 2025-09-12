import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { AuthRequest } from '../middleware/auth'

const startSessionSchema = z.object({
  taskId: z.number().optional(),
})

const endSessionSchema = z.object({
  endTime: z.string().datetime(), // ISO string
})

export default function createSessionsRouter(prisma: PrismaClient) {
  const router = Router()

  // Iniciar sesión Pomodoro
  router.post('/start', async (req: AuthRequest, res) => {
    const userId = req.user!.id
    const parsed = startSessionSchema.safeParse(req.body)
    if (!parsed.success)
      return res.status(400).json({ error: parsed.error.format() })

    try {
      const session = await prisma.session.create({
        data: {
          startTime: new Date(),
          taskId: parsed.data.taskId,
          userId,
        },
      })
      res.status(201).json(session)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Server error' })
    }
  })

  // Finalizar sesión Pomodoro
  router.post('/:id/end', async (req: AuthRequest, res) => {
    const userId = req.user!.id
    const id = Number(req.params.id)
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' })

    const parsed = endSessionSchema.safeParse(req.body)
    if (!parsed.success)
      return res.status(400).json({ error: parsed.error.format() })

    try {
      const existingSession = await prisma.session.findUnique({
        where: { id, userId },
      })
      if (!existingSession) {
        return res.status(404).json({ error: 'Not found' })
      }

      const endTime = new Date(parsed.data.endTime)

      const session = await prisma.session.update({
        where: { id },
        data: {
          endTime,
          duration: Math.floor(
            (endTime.getTime() - existingSession.startTime.getTime()) /
              1000 /
              60
          ),
        },
      })

      // Actualizar estadísticas del usuario para la fecha de hoy
      const date = new Date()
      const day = new Date(date.getFullYear(), date.getMonth(), date.getDate())

      await prisma.statistic.upsert({
        where: {
          userId_date: { userId: session.userId, date: day },
        },
        update: {
          totalSessions: { increment: 1 },
          totalFocusTime: { increment: session.duration ?? 0 },
        },
        create: {
          userId: session.userId,
          date: day,
          totalSessions: 1,
          totalFocusTime: session.duration ?? 0,
        },
      })

      res.json(session)
    } catch (err) {
      console.error(err)
      if (
        err &&
        typeof err === 'object' &&
        'code' in err &&
        err.code === 'P2025'
      ) {
        return res.status(404).json({ error: 'Not found' })
      }
      res.status(500).json({ error: 'Server error' })
    }
  })

  // Listar sesiones del usuario
  router.get('/', async (req: AuthRequest, res) => {
    const userId = req.user!.id
    try {
      const sessions = await prisma.session.findMany({
        where: { userId },
        orderBy: { startTime: 'desc' },
      })
      res.json(sessions)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Server error' })
    }
  })

  return router
}
