# Plan Detallado de Continuación del Desarrollo - Pomodoro App

## 📋 Resumen Ejecutivo

**Estado Actual**: Paso 11 Completado (100%) - Refactorización en Progreso (~30%)  
**Rama Actual**: `refactor/arch`  
**Objetivo**: Completar refactorización y avanzar al Paso 12 (Temporizador Pomodoro)

---

## 🎯 Objetivos Generales

1. ✅ Completar refactorización de arquitectura backend (capas)
2. ✅ Completar refactorización de arquitectura frontend (estructura)
3. ✅ Implementar testing comprehensivo
4. ✅ Desarrollar temporizador Pomodoro funcional
5. ✅ Mejorar UX/UI y documentación

---

## 📦 Fase 1: Refactorización Backend - Arquitectura en Capas

### Objetivo
Implementar arquitectura de 3 capas (Controllers → Services → Repositories) para desacoplar lógica de negocio.

### 1.1 Crear Estructura de Carpetas

```
backend/src/
├── controllers/     [NUEVO]
│   ├── authController.ts
│   ├── taskController.ts
│   ├── sessionController.ts
│   └── statisticsController.ts
├── services/        [NUEVO]
│   ├── authService.ts
│   ├── taskService.ts
│   ├── sessionService.ts
│   └── statisticsService.ts
├── repositories/    [NUEVO]
│   ├── userRepository.ts
│   ├── taskRepository.ts
│   ├── sessionRepository.ts
│   └── statisticsRepository.ts
├── types/           [NUEVO]
│   ├── auth.types.ts
│   ├── task.types.ts
│   └── common.types.ts
├── validators/      [NUEVO]
│   ├── authValidators.ts
│   ├── taskValidators.ts
│   └── sessionValidators.ts
└── errors/          [NUEVO]
    ├── AppError.ts
    └── errorHandler.ts
```

---

### 1.2 Implementar Capa de Repositorios

#### [NEW] [backend/src/repositories/taskRepository.ts](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/backend/src/repositories/taskRepository.ts)

**Responsabilidad**: Acceso directo a la base de datos para tareas.

```typescript
import { PrismaClient, Task, Priority, TaskStatus } from '@prisma/client'

export class TaskRepository {
  constructor(private prisma: PrismaClient) {}

  async findAllByUserId(userId: number): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
  }

  async findById(id: number, userId: number): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: { id, userId },
    })
  }

  async create(data: {
    title: string
    description?: string
    priority: Priority
    userId: number
  }): Promise<Task> {
    return this.prisma.task.create({
      data: {
        ...data,
        status: 'PENDING',
      },
    })
  }

  async update(
    id: number,
    data: {
      title?: string
      description?: string
      priority?: Priority
      status?: TaskStatus
    }
  ): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data,
    })
  }

  async delete(id: number): Promise<void> {
    await this.prisma.task.delete({ where: { id } })
  }
}
```

#### [NEW] [backend/src/repositories/userRepository.ts](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/backend/src/repositories/userRepository.ts)

```typescript
import { PrismaClient, User } from '@prisma/client'

export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } })
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } })
  }

  async create(data: {
    name: string
    email: string
    passwordHash: string
  }): Promise<User> {
    return this.prisma.user.create({ data })
  }
}
```

#### [NEW] [backend/src/repositories/sessionRepository.ts](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/backend/src/repositories/sessionRepository.ts)

```typescript
import { PrismaClient, Session } from '@prisma/client'

export class SessionRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: {
    userId: number
    taskId?: number
    startTime: Date
  }): Promise<Session> {
    return this.prisma.session.create({ data })
  }

  async findById(id: number, userId: number): Promise<Session | null> {
    return this.prisma.session.findFirst({
      where: { id, userId },
    })
  }

  async update(
    id: number,
    data: { endTime: Date; duration: number }
  ): Promise<Session> {
    return this.prisma.session.update({
      where: { id },
      data,
    })
  }

  async findAllByUserId(userId: number): Promise<Session[]> {
    return this.prisma.session.findMany({
      where: { userId },
      orderBy: { startTime: 'desc' },
    })
  }
}
```

---

### 1.3 Implementar Capa de Servicios

#### [NEW] [backend/src/services/taskService.ts](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/backend/src/services/taskService.ts)

**Responsabilidad**: Lógica de negocio para tareas.

```typescript
import { TaskRepository } from '../repositories/taskRepository'
import { AppError } from '../errors/AppError'
import { Priority, TaskStatus } from '@prisma/client'

export class TaskService {
  constructor(private taskRepo: TaskRepository) {}

  async getAllTasks(userId: number) {
    return this.taskRepo.findAllByUserId(userId)
  }

  async getTaskById(id: number, userId: number) {
    const task = await this.taskRepo.findById(id, userId)
    if (!task) {
      throw new AppError('Task not found', 404)
    }
    return task
  }

  async createTask(
    userId: number,
    data: {
      title: string
      description?: string
      priority?: Priority
    }
  ) {
    return this.taskRepo.create({
      title: data.title,
      description: data.description,
      priority: data.priority || 'MEDIA',
      userId,
    })
  }

  async updateTask(
    id: number,
    userId: number,
    data: {
      title?: string
      description?: string
      priority?: Priority
      status?: TaskStatus
    }
  ) {
    // Verificar que la tarea existe y pertenece al usuario
    await this.getTaskById(id, userId)
    return this.taskRepo.update(id, data)
  }

  async deleteTask(id: number, userId: number) {
    // Verificar que la tarea existe y pertenece al usuario
    await this.getTaskById(id, userId)
    await this.taskRepo.delete(id)
  }
}
```

#### [NEW] [backend/src/services/authService.ts](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/backend/src/services/authService.ts)

```typescript
import { UserRepository } from '../repositories/userRepository'
import { hashPassword, comparePassword, generateToken } from '../utils/auth'
import { AppError } from '../errors/AppError'

export class AuthService {
  constructor(private userRepo: UserRepository) {}

  async register(data: { name: string; email: string; password: string }) {
    // Verificar si el email ya existe
    const existing = await this.userRepo.findByEmail(data.email)
    if (existing) {
      throw new AppError('Email already in use', 400)
    }

    // Hashear contraseña
    const passwordHash = await hashPassword(data.password)

    // Crear usuario
    const user = await this.userRepo.create({
      name: data.name,
      email: data.email,
      passwordHash,
    })

    // Generar token
    const token = generateToken({ id: user.id, email: user.email })

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }
  }

  async login(data: { email: string; password: string }) {
    // Buscar usuario
    const user = await this.userRepo.findByEmail(data.email)
    if (!user) {
      throw new AppError('Invalid credentials', 400)
    }

    // Verificar contraseña
    const valid = await comparePassword(data.password, user.passwordHash)
    if (!valid) {
      throw new AppError('Invalid credentials', 400)
    }

    // Generar token
    const token = generateToken({ id: user.id, email: user.email })

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }
  }
}
```

---

### 1.4 Implementar Capa de Controllers

#### [NEW] [backend/src/controllers/taskController.ts](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/backend/src/controllers/taskController.ts)

**Responsabilidad**: Manejar requests HTTP y responses.

```typescript
import { Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import { TaskService } from '../services/taskService'

export class TaskController {
  constructor(private taskService: TaskService) {}

  getAllTasks = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id
    const tasks = await this.taskService.getAllTasks(userId)
    res.json(tasks)
  }

  getTaskById = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id
    const id = Number(req.params.id)
    const task = await this.taskService.getTaskById(id, userId)
    res.json(task)
  }

  createTask = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id
    const task = await this.taskService.createTask(userId, req.body)
    res.status(201).json(task)
  }

  updateTask = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id
    const id = Number(req.params.id)
    const task = await this.taskService.updateTask(id, userId, req.body)
    res.json(task)
  }

  deleteTask = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id
    const id = Number(req.params.id)
    await this.taskService.deleteTask(id, userId)
    res.status(204).send()
  }
}
```

---

### 1.5 Implementar Manejo de Errores Centralizado

#### [NEW] [backend/src/errors/AppError.ts](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/backend/src/errors/AppError.ts)

```typescript
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500
  ) {
    super(message)
    this.name = 'AppError'
  }
}
```

#### [NEW] [backend/src/errors/errorHandler.ts](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/backend/src/errors/errorHandler.ts)

```typescript
import { Request, Response, NextFunction } from 'express'
import { AppError } from './AppError'
import { ZodError } from 'zod'

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Error:', err)

  // Error personalizado
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
    })
  }

  // Error de validación Zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation error',
      details: err.format(),
    })
  }

  // Error de Prisma
  if (err && typeof err === 'object' && 'code' in err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Resource not found' })
    }
  }

  // Error genérico
  res.status(500).json({
    error: 'Internal server error',
  })
}
```

---

### 1.6 Implementar Validadores con Zod

#### [NEW] [backend/src/validators/taskValidators.ts](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/backend/src/validators/taskValidators.ts)

```typescript
import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  priority: z.enum(['ALTA', 'MEDIA', 'BAJA']).default('MEDIA'),
})

export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  priority: z.enum(['ALTA', 'MEDIA', 'BAJA']).optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'DONE']).optional(),
})

export const taskIdSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
})
```

---

### 1.7 Middleware de Validación

#### [NEW] [backend/src/middleware/validate.ts](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/backend/src/middleware/validate.ts)

```typescript
import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'

export function validateBody(schema: ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body)
      next()
    } catch (error) {
      next(error)
    }
  }
}

export function validateParams(schema: ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = await schema.parseAsync(req.params)
      next()
    } catch (error) {
      next(error)
    }
  }
}
```

---

### 1.8 Refactorizar Rutas para Usar Controllers

#### [MODIFY] [backend/src/routes/tasks.ts](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/backend/src/routes/tasks.ts)

```typescript
import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { TaskController } from '../controllers/taskController'
import { TaskService } from '../services/taskService'
import { TaskRepository } from '../repositories/taskRepository'
import { validateBody, validateParams } from '../middleware/validate'
import {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
} from '../validators/taskValidators'
import { asyncHandler } from '../utils/asyncHandler'

export default function createTasksRouter(prisma: PrismaClient) {
  const router = Router()

  // Inicializar capas
  const taskRepo = new TaskRepository(prisma)
  const taskService = new TaskService(taskRepo)
  const taskController = new TaskController(taskService)

  // Rutas
  router.get('/', asyncHandler(taskController.getAllTasks))

  router.get(
    '/:id',
    validateParams(taskIdSchema),
    asyncHandler(taskController.getTaskById)
  )

  router.post(
    '/',
    validateBody(createTaskSchema),
    asyncHandler(taskController.createTask)
  )

  router.patch(
    '/:id',
    validateParams(taskIdSchema),
    validateBody(updateTaskSchema),
    asyncHandler(taskController.updateTask)
  )

  router.delete(
    '/:id',
    validateParams(taskIdSchema),
    asyncHandler(taskController.deleteTask)
  )

  return router
}
```

---

### 1.9 Utilidad AsyncHandler

#### [NEW] [backend/src/utils/asyncHandler.ts](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/backend/src/utils/asyncHandler.ts)

```typescript
import { Request, Response, NextFunction } from 'express'

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>

export function asyncHandler(fn: AsyncFunction) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
```

---

### 1.10 Actualizar index.ts con Error Handler

#### [MODIFY] [backend/src/index.ts](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/backend/src/index.ts)

```typescript
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import createTasksRouter from './routes/tasks'
import createSessionsRouter from './routes/sessions'
import createStatisticsRouter from './routes/statistics'
import createAuthRouter from './routes/auth'
import { authMiddleware } from './middleware/auth'
import { errorHandler } from './errors/errorHandler'

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

// ✅ Error handler debe ir al final
app.use(errorHandler)

const PORT = process.env.PORT || 4000
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
```

---

### ✅ Checklist Fase 1

- [ ] Crear estructura de carpetas (controllers, services, repositories, validators, errors)
- [ ] Implementar repositorios (User, Task, Session, Statistics)
- [ ] Implementar servicios (Auth, Task, Session, Statistics)
- [ ] Implementar controllers (Auth, Task, Session, Statistics)
- [ ] Crear AppError y errorHandler
- [ ] Crear validadores con Zod
- [ ] Crear middleware de validación
- [ ] Crear asyncHandler utility
- [ ] Refactorizar rutas de tasks
- [ ] Refactorizar rutas de auth
- [ ] Refactorizar rutas de sessions
- [ ] Refactorizar rutas de statistics
- [ ] Actualizar index.ts con error handler
- [ ] Probar todas las rutas manualmente

---

## 🎨 Fase 2: Refactorización Frontend - Estructura y Componentes

### Objetivo
Mejorar la organización del código frontend con hooks personalizados, componentes reutilizables y mejor gestión de estado.

### 2.1 Crear Estructura de Carpetas Mejorada

```
frontend/src/
├── components/
│   ├── common/          [NUEVO]
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── Loading.tsx
│   ├── layout/          [NUEVO]
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   ├── tasks/           [NUEVO]
│   │   ├── TaskList.tsx
│   │   ├── TaskItem.tsx
│   │   ├── TaskForm.tsx
│   │   └── TaskFilters.tsx
│   └── pomodoro/        [NUEVO]
│       ├── PomodoroTimer.tsx
│       ├── TimerControls.tsx
│       └── TimerDisplay.tsx
├── hooks/               [NUEVO]
│   ├── useTasks.ts
│   ├── usePomodoro.ts
│   ├── useStatistics.ts
│   └── useLocalStorage.ts
├── types/               [NUEVO]
│   ├── task.types.ts
│   ├── session.types.ts
│   └── statistics.types.ts
└── utils/               [NUEVO]
    ├── formatters.ts
    └── constants.ts
```

---

### 2.2 Crear Tipos TypeScript

#### [NEW] [frontend/src/types/task.types.ts](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/frontend/src/types/task.types.ts)

```typescript
export type Priority = 'ALTA' | 'MEDIA' | 'BAJA'
export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE'

export interface Task {
  id: number
  title: string
  description?: string
  priority: Priority
  status: TaskStatus
  userId: number
  createdAt: string
  updatedAt: string
}

export interface CreateTaskDTO {
  title: string
  description?: string
  priority?: Priority
}

export interface UpdateTaskDTO {
  title?: string
  description?: string
  priority?: Priority
  status?: TaskStatus
}
```

#### [NEW] [frontend/src/types/session.types.ts](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/frontend/src/types/session.types.ts)

```typescript
export interface Session {
  id: number
  startTime: string
  endTime?: string
  duration?: number
  taskId?: number
  userId: number
  createdAt: string
}

export interface CreateSessionDTO {
  taskId?: number
}
```

---

### 2.3 Crear Hooks Personalizados

#### [NEW] [frontend/src/hooks/useTasks.ts](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/frontend/src/hooks/useTasks.ts)

```typescript
import { useState, useEffect, useCallback } from 'react'
import * as taskService from '../services/taskService'
import type { Task, CreateTaskDTO, UpdateTaskDTO } from '../types/task.types'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await taskService.getTasks()
      setTasks(data)
    } catch (err: any) {
      setError(err.message || 'Error fetching tasks')
    } finally {
      setLoading(false)
    }
  }, [])

  const createTask = useCallback(async (data: CreateTaskDTO) => {
    setLoading(true)
    setError(null)
    try {
      const newTask = await taskService.createTask(data)
      setTasks((prev) => [newTask, ...prev])
      return newTask
    } catch (err: any) {
      setError(err.message || 'Error creating task')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const updateTask = useCallback(async (id: number, data: UpdateTaskDTO) => {
    setLoading(true)
    setError(null)
    try {
      const updated = await taskService.updateTask(id, data)
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
      return updated
    } catch (err: any) {
      setError(err.message || 'Error updating task')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteTask = useCallback(async (id: number) => {
    setLoading(true)
    setError(null)
    try {
      await taskService.deleteTask(id)
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch (err: any) {
      setError(err.message || 'Error deleting task')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  }
}
```

#### [NEW] [frontend/src/hooks/usePomodoro.ts](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/frontend/src/hooks/usePomodoro.ts)

```typescript
import { useState, useEffect, useCallback, useRef } from 'react'

export type PomodoroMode = 'work' | 'shortBreak' | 'longBreak'

interface UsePomodoroOptions {
  workDuration?: number // en minutos
  shortBreakDuration?: number
  longBreakDuration?: number
  onComplete?: () => void
}

export function usePomodoro(options: UsePomodoroOptions = {}) {
  const {
    workDuration = 25,
    shortBreakDuration = 5,
    longBreakDuration = 15,
    onComplete,
  } = options

  const [mode, setMode] = useState<PomodoroMode>('work')
  const [timeLeft, setTimeLeft] = useState(workDuration * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [completedPomodoros, setCompletedPomodoros] = useState(0)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const getDuration = useCallback(
    (currentMode: PomodoroMode) => {
      switch (currentMode) {
        case 'work':
          return workDuration * 60
        case 'shortBreak':
          return shortBreakDuration * 60
        case 'longBreak':
          return longBreakDuration * 60
      }
    },
    [workDuration, shortBreakDuration, longBreakDuration]
  )

  const start = useCallback(() => {
    setIsRunning(true)
  }, [])

  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setTimeLeft(getDuration(mode))
  }, [mode, getDuration])

  const switchMode = useCallback(
    (newMode: PomodoroMode) => {
      setMode(newMode)
      setTimeLeft(getDuration(newMode))
      setIsRunning(false)
    },
    [getDuration]
  )

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      if (mode === 'work') {
        setCompletedPomodoros((prev) => prev + 1)
      }
      onComplete?.()
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft, mode, onComplete])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return {
    mode,
    timeLeft,
    minutes,
    seconds,
    isRunning,
    completedPomodoros,
    start,
    pause,
    reset,
    switchMode,
  }
}
```

---

### 2.4 Crear Componentes Comunes

#### [NEW] [frontend/src/components/common/Button.tsx](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/frontend/src/components/common/Button.tsx)

```typescript
import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded font-medium transition-colors'

  const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  }

  const disabledStyles = 'opacity-50 cursor-not-allowed'

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${disabled ? disabledStyles : ''} ${className}`}
    >
      {children}
    </button>
  )
}
```

#### [NEW] [frontend/src/components/common/Card.tsx](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/frontend/src/components/common/Card.tsx)

```typescript
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
}

export default function Card({ children, className = '', title }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {title && <h3 className="text-xl font-bold mb-4">{title}</h3>}
      {children}
    </div>
  )
}
```

---

### 2.5 Actualizar Servicios con Tipos

#### [MODIFY] [frontend/src/services/taskService.ts](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/frontend/src/services/taskService.ts)

```typescript
import api from './api'
import type { Task, CreateTaskDTO, UpdateTaskDTO } from '../types/task.types'

export async function getTasks(): Promise<Task[]> {
  const res = await api.get<Task[]>('/tasks')
  return res.data
}

export async function createTask(data: CreateTaskDTO): Promise<Task> {
  const res = await api.post<Task>('/tasks', data)
  return res.data
}

export async function updateTask(
  id: number,
  data: UpdateTaskDTO
): Promise<Task> {
  const res = await api.patch<Task>(`/tasks/${id}`, data)
  return res.data
}

export async function deleteTask(id: number): Promise<void> {
  await api.delete(`/tasks/${id}`)
}
```

---

### ✅ Checklist Fase 2

- [ ] Crear estructura de carpetas (components, hooks, types, utils)
- [ ] Crear tipos TypeScript (task, session, statistics)
- [ ] Crear hook useTasks
- [ ] Crear hook usePomodoro
- [ ] Crear hook useLocalStorage
- [ ] Crear componentes comunes (Button, Card, Input, Loading)
- [ ] Crear componentes de layout (Header, Sidebar, Layout)
- [ ] Actualizar servicios con tipos
- [ ] Refactorizar página Tasks con nuevos componentes
- [ ] Refactorizar página Dashboard

---

## 🧪 Fase 3: QA y Testing

### 3.1 Testing Backend

#### [NEW] [backend/src/__tests__/taskService.test.ts](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/backend/src/__tests__/taskService.test.ts)

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { TaskService } from '../services/taskService'
import { TaskRepository } from '../repositories/taskRepository'
import { AppError } from '../errors/AppError'

// Mock del repositorio
class MockTaskRepository implements Partial<TaskRepository> {
  private tasks: any[] = []

  async findAllByUserId(userId: number) {
    return this.tasks.filter((t) => t.userId === userId)
  }

  async create(data: any) {
    const task = { id: 1, ...data, createdAt: new Date(), updatedAt: new Date() }
    this.tasks.push(task)
    return task
  }
}

describe('TaskService', () => {
  let taskService: TaskService
  let mockRepo: MockTaskRepository

  beforeEach(() => {
    mockRepo = new MockTaskRepository()
    taskService = new TaskService(mockRepo as TaskRepository)
  })

  it('should create a task', async () => {
    const task = await taskService.createTask(1, {
      title: 'Test Task',
      priority: 'ALTA',
    })

    expect(task.title).toBe('Test Task')
    expect(task.priority).toBe('ALTA')
  })

  it('should get all tasks for a user', async () => {
    await taskService.createTask(1, { title: 'Task 1' })
    await taskService.createTask(1, { title: 'Task 2' })

    const tasks = await taskService.getAllTasks(1)
    expect(tasks).toHaveLength(2)
  })
})
```

---

### 3.2 Testing Frontend

#### [NEW] [frontend/src/__tests__/useTasks.test.ts](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/frontend/src/__tests__/useTasks.test.ts)

```typescript
import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useTasks } from '../hooks/useTasks'
import * as taskService from '../services/taskService'

vi.mock('../services/taskService')

describe('useTasks', () => {
  it('should fetch tasks on mount', async () => {
    const mockTasks = [
      { id: 1, title: 'Task 1', status: 'PENDING' },
      { id: 2, title: 'Task 2', status: 'DONE' },
    ]

    vi.mocked(taskService.getTasks).mockResolvedValue(mockTasks as any)

    const { result } = renderHook(() => useTasks())

    await waitFor(() => {
      expect(result.current.tasks).toHaveLength(2)
      expect(result.current.loading).toBe(false)
    })
  })
})
```

---

### ✅ Checklist Fase 3

- [ ] Configurar Vitest para backend
- [ ] Escribir tests para TaskService
- [ ] Escribir tests para AuthService
- [ ] Escribir tests para SessionService
- [ ] Escribir tests para useTasks hook
- [ ] Escribir tests para usePomodoro hook
- [ ] Escribir tests para componentes Button, Card
- [ ] Ejecutar todos los tests
- [ ] Alcanzar >70% de cobertura

---

## ⏱️ Fase 4: Implementación del Temporizador Pomodoro (Paso 12)

### Objetivo
Crear un temporizador Pomodoro funcional con integración a sesiones y estadísticas.

### 4.1 Componente PomodoroTimer

#### [NEW] [frontend/src/components/pomodoro/PomodoroTimer.tsx](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/frontend/src/components/pomodoro/PomodoroTimer.tsx)

```typescript
import { usePomodoro } from '../../hooks/usePomodoro'
import TimerDisplay from './TimerDisplay'
import TimerControls from './TimerControls'
import Card from '../common/Card'

export default function PomodoroTimer() {
  const {
    mode,
    minutes,
    seconds,
    isRunning,
    completedPomodoros,
    start,
    pause,
    reset,
    switchMode,
  } = usePomodoro({
    onComplete: () => {
      // Reproducir sonido de notificación
      new Audio('/notification.mp3').play()
      // Mostrar notificación del navegador
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Pomodoro Completado!', {
          body: 'Es hora de tomar un descanso',
        })
      }
    },
  })

  return (
    <Card title="Pomodoro Timer" className="max-w-md mx-auto">
      <div className="text-center">
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-600">
            Pomodoros completados: {completedPomodoros}
          </span>
        </div>

        <TimerDisplay minutes={minutes} seconds={seconds} mode={mode} />

        <TimerControls
          isRunning={isRunning}
          onStart={start}
          onPause={pause}
          onReset={reset}
        />

        <div className="mt-6 flex gap-2 justify-center">
          <button
            onClick={() => switchMode('work')}
            className={`px-4 py-2 rounded ${mode === 'work' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Trabajo
          </button>
          <button
            onClick={() => switchMode('shortBreak')}
            className={`px-4 py-2 rounded ${mode === 'shortBreak' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            Descanso Corto
          </button>
          <button
            onClick={() => switchMode('longBreak')}
            className={`px-4 py-2 rounded ${mode === 'longBreak' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
          >
            Descanso Largo
          </button>
        </div>
      </div>
    </Card>
  )
}
```

#### [NEW] [frontend/src/components/pomodoro/TimerDisplay.tsx](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/frontend/src/components/pomodoro/TimerDisplay.tsx)

```typescript
import type { PomodoroMode } from '../../hooks/usePomodoro'

interface TimerDisplayProps {
  minutes: number
  seconds: number
  mode: PomodoroMode
}

export default function TimerDisplay({
  minutes,
  seconds,
  mode,
}: TimerDisplayProps) {
  const modeColors = {
    work: 'text-blue-600',
    shortBreak: 'text-green-600',
    longBreak: 'text-purple-600',
  }

  const modeLabels = {
    work: 'Trabajo',
    shortBreak: 'Descanso Corto',
    longBreak: 'Descanso Largo',
  }

  return (
    <div className="my-8">
      <div className={`text-6xl font-bold ${modeColors[mode]}`}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="text-lg text-gray-600 mt-2">{modeLabels[mode]}</div>
    </div>
  )
}
```

#### [NEW] [frontend/src/components/pomodoro/TimerControls.tsx](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/frontend/src/components/pomodoro/TimerControls.tsx)

```typescript
import Button from '../common/Button'

interface TimerControlsProps {
  isRunning: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
}

export default function TimerControls({
  isRunning,
  onStart,
  onPause,
  onReset,
}: TimerControlsProps) {
  return (
    <div className="flex gap-4 justify-center">
      {!isRunning ? (
        <Button onClick={onStart} variant="primary">
          Iniciar
        </Button>
      ) : (
        <Button onClick={onPause} variant="secondary">
          Pausar
        </Button>
      )}
      <Button onClick={onReset} variant="danger">
        Reiniciar
      </Button>
    </div>
  )
}
```

---

### 4.2 Integrar Temporizador en Dashboard

#### [MODIFY] [frontend/src/pages/Dashboard.tsx](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/frontend/src/pages/Dashboard.tsx)

```typescript
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PomodoroTimer from '../components/pomodoro/PomodoroTimer'
import Button from '../components/common/Button'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Bienvenido, {user?.name}
          </h1>
          <Button onClick={handleLogout} variant="danger">
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <PomodoroTimer />
          </div>

          <div>
            {/* Aquí irán las estadísticas */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Estadísticas</h2>
              <p className="text-gray-600">Próximamente...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
```

---

### 4.3 Integrar con API de Sesiones

#### [NEW] [frontend/src/services/sessionService.ts](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/frontend/src/services/sessionService.ts)

```typescript
import api from './api'
import type { Session, CreateSessionDTO } from '../types/session.types'

export async function startSession(
  data: CreateSessionDTO
): Promise<Session> {
  const res = await api.post<Session>('/sessions/start', data)
  return res.data
}

export async function endSession(
  id: number,
  duration: number
): Promise<Session> {
  const res = await api.post<Session>(`/sessions/${id}/end`, { duration })
  return res.data
}

export async function getSessions(): Promise<Session[]> {
  const res = await api.get<Session[]>('/sessions')
  return res.data
}
```

---

### ✅ Checklist Fase 4

- [ ] Crear componente PomodoroTimer
- [ ] Crear componente TimerDisplay
- [ ] Crear componente TimerControls
- [ ] Implementar hook usePomodoro
- [ ] Integrar temporizador en Dashboard
- [ ] Crear servicio de sesiones
- [ ] Conectar temporizador con API de sesiones
- [ ] Implementar notificaciones del navegador
- [ ] Agregar sonido de notificación
- [ ] Probar flujo completo de Pomodoro

---

## 🚀 Fase 5: Mejoras Finales y Optimizaciones

### 5.1 Documentación de API (Swagger)

#### [NEW] [backend/src/swagger.ts](file:///c:/Users/WIGUSA/Documents/GitHub/pomodoro-app/backend/src/swagger.ts)

Instalar dependencias:
```bash
npm install swagger-ui-express swagger-jsdoc
npm install -D @types/swagger-ui-express @types/swagger-jsdoc
```

Configurar Swagger para documentar la API.

---

### 5.2 Mejoras de UX/UI

- [ ] Implementar tema oscuro
- [ ] Mejorar diseño responsive
- [ ] Agregar animaciones con Framer Motion
- [ ] Implementar skeleton loaders
- [ ] Mejorar mensajes de error

---

### 5.3 Optimizaciones de Rendimiento

- [ ] Implementar lazy loading de componentes
- [ ] Optimizar queries de Prisma
- [ ] Implementar caché en frontend
- [ ] Comprimir assets
- [ ] Implementar service worker (PWA)

---

### ✅ Checklist Fase 5

- [ ] Configurar Swagger/OpenAPI
- [ ] Documentar todos los endpoints
- [ ] Implementar tema oscuro
- [ ] Mejorar diseño responsive
- [ ] Agregar animaciones
- [ ] Implementar lazy loading
- [ ] Optimizar rendimiento
- [ ] Actualizar README con nueva documentación
- [ ] Crear guía de contribución
- [ ] Preparar para producción

---

## 📅 Cronograma Estimado

| Fase | Duración Estimada | Prioridad |
|------|-------------------|-----------|
| Fase 1: Backend Refactor | 3-4 días | Alta |
| Fase 2: Frontend Refactor | 2-3 días | Alta |
| Fase 3: Testing | 2 días | Media |
| Fase 4: Temporizador Pomodoro | 2-3 días | Alta |
| Fase 5: Mejoras Finales | 2-3 días | Baja |

**Total Estimado**: 11-15 días de desarrollo

---

## 🎯 Criterios de Éxito

### Fase 1 Completada
- ✅ Arquitectura de 3 capas implementada
- ✅ Todos los endpoints refactorizados
- ✅ Manejo de errores centralizado
- ✅ Validación con Zod en todas las rutas

### Fase 2 Completada
- ✅ Hooks personalizados funcionando
- ✅ Componentes reutilizables creados
- ✅ Tipos TypeScript en todo el frontend
- ✅ Código organizado y mantenible

### Fase 3 Completada
- ✅ >70% cobertura de tests
- ✅ Tests unitarios y de integración
- ✅ CI/CD configurado

### Fase 4 Completada
- ✅ Temporizador Pomodoro funcional
- ✅ Integración con sesiones
- ✅ Notificaciones implementadas
- ✅ Estadísticas actualizadas

### Fase 5 Completada
- ✅ API documentada
- ✅ UX/UI mejorada
- ✅ Rendimiento optimizado
- ✅ Listo para producción

---

## 📚 Recursos Adicionales

- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)
- [React Hooks Best Practices](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest Documentation](https://vitest.dev/)

---

**Fecha de Creación**: 2025-11-29  
**Versión del Plan**: 1.0  
**Próxima Revisión**: Después de completar Fase 1
