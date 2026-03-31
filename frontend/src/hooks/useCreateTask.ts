import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTask } from '@/services/createTask'
import type { CreateTaskType } from '@/@types'

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newTask: CreateTaskType) => createTask(newTask),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['board', variables.boardId] })
    },
    onError: (error) => {
      console.error('Error creating task:', error)
    },
  })
}
