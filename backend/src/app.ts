import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { boardRouter } from '@/routes/board.routes'
import { taskRouter } from '@/routes/task.routes'
import { PORT, HOST } from '@/server'
import { ANONYMOUS_USER_COOKIE } from '@/constants/session'
import { randomUUID } from 'crypto'
import { z } from 'zod/v4'

const app = express()
const frontendOrigin = process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173'
const uuidSchema = z.string().uuid()

app.use(
  cors({
    origin: frontendOrigin,
    credentials: true,
  }),
)
app.use(express.json())
app.use(cookieParser())

app.use((req: Request, res: Response, next: NextFunction) => {
  const cookieValue = req.cookies?.[ANONYMOUS_USER_COOKIE]
  const isValidCookie = uuidSchema.safeParse(cookieValue).success
  const anonymousUserId = isValidCookie ? cookieValue : randomUUID()

  res.cookie(ANONYMOUS_USER_COOKIE, anonymousUserId, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  })

  req.cookies = {
    ...req.cookies,
    [ANONYMOUS_USER_COOKIE]: anonymousUserId,
  }

  next()
})

app.use('/api/boards', boardRouter)
app.use('/api/tasks', taskRouter)

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Internal server error' })
})

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`)
})

export { app }
