# API Contract - Task Board

## 1) Objetivo

Backend para gestionar tableros y tareas con acceso por `board-id`.
Identificación de usuario por cookie anónima (sin login).

---

## 2) Entidades

### Board

- `id: string` (UUID)
- `name: string` (requerido)
- `description?: string`
- `tasks: Task[]`
- `createdAt: string` (ISO)
- `updatedAt: string` (ISO)

### Task

- `id: string` (UUID)
- `name: string` (requerido)
- `description?: string`
- `icon?: string`
- `status: "progress" | "completed" | "todo" | "wontdo"` (solo valores permitidos)
- `boardId: string` (referencia al board)
- `createdAt: string` (ISO)
- `updatedAt: string` (ISO)

---

## 3) Reglas de negocio

1. Al crear un board por defecto, debe incluir **4 tareas predeterminadas**:
   - Tarea 1: `name: "Tarea 1"`, `status: "todo"`
   - Tarea 2: `name: "Tarea 2"`, `status: "todo"`
   - Tarea 3: `name: "Tarea 3"`, `status: "todo"`
   - Tarea 4: `name: "Tarea 4"`, `status: "todo"`

2. Se permite editar en tarea:
   - `name`, `description`, `icon`, `status` (solo valores: `"progress"`, `"completed"`, `"todo"`, `"wontdo"`)

3. Se permite editar en board:
   - `name`, `description` (opcional)

4. Los usuarios pueden eliminar tareas (hard delete).

5. Los usuarios pueden agregar nuevas tareas con nombre predeterminado: `"Nueva tarea"`.
   - Límite: **máximo 30 tareas por board**.

6. El board se crea automáticamente:
   - Cuando el usuario accede a `/board` sin ID.
   - Se genera un UUID único y se redirige a `/board/:board-id`.

7. Cada board debe ser accesible por ruta:
   - `/board/:board-id` (frontend)
   - `/api/boards/:board-id` (backend)

8. Identificación de usuario anónimo:

- Si no existe cookie `anonymousUserId`, el backend genera un UUID y la envía en cookie HTTP-only.
- El endpoint `GET /api/boards/me` usa esta cookie para obtener o crear el board del usuario.
- Si el board asociado ya no existe, se crea uno nuevo y se vuelve a asociar.

9. Validación de IDs:

- `board-id` y `task-id` deben tener formato UUID.
- Si no cumplen, responder `400 Bad Request`.

---

## 4) Endpoints

### GET `/api/boards/me`

Obtiene o crea el tablero del usuario anónimo identificado por cookie.

**Comportamiento**

- Si la cookie `anonymousUserId` no existe o es inválida, el backend genera UUID y la establece.
- Si el usuario ya tenía board asociado, retorna ese board.
- Si no tenía board, crea uno nuevo con 4 tareas por defecto y lo asocia al UUID.

**200 OK**

```json
{
  "id": "uuid",
  "name": "My Task Board",
  "description": "",
  "tasks": [
    { "id": "t1", "name": "Tarea 1", "status": "todo", "boardId": "uuid" },
    { "id": "t2", "name": "Tarea 2", "status": "todo", "boardId": "uuid" },
    { "id": "t3", "name": "Tarea 3", "status": "todo", "boardId": "uuid" },
    { "id": "t4", "name": "Tarea 4", "status": "todo", "boardId": "uuid" }
  ],
  "createdAt": "2026-02-20T10:00:00Z",
  "updatedAt": "2026-02-20T10:00:00Z"
}
```

---

### GET `/api/boards/:board-id`

Obtiene un tablero por ID con todas sus tareas.

**200 OK**

```json
{
  "id": "uuid",
  "name": "Mi tablero",
  "description": "Opcional",
  "tasks": [
    {
      "id": "task-uuid-1",
      "name": "Tarea 1",
      "description": "",
      "icon": "📝",
      "status": "todo",
      "boardId": "uuid",
      "createdAt": "2026-02-20T10:00:00Z",
      "updatedAt": "2026-02-20T10:00:00Z"
    }
  ],
  "createdAt": "2026-02-20T10:00:00Z",
  "updatedAt": "2026-02-20T10:00:00Z"
}
```

**404 Not Found**

```json
{ "message": "Board not found" }
```

**400 Bad Request**

```json
{ "message": "Invalid board id. Expected UUID format" }
```

---

### POST `/api/boards`

Crea un nuevo tablero con 4 tareas predeterminadas y devuelve el board completo.

**Request body**

```json
{
  "name": "Mi tablero",
  "description": "Opcional"
}
```

**201 Created**

```json
{
  "id": "uuid",
  "name": "Mi tablero",
  "description": "Opcional",
  "tasks": [
    { "id": "t1", "name": "Tarea 1", "status": "todo", "boardId": "uuid" },
    { "id": "t2", "name": "Tarea 2", "status": "todo", "boardId": "uuid" },
    { "id": "t3", "name": "Tarea 3", "status": "todo", "boardId": "uuid" },
    { "id": "t4", "name": "Tarea 4", "status": "todo", "boardId": "uuid" }
  ],
  "createdAt": "2026-02-20T10:00:00Z",
  "updatedAt": "2026-02-20T10:00:00Z"
}
```

**400 Bad Request**

```json
{ "message": "Invalid payload" }
```

---

### PUT `/api/boards/:board-id`

Actualiza un tablero por ID.

**Request body**

```json
{
  "name": "Nuevo nombre",
  "description": "Nueva descripción"
}
```

**200 OK**

```json
{
  "message": "Board updated",
  "board": {}
}
```

**404 Not Found**

```json
{ "message": "Board not found" }
```

**400 Bad Request**

```json
{ "message": "Invalid board id. Expected UUID format" }
```

---

### DELETE `/api/boards/:board-id`

Elimina un tablero por ID.

**200 OK**

```json
{ "message": "Board deleted" }
```

**404 Not Found**

```json
{ "message": "Board not found" }
```

**400 Bad Request**

```json
{ "message": "Invalid board id. Expected UUID format" }
```

---

### POST `/api/tasks`

Crea una nueva tarea en un tablero existente con nombre predeterminado.

**Request body**

```json
{
  "boardId": "uuid",
  "name": "Nueva tarea",
  "description": "",
  "icon": "",
  "status": "todo"
}
```

**201 Created**

```json
{
  "id": "new-task-uuid",
  "boardId": "uuid",
  "name": "Nueva tarea",
  "description": "",
  "icon": "",
  "status": "todo",
  "createdAt": "2026-02-20T10:00:00Z",
  "updatedAt": "2026-02-20T10:00:00Z"
}
```

**400 Bad Request**

```json
{ "message": "Invalid payload, board not found, or maximum task limit (30) reached" }
```

---

### PUT `/api/tasks/:task-id`

Actualiza una tarea por ID.

**Request body**

```json
{
  "name": "Nueva tarea",
  "description": "Texto",
  "icon": "✅",
  "status": "progress"
}
```

**200 OK**

```json
{
  "message": "Task updated",
  "task": {
    "id": "task-uuid",
    "name": "Nueva tarea",
    "description": "Texto",
    "icon": "✅",
    "status": "progress",
    "boardId": "board-uuid",
    "createdAt": "2026-02-20T10:00:00Z",
    "updatedAt": "2026-02-20T10:30:00Z"
  }
}
```

**400 Bad Request**

```json
{ "message": "Invalid status. Allowed values: todo, progress, completed, wontdo" }
```

**404 Not Found**

```json
{ "message": "Task not found" }
```

**400 Bad Request**

```json
{ "message": "Invalid task id. Expected UUID format" }
```

---

### DELETE `/api/tasks/:task-id`

Elimina una tarea por ID.

**200 OK**

```json
{ "message": "Task deleted" }
```

**404 Not Found**

```json
{ "message": "Task not found" }
```

**400 Bad Request**

```json
{ "message": "Invalid task id. Expected UUID format" }
```

---

## 5) Convenciones de error

Formato estándar:

```json
{
  "message": "Error message",
  "details": []
}
```

Códigos:

- `400` payload inválido
- `404` recurso no encontrado
- `500` error interno

---

## 6) Decisiones tomadas

✅ **Board se crea automáticamente** cuando el usuario accede a `/board` (sin ID). Se genera UUID y redirige a `/board/:board-id`.

✅ **Persistencia**: Iniciar con in-memory para prototipo rápido, migrar a **PostgreSQL** para producción.

✅ **Delete**: **Hard delete** para boards y tasks (eliminación permanente).

✅ **Status válidos**: Lista fija con 4 estados:

- `"todo"` (To Do)
- `"progress"` (In Progress)
- `"completed"` (Completed)
- `"wontdo"` (Won't Do)

✅ **Límite de tareas**: Máximo **30 tareas por board**.

---

## 7) Validaciones requeridas

### En Task:

- `name` no puede estar vacío
- `status` debe ser uno de: `"todo"`, `"progress"`, `"completed"`, `"wontdo"`
- `boardId` debe existir en la base de datos
- No permitir crear tarea si el board ya tiene 30 tareas

### En Board:

- `name` no puede estar vacío
- Al eliminar board, eliminar todas sus tareas (cascada)

---

## 8) Checklist de implementación (orden sugerido)

### Fase 1: Modelo y persistencia

- [ ] Definir interfaces `Board` y `Task` en `backend/models/`
- [ ] Definir enum o constante para estados válidos: `TaskStatus`
- [ ] Implementar generación de UUIDs (uuid v4) y timestamps ISO
- [ ] Empezar con persistencia **in-memory** (Map/Array)
- [ ] Planificar migración a **PostgreSQL** (Prisma/TypeORM)

### Fase 2: Servicio y lógica de negocio

- [ ] Crear `board.service.ts` con:
  - `createBoard()` → genera 4 tareas por defecto con status "todo"
  - `getBoardById()`
  - `updateBoard()` → validar name no vacío
  - `deleteBoard()` → hard delete + cascada de tareas
- [ ] Crear `task.service.ts` con:
  - `createTask()` → nombre predeterminado "Nueva tarea", validar límite 30
  - `updateTask()` → validar status en lista fija
  - `deleteTask()` → hard delete
  - `validateTaskStatus()` → verificar que status es válido

### Fase 3: Controladores

- [ ] Crear `board.controller.ts` con manejo de errores (400, 404, 500)
- [ ] Actualizar/crear `task.controller.ts`

### Fase 4: Rutas

- [ ] Crear `board.routes.ts`
- [ ] Actualizar/crear `task.routes.ts`
- [ ] Registrar en `app.ts`

### Fase 5: Integración frontend

- [ ] Implementar lógica de primer acceso (crear board automático)
- [ ] Conectar rutas de React Router con `/board/:board-id`
- [ ] Implementar llamadas a API desde componentes

---

## 9) Migración a PostgreSQL (fase posterior)

### Schema sugerido:

**Table: boards**

```sql
id UUID PRIMARY KEY,
name VARCHAR(255) NOT NULL,
description TEXT,
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()
```

**Table: tasks**

```sql
id UUID PRIMARY KEY,
board_id UUID NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
name VARCHAR(255) NOT NULL,
description TEXT,
icon VARCHAR(50),
status VARCHAR(20) CHECK (status IN ('todo', 'progress', 'completed', 'wontdo')),
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()
```

**Index:**

```sql
CREATE INDEX idx_tasks_board_id ON tasks(board_id);
```

### Herramientas recomendadas:

- **Prisma** (ORM con TypeScript, migraciones, type-safety)
- **TypeORM** (alternativa con decoradores)
- **node-postgres** (driver directo, más control)
