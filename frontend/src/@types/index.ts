type TaskStatus = 'todo' | 'progress' | 'completed' | 'wontdo'

type CreateTaskType = {
  boardId: string
  name: string
  description: string
  icon: string
  status: TaskStatus
}

type UpdateTaskType = CreateTaskType & {
  id: string
}

type TaskType = CreateTaskType & {
  id: string
  createdAt: string
  updatedAt: string
}

type BoardUpdateType = {
  id: string
  name: string
  description: string
}

type BoardType = BoardUpdateType & {
  tasks: TaskType[]
  createdAt: string
  updatedAt: string
}

export type { TaskType, BoardType, TaskStatus, CreateTaskType, UpdateTaskType }
