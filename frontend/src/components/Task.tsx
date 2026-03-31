import type { TaskType } from '@/@types/index'
import { TimeAttackDuotone } from '@/assets/TimeAttackDuotone'
import { DoneRoundDuotone } from '@/assets/DoneRoundDuotone'
import { CloseRingDuotone } from '@/assets/CloseRingDuotone'
import uiStore from '@/store/ui.store'
import boardStore from '@/store/board.store'

type Props = {
  task: TaskType
  index: number
}

const Task = ({ task, index }: Props) => {
  const { name, description, status, icon } = task
  const changeStateAside = uiStore((state) => state.changeStateAside)
  const changeTaskSelectedId = boardStore((state) => state.changeTaskSelectedId)
  const changeStateFormEdit = uiStore((state) => state.changeStateFormEdit)

  const statusClasses: Record<string, string> = {
    todo: 'bg-grey-light',
    progress: 'bg-yellow',
    completed: 'bg-green-light',
    wontdo: 'bg-red-light',
  }

  const statusIcons: Record<string, string> = {
    todo: 'bg-grey',
    progress: 'bg-orange',
    completed: 'bg-green',
    wontdo: 'bg-red',
  }

  const iconsComponent: Record<string, React.JSX.Element> = {
    todo: <TimeAttackDuotone />,
    progress: <TimeAttackDuotone />,
    completed: <DoneRoundDuotone />,
    wontdo: <CloseRingDuotone color="#F8FAFC" />,
  }

  const classIcon =
    'min-w-9 w-9 h-9 sm:min-w-11 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl mb-auto'
  const classTask = `outline-2 outline-transparent hover:outline-blue focus:outline-blue focus-within:outline-blue focus-visible:outline-blue border-2 sm:border-4 border-white flex items-center justify-between gap-2 sm:gap-5 p-1 sm:p-4 rounded-2xl w-full cursor-pointer active:scale-95 transition-all ease-in-out duration-300 ${statusClasses[status]}`

  const handleOpenForm = () => {
    changeTaskSelectedId(task.id)
    changeStateAside(true)
    changeStateFormEdit(true)
  }

  const animateDelay = index + 2 < 10 ? `${index * 20}ms` : '100ms'
  return (
    <li
      className="animate-fade-in-up animate-duration-500"
      style={{ animationDelay: animateDelay }}
    >
      <button className={classTask} onClick={handleOpenForm}>
        <div className="flex items-center gap-4 sm:gap-5">
          <span className={`${classIcon} bg-white`}>{icon}</span>
          <div className="text-start">
            <h2 className="text-balance text-md sm:text-xl font-semibold mb-1">{name}</h2>
            {description && (
              <p className="text-pretty text-sm sm:text-base font-light">{description}</p>
            )}
          </div>
        </div>
        {status !== 'todo' && (
          <span className={`${classIcon} ${statusIcons[status]}`}>{iconsComponent[status]}</span>
        )}
      </button>
    </li>
  )
}

export default Task
