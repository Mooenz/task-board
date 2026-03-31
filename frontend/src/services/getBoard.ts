import axios from 'axios'
import type { BoardType } from '@/@types'

export async function getBoard(boardId: string): Promise<BoardType> {
  return axios
    .get<BoardType>(`http://localhost:3000/api/boards/${boardId}`)
    .then((response) => response.data)
}
