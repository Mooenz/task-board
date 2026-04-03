import type { UpdateTaskType } from '@/@types'
import { api } from '@/services/api'

export async function updateTask(taskUpdate: UpdateTaskType) {
  return api
    .put<UpdateTaskType>(`/tasks/${taskUpdate.id}`, taskUpdate)
    .then((response) => response.data)
}
