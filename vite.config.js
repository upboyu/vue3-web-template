import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
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
      ElementPlus(),
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
      postcss: {
        plugins: [
          postcsspxtoviewport8plugin({
            unitToConvert: 'px', // 需要转换的单位，默认为"px"
            viewportWidth: 1920, // 设计稿的视口宽度
            unitPrecision: 5, // 单位转换后保留的精度
            propList: ['*'], // 能转化为vw的属性列表
            viewportUnit: 'vw', // 希望使用的视口单位
            fontViewportUnit: 'vw', // 字体使用的视口单位
            selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, // 媒体查询里的单位是否需要转换单位
            replace: true, //  是否直接更换属性值，而不添加备用属性
          }),
        ],
      },
    },
  }
})
