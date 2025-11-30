import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/auth'
import tasksRouter from './routes/tasks'
import sessionsRouter from './routes/sessions'
import statisticsRouter from './routes/statistics'
import { errorHandler } from './errors/errorHandler'

dotenv.config()
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (_req, res) => res.json({ ok: true }))

// Routes
app.use('/api/auth', authRouter)
app.use('/api/tasks', tasksRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/statistics', statisticsRouter)

// Error handler (must be last)
app.use(errorHandler)

const PORT = process.env.PORT || 4000
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
