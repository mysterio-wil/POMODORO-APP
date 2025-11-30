# Frontend de la Aplicación Pomodoro

Este directorio contiene el código fuente de la aplicación cliente, desarrollada con React, Vite y TypeScript.

## Descripción General

El frontend es una Single Page Application (SPA) que permite a los usuarios gestionar sus tareas y sesiones de Pomodoro. Se comunica con la API del backend para la autenticación, la gestión de datos y la sincronización del estado.

## Tecnologías Utilizadas

- **React**: Biblioteca para construir interfaces de usuario.
- **Vite**: Herramienta de desarrollo frontend moderna y rápida.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **Tailwind CSS**: Framework de CSS "utility-first" para un diseño rápido y personalizado.
- **React Router**: Para la gestión de rutas en la aplicación.
- **Axios**: Cliente HTTP para realizar peticiones a la API.
- **React Context**: Para la gestión del estado de autenticación.

## Estructura de Carpetas

```
frontend/
├── src/
│   ├── assets/         # Archivos estáticos (imágenes, etc.)
│   ├── components/     # Componentes de UI reutilizables
│   ├── context/        # Contextos de React (ej. AuthContext)
│   ├── pages/          # Componentes de página (Login, Register, Dashboard, etc.)
│   ├── routes/         # Lógica de enrutamiento (rutas públicas y privadas)
│   ├── services/       # Servicios para interactuar con la API (authService, taskService)
│   ├── App.tsx         # Componente raíz de la aplicación
│   └── main.tsx        # Punto de entrada de la aplicación
├── public/             # Archivos públicos
├── package.json        # Dependencias y scripts
└── vite.config.ts      # Configuración de Vite
```

## Scripts Disponibles

Desde el directorio `frontend/`, puedes ejecutar los siguientes scripts:

- `npm install`: Instala las dependencias del proyecto.
- `npm run dev`: Inicia el servidor de desarrollo de Vite.
- `npm run build`: Compila la aplicación para producción.
- `npm run lint`: Ejecuta ESLint para analizar el código.
- `npm run test`: Ejecuta las pruebas con Vitest.

## Instalación y Uso

1.  **Navega al directorio del frontend**:
    ```bash
    cd frontend
    ```

2.  **Instala las dependencias**:
    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo**:
    Asegúrate de que el backend esté en ejecución.
    ```bash
    npm run dev
    ```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).