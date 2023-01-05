import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For building, add base:
export default defineConfig({
  //base: '/niehs',
  plugins: [react()]
})
