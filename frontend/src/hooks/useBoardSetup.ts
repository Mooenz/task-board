import { useEffect } from 'react'
import { useCreateBoard } from '@/hooks/useCreateBoard'
import boardStore from '@/store/board.store'

export function useBoardSetup() {
  const boardId = boardStore((state) => state.boardId)
  const setBoardId = boardStore((state) => state.setBoardId)

  const { mutate: createBoard, error: createError } = useCreateBoard()

  useEffect(() => {
    if (boardId === null) {
      createBoard(undefined, { onSuccess: (data) => setBoardId(data.id) })
    }
  }, [boardId, createBoard, setBoardId])

  return { boardId, createError }
}
