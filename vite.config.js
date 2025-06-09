import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/g-u-e-s-s/', // <--- This line is essential for GitHub Pages!
})
