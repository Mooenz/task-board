import { useQuery } from '@tanstack/react-query'
import { getBoard } from '@/services/getBoard'

export const useGetBoard = (boardId: string | null) => {
  return useQuery({
    queryKey: ['board', boardId],
    queryFn: () => getBoard(boardId as string),
    enabled: !!boardId,
  })
}
