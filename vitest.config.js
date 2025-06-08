import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
    globals: true,
    exclude: ['node_modules', 'dist'],

    pool: 'forks', 
    poolOptions: {
      forks: {
        minForks: 1,
        maxForks: 2 
      }
    },

    maxConcurrency: 1,
    fileParallelism: false,

    deps: {
      optimizer: {
        web: {
          include: [
            '@mui/material',
            '@mui/icons-material', 
            '@emotion/react', 
            '@emotion/styled'
          ]
        }
      }
    }
  }
});