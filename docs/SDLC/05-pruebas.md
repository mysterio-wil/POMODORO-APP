# Fase 5: Pruebas (Testing)

## 5.1 Estrategia de Testing

### Pirámide de Testing

```
         ┌──────────────┐
        ╱  E2E Tests    ╲      10% - Tests de extremo a extremo
       ╱    (Manual)     ╲
      ┌──────────────────┐
     ╱  Integration      ╲    20% - Tests de integración
    ╱      Tests          ╲
   ┌────────────────────────┐
  ╱    Unit Tests           ╲  70% - Tests unitarios
 ╱   (Backend + Frontend)    ╲
└──────────────────────────────┘
```

### Objetivos de Cobertura
- **Backend**: >80% cobertura de código
- **Frontend**: >70% cobertura de código
- **Crítico**: 100% cobertura en autenticación y lógica de negocio

---

## 5.2 Testing Backend

### 5.2.1 Configuración

**Framework**: Vitest

**Instalación**:
```bash
cd backend
npm install -D vitest @vitest/ui
```

**Configuración** (`backend/vitest.config.ts`):
```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'prisma/',
        '**/*.test.ts',
      ],
    },
  },
})
```

---

### 5.2.2 Tests Unitarios - Servicios

#### TaskService Tests

**Archivo**: `backend/src/__tests__/services/taskService.test.ts`

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { TaskService } from '../../services/taskService'
import { TaskRepository } from '../../repositories/taskRepository'
import { AppError } from '../../errors/AppError'

// Mock del repositorio
const mockTaskRepo = {
  findAllByUserId: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
}

describe('TaskService', () => {
  let taskService: TaskService

  beforeEach(() => {
    vi.clearAllMocks()
    taskService = new TaskService(mockTaskRepo as any)
  })

  describe('getAllTasks', () => {
    it('should return all tasks for a user', async () => {
      const mockTasks = [
        { id: 1, title: 'Task 1', userId: 1 },
        { id: 2, title: 'Task 2', userId: 1 },
      ]
      mockTaskRepo.findAllByUserId.mockResolvedValue(mockTasks)

      const result = await taskService.getAllTasks(1)

      expect(result).toEqual(mockTasks)
      expect(mockTaskRepo.findAllByUserId).toHaveBeenCalledWith(1)
    })
  })

  describe('getTaskById', () => {
    it('should return a task when found', async () => {
      const mockTask = { id: 1, title: 'Task 1', userId: 1 }
      mockTaskRepo.findById.mockResolvedValue(mockTask)

      const result = await taskService.getTaskById(1, 1)

      expect(result).toEqual(mockTask)
    })

    it('should throw AppError when task not found', async () => {
      mockTaskRepo.findById.mockResolvedValue(null)

      await expect(taskService.getTaskById(999, 1)).rejects.toThrow(AppError)
      await expect(taskService.getTaskById(999, 1)).rejects.toThrow('Task not found')
    })
  })

  describe('createTask', () => {
    it('should create a task with default priority', async () => {
      const taskData = { title: 'New Task', userId: 1 }
      const mockCreatedTask = { id: 1, ...taskData, priority: 'MEDIA' }
      mockTaskRepo.create.mockResolvedValue(mockCreatedTask)

      const result = await taskService.createTask(1, { title: 'New Task' })

      expect(result).toEqual(mockCreatedTask)
      expect(mockTaskRepo.create).toHaveBeenCalledWith({
        title: 'New Task',
        description: undefined,
        priority: 'MEDIA',
        userId: 1,
      })
    })
  })

  describe('updateTask', () => {
    it('should update a task', async () => {
      const mockTask = { id: 1, title: 'Old Title', userId: 1 }
      const updatedTask = { ...mockTask, title: 'New Title' }
      
      mockTaskRepo.findById.mockResolvedValue(mockTask)
      mockTaskRepo.update.mockResolvedValue(updatedTask)

      const result = await taskService.updateTask(1, 1, { title: 'New Title' })

      expect(result).toEqual(updatedTask)
    })

    it('should throw error if task does not belong to user', async () => {
      mockTaskRepo.findById.mockResolvedValue(null)

      await expect(
        taskService.updateTask(1, 999, { title: 'New Title' })
      ).rejects.toThrow(AppError)
    })
  })

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const mockTask = { id: 1, title: 'Task', userId: 1 }
      mockTaskRepo.findById.mockResolvedValue(mockTask)
      mockTaskRepo.delete.mockResolvedValue(undefined)

      await taskService.deleteTask(1, 1)

      expect(mockTaskRepo.delete).toHaveBeenCalledWith(1)
    })
  })
})
```

---

#### AuthService Tests

**Archivo**: `backend/src/__tests__/services/authService.test.ts`

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { AuthService } from '../../services/authService'
import { UserRepository } from '../../repositories/userRepository'
import { AppError } from '../../errors/AppError'
import * as authUtils from '../../utils/auth'

vi.mock('../../utils/auth')

const mockUserRepo = {
  findByEmail: vi.fn(),
  create: vi.fn(),
}

describe('AuthService', () => {
  let authService: AuthService

  beforeEach(() => {
    vi.clearAllMocks()
    authService = new AuthService(mockUserRepo as any)
  })

  describe('register', () => {
    it('should register a new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      }

      mockUserRepo.findByEmail.mockResolvedValue(null)
      vi.mocked(authUtils.hashPassword).mockResolvedValue('hashed_password')
      mockUserRepo.create.mockResolvedValue({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        passwordHash: 'hashed_password',
      })
      vi.mocked(authUtils.generateToken).mockReturnValue('jwt_token')

      const result = await authService.register(userData)

      expect(result).toHaveProperty('token', 'jwt_token')
      expect(result).toHaveProperty('user')
      expect(result.user).not.toHaveProperty('passwordHash')
    })

    it('should throw error if email already exists', async () => {
      mockUserRepo.findByEmail.mockResolvedValue({ id: 1, email: 'test@example.com' })

      await expect(
        authService.register({
          name: 'Test',
          email: 'test@example.com',
          password: 'pass',
        })
      ).rejects.toThrow('Email already in use')
    })
  })

  describe('login', () => {
    it('should login with valid credentials', async () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        passwordHash: 'hashed_password',
      }

      mockUserRepo.findByEmail.mockResolvedValue(mockUser)
      vi.mocked(authUtils.comparePassword).mockResolvedValue(true)
      vi.mocked(authUtils.generateToken).mockReturnValue('jwt_token')

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123',
      })

      expect(result).toHaveProperty('token', 'jwt_token')
      expect(result.user.email).toBe('test@example.com')
    })

    it('should throw error with invalid email', async () => {
      mockUserRepo.findByEmail.mockResolvedValue(null)

      await expect(
        authService.login({ email: 'wrong@example.com', password: 'pass' })
      ).rejects.toThrow('Invalid credentials')
    })

    it('should throw error with invalid password', async () => {
      mockUserRepo.findByEmail.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        passwordHash: 'hashed',
      })
      vi.mocked(authUtils.comparePassword).mockResolvedValue(false)

      await expect(
        authService.login({ email: 'test@example.com', password: 'wrong' })
      ).rejects.toThrow('Invalid credentials')
    })
  })
})
```

---

### 5.2.3 Tests de Integración - API

**Archivo**: `backend/src/__tests__/integration/tasks.test.ts`

```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from '../../app'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

describe('Tasks API Integration Tests', () => {
  let authToken: string
  let userId: number

  beforeAll(async () => {
    // Crear usuario de prueba y obtener token
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      })

    authToken = response.body.token
    userId = response.body.user.id
  })

  afterAll(async () => {
    // Limpiar datos de prueba
    await prisma.task.deleteMany({ where: { userId } })
    await prisma.user.delete({ where: { id: userId } })
    await prisma.$disconnect()
  })

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Test Task',
          description: 'Test Description',
          priority: 'ALTA',
        })

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('id')
      expect(response.body.title).toBe('Test Task')
      expect(response.body.priority).toBe('ALTA')
    })

    it('should return 401 without auth token', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: 'Test' })

      expect(response.status).toBe(401)
    })

    it('should return 400 with invalid data', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: '' })

      expect(response.status).toBe(400)
    })
  })

  describe('GET /api/tasks', () => {
    it('should return all tasks for authenticated user', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
    })
  })
})
```

---

## 5.3 Testing Frontend

### 5.3.1 Configuración

**Framework**: Vitest + React Testing Library

**Configuración** (`frontend/vite.config.ts`):
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
})
```

**Setup** (`frontend/src/test/setup.ts`):
```typescript
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})
```

---

### 5.3.2 Tests de Hooks

**Archivo**: `frontend/src/__tests__/hooks/useTasks.test.ts`

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useTasks } from '../../hooks/useTasks'
import * as taskService from '../../services/taskService'

vi.mock('../../services/taskService')

describe('useTasks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch tasks on mount', async () => {
    const mockTasks = [
      { id: 1, title: 'Task 1', status: 'PENDING' },
      { id: 2, title: 'Task 2', status: 'DONE' },
    ]

    vi.mocked(taskService.getTasks).mockResolvedValue(mockTasks as any)

    const { result } = renderHook(() => useTasks())

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.tasks).toEqual(mockTasks)
      expect(result.current.error).toBeNull()
    })
  })

  it('should handle errors', async () => {
    vi.mocked(taskService.getTasks).mockRejectedValue(new Error('API Error'))

    const { result } = renderHook(() => useTasks())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBe('API Error')
    })
  })

  it('should create a task', async () => {
    const newTask = { id: 3, title: 'New Task', status: 'PENDING' }
    
    vi.mocked(taskService.getTasks).mockResolvedValue([])
    vi.mocked(taskService.createTask).mockResolvedValue(newTask as any)

    const { result } = renderHook(() => useTasks())

    await waitFor(() => expect(result.current.loading).toBe(false))

    await result.current.createTask({ title: 'New Task' })

    await waitFor(() => {
      expect(result.current.tasks).toContainEqual(newTask)
    })
  })
})
```

---

### 5.3.3 Tests de Componentes

**Archivo**: `frontend/src/__tests__/components/Button.test.tsx`

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../../components/common/Button'

describe('Button Component', () => {
  it('should render with children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    const button = screen.getByText('Click me')
    expect(button).toBeDisabled()
  })

  it('should apply correct variant styles', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)
    expect(screen.getByText('Primary')).toHaveClass('bg-blue-500')

    rerender(<Button variant="danger">Danger</Button>)
    expect(screen.getByText('Danger')).toHaveClass('bg-red-500')
  })
})
```

---

## 5.4 Plan de Testing

### Fase 1: Tests Unitarios Backend (2 días)
- [ ] TaskService tests
- [ ] AuthService tests
- [ ] SessionService tests
- [ ] StatisticsService tests
- [ ] Validators tests
- [ ] Utils tests

### Fase 2: Tests de Integración Backend (1 día)
- [ ] Auth API tests
- [ ] Tasks API tests
- [ ] Sessions API tests
- [ ] Statistics API tests

### Fase 3: Tests Unitarios Frontend (2 días)
- [ ] useTasks hook tests
- [ ] usePomodoro hook tests
- [ ] useStatistics hook tests
- [ ] Button component tests
- [ ] Card component tests
- [ ] TaskList component tests

### Fase 4: Tests E2E (1 día)
- [ ] Flujo de registro
- [ ] Flujo de login
- [ ] Crear/editar/eliminar tarea
- [ ] Iniciar sesión Pomodoro
- [ ] Ver estadísticas

---

## 5.5 Criterios de Aceptación

### Backend
- ✅ >80% cobertura de código
- ✅ Todos los servicios testeados
- ✅ Todos los endpoints testeados
- ✅ Tests de validación
- ✅ Tests de autenticación

### Frontend
- ✅ >70% cobertura de código
- ✅ Todos los hooks testeados
- ✅ Componentes críticos testeados
- ✅ Tests de integración con API

### E2E
- ✅ Flujos principales funcionando
- ✅ No errores en consola
- ✅ Responsive en diferentes dispositivos

---

**Fecha de Creación**: 2025-11-29  
**Última Actualización**: 2025-11-29  
**Versión**: 1.0  
**Estado**: ⏳ Pendiente (10% completado)
