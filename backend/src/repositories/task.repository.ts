import { Task } from '@/models/task.model'

const tasks: Task[] = []

const create = (task: Task): Task => {
  tasks.push(task)
  return task
}

const findById = (id: string): Task | null => {
  const task = tasks.find((currentTask) => currentTask.id === id)
  return task || null
}

const findByBoardId = (boardId: string): Task[] => {
  return tasks.filter((task) => task.boardId === boardId)
}

const update = (task: Task): Task => {
  const index = tasks.findIndex((currentTask) => currentTask.id === task.id)

  if (index < 0) {
    throw new Error('Task not found')
  }

  tasks[index] = task
  return task
}

const deleteById = (id: string): boolean => {
  const taskIndex = tasks.findIndex((task) => task.id === id)

  if (taskIndex < 0) {
    return false
  }

  tasks.splice(taskIndex, 1)
  return true
}

const deleteByBoardId = (boardId: string): number => {
  const currentLength = tasks.length

  for (let index = tasks.length - 1; index >= 0; index -= 1) {
    if (tasks[index].boardId === boardId) {
      tasks.splice(index, 1)
    }
  }

  return currentLength - tasks.length
}

export { create, findById, findByBoardId, update, deleteById, deleteByBoardId }
