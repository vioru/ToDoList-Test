import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: ['node_modules', 'dist'],
    maxConcurrency: 1,
    deps: {
      external: ['@mui/icons-material'],
    },
  },
})
