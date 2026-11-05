import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS === 'true' ? '/market-dynamics-sandbox/' : '/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@apps': path.resolve(__dirname, 'src/apps'),
      '@app-comps': path.resolve(__dirname, 'src/app-components'),
      '@ac-ld': path.resolve(__dirname, 'src/app-components/<none>-ld'),
      '@ac-md': path.resolve(__dirname, 'src/app-components/main-content-md'),
      '@comps': path.resolve(__dirname, 'src/components'),
    },
  },
})
