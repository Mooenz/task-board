import { Request, Response } from 'express'
import { z } from 'zod/v4'
import * as boardService from '@/services/board.services'

const boardIdParamSchema = z.object({
  boardId: z.string().uuid(),
})

const createBoardSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
})

const updateBoardSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
})

const getBoard = (req: Request, res: Response): void => {
  const parsedParams = boardIdParamSchema.safeParse(req.params)

  if (!parsedParams.success) {
    res.status(400).json({ message: 'Invalid board id. Expected UUID format' })
    return
  }

  const boardId = parsedParams.data.boardId
  const board = boardService.getBoardById(boardId)

  if (!board) {
    res.status(404).json({ message: 'Board not found' })
    return
  }

  res.status(200).json(board)
}

const createBoard = (req: Request, res: Response): void => {
  const parsed = createBoardSchema.safeParse(req.body)

  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid payload', details: parsed.error.issues })
    return
  }

  const board = boardService.createBoard(parsed.data)
  res.status(201).json(board)
}

const updateBoard = (req: Request, res: Response): void => {
  const parsedParams = boardIdParamSchema.safeParse(req.params)

  if (!parsedParams.success) {
    res.status(400).json({ message: 'Invalid board id. Expected UUID format' })
    return
  }

  const boardId = parsedParams.data.boardId
  const parsed = updateBoardSchema.safeParse(req.body)

  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid payload', details: parsed.error.issues })
    return
  }

  const board = boardService.updateBoard(boardId, parsed.data)

  if (!board) {
    res.status(404).json({ message: 'Board not found' })
    return
  }

  res.status(200).json({ message: 'Board updated', board })
}

const deleteBoard = (req: Request, res: Response): void => {
  const parsedParams = boardIdParamSchema.safeParse(req.params)

  if (!parsedParams.success) {
    res.status(400).json({ message: 'Invalid board id. Expected UUID format' })
    return
  }

  const boardId = parsedParams.data.boardId
  const deleted = boardService.deleteBoard(boardId)

  if (!deleted) {
    res.status(404).json({ message: 'Board not found' })
    return
  }

  res.status(200).json({ message: 'Board deleted' })
}

export { getBoard, createBoard, updateBoard, deleteBoard }
