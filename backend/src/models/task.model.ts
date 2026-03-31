import { TaskStatus } from '@/@types'

const VALID_TASK_STATUSES: TaskStatus[] = ['todo', 'progress', 'completed', 'wontdo']
const DEFAULT_TASK_NAME = 'Add new task'
const DEFAULT_TASK_STATUS: TaskStatus = 'todo'
const MAX_TASKS_PER_BOARD = 30

interface Task {
  id: string
  name: string
  description: string
  status: TaskStatus
  icon: string
  boardId: string
  createdAt: Date
  updatedAt: Date
}

interface CreateTaskDTO {
  boardId: string
  name?: string
  description?: string
  icon?: string
  status?: TaskStatus
}

interface UpdateTaskDTO {
  name?: string
  description?: string
  icon?: string
  status?: TaskStatus
}

export {
  Task,
  TaskStatus,
  CreateTaskDTO,
  UpdateTaskDTO,
  VALID_TASK_STATUSES,
  DEFAULT_TASK_NAME,
  DEFAULT_TASK_STATUS,
  MAX_TASKS_PER_BOARD,
}
