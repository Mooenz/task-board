import { useEffect, useState } from 'react'
import toastStore from '@/store/toast.store'

const TOAST_DURATION_MS = 5000
const CLOSE_ANIMATION_MS = 500
const COUNTER_SIZE = 25
const RADIUS = 10
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function CircularCountdown() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const start = performance.now()
    let frame = 0

    const animate = (now: number) => {
      const progress = Math.min((now - start) / TOAST_DURATION_MS, 1)
      setOffset(CIRCUMFERENCE * progress)

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <svg
      aria-hidden="true"
      className="shrink-0 -rotate-90"
      width={COUNTER_SIZE}
      height={COUNTER_SIZE}
      viewBox={`0 0 ${COUNTER_SIZE} ${COUNTER_SIZE}`}
    >
      <circle
        cx={COUNTER_SIZE / 2}
        cy={COUNTER_SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke="var(--color-grey-light)"
        strokeWidth="2.5"
      />
      <circle
        cx={COUNTER_SIZE / 2}
        cy={COUNTER_SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke="var(--color-blue)"
        strokeWidth="2.5"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  )
}

function ToastItem({ id, message }: { id: string; message: string }) {
  const dismissToast = toastStore((state) => state.dismissToast)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    const closeTimer = setTimeout(() => {
      setIsClosing(true)
    }, TOAST_DURATION_MS)

    return () => clearTimeout(closeTimer)
  }, [id])

  useEffect(() => {
    if (!isClosing) return

    const unmountTimer = setTimeout(() => {
      dismissToast()
    }, CLOSE_ANIMATION_MS)

    return () => clearTimeout(unmountTimer)
  }, [isClosing, dismissToast])

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center gap-3 bg-white rounded-xl shadow-sm px-3 py-2 animate-duration-500 ${isClosing ? 'animate-zoom-out' : 'animate-zoom-in'}`}
    >
      <CircularCountdown />
      <p className="text-base font-medium">{message}</p>
    </div>
  )
}

export default function ToastContainer() {
  const toast = toastStore((state) => state.toast)

  if (!toast) return null

  return (
    <div className="fixed bottom-6 left-1/2 z-350 -translate-x-1/2 pointer-events-none">
      <ToastItem key={toast.id} id={toast.id} message={toast.message} />
    </div>
  )
}
