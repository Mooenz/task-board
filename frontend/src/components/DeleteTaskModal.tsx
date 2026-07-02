import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Trash } from '@/assets/Trash'

type Props = {
  open: boolean
  taskName: string
  onConfirm: () => void
  onClose: () => void
}

const styleButton =
  'flex items-center gap-2 px-6 py-2 rounded-full outline-2 outline-transparent active:scale-95 cursor-pointer transition-all ease-in-out duration-300 text-sm text-white border-2 border-white'

const DeleteTaskModal = ({ open, taskName, onConfirm, onClose }: Props) => {
  const [shouldRender, setShouldRender] = useState(open)
  const [isClosing, setIsClosing] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (open) {
      setShouldRender(true)
      setIsClosing(false)
      return
    }

    if (!shouldRender) return

    setIsClosing(true)
    const timer = setTimeout(() => {
      setShouldRender(false)
      setIsClosing(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [open, shouldRender])

  if (!mounted || !shouldRender) return null

  return createPortal(
    <div
      aria-labelledby="delete-task-modal-title"
      aria-describedby="delete-task-modal-description"
      aria-modal="true"
      role="alertdialog"
      className={`fixed inset-0 z-400 transition-opacity duration-500 ease-in-out ${isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <button
        aria-label="Close modal"
        type="button"
        className="absolute inset-0 bg-black/20"
        onClick={onClose}
      ></button>

      <div className="absolute inset-0 flex w-full items-center justify-center p-4 pointer-events-none">
        <div
          className={`pointer-events-auto relative z-10 w-full max-w-md bg-white rounded-xl shadow-sm p-5 sm:p-6 animate-duration-500 ${isClosing ? 'animate-zoom-out' : 'animate-zoom-in'}`}
        >
          <h2 id="delete-task-modal-title" className="text-xl font-medium mb-2">
            Delete task &apos;{taskName}&apos;
          </h2>
          <p id="delete-task-modal-description" className="text-grey font-light mb-6">
            Are you sure you want to delete this task?
          </p>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className={`${styleButton} bg-grey hover:outline-grey focus:outline-grey focus-within:outline-blue focus-visible:outline-grey`}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className={`${styleButton} bg-red hover:outline-red focus:outline-red focus-within:outline-red focus-visible:outline-red`}
            >
              Confirm
              <Trash />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default DeleteTaskModal
