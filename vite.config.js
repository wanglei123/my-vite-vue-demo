import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 只能解析vue的单文件组件中的jsx,不能解析扩展名是jsx和tsx的文件
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()]
})
