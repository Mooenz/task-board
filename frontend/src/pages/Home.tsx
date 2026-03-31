import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBoardSetup } from '@/hooks/useBoardSetup'
import LoadingSkeleton from '@/components/LoadingSkeleton'

export default function Home() {
  const navigate = useNavigate()
  const { boardId, createError } = useBoardSetup()

  useEffect(() => {
    if (boardId) {
      navigate(`/board/${boardId}`, { replace: true })
    }
  }, [boardId, navigate])

  if (createError) {
    return <section className="w-full mx-auto max-w-137.5">Error creating board</section>
  }

  return <LoadingSkeleton variant="home" />
}
