import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),
  ],
  base: '/', // Ensure correct routing
  build: {
    outDir: 'dist', // Ensure correct output directory
    target: 'esnext',
  },
  server: {
    port: 5173
  }

})
