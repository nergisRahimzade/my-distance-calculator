import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/emergency': {
        target: 'https://emergencynumberapi.com/api/country',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/emergency/, '')
      }
    }
  }
})
