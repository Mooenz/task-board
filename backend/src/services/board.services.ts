import {
  Board,
  CreateBoardDTO,
  UpdateBoardDTO,
  DEFAULT_BOARD_NAME,
  DEFAULT_BOARD_DESCRIPTION,
} from '@/models/board.model'
import { Task, DEFAULT_TASK_STATUS } from '@/models/task.model'
import * as boardRepository from '@/repositories/board.repository'
import * as taskRepository from '@/repositories/task.repository'
import * as userBoardRepository from '@/repositories/user-board.repository'
import { randomUUID } from 'crypto'

const DEFAULT_TASK_NAMES = [
  { name: 'Task in Progress', description: '', status: 'progress', icon: '⏰' },
  { name: 'Task Completed', description: '', status: 'completed', icon: '🏆' },
  { name: 'Task Won’t Do', description: '', status: 'wontdo', icon: '☕' },
  {
    name: 'Task To Do',
    description: 'Work on a Challenge on devChallenges.io, learn TypeScript.',
    status: 'todo',
    icon: '📚',
  },
]

const resolveBoardName = (name?: string): string => {
  if (!name) {
    return DEFAULT_BOARD_NAME
  }

  const trimmedName = name.trim()
  return trimmedName.length > 0 ? trimmedName : DEFAULT_BOARD_NAME
}

function createBoard(data: CreateBoardDTO): Board {
  const id = randomUUID()
  const now = new Date()

  const boardData: Board = {
    id,
    name: resolveBoardName(data.name),
    description: data.description || DEFAULT_BOARD_DESCRIPTION,
    tasks: [],
    createdAt: now,
    updatedAt: now,
  }

  const board = boardRepository.create(boardData)
  generateDefaultTasks(board.id)
  return getBoardById(board.id) as Board
}

function getOrCreateBoardByUserId(userId: string): Board {
  const boardId = userBoardRepository.findBoardIdByUserId(userId)

  if (boardId) {
    const existingBoard = getBoardById(boardId)

    if (existingBoard) {
      return existingBoard
    }
  }

  const board = createBoard({})
  userBoardRepository.linkUserToBoard(userId, board.id)
  return board
}

function getBoardById(id: string): Board | null {
  const board = boardRepository.findById(id)

  if (!board) {
    return null
  }

  return {
    ...board,
    tasks: taskRepository.findByBoardId(id),
  }
}

function updateBoard(id: string, data: UpdateBoardDTO): Board | null {
  const board = boardRepository.findById(id)

  if (!board) {
    return null
  }

  board.name = data.name !== undefined ? resolveBoardName(data.name) : board.name
  board.description = data.description !== undefined ? data.description : board.description
  board.updatedAt = new Date()

  return boardRepository.update(board)
}

function deleteBoard(id: string): boolean {
  const boardDeleted = boardRepository.deleteById(id)

  if (!boardDeleted) {
    return false
  }

  taskRepository.deleteByBoardId(id)
  return true
}

function generateDefaultTasks(boardId: string): Task[] {
  const now = new Date()

  return DEFAULT_TASK_NAMES.map((taskData) => {
    const task: Task = {
      id: randomUUID(),
      name: taskData.name,
      description: taskData.description,
      icon: taskData.icon,
      status: taskData.status as typeof DEFAULT_TASK_STATUS,
      boardId,
      createdAt: now,
      updatedAt: now,
    }

    return taskRepository.create(task)
  })
}

export { createBoard, getBoardById, getOrCreateBoardByUserId, updateBoard, deleteBoard }
