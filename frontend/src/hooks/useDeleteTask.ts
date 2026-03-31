import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask } from '@/services/deleteTask'

type deleteTaskType = {
  taskId: string
  boardId: string | null
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: deleteTaskType) => deleteTask(variables.taskId),
    onSuccess: (_, { boardId }) => {
      queryClient.invalidateQueries({ queryKey: ['board', boardId] })
    },
    onError: (error) => {
      console.error('Error deleting task:', error)
    },
  })
}
