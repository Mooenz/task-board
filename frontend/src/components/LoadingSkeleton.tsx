type LoadingSkeletonProps = {
  variant?: 'home' | 'board'
}

const baseBlock = 'animate-pulse rounded-xl bg-grey-light/80'

export default function LoadingSkeleton({ variant = 'board' }: LoadingSkeletonProps) {
  if (variant === 'home') {
    return (
      <section className="w-full mx-auto max-w-137.5 flex items-center justify-center min-h-[60vh] gap-8 px-4 sm:px-0">
        <div className="w-full max-w-md space-y-3 sm:space-y-4">
          <div className={`${baseBlock} h-9 sm:h-10 w-2/3`} />
          <div className={`${baseBlock} h-4 sm:h-5 w-full`} />
          <div className={`${baseBlock} h-4 sm:h-5 w-5/6`} />
        </div>
      </section>
    )
  }

  return (
    <section className="w-full mx-auto max-w-148 px-4 sm:px-0">
      <div className="flex gap-4 mb-5 sm:mb-10">
        <span className={`${baseBlock} min-w-10 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl`} />

        <div className="w-full max-w-2xl space-y-3">
          <div className={`${baseBlock} h-8 sm:h-10 md:h-11 lg:h-12 w-2/3`} />
          <div className={`${baseBlock} h-4 sm:h-5 w-full`} />
          <div className={`${baseBlock} h-4 sm:h-5 w-4/5`} />
        </div>
      </div>

      <div className="flex flex-col gap-1 sm:gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="border-2 sm:border-4 border-white flex items-center justify-between gap-2 sm:gap-5 p-1 sm:p-4 rounded-2xl w-full bg-grey-light/40"
          >
            <div className="flex items-center gap-4 sm:gap-5 w-full">
              <span
                className={`${baseBlock} min-w-9 w-9 h-9 sm:min-w-11 sm:w-11 sm:h-11 rounded-xl`}
              />
              <div className="w-full space-y-2 sm:space-y-3">
                <div className={`${baseBlock} h-5 sm:h-6 w-1/3`} />
                <div className={`${baseBlock} h-4 sm:h-5 w-full`} />
              </div>
            </div>

            <span
              className={`${baseBlock} min-w-9 w-9 h-9 sm:min-w-11 sm:w-11 sm:h-11 rounded-xl`}
            />
          </div>
        ))}
      </div>

      <div className="mt-1 sm:mt-5 border-4 border-white rounded-2xl bg-grey-light/40 flex items-center gap-4 sm:gap-5 p-1 sm:p-4 w-full">
        <span className={`${baseBlock} min-w-9 w-9 h-9 sm:min-w-11 sm:w-11 sm:h-11 rounded-xl`} />
        <div className={`${baseBlock} h-5 sm:h-6 w-40 sm:w-52`} />
      </div>
    </section>
  )
}
