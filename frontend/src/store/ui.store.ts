import { create } from 'zustand'

type UiType = {
  stateAside: boolean
  stateFormEdit: boolean
  changeStateAside: (state: boolean) => void
  changeStateFormEdit: (state: boolean) => void
}

const uiStore = create<UiType>()((set) => ({
  stateAside: false,
  stateFormEdit: false,
  changeStateAside: (state) => set({ stateAside: state }),
  changeStateFormEdit: (state) => set({ stateFormEdit: state }),
}))

export default uiStore
