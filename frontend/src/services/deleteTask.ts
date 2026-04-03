import { api } from '@/services/api'

export async function deleteTask(taskId: string) {
  return api.delete(`/tasks/${taskId}`)
}
