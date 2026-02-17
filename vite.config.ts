import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vite.dev/config/
// vite.config.ts
export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin()
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    cssCodeSplit: false, // <-- IMPORTANTE: Asegura que todo el CSS sea un solo bloque
    lib: {
      entry: resolve(__dirname, 'src/widget-entry.tsx'),
      name: 'Chat',
      fileName: (format) => `chat.${format}.js`,
      formats: ['umd']
    },
    rollupOptions: {
      external: [], // Asegúrate de que no estás marcando react como externo si quieres que vaya todo en el JS
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})