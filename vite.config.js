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
    setupFiles: './src/setupTests.js',
    exclude: ['node_modules', 'dist'],
        deps: {
      inline: ['@mui/material', '@mui/icons-material'] 
    }
  },
})
