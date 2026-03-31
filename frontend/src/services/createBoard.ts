import axios from 'axios'
import type { BoardType } from '@/@types'

export async function createBoard(): Promise<BoardType> {
  return axios
    .post<BoardType>('http://localhost:3000/api/boards', {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => response.data)
}
