// @ts-check
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'

const repoBase = process.env.VITE_BASE_PATH ?? '/task-board/'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: repoBase,
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
