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
* [Funcionalidades](#funcionalidades)
* [Demostración](#demostración)
* [Instalación y uso](#instalación-y-uso)
* [Calidad del Código](#calidad-del-código)
* [Tecnologías](#tecnologías)
* [Autoría](#autoría)
* [Licencia](#licencia)

##  Descripción
Una aplicación Pomodoro full-stack simple para ayudarte a gestionar tu tiempo y mantener la concentración.

##  Estado
:construction: Proyecto en desarrollo. Versión actual: v1.0.0.

##  Funcionalidades
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

##  Demostración
_(Aquí puedes agregar capturas de pantalla o GIFs de tu aplicación)_

##  Instalación y uso

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

##  Calidad del Código
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

##  Tecnologías utilizadas
- **Backend**: Node.js, Express, TypeScript, PostgreSQL, Prisma
- **Frontend**: React, Vite, TypeScript, Tailwind CSS

##  Autoría
*Este proyecto fue creado por [mysterio-wil](https://github.com/mysterio-wil).*

##  Licencia
Este proyecto está bajo la licencia [MIT](LICENSE).
