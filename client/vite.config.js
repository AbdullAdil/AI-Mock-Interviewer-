import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Vite configuration.
// - The `@` alias lets us write `import Foo from '@/components/Foo'` instead of relative paths.
// - The dev-server proxy forwards /api/* to the local Express backend so the
//   frontend can call relative URLs in dev without CORS headaches.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
