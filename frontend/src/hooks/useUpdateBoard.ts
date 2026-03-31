import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBoard } from '@/services/updateBoard'

type PropTypes = {
  id: string | null
  name: string
  description: string
}

export const useUpdateBoard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: PropTypes) => updateBoard(variables),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['board', id] })
    },
  })
}
