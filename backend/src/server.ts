const PORT = process.env.PORT ? Number(process.env.PORT) : 3000
const HOST =
  process.env.HOST ??
  (process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost')

export { PORT, HOST }
