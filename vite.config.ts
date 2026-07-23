import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import Inspector from 'vite-plugin-vue-inspector'
import VueDevtools from 'vite-plugin-vue-devtools'
import UnoCSS from 'unocss/vite'
import unoConfig from './uno.config'

// import viteCompression from 'vite-plugin-compression'

import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // ? Настройки самопроксирования, врубить по надобности на проекте
    server: {
      port: 5173,
    },
    build: {
      rollupOptions: {
        external: ['unocss']
      },
      commonjsOptions: {
        include: [/maplibre-gl/, /node_modules/]
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    plugins: [vue(), UnoCSS(unoConfig)],
    base: '/HotsOverley/',
    optimizeDeps: {
      include: ['maplibre-gl']
    }
  }
})
