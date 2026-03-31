import { useState } from 'react'
import { useUpdateBoard } from '@/hooks/useUpdateBoard'
import uiStore from '@/store/ui.store'
import boardStore from '@/store/board.store'

type PropsTypes = {
  dataBoard: { title: string | null; description: string | null }
}

function FormEditTitle({ dataBoard }: PropsTypes) {
  const boardId = boardStore((state) => state.boardId)
  const [boardData, setBoardData] = useState(dataBoard)
  const changeStateAside = uiStore((state) => state.changeStateAside)
  const { mutate: updateBoard } = useUpdateBoard()

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!boardData.title || !boardData.description) return

    updateBoard({ id: boardId, name: boardData.title, description: boardData.description })
    changeStateAside(false)
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBoardData((board) => (board ? { ...board, [name]: value } : board))
  }

  const handleCloseAside = () => {
    changeStateAside(false)
  }

  const styleButton =
    'flex items-center gap-2 px-6 py-2 rounded-full outline-2 outline-transparent active:scale-95 cursor-pointer transition-all ease-in-out duration-300 text-sm text-white border-2 border-white'

  // useEffect(() => {
  //   if (!stateAside) {
  //     setBoardData(dataBoard)
  //   }
  // }, [stateAside, dataBoard])

  return (
    <form className="flex-1 flex flex-col" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label className="block text-[0.75rem] text-grey font-light mb-1" htmlFor="boardName">
          Board name
        </label>
        <input
          className="w-full px-4.5 outline-2 outline-grey-light rounded-lg p-2 focus:outline-blue focus-within:outline-blue focus-visible:outline-blue transition-colors duration-300 ease-in-out text-lg font-light placeholder:text-grey"
          type="text"
          placeholder="Enter a title board"
          id="boardName"
          name="title"
          value={boardData.title ?? ''}
          onChange={handleTextChange}
        />
      </div>

      <div className="mb-5">
        <label
          className="block text-[0.75rem] text-grey font-light mb-1"
          htmlFor="boardDescription"
        >
          Description
        </label>
        <textarea
          className="w-full px-4.5 outline-2 outline-grey-light rounded-lg p-2 focus:outline-blue focus-within:outline-blue focus-visible:outline-blue transition-colors duration-300 ease-in-out text-lg font-light resize-none h-42.5 placeholder:text-grey"
          name="description"
          id="boardDescription"
          placeholder="Enter a short description"
          value={boardData.description ?? ''}
          onChange={handleTextChange}
        ></textarea>
      </div>

      <div className="flex justify-end gap-4 mt-auto">
        <button
          className={`${styleButton} bg-grey hover:outline-grey focus:outline-grey focus-within:outline-blue focus-visible:outline-grey `}
          onClick={handleCloseAside}
          type="button"
        >
          Cancel
        </button>

        <button
          className={`${styleButton} bg-blue hover:outline-blue focus:outline-blue focus-within:outline-blue focus-visible:outline-blue`}
          type="submit"
        >
          Save changes
        </button>
      </div>
    </form>
  )
}

export default FormEditTitle
