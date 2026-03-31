import { Task } from './task.model'

const DEFAULT_BOARD_NAME = 'My Task Board'
const DEFAULT_BOARD_DESCRIPTION = 'Tasks to keep organized'

interface Board {
  id: string
  name: string
  description: string
  tasks: Task[]
  createdAt: Date
  updatedAt: Date
}

interface CreateBoardDTO {
  name?: string
  description?: string
}

interface UpdateBoardDTO {
  name?: string
  description?: string
}

export { Board, CreateBoardDTO, UpdateBoardDTO, DEFAULT_BOARD_NAME, DEFAULT_BOARD_DESCRIPTION }
