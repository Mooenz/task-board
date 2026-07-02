import { create } from 'zustand'

type ToastState = {
  id: string
  message: string
}

type ToastStore = {
  toast: ToastState | null
  showToast: (message: string) => void
  dismissToast: () => void
}

const toastStore = create<ToastStore>()((set) => ({
  toast: null,
  showToast: (message) =>
    set({ toast: { id: crypto.randomUUID(), message } }),
  dismissToast: () => set({ toast: null }),
}))

export default toastStore
