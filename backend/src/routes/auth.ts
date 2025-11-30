import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { UserRepository } from '../repositories/userRepository'
import { AuthService } from '../services/authService'
import { AuthController } from '../controllers/authController'
import { validateBody } from '../middleware/validate'
import { registerSchema, loginSchema } from '../validators/authValidators'

const router = Router()
const prisma = new PrismaClient()

// Dependency Injection
const userRepo = new UserRepository(prisma)
const authService = new AuthService(userRepo)
const authController = new AuthController(authService)

// Routes
router.post('/register', validateBody(registerSchema), authController.register)
router.post('/login', validateBody(loginSchema), authController.login)

export default router
