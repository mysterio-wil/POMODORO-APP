# Fase 2: Análisis de Requisitos

## 2.1 Requisitos Funcionales

### RF-01: Autenticación y Autorización

| ID | Descripción | Prioridad | Estado |
|----|-------------|-----------|--------|
| RF-01.1 | El sistema debe permitir registro de usuarios con email y contraseña | Alta | ✅ Completado |
| RF-01.2 | El sistema debe permitir login con credenciales | Alta | ✅ Completado |
| RF-01.3 | El sistema debe generar tokens JWT para sesiones | Alta | ✅ Completado |
| RF-01.4 | El sistema debe proteger rutas privadas con middleware de autenticación | Alta | ✅ Completado |
| RF-01.5 | El sistema debe permitir logout | Alta | ✅ Completado |

---

### RF-02: Gestión de Tareas

| ID | Descripción | Prioridad | Estado |
|----|-------------|-----------|--------|
| RF-02.1 | El usuario debe poder crear tareas con título y descripción | Alta | ✅ Completado |
| RF-02.2 | El usuario debe poder asignar prioridad a las tareas (ALTA, MEDIA, BAJA) | Media | ✅ Completado |
| RF-02.3 | El usuario debe poder actualizar el estado de las tareas (PENDING, IN_PROGRESS, DONE) | Alta | ✅ Completado |
| RF-02.4 | El usuario debe poder editar tareas existentes | Alta | ✅ Completado |
| RF-02.5 | El usuario debe poder eliminar tareas | Alta | ✅ Completado |
| RF-02.6 | El usuario debe poder listar todas sus tareas | Alta | ✅ Completado |
| RF-02.7 | El usuario debe poder filtrar tareas por estado | Media | ⏳ Pendiente |
| RF-02.8 | El usuario debe poder ordenar tareas por prioridad | Baja | ⏳ Pendiente |

---

### RF-03: Temporizador Pomodoro

| ID | Descripción | Prioridad | Estado |
|----|-------------|-----------|--------|
| RF-03.1 | El sistema debe proporcionar un temporizador de 25 minutos (trabajo) | Alta | ⏳ Pendiente |
| RF-03.2 | El sistema debe proporcionar descanso corto de 5 minutos | Alta | ⏳ Pendiente |
| RF-03.3 | El sistema debe proporcionar descanso largo de 15 minutos | Media | ⏳ Pendiente |
| RF-03.4 | El usuario debe poder iniciar/pausar/reiniciar el temporizador | Alta | ⏳ Pendiente |
| RF-03.5 | El sistema debe notificar al usuario cuando termine el tiempo | Alta | ⏳ Pendiente |
| RF-03.6 | El usuario debe poder asociar una tarea al temporizador | Media | ⏳ Pendiente |
| RF-03.7 | El sistema debe reproducir un sonido al finalizar | Media | ⏳ Pendiente |

---

### RF-04: Sesiones de Trabajo

| ID | Descripción | Prioridad | Estado |
|----|-------------|-----------|--------|
| RF-04.1 | El sistema debe registrar el inicio de cada sesión Pomodoro | Alta | ✅ Completado |
| RF-04.2 | El sistema debe registrar el fin de cada sesión con duración | Alta | ✅ Completado |
| RF-04.3 | El sistema debe asociar sesiones con tareas (opcional) | Media | ✅ Completado |
| RF-04.4 | El usuario debe poder ver historial de sesiones | Media | ✅ Completado |

---

### RF-05: Estadísticas y Reportes

| ID | Descripción | Prioridad | Estado |
|----|-------------|-----------|--------|
| RF-05.1 | El sistema debe calcular estadísticas diarias (sesiones, tiempo total) | Alta | ✅ Completado |
| RF-05.2 | El sistema debe calcular estadísticas semanales | Media | ✅ Completado |
| RF-05.3 | El usuario debe poder visualizar gráficos de productividad | Media | ⏳ Pendiente |
| RF-05.4 | El sistema debe mostrar racha de días consecutivos | Baja | ⏳ Pendiente |

---

### RF-06: Dashboard

| ID | Descripción | Prioridad | Estado |
|----|-------------|-----------|--------|
| RF-06.1 | El usuario debe ver un dashboard al iniciar sesión | Alta | ✅ Completado |
| RF-06.2 | El dashboard debe mostrar el temporizador Pomodoro | Alta | ⏳ Pendiente |
| RF-06.3 | El dashboard debe mostrar tareas pendientes | Media | ⏳ Pendiente |
| RF-06.4 | El dashboard debe mostrar estadísticas del día | Media | ⏳ Pendiente |

---

## 2.2 Requisitos No Funcionales

### RNF-01: Rendimiento

| ID | Descripción | Criterio de Aceptación |
|----|-------------|------------------------|
| RNF-01.1 | Tiempo de respuesta de API | < 500ms para el 95% de las peticiones |
| RNF-01.2 | Tiempo de carga inicial | < 2 segundos |
| RNF-01.3 | Soporte de usuarios simultáneos | Mínimo 100 usuarios concurrentes |

---

### RNF-02: Seguridad

| ID | Descripción | Implementación |
|----|-------------|----------------|
| RNF-02.1 | Contraseñas hasheadas | ✅ Bcrypt implementado |
| RNF-02.2 | Autenticación basada en tokens | ✅ JWT implementado |
| RNF-02.3 | Validación de datos de entrada | ✅ Zod implementado |
| RNF-02.4 | Protección contra SQL injection | ✅ Prisma ORM |
| RNF-02.5 | HTTPS en producción | ⏳ Pendiente (despliegue) |
| RNF-02.6 | CORS configurado | ✅ Implementado |

---

### RNF-03: Usabilidad

| ID | Descripción | Estado |
|----|-------------|--------|
| RNF-03.1 | Interfaz intuitiva y fácil de usar | ✅ Implementado |
| RNF-03.2 | Responsive design (móvil, tablet, desktop) | 🔄 Parcial |
| RNF-03.3 | Mensajes de error claros | ✅ Implementado |
| RNF-03.4 | Feedback visual de acciones | 🔄 Parcial |

---

### RNF-04: Mantenibilidad

| ID | Descripción | Estado |
|----|-------------|--------|
| RNF-04.1 | Código TypeScript con tipado estricto | ✅ Implementado |
| RNF-04.2 | Arquitectura en capas (backend) | 🔄 En progreso |
| RNF-04.3 | Componentes reutilizables (frontend) | 🔄 Parcial |
| RNF-04.4 | Documentación de código | 🔄 Parcial |
| RNF-04.5 | Tests unitarios y de integración | ⏳ Pendiente |

---

### RNF-05: Escalabilidad

| ID | Descripción | Implementación |
|----|-------------|----------------|
| RNF-05.1 | Base de datos relacional escalable | ✅ PostgreSQL |
| RNF-05.2 | API RESTful stateless | ✅ Implementado |
| RNF-05.3 | Arquitectura modular | 🔄 En progreso |

---

### RNF-06: Compatibilidad

| ID | Descripción | Soporte |
|----|-------------|---------|
| RNF-06.1 | Navegadores modernos | Chrome, Firefox, Safari, Edge (últimas 2 versiones) |
| RNF-06.2 | Dispositivos móviles | iOS Safari, Chrome Android |

---

## 2.3 Casos de Uso Principales

### CU-01: Registro de Usuario

**Actor**: Usuario nuevo  
**Precondición**: Ninguna  
**Flujo Principal**:
1. Usuario accede a la página de registro
2. Usuario ingresa nombre, email y contraseña
3. Sistema valida los datos
4. Sistema crea cuenta y genera token JWT
5. Sistema redirige al dashboard

**Flujo Alternativo**:
- 3a. Email ya existe → Mostrar error
- 3b. Contraseña muy corta → Mostrar error

**Postcondición**: Usuario registrado y autenticado

---

### CU-02: Iniciar Sesión Pomodoro

**Actor**: Usuario autenticado  
**Precondición**: Usuario ha iniciado sesión  
**Flujo Principal**:
1. Usuario selecciona una tarea (opcional)
2. Usuario hace clic en "Iniciar" en el temporizador
3. Sistema inicia cuenta regresiva de 25 minutos
4. Sistema registra inicio de sesión en BD
5. Al finalizar, sistema notifica al usuario
6. Sistema registra fin de sesión con duración
7. Sistema actualiza estadísticas

**Flujo Alternativo**:
- 3a. Usuario pausa → Temporizador se detiene
- 3b. Usuario reinicia → Temporizador vuelve a 25:00

**Postcondición**: Sesión registrada, estadísticas actualizadas

---

### CU-03: Gestionar Tareas

**Actor**: Usuario autenticado  
**Precondición**: Usuario ha iniciado sesión  
**Flujo Principal**:
1. Usuario accede a la sección de tareas
2. Usuario crea/edita/elimina tareas
3. Sistema valida y guarda cambios
4. Sistema muestra confirmación

**Postcondición**: Tareas actualizadas en BD

---

## 2.4 Modelo de Datos (Entidades Principales)

### User
- id: Integer (PK)
- name: String
- email: String (unique)
- passwordHash: String
- createdAt: DateTime
- updatedAt: DateTime

### Task
- id: Integer (PK)
- title: String
- description: String (nullable)
- priority: Enum (ALTA, MEDIA, BAJA)
- status: Enum (PENDING, IN_PROGRESS, DONE)
- userId: Integer (FK)
- createdAt: DateTime
- updatedAt: DateTime

### Session
- id: Integer (PK)
- startTime: DateTime
- endTime: DateTime (nullable)
- duration: Integer (nullable)
- taskId: Integer (FK, nullable)
- userId: Integer (FK)
- createdAt: DateTime

### Statistic
- id: Integer (PK)
- date: DateTime
- totalSessions: Integer
- totalFocusTime: Integer
- userId: Integer (FK)

### Achievement
- id: Integer (PK)
- title: String
- description: String (nullable)
- unlocked: Boolean
- unlockedAt: DateTime (nullable)
- userId: Integer (FK)

---

## 2.5 Restricciones del Proyecto

### Técnicas
- Debe usar TypeScript en backend y frontend
- Debe usar PostgreSQL como base de datos
- Debe implementar autenticación JWT
- Debe ser una SPA (Single Page Application)

### De Negocio
- Versión 1.0 debe ser gratuita
- Debe funcionar offline (futuro)
- Datos del usuario deben ser privados

### De Tiempo
- MVP debe estar listo en 4 semanas
- Refactorización debe completarse antes del Paso 12

---

**Fecha de Creación**: 2025-11-29  
**Última Actualización**: 2025-11-29  
**Versión**: 1.0  
**Estado**: ✅ Completado
