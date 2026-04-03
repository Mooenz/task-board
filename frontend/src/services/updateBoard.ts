import { api } from '@/services/api'

type PropTypes = {
  id: string | null
  name: string
  description: string
}

export async function updateBoard({ id, name, description }: PropTypes) {
  return api.put(`/boards/${id}`, { name, description }).then((response) => response.data)
}
