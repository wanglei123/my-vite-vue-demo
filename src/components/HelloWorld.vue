<template>
  <h1>{{ msg }}</h1>
  <Comp></Comp>
  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Documentation</a> |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button @click="state.count++">count is: {{ state.count }}</button>
  <!-- 方法一 -->
  <button @click="emit('myclick')">emit1</button>
  <!-- 方法二 -->
  <button @click="onclick">emit2</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup>
// 1. 直接导入组件
import Comp from './Comp.vue'
// 引入defineEmit，总报语法错误，先注释掉
import { defineProps, reactive, defineEmit } from 'vue'

// 2. 属性定义
defineProps({
  msg: String
})

// 3.定义事件,返回一个用来派发事件的emit
const emit = defineEmit(['myclick'])

const onclick = () => {
  emit('myclick')
}

const state = reactive({ count: 0 })
</script>

<style scoped>
a {
  color: #42b983;
}
</style>