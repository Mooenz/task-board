import { Board } from '@/models/board.model'

const boards: Board[] = []

const create = (board: Board): Board => {
  boards.push(board)
  return board
}

const findById = (id: string): Board | null => {
  const board = boards.find((currentBoard) => currentBoard.id === id)
  return board || null
}

const update = (board: Board): Board => {
  const index = boards.findIndex((currentBoard) => currentBoard.id === board.id)

  if (index < 0) {
    throw new Error('Board not found')
  }

  boards[index] = board
  return board
}

const deleteById = (id: string): boolean => {
  const boardIndex = boards.findIndex((board) => board.id === id)

  if (boardIndex < 0) {
    return false
  }

  boards.splice(boardIndex, 1)
  return true
}

const findAll = (): Board[] => {
  return [...boards]
}

export { create, findById, update, deleteById, findAll }
