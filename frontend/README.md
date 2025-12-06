# Frontend - Pomodoro App

Aplicación web de temporizador Pomodoro inspirada en Pomofocus, construida con React, TypeScript y Tailwind CSS.

## 📋 Descripción General

Frontend es una Single Page Application (SPA) que permite a los usuarios gestionar sesiones de Pomodoro y tareas. Actualmente en **Fase 1** con la interfaz principal completamente implementada.

## 🎨 Tecnologías Utilizadas

### Core
- **React 18** - Biblioteca UI
- **Vite** - Build tool y dev server
- **TypeScript** - Tipado estático

### Estilos
- **Tailwind CSS v3.4.0** - Framework CSS utility-first
- **Poppins** - Fuente principal (Google Fonts)
- **Font Awesome 6.5.1** - Íconos

### Estado y Routing
- **React Router v6** - Navegación (simplificada)
- **React Context** - Gestión de estado global (PomodoroContext)

## 📁 Estructura de Carpetas

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx          # Layout con fondo degradado dinámico
│   │   │   └── Header.tsx          # Header responsive
│   │   ├── pomodoro/
│   │   │   └── PomodoroTimer.tsx   # Timer con tabs y botón START/PAUSE
│   │   └── tasks/
│   │       └── TasksSection.tsx    # Sección de tareas
│   ├── context/
│   │   └── PomodoroContext.tsx     # Context para estado global
│   ├── hooks/
│   │   └── usePomodoro.ts          # Hook lógica del temporizador
│   ├── pages/
│   │   └── Dashboard.tsx           # Página principal (única)
│   ├── App.tsx                     # Configuración de rutas
│   ├── main.tsx                    # Punto de entrada
│   └── index.css                   # Estilos globales
├── public/                         # Archivos públicos
├── tailwind.config.js              # Configuración Tailwind v3
├── postcss.config.js               # Configuración PostCSS
└── package.json                    # Dependencias y scripts
```

## 🚀 Scripts Disponibles

Desde el directorio `frontend/`, puedes ejecutar:

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Linter
npm run lint

# Preview de build
npm run preview
```

## 🎯 Características Implementadas (Fase 1)

### ✅ Interfaz Principal
- Dashboard con diseño Pomofocus
- Colores dinámicos según modo (Rojo/Teal/Azul)
- Responsive Mobile-First (768px breakpoint)

### ✅ Componentes
- **Header**: Logo + botones (Report, Setting, Sign In, Menu)
- **PomodoroTimer**: Tabs, timer gigante, botón START/PAUSE
- **TasksSection**: Título, botón "Add Task", input expandible
- **Layout**: Fondo degradado que cambia según modo

### ✅ Funcionalidad
- Timer con cuenta regresiva funcional
- Cambio entre modos (Pomodoro/Short Break/Long Break)
- Botón START/PAUSE con estados
- Session counter (#1, #2, etc.)
- Context global para compartir estado

### ✅ Diseño
- Estructura de divs precisa (640px/620px/480px)
- Colores sutiles y transiciones suaves (500ms)
- Fuente Poppins en todos los pesos
- Íconos Font Awesome

## 🔧 Instalación y Uso

1. **Navega al directorio del frontend**:
   ```bash
   cd frontend
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abre en el navegador**:
   - URL: `http://localhost:5173`
   - La aplicación carga directamente el Dashboard

## 🎨 Paleta de Colores

### Pomodoro (Work)
- Fondo: `#d95550 → #c94843`
- Tab activo: `#c15c58`
- Botón texto: `#d95550`

### Short Break
- Fondo: `#38b2ac → #2c9a8f`
- Tab activo: `#2c9a8f`
- Botón texto: `#38b2ac`

### Long Break
- Fondo: `#5b9bd5 → #4a8cc7`
- Tab activo: `#4a8cc7`
- Botón texto: `#5b9bd5`

## 📐 Responsive Design

### Mobile (< 768px)
- Botones header: 34×34px (solo íconos)
- Íconos: 18px
- Timer: text-8xl

### Desktop (≥ 768px)
- Botones header: 32px altura (texto + ícono)
- Íconos: 16px
- Timer: text-9xl

## 📝 Próximas Fases

### Fase 2 - Funcionalidad Avanzada
- Conectar barra de progreso
- Notificaciones y sonidos
- Configuración de tiempos
- Persistencia en localStorage

### Fase 3 - Gestión de Tareas
- Página Tasks completa
- CRUD de tareas
- Contador de pomodoros por tarea

### Fase 4 - Estadísticas
- Página Statistics
- Gráficos de productividad
- Historial de pomodoros

## 🔗 Documentación Adicional

Ver carpeta `docs/` en la raíz del proyecto:
- `README.md` - Documentación general del proyecto
- `task-list.md` - Lista de tareas por fase
- `mobile_first_documentation.md` - Estrategia responsive
- `walkthrough_commits_fase1.md` - Historial de commits

---

**Estado**: Fase 1 Completada ✅  
**Última actualización**: Diciembre 2025