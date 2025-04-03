import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],resolve: {
    alias: {
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@interfaces': '/src/interfaces',
        '@pages': '/src/pages',
        '@assets': '/src/assets',
      '@logos': '/src/assets/logos',
        '@icons': '/src/assets/icons',
      '@fonts': '/src/assets/fonts',
      '@utils': '/src/utils', // Puedes agregar más alias si necesitas
    },
    },
})
