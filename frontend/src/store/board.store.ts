import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type BoardState = {
  boardId: string | null
  taskSelectedId: string | null
  changeTaskSelectedId: (taskSelectedId: string) => void
  setBoardId: (boardId: string | null) => void
}

const boardStore = create<BoardState>()(
  persist<BoardState>(
    (set) => ({
      boardId: null,
      taskSelectedId: null,
      changeTaskSelectedId: (state) => set({ taskSelectedId: state }),
      setBoardId: (boardId) => set({ boardId: boardId ?? null }),
    }),
    {
      name: 'board-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default boardStore
