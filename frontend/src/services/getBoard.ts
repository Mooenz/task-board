import type { BoardType } from '@/@types'
import { api } from '@/services/api'

export async function getBoard(boardId: string): Promise<BoardType> {
  return api.get<BoardType>(`/boards/${boardId}`).then((response) => response.data)
}
