import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.enum(['ALTA', 'MEDIA', 'BAJA']).default('MEDIA'),
  // por ahora permitimos enviar userId (reemplazar luego con auth)
  userId: z.number().optional(),
})

const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  priority: z.enum(['ALTA', 'MEDIA', 'BAJA']).optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'DONE']).optional(),
})

export default function createTasksRouter(prisma: PrismaClient) {
  const router = Router()

  // Listar todas las tareas del usuario (si userId en query)
  router.get('/', async (req, res) => {
    try {
      const userId = req.query.userId ? Number(req.query.userId) : undefined
      const tasks = await prisma.task.findMany({
        ...(userId ? { where: { userId } } : {}),
        orderBy: { createdAt: 'desc' },
      })
      res.json(tasks)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Server error' })
    }
  })

  // Obtener una tarea por id
  router.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' })
    try {
      const task = await prisma.task.findUnique({ where: { id } })
      if (!task) return res.status(404).json({ error: 'Not found' })
      res.json(task)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Server error' })
    }
  })

  // Crear tarea
  router.post('/', async (req, res) => {
    const parsed = createTaskSchema.safeParse(req.body)
    if (!parsed.success)
      return res.status(400).json({ error: parsed.error.format() })

    try {
      // Temporal: userId por body o por defecto 1 (reemplaza cuando añadas auth)
      const userId = parsed.data.userId ?? 1
      const task = await prisma.task.create({
        data: {
          title: parsed.data.title,
          description: parsed.data.description,
          priority: parsed.data.priority,
          status: 'PENDING',
          userId,
        },
      })
      res.status(201).json(task)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Server error' })
    }
  })

  // Actualizar tarea
  router.patch('/:id', async (req, res) => {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' })

    const parsed = updateTaskSchema.safeParse(req.body)
    if (!parsed.success)
      return res.status(400).json({ error: parsed.error.format() })

    try {
      const updated = await prisma.task.update({
        where: { id },
        data: parsed.data,
      })
      res.json(updated)
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

  // Borrar tarea
  router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' })

    try {
      await prisma.task.delete({ where: { id } })
      res.status(204).send()
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

  return router
}
