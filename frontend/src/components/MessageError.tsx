import Logo from '@/assets/Logo'
type MessageErrorProps = {
  countdown: number
}

export default function MessageError({ countdown }: MessageErrorProps) {
  return (
    <section className="w-full mx-auto max-w-148" role="status" aria-live="polite">
      <div className="rounded-xl text-center px-5 py-4">
        <div className="flex items-center justify-center mb-6">
          <Logo />
        </div>
        <p className="font-semibold">El board que se esta consultando no existe.</p>
        <p className="mt-1 text-sm">Creando un nuevo board en {countdown}...</p>
      </div>
    </section>
  )
}
