import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { TaskRepository } from '../repositories/taskRepository'
import { TaskService } from '../services/taskService'
import { TaskController } from '../controllers/taskController'
import { authMiddleware } from '../middleware/auth'
import { validateBody, validateParams } from '../middleware/validate'
import {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
} from '../validators/taskValidators'

const router = Router()
const prisma = new PrismaClient()

// Dependency Injection
const taskRepo = new TaskRepository(prisma)
const taskService = new TaskService(taskRepo)
const taskController = new TaskController(taskService)

// All routes require authentication
router.use(authMiddleware)

// Routes
router.get('/', taskController.getAll)
router.get('/:id', validateParams(taskIdSchema), taskController.getById)
router.post('/', validateBody(createTaskSchema), taskController.create)
router.patch(
  '/:id',
  validateParams(taskIdSchema),
  validateBody(updateTaskSchema),
  taskController.update
)
router.delete('/:id', validateParams(taskIdSchema), taskController.delete)

export default router
