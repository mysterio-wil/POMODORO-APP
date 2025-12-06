# Pomodoro App - Documentación del Proyecto

## 📋 Descripción General

Aplicación web de temporizador Pomodoro inspirada en Pomofocus, construida con React, TypeScript y Tailwind CSS.

**Estado Actual**: Fase 1 - Interfaz Principal Implementada

---

## 🏗️ Estructura del Proyecto

### **Frontend**
```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx          # Layout principal con fondo degradado
│   │   │   └── Header.tsx          # Header con logo y botones
│   │   ├── pomodoro/
│   │   │   └── PomodoroTimer.tsx   # Componente del temporizador
│   │   └── tasks/
│   │       └── TasksSection.tsx    # Sección de tareas
│   ├── hooks/
│   │   └── usePomodoro.ts          # Hook para lógica del temporizador
│   ├── pages/
│   │   └── Dashboard.tsx           # Página principal (única)
│   ├── App.tsx                     # Configuración de rutas
│   ├── main.tsx                    # Punto de entrada
│   └── index.css                   # Estilos globales
├── tailwind.config.js              # Configuración Tailwind v3
└── package.json
```

---

## 🎨 Tecnologías Implementadas

### **Core**
- **React 18** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server

### **Estilos**
- **Tailwind CSS v3.4.0** - Framework CSS utility-first
- **Fuente**: Poppins (Google Fonts)
- **Íconos**: Font Awesome 6.5.1

### **Routing**
- **React Router v6** - Navegación (simplificada, solo Dashboard)

---

## 📐 Estructura de Divs (Pomofocus Clone)

```
Layout (fondo degradado rojo)
│
├── DIV ROJO 1 (max-w-640px)
│   └── DIV AMARILLO 1 (max-w-620px)
│       └── Header (60px altura)
│
└── DIV ROJO 2 (max-w-640px)
    └── DIV AMARILLO 2 (max-w-620px)
        ├── DIV VERDE 1 (max-w-620px) - Barra de progreso
        ├── DIV VERDE 2 (max-w-480px) - PomodoroTimer
        └── DIV VERDE 3 (max-w-480px) - TasksSection
```

**Anchos:**
- Contenedor principal: 640px
- Contenedores internos: 620px
- Componentes (Timer/Tasks): 480px (70px margin lateral)

---

## 🎯 Componentes Implementados

### **1. Header**
- Logo "Pomofocus" con ícono check
- Botones: Report, Setting, Sign In, Menu (⋮)
- **Responsive**: Texto + ícono en desktop, solo íconos en móvil
- **Altura fija**: 60px en todos los dispositivos
- **Íconos**: 18px móvil, 16px desktop
- **Espaciado**: 10px entre botones

### **2. PomodoroTimer**
- Tabs: Pomodoro, Short Break, Long Break
- **Tab activo**: Bold, fondo rojo oscuro (#b85450)
- **Tabs inactivos**: Normal weight, hover rojo claro
- Timer display: Fuente Poppins (sin monospace)
- Botón START/PAUSE: Blanco con texto rojo
- Session info: #1, "Time to focus!"

### **3. TasksSection**
- Título "Tasks" con botón menú (34x34px móvil, 32x32px desktop)
- Línea divisoria
- Botón "Add Task": Borde dashed, hover resalta
- Input para crear tareas (expandible)

### **4. Barra de Progreso**
- Altura: 3px
- Color fondo: Negro opaco (#000 10%)
- Color progreso: Blanco semi-transparente (30%)
- Ancho: 620px (mismo que contenedor amarillo)

---

## 🎨 Diseño y Estilos

### **Colores**
- Fondo degradado: `#d95550` → `#c94843`
- Timer card: `#c97672` 50% opacidad + backdrop-blur
- Tab activo: `#b85450`
- Hover tabs: Blanco 20% opacidad

### **Fuente**
- **Principal**: Poppins (400, 500, 600, 700, 800)
- **Fallbacks**: Arial Rounded MT Bold, Helvetica Rounded, Arial

### **Responsive (Mobile-First)**
- **Móvil**: Base styles
- **Tablet/Desktop**: `md:` (768px+)
- Botones header: 34x34px móvil → 32px desktop
- Íconos: 18px móvil → 16px desktop

---

## 🚀 Comandos de Desarrollo

```bash
# Instalar dependencias
cd frontend
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build
```

**URL Local**: `http://localhost:5173`

---

## 📝 Próximos Pasos

### **Fase 2 - Funcionalidad del Temporizador**
- [ ] Conectar barra de progreso con tiempo restante
- [ ] Implementar notificaciones al completar pomodoro
- [ ] Agregar sonido de alarma
- [ ] Persistir configuración en localStorage

### **Fase 3 - Gestión de Tareas**
- [ ] Crear página Tasks completa
- [ ] CRUD de tareas
- [ ] Contador de pomodoros por tarea
- [ ] Marcar tareas como completadas

### **Fase 4 - Estadísticas**
- [ ] Crear página Statistics
- [ ] Gráficos de productividad
- [ ] Historial de pomodoros completados
- [ ] Exportar datos

### **Fase 5 - Autenticación (Opcional)**
- [ ] Implementar login/registro
- [ ] Sincronización en la nube
- [ ] Perfil de usuario

---

## 📚 Documentación Adicional

- **mobile_first_documentation.md** - Estrategia responsive implementada
- **task-list.md** - Checklist de tareas completadas

---

## 🔧 Configuración Actual

### **Tailwind CSS v3.4.0**
```js
// tailwind.config.js
fontFamily: {
  sans: ['Poppins', 'Arial Rounded MT Bold', ...]
}
```

### **Rutas**
```tsx
// App.tsx
<Route path="/" element={<Dashboard />} />
<Route path="*" element={<Navigate to="/" replace />} />
```

**Nota**: Solo existe la ruta `/` que carga el Dashboard directamente.

---

## 👥 Contribución

Este proyecto está en desarrollo activo. Todas las páginas excepto Dashboard han sido eliminadas para enfocarse en la interfaz principal.

**Última actualización**: Diciembre 2025
