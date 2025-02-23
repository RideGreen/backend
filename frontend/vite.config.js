import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add an alias for slick-carousel
      'slick-carousel': path.resolve(__dirname, 'node_modules/slick-carousel')
    }
  }
})
