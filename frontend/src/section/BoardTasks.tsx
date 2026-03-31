import FormLateral from '@/section/FormLateral'
import FormEdit from '@/components/FormEdit'
import Task from '@/components/Task'
import FormEditTitle from '@/components/FormEditTitle'
import boardStore from '@/store/board.store'
import { AddRoundDuotone } from '@/assets/AddRoundDuotone'
import { useCreateTask } from '@/hooks/useCreateTask'
import type { TaskType, CreateTaskType } from '@/@types/index'
import uiStore from '@/store/ui.store'

type PropsType = {
  boardTask?: TaskType[]
  dataBoard: {
    title: string | null
    description: string | null
  }
}

const BoardTasks = ({ boardTask, dataBoard }: PropsType) => {
  const taskSelectedId = boardStore((state) => state.taskSelectedId)
  let selectTask: TaskType | undefined = undefined
  const boardId = boardStore((state) => state.boardId)
  const { mutate, isPending } = useCreateTask()
  const stateFormEdit = uiStore((state) => state.stateFormEdit)
  const stateAside = uiStore((state) => state.stateAside)

  if (taskSelectedId) {
    selectTask = boardTask?.find((task) => task.id === taskSelectedId)
  }

  const handleAddNewTask = () => {
    if (!boardId) return

    const newTask: CreateTaskType = {
      boardId,
      name: 'Task To Do',
      description: 'White space to write the description of the task',
      icon: '📚',
      status: 'todo',
    }

    mutate(newTask)
  }

  const showTitle = stateFormEdit ? 'Task details' : 'Board details'
  const lengthTask = boardTask?.length ?? 0

  return (
    <>
      <section>
        <ul className="flex flex-col gap-1 sm:gap-4">
          {boardTask?.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}
        </ul>
        {lengthTask < 30 && (
          <button
            onClick={handleAddNewTask}
            disabled={isPending}
            className="animate-zoom-in animate-duration-500 animate-delay-400 flex items-center gap-4 sm:gap-5 p-1 sm:p-4  rounded-2xl bg-orange-light outline-2 outline-transparent hover:outline-orange focus:outline-orange focus-within:outline-orange focus-visible:outline-blu mt-1 sm:mt-5 w-full active:scale-95 cursor-pointer transition-all ease-in-out duration-300 font-bold border-4 border-white disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-none"
          >
            <span className="flex items-center justify-center min-w-9 w-9 h-9 sm:min-w-11 sm:w-11 sm:h-11 rounded-xl bg-orange">
              <AddRoundDuotone />
            </span>
            Add new task
          </button>
        )}
      </section>

      <FormLateral title={showTitle}>
        {stateFormEdit ? (
          <FormEdit key={selectTask?.id ?? 'empty-task'} taskData={selectTask} />
        ) : (
          <FormEditTitle key={stateAside ? 'open' : 'closed'} dataBoard={dataBoard} />
        )}
      </FormLateral>
    </>
  )
}

export default BoardTasks
