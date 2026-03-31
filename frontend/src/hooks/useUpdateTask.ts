import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTask } from '@/services/updateTask'
import type { UpdateTaskType } from '@/@types'

type propsTypes = {
  taskDataState: UpdateTaskType
  boardId: string | null
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: propsTypes) => updateTask(variables.taskDataState),
    onSuccess: (_, { boardId }) => {
      queryClient.invalidateQueries({ queryKey: ['board', boardId] })
    },
  })
}
