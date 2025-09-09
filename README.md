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
- **Frontend App**: Aplicación base con React, Vite y Tailwind CSS.
- **Conexión**: Health check entre frontend y backend.

##  Demostración
_(Aquí puedes agregar capturas de pantalla o GIFs de tu aplicación)_

##  Instalación y uso
```bash
# Clonar el repositorio
# Reemplaza [YOUR_USERNAME] con tu usuario de GitHub
git clone https://github.com/[YOUR_USERNAME]/pomodoro-app.git

# Entrar al directorio
cd pomodoro-app

# Instalar dependencias
npm install
cd backend && npm install
cd ../frontend && npm install

# Para ejecutar la aplicación, necesitarás dos terminales

# Terminal 1: Iniciar el backend
npm run dev --prefix backend

# Terminal 2: Iniciar el frontend
npm run dev --prefix frontend
```

##  Calidad del Código
Este proyecto utiliza ESLint para el linting y Prettier para el formateo del código, asegurando la consistencia y calidad.

### Scripts disponibles:
- `npm run lint`: Ejecuta ESLint para identificar problemas de código.
- `npm run format`: Formatea automáticamente el código usando Prettier.

##  Tecnologías utilizadas
- **Backend**: Node.js, Express, TypeScript
- **Frontend**: React, Vite, TypeScript, Tailwind CSS

##  Autoría
*Este proyecto fue creado por [mysterio-wil](https://github.com/mysterio-wil).*

##  Licencia
Este proyecto está bajo la licencia [MIT](LICENSE).