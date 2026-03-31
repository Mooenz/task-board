import axios from 'axios'

export async function deleteTask(taskId: string) {
  return axios.delete(`http://localhost:3000/api/tasks/${taskId}`);
}
