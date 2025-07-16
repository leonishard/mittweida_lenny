import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // without this, only localhost can access with the website with the back-end
    port: 5173, // the port it was giving me for the front end
  },
  base: './',
  build: {
    outDir: 'docs', // code for pushing to Git
  },
})