import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import createTasksRouter from './routes/tasks'
import createSessionsRouter from './routes/sessions'
import createStatisticsRouter from './routes/statistics'
import createAuthRouter from './routes/auth'
import { authMiddleware } from './middleware/auth'

dotenv.config()
const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.use('/api/auth', createAuthRouter(prisma))

app.use('/api/tasks', authMiddleware, createTasksRouter(prisma))
app.use('/api/sessions', authMiddleware, createSessionsRouter(prisma))
app.use('/api/statistics', authMiddleware, createStatisticsRouter(prisma))

const PORT = process.env.PORT || 4000
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
