// import { useState } from 'react'
import uiStore from '@/store/ui.store'
import boardStore from '@/store/board.store'
import { CloseRingDuotone } from '@/assets/CloseRingDuotone'

type PropsType = {
  title: string
  children?: React.ReactNode
}

const FormLateral = ({ title, children }: PropsType) => {
  const stateAside = uiStore((state) => state.stateAside)
  const changeStateAside = uiStore((state) => state.changeStateAside)
  const changeTaskSelectedId = boardStore((state) => state.changeTaskSelectedId)

  const handleCloseAside = () => {
    changeStateAside(false)
    changeTaskSelectedId('')
  }

  return (
    <aside
      aria-modal="true"
      aria-labelledby="form-lateral-title"
      aria-hidden={!stateAside}
      inert={!stateAside}
      role="dialog"
      className={`fixed inset-0 z-100 bg-black/20 sm:p-4 w-full transition-opacity duration-500 ease-in-out ${stateAside ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <button
        aria-label="Close panel"
        type="button"
        tabIndex={stateAside ? 0 : -1}
        className={`absolute w-full h-full z-10 transition-opacity duration-500 ease-in-out delay-100 ${stateAside ? 'opacity-100' : 'opacity-0 pointer-events-none'} `}
        onClick={handleCloseAside}
      ></button>

      <section
        className={`relative flex flex-col sm:rounded-xl h-full w-full max-w-157 z-200 bg-white ml-auto transform transition-transform duration-500 ease-in-out overflow-hidden  ${stateAside ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full overflow-auto p-4 sm:p-5.5">
          <div className="flex items-start justify-between mb-5">
            <h2 id="form-lateral-title" className="text-xl font-medium">
              {title}
            </h2>

            <button
              aria-label="Close form"
              type="button"
              tabIndex={stateAside ? 0 : -1}
              className="flex justify-center items-center h-10 w-10 outline outline-dark rounded-xl hover:bg-orange-light hover:outline-orange active:scale-95 focus:outline-orange focus-within:outline-orange focus-visible:outline-orange transition-all duration-300 cursor-pointer"
              onClick={handleCloseAside}
            >
              <CloseRingDuotone color="#E9A23B" />
            </button>
          </div>

          {children}
        </div>
      </section>
    </aside>
  )
}

export default FormLateral
