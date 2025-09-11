import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import createTasksRouter from './routes/tasks'

dotenv.config()
const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.use('/api/tasks', createTasksRouter(prisma))

const PORT = process.env.PORT || 4000
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
