import axios from 'axios'
import type { UpdateTaskType } from '@/@types'

export async function updateTask(taskUpdate: UpdateTaskType) {
  return axios
    .put<UpdateTaskType>(`http://localhost:3000/api/tasks/${taskUpdate.id}`, taskUpdate, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => response.data)
}
