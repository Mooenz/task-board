import { Router } from 'express'
import { createTask, updateTask, deleteTask } from '@/controllers/task.controller'

const taskRouter = Router()

taskRouter.post('/', createTask)
taskRouter.put('/:taskId', updateTask)
taskRouter.delete('/:taskId', deleteTask)

export { taskRouter }
