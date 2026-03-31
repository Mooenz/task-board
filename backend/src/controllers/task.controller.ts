import { Request, Response } from 'express'
import { z } from 'zod/v4'
import * as taskService from '@/services/task.services'
import * as boardService from '@/services/board.services'
import { VALID_TASK_STATUSES, TaskStatus } from '@/models/task.model'

const taskIdParamSchema = z.object({
  taskId: z.string().uuid(),
})

const taskStatusEnum = z.enum(VALID_TASK_STATUSES as [TaskStatus, ...TaskStatus[]])

const createTaskSchema = z.object({
  boardId: z.string().uuid(),
  name: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  status: taskStatusEnum.optional(),
})

const updateTaskSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  status: taskStatusEnum.optional(),
})

const createTask = (req: Request, res: Response): void => {
  const parsed = createTaskSchema.safeParse(req.body)

  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid payload', details: parsed.error.issues })
    return
  }

  const board = boardService.getBoardById(parsed.data.boardId)

  if (!board) {
    res
      .status(400)
      .json({ message: 'Invalid payload, board not found, or maximum task limit (30) reached' })
    return
  }

  try {
    const task = taskService.createTask(parsed.data)
    res.status(201).json(task)
  } catch {
    res
      .status(400)
      .json({ message: 'Invalid payload, board not found, or maximum task limit (30) reached' })
  }
}

const updateTask = (req: Request, res: Response): void => {
  const parsedParams = taskIdParamSchema.safeParse(req.params)

  if (!parsedParams.success) {
    res.status(400).json({ message: 'Invalid task id. Expected UUID format' })
    return
  }

  const taskId = parsedParams.data.taskId
  const parsed = updateTaskSchema.safeParse(req.body)

  if (!parsed.success) {
    res.status(400).json({
      message: `Invalid status. Allowed values: ${VALID_TASK_STATUSES.join(', ')}`,
      details: parsed.error.issues,
    })
    return
  }

  const task = taskService.updateTask(taskId, parsed.data)

  if (!task) {
    res.status(404).json({ message: 'Task not found' })
    return
  }

  res.status(200).json({ message: 'Task updated', task })
}

const deleteTask = (req: Request, res: Response): void => {
  const parsedParams = taskIdParamSchema.safeParse(req.params)

  if (!parsedParams.success) {
    res.status(400).json({ message: 'Invalid task id. Expected UUID format' })
    return
  }

  const taskId = parsedParams.data.taskId
  const deleted = taskService.deleteTask(taskId)

  if (!deleted) {
    res.status(404).json({ message: 'Task not found' })
    return
  }

  res.status(200).json({ message: 'Task deleted' })
}

export { createTask, updateTask, deleteTask }
