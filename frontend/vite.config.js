import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@auth': path.resolve(__dirname, './src/auth'),
      '@chat': path.resolve(__dirname, './src/chat'),
      '@common': path.resolve(__dirname, './src/common'),
      '@forum': path.resolve(__dirname, './src/forum'),
      '@notice': path.resolve(__dirname, './src/notice'),
    },
  },
})
