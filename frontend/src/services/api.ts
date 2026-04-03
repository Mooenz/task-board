import axios from 'axios'

const rawBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'
const normalizedBaseUrl = rawBaseUrl.replace(/\/+$/, '')

const api = axios.create({
  baseURL: `${normalizedBaseUrl}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export { api }