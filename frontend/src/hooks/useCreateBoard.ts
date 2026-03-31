import { useMutation } from '@tanstack/react-query'
import { createBoard } from '@/services/createBoard'

export const useCreateBoard = () => {
  return useMutation({
    mutationFn: createBoard,
  })
}
