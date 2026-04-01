<h1 align="center">Task Board | devChallenges</h1>

<div align="center">
  Solución para el challenge
  <a href="https://devchallenges.io/challenge/my-task-board-app" target="_blank">My Task Board</a>
  de <a href="http://devchallenges.io" target="_blank">devChallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="#">Demo (pendiente)</a>
    <span> | </span>
    <a href="#">Solution (pendiente)</a>
    <span> | </span>
    <a href="https://devchallenges.io/challenge/my-task-board-app">Challenge</a>
  </h3>
</div>

## Tabla de contenidos

- [Overview](#overview)
- [Qué aprendí](#qué-aprendí)
- [Stack y tecnologías](#stack-y-tecnologías)
- [Características](#características)
- [Arquitectura del proyecto](#arquitectura-del-proyecto)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Variables de entorno](#variables-de-entorno)
- [API principal](#api-principal)
- [Acknowledgements](#acknowledgements)
- [Author](#author)

## Overview

Aplicación fullstack de gestión de tareas con un enfoque simple y rápido:

- Frontend en React + Vite con TypeScript.
- Backend en Express + TypeScript.
- Persistencia en memoria (ideal para challenge y pruebas rápidas).
- Flujo sin autenticación formal: el backend identifica al usuario con una cookie anónima HTTP-only.

La app crea automáticamente un board inicial, permite editar título/descripcion del board y gestionar tareas (crear, actualizar estado/contenido y eliminar).

## Qué aprendí

- Diseñar un monorepo con workspaces (`frontend` y `backend`) y comandos coordinados con `pnpm`.
- Modelar operaciones del cliente con `@tanstack/react-query` (queries y mutations separadas por intención).
- Validar payloads y params robustamente con `zod` en el backend.
- Mantener un flujo de usuario anónimo con cookie segura y ciclo de vida simple para challenge.

## Stack y tecnologías

- Frontend:
  - React 19
  - React Router 7
  - TypeScript
  - Vite 8
  - Tailwind CSS 4
  - Zustand
  - Axios
  - TanStack React Query
- Backend:
  - Node.js
  - Express 5
  - TypeScript
  - Zod
  - CORS
  - Cookie Parser
- Tooling:
  - ESLint
  - Prettier
  - pnpm workspaces

## Características

- Creación automática de board inicial desde `/board`.
- Redirección a ruta dedicada por board: `/board/:id`.
- Tareas por defecto al crear board:
  - Task in Progress
  - Task Completed
  - Task Won't Do
  - Task To Do
- Edición de board (nombre y descripción).
- Creación de tareas (con nombre por defecto cuando no se provee).
- Actualización de tareas (`name`, `description`, `icon`, `status`).
- Estados soportados: `todo`, `progress`, `completed`, `wontdo`.
- Eliminación de tareas.
- Límite de 30 tareas por board.
- Validación de IDs UUID y payloads con respuestas de error consistentes.

## Arquitectura del proyecto

```text
task-board/
  backend/   -> API REST (Express + TS)
  frontend/  -> Cliente web (React + Vite + TS)
```

## Instalación y ejecución

Requisitos:

- Node.js 20+
- pnpm 10+

Pasos:

```bash
pnpm install
pnpm dev
```

Comandos útiles (raíz):

```bash
pnpm dev:frontend
pnpm dev:backend
pnpm lint
pnpm format
pnpm format:check
```

URLs por defecto:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## Variables de entorno

Backend:

- `PORT` (default: `3000`)
- `HOST` (default: `localhost`)
- `FRONTEND_ORIGIN` (default: `http://localhost:5173`)
- `NODE_ENV` (usa `production` para marcar cookies como `secure`)

## API principal

Boards:

- `GET /api/boards/:boardId`
- `POST /api/boards`
- `PUT /api/boards/:boardId`
- `DELETE /api/boards/:boardId`

Tasks:

- `POST /api/tasks`
- `PUT /api/tasks/:taskId`
- `DELETE /api/tasks/:taskId`

Notas:

- IDs deben ser UUID válidos.
- Errores comunes: `400` (payload/ID inválido), `404` (recurso no encontrado).

## Acknowledgements

- [devChallenges - My Task Board](https://devchallenges.io/challenge/my-task-board-app)
- [React](https://react.dev/)
- [Express](https://expressjs.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)

## Author

- Website: No disponible
- GitHub: [@Mooenz](https://github.com/Mooenz)
