import axios from 'axios'

type PropTypes = {
  id: string | null
  name: string
  description: string
}

export async function updateBoard({ id, name, description }: PropTypes) {
  return axios
    .put(`http://localhost:3000/api/boards/${id}`, { name, description })
    .then((response) => response.data)
}
