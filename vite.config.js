import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
  // 如需部署到某域名的子地址，请设置这里。例如：'/refficiencyh5'。此时所有资源的路径都将据此配置重写
  base: command === 'build' ? '/' : '/',
  build: {
    target: 'es2015',
  },
  server: {
    port: 80,
    host: true,
    proxy: {
      '/dev-api': {
        target: 'http://www.xxx.com:8080',
        changeOrigin: true,
        rewrite: p => p.replace(/^\/dev-api/, ''),
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
      dirs: ['./src/composables/**', './src/utils/**', './src/components/**'],
      dts: false,
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
})
