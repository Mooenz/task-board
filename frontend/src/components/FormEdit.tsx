import { useState } from 'react'
import StatusOption from '@/components/StatusOption'
import IconOption from '@/components/IconOption'
import { DoneRound } from '@/assets/DoneRound'
import { Trash } from '@/assets/Trash'
import { useDeleteTask } from '@/hooks/useDeleteTask'
import { useUpdateTask } from '@/hooks/useUpdateTask'
import uiStore from '@/store/ui.store'
import boardStore from '@/store/board.store'
import type { TaskType, TaskStatus } from '@/@types/index'

type PropTypes = {
  taskData: TaskType | undefined
}

type StatusOptionType = {
  id: number
  status: string
  icon: TaskStatus
}

const Form = ({ taskData }: PropTypes) => {
  const [taskDataState, setTaskData] = useState(taskData)
  const { mutate: deleteTask } = useDeleteTask()
  const { mutate: updateTask } = useUpdateTask()
  const changeStateAside = uiStore((state) => state.changeStateAside)
  const boardId = boardStore((state) => state.boardId)

  const statusOptions: StatusOptionType[] = [
    { id: 1, status: 'In Progress', icon: 'progress' },
    { id: 2, status: 'Completed', icon: 'completed' },
    { id: 3, status: 'Won´t do', icon: 'wontdo' },
  ]

  const iconsOptions = [
    { id: 1, icon: '⏰' },
    { id: 2, icon: '🏆' },
    { id: 3, icon: '📝' },
    { id: 4, icon: '📚' },
    { id: 5, icon: '🚀' },
    { id: 6, icon: '🎯' },
    { id: 7, icon: '☕' },
  ]

  const styleButton =
    'flex items-center gap-2 px-6 py-2 rounded-full outline-2 outline-transparent active:scale-95 cursor-pointer transition-all ease-in-out duration-300 text-sm text-white border-2 border-white'

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (taskDataState) {
      updateTask({ taskDataState, boardId })
      changeStateAside(false)
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTaskData((task) => (task ? { ...task, [name]: value } : task))
  }

  const handleIconChange = (icon: string) => {
    setTaskData((task) => (task ? { ...task, icon } : task))
  }

  const handleStatusChange = (status: TaskStatus) => {
    setTaskData((task) => (task ? { ...task, status } : task))
  }

  const handleDeleteTask = () => {
    const res = window.confirm('Are you sure you want to delete this task?')

    if (taskDataState?.id && res) {
      deleteTask({ taskId: taskDataState.id, boardId })
      changeStateAside(false)
    }
  }

  return (
    <form className="flex flex-col flex-1" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label className="block text-[0.75rem] text-grey font-light mb-1" htmlFor="taskName">
          Task name
        </label>
        <input
          className="w-full px-4.5 outline-2 outline-grey-light rounded-lg p-2 focus:outline-blue focus-within:outline-blue focus-visible:outline-blue transition-colors duration-300 ease-in-out text-lg font-light placeholder:text-grey"
          type="text"
          placeholder="Enter a task"
          id="taskName"
          name="name"
          value={taskDataState?.name}
          onChange={handleTextChange}
        />
      </div>

      <div className="mb-5">
        <label className="block text-[0.75rem] text-grey font-light mb-1" htmlFor="taskDescription">
          Description
        </label>
        <textarea
          className="w-full px-4.5 outline-2 outline-grey-light rounded-lg p-2 focus:outline-blue focus-within:outline-blue focus-visible:outline-blue transition-colors duration-300 ease-in-out text-lg font-light resize-none h-42.5 placeholder:text-grey"
          name="description"
          id="taskDescription"
          placeholder="Enter a short description"
          value={taskDataState?.description}
          onChange={handleTextChange}
        ></textarea>
      </div>

      <div className="mb-5">
        <label className="block text-[0.75rem] text-grey font-light mb-1" htmlFor="taskIcon">
          Icon
        </label>

        <div className="flex flex-wrap gap-3">
          {iconsOptions.map((element) => (
            <IconOption
              key={element.id}
              icon={element.icon}
              checked={taskDataState?.icon === element.icon}
              onSelect={handleIconChange}
            />
          ))}
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-[0.75rem] text-grey font-light mb-1" htmlFor="taskStatus">
          Status
        </label>

        <div className="grid sm:grid-cols-2 gap-y-3 gap-x-4">
          {statusOptions.map((option) => (
            <StatusOption
              key={option.id}
              status={option.status}
              icon={option.icon}
              checked={taskDataState?.status === option.icon}
              onSelect={handleStatusChange}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-auto">
        <button
          onClick={handleDeleteTask}
          className={`${styleButton} bg-grey hover:outline-grey focus:outline-grey focus-within:outline-blue focus-visible:outline-grey `}
        >
          Delete
          <Trash />
        </button>
        <button
          className={`${styleButton} bg-blue hover:outline-blue focus:outline-blue focus-within:outline-blue focus-visible:outline-blue`}
          type="submit"
        >
          Save
          <DoneRound width="20" height="20" />
        </button>
      </div>
    </form>
  )
}

export default Form
