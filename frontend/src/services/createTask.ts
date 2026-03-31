import axios from 'axios'
import type { CreateTaskType } from '@/@types'

export async function createTask(newTask: CreateTaskType) {

  return axios
    .post<CreateTaskType>(`http://localhost:3000/api/tasks`, newTask, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => response.data)
}
