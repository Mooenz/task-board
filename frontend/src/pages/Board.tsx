import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Title from '@/section/Title'
import BoardTasks from '@/section/BoardTasks'
import { useGetBoard } from '@/hooks/useGetBoard'
import boardStore from '@/store/board.store'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import MessageError from '@/components/MessageError'

export default function Board() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(5)
  const setBoardId = boardStore((state) => state.setBoardId)
  const { data, isLoading, error, isError } = useGetBoard(id || null)
  const dataBoard = {
    title: data?.name ?? null,
    description: data?.description ?? null,
  }

  const notFoundBoard = !isLoading && !data && (isError || Boolean(id))

  useEffect(() => {
    if (!notFoundBoard) return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [notFoundBoard, navigate])

  useEffect(() => {
    if (countdown === 0 && notFoundBoard) {
      setBoardId(null)
      navigate('/board', { replace: true })
    }
  }, [countdown, notFoundBoard, navigate, setBoardId])

  if (isLoading) {
    return <LoadingSkeleton variant="board" />
  }

  if (notFoundBoard) {
    return <MessageError countdown={countdown} />
  }

  if (error) {
    return <div className="w-full mx-auto max-w-148">Error loading board</div>
  }

  return (
    <section className="w-full mx-auto max-w-148">
      <Title dataBoard={dataBoard} />
      <BoardTasks boardTask={data?.tasks} dataBoard={dataBoard} />
    </section>
  )
}
