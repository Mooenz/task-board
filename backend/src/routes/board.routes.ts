import { Router } from 'express'
import {
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
} from '@/controllers/board.controller'

const boardRouter = Router()

boardRouter.get('/:boardId', getBoard)
boardRouter.post('/', createBoard)
boardRouter.put('/:boardId', updateBoard)
boardRouter.delete('/:boardId', deleteBoard)

export { boardRouter }
