import IconLogo from '@/assets/Logo'
import { EditDuotone } from '@/assets/EditDuotone'
import uiStore from '@/store/ui.store'

type Props = {
  dataBoard: {
    title: string | null
    description: string | null
  }
}

const Title = ({ dataBoard }: Props) => {
  const changeStateFormEdit = uiStore((state) => state.changeStateFormEdit)
  const changeStateAside = uiStore((state) => state.changeStateAside)

  const handleOpenForm = () => {
    changeStateFormEdit(false)
    changeStateAside(true)
  }

  return (
    <hgroup>
      <div className="flex gap-4 mb-5 sm:mb-10">
        <IconLogo />

        <div>
          <div className="animate-fade-in-up animate-duration-500 flex items-center gap-4 mb-2 sm:mb-4">
            <h1 className="font-normal text-2xl md:text-3xl lg:text-[2.5rem] leading-10">
              {dataBoard.title}
            </h1>
            <button
              className="relative flex items-center sm:gap-1 group cursor-pointer active:scale-95 transition-all ease-in-out duration-300 rounded-lg sm:p-1 sm:pr-2 pr-2 bg-blue/10 sm:bg-transparent hover:bg-blue/10 focus:bg-blue/10 focus-visible:bg-blue/10 hover:outline-blue focus:outline-blue outline-2 outline-blue sm:outline-transparent "
              aria-label="Edit title"
              onClick={handleOpenForm}
            >
              <EditDuotone />
              <span className="transform sm:opacity-0 sm:-translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all group-focus:translate-x-0 group-focus:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 ease-in-out duration-300 text-sm text-text">
                Edit
              </span>
            </button>
          </div>

          <h2 className="animate-fade-in-up animate-duration-500 animate-delay-200 font-normal">
            {dataBoard.description}
          </h2>
        </div>
      </div>
    </hgroup>
  )
}

export default Title
