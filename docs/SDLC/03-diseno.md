# Fase 3: Diseño del Sistema

## 3.1 Arquitectura del Sistema

### Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE (Browser)                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           React SPA (Frontend)                         │ │
│  │  - React 19 + TypeScript                              │ │
│  │  - Vite (Build Tool)                                  │ │
│  │  - Tailwind CSS                                       │ │
│  │  - React Router (Routing)                             │ │
│  │  - Axios (HTTP Client)                                │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/HTTPS
                            │ REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    SERVIDOR (Backend)                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           Express API (Backend)                        │ │
│  │  - Node.js + Express 5                                │ │
│  │  - TypeScript                                         │ │
│  │  - JWT Authentication                                 │ │
│  │  - Zod Validation                                     │ │
│  │  - Prisma ORM                                         │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Prisma Client
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   BASE DE DATOS                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              PostgreSQL                                │ │
│  │  - Users, Tasks, Sessions                             │ │
│  │  - Statistics, Achievements                           │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 3.2 Arquitectura Backend (3 Capas)

### Diagrama de Capas

```
┌──────────────────────────────────────────────────────────┐
│                    CAPA DE PRESENTACIÓN                   │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Routes (Express Router)                           │  │
│  │  - /api/auth                                       │  │
│  │  - /api/tasks                                      │  │
│  │  - /api/sessions                                   │  │
│  │  - /api/statistics                                 │  │
│  └────────────────────────────────────────────────────┘  │
│                          │                                │
│                          ▼                                │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Middleware                                        │  │
│  │  - authMiddleware (JWT)                            │  │
│  │  - validateBody (Zod)                              │  │
│  │  - validateParams (Zod)                            │  │
│  │  - errorHandler                                    │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────┐
│                   CAPA DE CONTROLADORES                   │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Controllers                                       │  │
│  │  - AuthController                                  │  │
│  │  - TaskController                                  │  │
│  │  - SessionController                               │  │
│  │  - StatisticsController                            │  │
│  │                                                    │  │
│  │  Responsabilidad:                                  │  │
│  │  - Manejar HTTP requests/responses                 │  │
│  │  - Validar entrada                                 │  │
│  │  - Llamar servicios                                │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────┐
│                    CAPA DE SERVICIOS                      │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Services (Business Logic)                         │  │
│  │  - AuthService                                     │  │
│  │  - TaskService                                     │  │
│  │  - SessionService                                  │  │
│  │  - StatisticsService                               │  │
│  │                                                    │  │
│  │  Responsabilidad:                                  │  │
│  │  - Lógica de negocio                               │  │
│  │  - Orquestación de repositorios                    │  │
│  │  - Validaciones de negocio                         │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────┐
│                  CAPA DE REPOSITORIOS                     │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Repositories (Data Access)                        │  │
│  │  - UserRepository                                  │  │
│  │  - TaskRepository                                  │  │
│  │  - SessionRepository                               │  │
│  │  - StatisticsRepository                            │  │
│  │                                                    │  │
│  │  Responsabilidad:                                  │  │
│  │  - Acceso directo a BD                             │  │
│  │  - Queries con Prisma                              │  │
│  │  - CRUD operations                                 │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
                          │
                          ▼
                   ┌─────────────┐
                   │  PostgreSQL │
                   └─────────────┘
```

---

## 3.3 Arquitectura Frontend

### Estructura de Componentes

```
src/
├── App.tsx                    # Componente raíz
├── main.tsx                   # Entry point
│
├── pages/                     # Páginas principales
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   └── Tasks.tsx
│
├── components/
│   ├── common/                # Componentes reutilizables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Loading.tsx
│   │
│   ├── layout/                # Componentes de layout
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   │
│   ├── tasks/                 # Componentes de tareas
│   │   ├── TaskList.tsx
│   │   ├── TaskItem.tsx
│   │   ├── TaskForm.tsx
│   │   └── TaskFilters.tsx
│   │
│   └── pomodoro/              # Componentes del temporizador
│       ├── PomodoroTimer.tsx
│       ├── TimerDisplay.tsx
│       └── TimerControls.tsx
│
├── context/                   # React Context
│   └── AuthContext.tsx
│
├── hooks/                     # Custom Hooks
│   ├── useTasks.ts
│   ├── usePomodoro.ts
│   ├── useStatistics.ts
│   └── useLocalStorage.ts
│
├── services/                  # API Services
│   ├── api.ts
│   ├── authService.ts
│   ├── taskService.ts
│   └── sessionService.ts
│
├── types/                     # TypeScript Types
│   ├── task.types.ts
│   ├── session.types.ts
│   └── statistics.types.ts
│
└── utils/                     # Utilidades
    ├── formatters.ts
    └── constants.ts
```

---

## 3.4 Diseño de Base de Datos

### Diagrama Entidad-Relación

```
┌─────────────────────┐
│       User          │
├─────────────────────┤
│ id (PK)             │
│ name                │
│ email (UNIQUE)      │
│ passwordHash        │
│ createdAt           │
│ updatedAt           │
└─────────────────────┘
         │
         │ 1:N
         ├──────────────────────────┐
         │                          │
         ▼                          ▼
┌─────────────────────┐    ┌─────────────────────┐
│       Task          │    │      Session        │
├─────────────────────┤    ├─────────────────────┤
│ id (PK)             │    │ id (PK)             │
│ title               │◄───┤ taskId (FK)         │
│ description         │ N:1│ userId (FK)         │
│ priority            │    │ startTime           │
│ status              │    │ endTime             │
│ userId (FK)         │    │ duration            │
│ createdAt           │    │ createdAt           │
│ updatedAt           │    └─────────────────────┘
└─────────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────────┐
│     Statistic       │
├─────────────────────┤
│ id (PK)             │
│ date                │
│ totalSessions       │
│ totalFocusTime      │
│ userId (FK)         │
│ UNIQUE(userId,date) │
└─────────────────────┘

┌─────────────────────┐
│    Achievement      │
├─────────────────────┤
│ id (PK)             │
│ title               │
│ description         │
│ unlocked            │
│ unlockedAt          │
│ userId (FK)         │
└─────────────────────┘
```

---

## 3.5 Diseño de API REST

### Endpoints de Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Registrar nuevo usuario | No |
| POST | `/api/auth/login` | Iniciar sesión | No |

**Request Body (Register)**:
```json
{
  "name": "string",
  "email": "string",
  "password": "string (min 6)"
}
```

**Response**:
```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": 1,
    "name": "string",
    "email": "string"
  }
}
```

---

### Endpoints de Tareas

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/tasks` | Listar todas las tareas | Sí |
| GET | `/api/tasks/:id` | Obtener tarea por ID | Sí |
| POST | `/api/tasks` | Crear nueva tarea | Sí |
| PATCH | `/api/tasks/:id` | Actualizar tarea | Sí |
| DELETE | `/api/tasks/:id` | Eliminar tarea | Sí |

**Request Body (Create)**:
```json
{
  "title": "string",
  "description": "string (optional)",
  "priority": "ALTA | MEDIA | BAJA"
}
```

---

### Endpoints de Sesiones

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/sessions/start` | Iniciar sesión Pomodoro | Sí |
| POST | `/api/sessions/:id/end` | Finalizar sesión | Sí |
| GET | `/api/sessions` | Listar sesiones | Sí |

---

### Endpoints de Estadísticas

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/statistics/daily` | Estadísticas del día | Sí |
| GET | `/api/statistics/weekly` | Estadísticas semanales | Sí |

---

## 3.6 Diseño de Interfaz de Usuario

### Wireframes Principales

#### 1. Página de Login
```
┌────────────────────────────────────┐
│         Pomodoro App               │
│                                    │
│  ┌──────────────────────────────┐ │
│  │  Email                       │ │
│  │  [________________]          │ │
│  │                              │ │
│  │  Password                    │ │
│  │  [________________]          │ │
│  │                              │ │
│  │  [   Login   ]               │ │
│  │                              │ │
│  │  ¿No tienes cuenta? Regístrate│ │
│  └──────────────────────────────┘ │
└────────────────────────────────────┘
```

#### 2. Dashboard
```
┌────────────────────────────────────────────────────────┐
│  Pomodoro App    Bienvenido, Usuario    [Logout]      │
├────────────────────────────────────────────────────────┤
│                                                        │
│  ┌──────────────────────┐  ┌──────────────────────┐  │
│  │  Pomodoro Timer      │  │  Estadísticas        │  │
│  │                      │  │                      │  │
│  │      25:00           │  │  Hoy: 4 sesiones     │  │
│  │                      │  │  Tiempo: 100 min     │  │
│  │  [Trabajo]           │  │                      │  │
│  │  [Descanso Corto]    │  │  Esta semana:        │  │
│  │  [Descanso Largo]    │  │  20 sesiones         │  │
│  │                      │  │  500 min             │  │
│  │  [Iniciar] [Pausar]  │  │                      │  │
│  │  [Reiniciar]         │  │  [Ver más]           │  │
│  └──────────────────────┘  └──────────────────────┘  │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │  Tareas Pendientes                               │ │
│  │  ☐ Tarea 1                              [ALTA]   │ │
│  │  ☐ Tarea 2                              [MEDIA]  │ │
│  │  ☑ Tarea 3 (completada)                 [BAJA]   │ │
│  │  [+ Nueva Tarea]                                 │ │
│  └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

---

## 3.7 Patrones de Diseño Utilizados

### Backend

1. **Repository Pattern**
   - Abstrae el acceso a datos
   - Facilita testing con mocks

2. **Service Layer Pattern**
   - Encapsula lógica de negocio
   - Desacopla controllers de repositorios

3. **Dependency Injection**
   - Inyección de dependencias en constructores
   - Facilita testing y mantenibilidad

4. **Middleware Pattern**
   - Autenticación, validación, manejo de errores
   - Separación de concerns

### Frontend

1. **Component Pattern**
   - Componentes reutilizables y modulares
   - Separación de presentación y lógica

2. **Custom Hooks Pattern**
   - Lógica reutilizable (useTasks, usePomodoro)
   - Separación de concerns

3. **Context API Pattern**
   - Estado global (autenticación)
   - Evita prop drilling

4. **Service Layer Pattern**
   - Centraliza llamadas a API
   - Facilita cambios en endpoints

---

## 3.8 Decisiones de Diseño Clave

### 1. TypeScript en Todo el Stack
**Razón**: Tipado estricto reduce bugs, mejora DX, facilita refactoring

### 2. Arquitectura en 3 Capas (Backend)
**Razón**: Separación de responsabilidades, testabilidad, escalabilidad

### 3. JWT para Autenticación
**Razón**: Stateless, escalable, estándar de la industria

### 4. Prisma ORM
**Razón**: Type-safe, migraciones automáticas, excelente DX

### 5. React con Hooks
**Razón**: Moderno, funcional, mejor rendimiento que class components

### 6. Tailwind CSS
**Razón**: Utility-first, rápido desarrollo, consistencia visual

---

**Fecha de Creación**: 2025-11-29  
**Última Actualización**: 2025-11-29  
**Versión**: 1.0  
**Estado**: ✅ Completado
