import { TimeAttackDuotone } from '@/assets/TimeAttackDuotone'
import { DoneRoundDuotone } from '@/assets/DoneRoundDuotone'
import { CloseRingDuotone } from '@/assets/CloseRingDuotone'
import { DoneRound } from '@/assets/DoneRound'
import type { TaskStatus } from '@/@types/index'

type PropsType = {
  status: string
  icon: TaskStatus
  checked: boolean
  onSelect?: (status: TaskStatus) => void
}

const StatusOption = ({ status, icon, checked, onSelect }: PropsType) => {
  const iconsComponent: Record<string, React.JSX.Element> = {
    todo: <TimeAttackDuotone />,
    progress: <TimeAttackDuotone />,
    completed: <DoneRoundDuotone />,
    wontdo: <CloseRingDuotone color="#F8FAFC" />,
  }

  const statusIcons: Record<string, string> = {
    todo: 'bg-grey',
    progress: 'bg-orange',
    completed: 'bg-green',
    wontdo: 'bg-red',
  }

  const classIcon = 'w-11 h-11 flex items-center justify-center rounded-xl'

  return (
    <div className="group relative flex gap-3 items-center justify-between outline-2 outline-grey-light rounded-2xl p-1 focus:outline-blue focus-within:outline-blue focus-visible:outline-blue transition-all duration-300 ease-in-out has-checked:outline-blue overflow-hidden active:scale-95">
      <input
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        type="radio"
        name="taskStatus"
        aria-label={`Status ${status}`}
        checked={checked}
        onChange={() => onSelect && onSelect(icon)}
      />

      <div className="flex gap-3 items-center">
        <span className={`${statusIcons[icon]} ${classIcon}`}>{iconsComponent[icon]}</span>
        <p className="select-none">{status}</p>
      </div>

      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue mr-2 scale-0 group-has-checked:scale-100 group-has-checked:transition-transform group-has-checked:duration-300 group-has-checked:delay-200 group-has-checked:ease-in-out">
        <DoneRound width="15" height="15" />
      </span>
    </div>
  )
}

export default StatusOption
