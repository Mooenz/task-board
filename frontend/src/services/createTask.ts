import type { CreateTaskType } from '@/@types'
import { api } from '@/services/api'

export async function createTask(newTask: CreateTaskType) {
  return api.post<CreateTaskType>('/tasks', newTask).then((response) => response.data)
}
