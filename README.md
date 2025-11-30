<h1 align="center">Pomodoro App</h1>

<div align="center">
  <img src="https://img.shields.io/badge/STATUS-En_desarrollo-yellow" alt="Estado">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue" alt="Licencia"></a>
  <img src="https://img.shields.io/badge/version-1.0.0-green" alt="Version">
</div>

<div align="center">
  <a href="https://nodejs.org/" target="_blank" rel="noreferrer noopener nofollow"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"></a>
  <a href="https://expressjs.com/" target="_blank" rel="noreferrer noopener nofollow"><img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"></a>
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer noopener nofollow"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://www.postgresql.org/" target="_blank" rel="noreferrer noopener nofollow"><img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"></a>
  <a href="https://www.prisma.io/" target="_blank" rel="noreferrer noopener nofollow"><img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"></a>
  <a href="https://reactjs.org/" target="_blank" rel="noreferrer noopener nofollow"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"></a>
  <a href="https://vitejs.dev/" target="_blank" rel="noreferrer noopener nofollow"><img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"></a>
  <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer noopener nofollow"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
</div>

## Índice
* [Descripción](#descripción)
* [Estado](#estado)
* [Estructura del Proyecto](#estructura-del-proyecto)
* [Dependencias Instaladas](#dependencias-instaladas)
* [Funcionalidades](#funcionalidades)
* [Demostración](#demostración)
* [Instalación y uso](#instalación-y-uso)
* [Calidad del Código](#calidad-del-código)
* [Tecnologías](#tecnologías)
* [Plan de Refactorización](#plan-de-refactorización)
* [Autoría](#autoría)
* [Licencia](#licencia)

## Descripción
Una aplicación Pomodoro full-stack simple para ayudarte a gestionar tu tiempo y mantener la concentración.

## Estado
:white_check_mark: **Paso 11 Completado**: Implementación de login, registro, persistencia de sesión básica y dashboard inicial.
:construction: **Próximo Objetivo**: Refactorización de la arquitectura para mejorar la escalabilidad y mantener el código actualizado con las últimas versiones de las tecnologías.

## Estructura del Proyecto
El proyecto está dividido en dos directorios principales: `backend` y `frontend`.

```
pomodoro-app/
├── backend/              # Contiene la API RESTful
│   ├── src/              # Código fuente del backend
│   │   ├── controllers/  # Lógica de negocio (a ser implementada en refactor)
│   │   ├── services/     # Servicios de aplicación (a ser implementada en refactor)
│   │   ├── repositories/ # Interacción con la base de datos (a ser implementada en refactor)
│   │   ├── routes/       # Definición de rutas de la API
│   │   ├── middleware/   # Middleware para autenticación, etc.
│   │   └── utils/        # Utilidades varias
│   ├── prisma/           # Esquemas y migraciones de Prisma
│   ├── package.json      # Dependencias y scripts del backend
│   └── tsconfig.json     # Configuración de TypeScript para el backend
├── frontend/             # Contiene la aplicación cliente (React)
│   ├── src/              # Código fuente del frontend
│   │   ├── components/   # Componentes reutilizables de UI
│   │   ├── context/      # Contextos de React (ej. autenticación)
│   │   ├── pages/        # Páginas principales de la aplicación
│   │   ├── services/     # Lógica para interactuar con la API
│   │   ├── assets/       # Archivos estáticos (imágenes, etc.)
│   │   └── App.tsx       # Componente principal de la aplicación
│   ├── public/           # Archivos estáticos públicos
│   ├── package.json      # Dependencias y scripts del frontend
│   ├── vite.config.ts    # Configuración de Vite
│   └── tailwind.config.js# Configuración de Tailwind CSS
├── package.json          # Dependencias y scripts a nivel de proyecto
├── tsconfig.json         # Configuración de TypeScript a nivel de proyecto
├── .gitignore            # Archivos y directorios ignorados por Git
├── LICENSE               # Licencia del proyecto
└── README.md             # Documentación del proyecto
```

## Dependencias Instaladas
Las dependencias se gestionan a nivel de proyecto y dentro de cada subproyecto (`backend` y `frontend`).

**Dependencias a nivel de proyecto:**
*   `npm` (gestor de paquetes)
*   `husky` (hooks de Git)
*   `lint-staged` (ejecuta linters en archivos staged)
*   `prettier` (formateador de código)
*   `eslint` (linter de código)

**Dependencias del Backend:**
*   `express`
*   `typescript`
*   `prisma` (ORM)
*   `@prisma/client`
*   `jsonwebtoken`
*   `bcryptjs`
*   `dotenv`
*   `cors`
*   `zod` (validación de esquemas)

**Dependencias del Frontend:**
*   `react`
*   `react-dom`
*   `react-router-dom`
*   `vite`
*   `typescript`
*   `tailwindcss`
*   `autoprefixer`
*   `postcss`
*   `vitest` (framework de pruebas)
*   `@testing-library/react`
*   `@testing-library/jest-dom`

## Funcionalidades
- **Backend API**: Servidor base con Express y TypeScript.
- **Autenticación con JWT**: Sistema de registro y login para proteger las rutas.
  - `POST /api/auth/register`: Crea un nuevo usuario.
  - `POST /api/auth/login`: Inicia sesión y devuelve un token JWT.
- **API de Tareas (Protegida)**: CRUD completo para la gestión de tareas. Las rutas requieren un token JWT.
  - `GET /api/tasks`: Lista las tareas del usuario autenticado.
  - `GET /api/tasks/:id`: Obtiene una tarea específica del usuario.
  - `POST /api/tasks`: Crea una nueva tarea para el usuario.
  - `PATCH /api/tasks/:id`: Actualiza una tarea del usuario.
  - `DELETE /api/tasks/:id`: Elimina una tarea del usuario.
- **API de Sesiones (Protegida)**: Endpoints para iniciar y finalizar sesiones Pomodoro. Las rutas requieren un token JWT.
  - `POST /api/sessions/start`: Inicia una nueva sesión para el usuario.
  - `POST /api/sessions/:id/end`: Finaliza una sesión del usuario y actualiza estadísticas.
  - `GET /api/sessions`: Lista las sesiones del usuario.
- **API de Estadísticas (Protegida)**: Endpoints para consultar las estadísticas del usuario.
  - `GET /api/statistics/daily`: Devuelve las estadísticas diarias del usuario.
  - `GET /api/statistics/weekly`: Devuelve un resumen semanal de las estadísticas del usuario.
- **Base de Datos**: Configuración con PostgreSQL y Prisma ORM.
- **Frontend App**: Aplicación base con React, Vite, Tailwind CSS y enrutamiento con React Router.
- **Integración Frontend-Backend**: El frontend consume las APIs protegidas de tareas, sesiones y estadísticas utilizando el token JWT para la autenticación.
- **Conexión**: Health check entre frontend y backend.

## Flujo de Navegación
- Al abrir la aplicación, se redirige automáticamente a `/login`.
- En la página de Login, hay un enlace para ir a la página de Registro.
- Después de un login o registro exitoso, el usuario es redirigido al `/dashboard`.
- Las rutas `/dashboard` y `/tasks` están protegidas y solo son accesibles si el usuario está autenticado (tiene un token JWT válido). Si no hay token, se redirige a `/login`.
- En la página de Registro, hay un enlace para volver a la página de Login.
- **Persistencia de Sesión**: Si un usuario autenticado intenta acceder a `/login` o `/register`, será redirigido automáticamente a `/dashboard`. Esto asegura que la sesión persista al recargar la página y que los usuarios no puedan acceder a las páginas de autenticación si ya tienen una sesión activa.

## Demostración
_(Aquí puedes agregar capturas de pantalla o GIFs de tu aplicación)_

## Instalación y uso

### Prerrequisitos
- Node.js (v18 o superior)
- npm
- Git
- PostgreSQL: Puedes instalarlo localmente o usar Docker.

### Pasos

1.  **Clonar el repositorio**
    ```bash
    # Reemplaza [YOUR_USERNAME] con tu usuario de GitHub
    git clone https://github.com/[YOUR_USERNAME]/pomodoro-app.git
    cd pomodoro-app
    ```

2.  **Instalar dependencias**
    ```bash
    # Instalar dependencias del root, backend y frontend
    npm install
    cd backend && npm install
    cd ../frontend && npm install
    cd ..
    ```

3.  **Configurar la Base de Datos (Backend)**
    - Navega a la carpeta `backend`.
    - Crea un archivo `.env` en la raíz de la carpeta `backend`.
    - Modifica la variable `DATABASE_URL` en el archivo `.env` con tus credenciales de PostgreSQL.
      ```
      DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/pomodoro?schema=public"
      ```
    - Si usas Docker, puedes iniciar un contenedor de Postgres con el comando que se proveyó en la guía de desarrollo.

4.  **Aplicar las migraciones de la Base de Datos**
    Asegúrate de estar en el directorio `backend`.
    ```bash
    npx prisma migrate dev
    ```

5.  **Ejecutar la aplicación**
    Necesitarás dos terminales para ejecutar el backend y el frontend simultáneamente.

    ```bash
    # Terminal 1: Iniciar el backend (desde la raíz del proyecto)
    npm run dev --prefix backend

    # Terminal 2: Iniciar el frontend (desde la raíz del proyecto)
    npm run dev --prefix frontend
    ```

## Calidad del Código
Este proyecto utiliza ESLint (configurado en `eslint.config.js`) para el linting y Prettier para el formateo del código, asegurando la consistencia y calidad.

### Scripts disponibles:
- `npm run lint`: Ejecuta ESLint para identificar problemas de código.
- `npm run format`: Formatea automáticamente el código usando Prettier.

### Hooks de Git (Husky + lint-staged)
Para asegurar la calidad del código antes de cada commit, este proyecto utiliza Husky y `lint-staged`.

- **Husky**: Configurado para ejecutar scripts en los hooks de Git.
- **`lint-staged`**: Ejecuta automáticamente ESLint (`--fix`) y Prettier (`--write`) en los archivos que están en el área de preparación (`staged files`) antes de cada commit. Esto garantiza que solo el código formateado y sin errores de linting sea confirmado.

### Pruebas (Vitest)
Este proyecto utiliza Vitest para las pruebas unitarias y de integración en el frontend.

- **Vitest**: Configurado para ejecutar pruebas en un entorno de navegador simulado (JSDOM).
- **React Testing Library**: Utilizada para escribir pruebas que interactúan con los componentes de React de manera similar a como lo haría un usuario.

Para ejecutar las pruebas, usa el siguiente comando desde el directorio `frontend`:
```bash
npm run test
```

### Notas de Refactorización Recientes
- **Rutas Privadas y Públicas**: Se ha refactorizado la implementación de `PrivateRoute` y `PublicRoute` para un tipado más estricto, utilizando `ReactNode` con `import type` para soportar `verbatimModuleSyntax` y mejorar la compatibilidad con las últimas versiones de TypeScript y React.

### 🚀 Refactorización del Servicio de Tareas (Frontend)

Se ha llevado a cabo una refactorización significativa en `frontend/src/services/tasks.ts` para mejorar la escalabilidad y robustez de la aplicación:

- **Cliente API Estructurado**: Se ha reemplazado el uso directo de `apiFetch` por una instancia `api` dedicada (probablemente Axios), lo que permite una interacción más consistente y robusta con el backend.
- **Tipado Estricto con Interfaz `Task`**: Se introdujo una interfaz `Task` para definir la estructura de los objetos de tarea, mejorando la seguridad de tipos y la claridad del código en todo el frontend.
- **Operaciones CRUD Completas**: El servicio ahora soporta todas las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para las tareas, con funciones dedicadas:
    - `getTasks()`: Obtiene todas las tareas del usuario.
    - `createTask(title, description?)`: Crea una nueva tarea, ahora con soporte opcional para descripción.
    - `updateTask(id, updates)`: Permite la actualización parcial de una tarea existente.
    - `deleteTask(id)`: Elimina una tarea específica.
- **Mejora en la Manejo de Datos**: Todas las funciones ahora devuelven promesas con tipos explícitos (`Promise<Task[]>`, `Promise<Task>`, `Promise<void>`), lo que facilita el manejo de datos y errores en los componentes de React.

### 🔒 Mejora en la Gestión de Autenticación (Frontend)

Se ha implementado un sistema de autenticación más robusto y escalable en `frontend/src/context/AuthContext.tsx` y `frontend/src/services/api.ts`:

- **Contexto de Autenticación Centralizado**: Se utiliza el Context API de React para gestionar el estado de autenticación (token, funciones de login, registro, logout) de manera global, facilitando el acceso y la actualización en toda la aplicación.
- **Persistencia de Sesión Segura**: El token de autenticación se almacena en `localStorage` para mantener la sesión del usuario, y se sincroniza automáticamente con las cabeceras de Axios.
- **Interceptor de Axios para Autenticación**: La instancia de Axios (`api`) incluye un interceptor de solicitudes que adjunta automáticamente el token JWT a todas las peticiones salientes, centralizando la lógica de autenticación y eliminando la necesidad de añadirlo manualmente en cada llamada.
- **Tipado Estricto**: Se han definido interfaces (`AuthResponse`, `AuthContextType`) para asegurar la seguridad de tipos en los datos de autenticación y en el contexto.
- **Manejo de Errores Consistente**: Las funciones de login y registro incluyen un manejo de errores básico pero extensible, que puede ser mejorado para ofrecer una experiencia de usuario más detallada.

### 🔐 Implementación de Autenticación (Frontend)

Se ha implementado un sistema de autenticación robusto en el frontend, utilizando React Context y servicios dedicados para gestionar el estado del usuario.

- **`AuthContext.tsx`**: Proporciona un contexto global para la autenticación, gestionando el estado del usuario y el token JWT. Incluye funciones para `login`, `register` y `logout`, y persiste la sesión en `localStorage`.
- **`authService.ts`**: Centraliza la comunicación con la API de autenticación del backend, con funciones para el registro (`registerUser`) y el inicio de sesión (`loginUser`).
- **Páginas de `Login` y `Register`**: Se han creado componentes de página dedicados con formularios para que los usuarios puedan iniciar sesión o registrarse en la aplicación.
- **Integración con API**: El `AuthContext` configura automáticamente la instancia de `api` (Axios) con el token de autorización, asegurando que todas las solicitudes a rutas protegidas estén autenticadas.

### 🔹 Actualización de Axios y Tipado en Frontend

- Con la actualización a **axios@1.12.1**, los tipos `AxiosRequestConfig` y `AxiosResponse` ya no se exportan como miembros nombrados.  
- Para evitar errores de TypeScript, se decidió:
  - Eliminar el tipado explícito en los interceptores (`config`, `response`, `error`) y dejar que TypeScript infiera los tipos automáticamente.
  - Esto garantiza que la aplicación compile correctamente en strict mode y se mantenga compatible con futuras actualizaciones de Axios.  
- Futuras mejoras: cuando los tipos públicos de Axios 1.x se estabilicen, se puede refactorizar `src/services/api.ts` para usar tipado más estricto.

## Tecnologías utilizadas
- **Backend**: Node.js, Express, TypeScript, PostgreSQL, Prisma
- **Frontend**: React, Vite, TypeScript, Tailwind CSS

## Plan de Refactorización
El objetivo principal de la siguiente fase es refactorizar la arquitectura del proyecto para mejorar la escalabilidad, mantenibilidad y adherencia a las mejores prácticas.

**Etapas del Plan:**

1.  **Frontend**:
    *   Reorganizar la estructura de carpetas para una mejor separación de responsabilidades (ej. `routes`, `components`, `pages`, `context`, `services`).
    *   Optimizar la gestión de estados y la lógica de componentes.

2.  **Backend**:
    *   Implementar una arquitectura de capas clara (ej. `controllers`, `services`, `repositories`, `routes`) para desacoplar la lógica de negocio de la capa de acceso a datos y la capa de presentación.
    *   Mejorar la validación de datos y el manejo de errores.

3.  **QA Manual**:
    *   Verificar exhaustivamente las funcionalidades existentes (login, registro, dashboard) después de la refactorización para asegurar que no se introdujeron regresiones.

4.  **Preparación para el Paso 12**:
    *   Una vez completada la refactorización y la verificación, se procederá con la implementación del temporizador Pomodoro (Paso 12).

## Documentación Adicional

*   [Buenas prácticas con Axios + TypeScript](docs/axios-typescript.md)

## Autoría
*Este proyecto fue creado por [mysterio-wil](https://github.com/mysterio-wil).*

## Licencia
Este proyecto está bajo la licencia [MIT](LICENSE).