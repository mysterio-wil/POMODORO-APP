import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { SessionRepository } from '../repositories/sessionRepository'
import { SessionService } from '../services/sessionService'
import { SessionController } from '../controllers/sessionController'
import { authMiddleware } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

// Dependency Injection
const sessionRepo = new SessionRepository(prisma)
const sessionService = new SessionService(sessionRepo)
const sessionController = new SessionController(sessionService)

// All routes require authentication
router.use(authMiddleware)

// Routes
router.post('/start', sessionController.start)
router.post('/:id/end', sessionController.end)
router.get('/', sessionController.getAll)

export default router
