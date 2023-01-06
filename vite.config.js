import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For building, add base:
export default defineConfig({
  //base: '/NIEHS-ecommerce-react/',
  plugins: [react()]
})
