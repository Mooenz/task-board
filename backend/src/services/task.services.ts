import {
  Task,
  TaskStatus,
  CreateTaskDTO,
  UpdateTaskDTO,
  VALID_TASK_STATUSES,
  DEFAULT_TASK_NAME,
  DEFAULT_TASK_STATUS,
  MAX_TASKS_PER_BOARD,
} from '@/models/task.model'
import * as taskRepository from '@/repositories/task.repository'
import { randomUUID } from 'crypto'

const isValidTaskStatus = (status: unknown): status is TaskStatus => {
  if (!status) {
    return false
  }

  return VALID_TASK_STATUSES.includes(status as TaskStatus)
}

const resolveTaskName = (name?: string): string => {
  if (!name) {
    return DEFAULT_TASK_NAME
  }

  const trimmedName = name.trim()
  return trimmedName.length > 0 ? trimmedName : DEFAULT_TASK_NAME
}

const assertTaskLimitPerBoard = (boardId: string): void => {
  const tasks = taskRepository.findByBoardId(boardId)

  if (tasks.length >= MAX_TASKS_PER_BOARD) {
    throw new Error(`Board reached the maximum of ${MAX_TASKS_PER_BOARD} tasks`)
  }
}

const createTask = (data: CreateTaskDTO): Task => {
  assertTaskLimitPerBoard(data.boardId)

  const id = randomUUID()
  const now = new Date()
  const status = isValidTaskStatus(data.status) ? data.status : DEFAULT_TASK_STATUS

  const task: Task = {
    id,
    name: resolveTaskName(data.name),
    description: data.description || '',
    status,
    icon: data.icon || '',
    boardId: data.boardId,
    createdAt: now,
    updatedAt: now,
  }

  return taskRepository.create(task)
}

const getTaskById = (id: string): Task | null => {
  return taskRepository.findById(id)
}

const updateTask = (id: string, data: UpdateTaskDTO): Task | null => {
  const task = taskRepository.findById(id)

  if (!task) {
    return null
  }

  const now = new Date()

  const nextStatus =
    data.status === undefined
      ? task.status
      : isValidTaskStatus(data.status)
        ? data.status
        : task.status

  const updatedTask: Task = {
    ...task,
    name: data.name !== undefined ? resolveTaskName(data.name) : task.name,
    description: data.description !== undefined ? data.description : task.description,
    icon: data.icon !== undefined ? data.icon : task.icon,
    status: nextStatus,
    updatedAt: now,
  }

  return taskRepository.update(updatedTask)
}

const updateTaskStatus = (id: string, status: TaskStatus): Task | null => {
  return updateTask(id, { status })
}

const deleteTask = (id: string): boolean => {
  return taskRepository.deleteById(id)
}

export { createTask, getTaskById, updateTask, updateTaskStatus, deleteTask, isValidTaskStatus }
