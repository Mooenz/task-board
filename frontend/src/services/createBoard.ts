import type { BoardType } from '@/@types'
import { api } from '@/services/api'

export async function createBoard(): Promise<BoardType> {
  return api.post<BoardType>('/boards').then((response) => response.data)
}
