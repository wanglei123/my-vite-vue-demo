<template>
  <h1>{{ msg }}</h1>
  <p @click="$store.commit('add')" >测试vuex4: {{$store.state.counter}}</p>
  <Comp></Comp>
  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Documentation</a> |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>
  <button @click="state.count++">count is: {{ state.count }}</button>
  <!-- 方法一 -->
  <button @click="emit('myclick')">emit1</button>
  <!-- 方法二 -->
  <el-button @click="onclick">emit2</el-button>
  <el-input></el-input>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup>
// 1. 直接导入组件
import Comp from './Comp.vue'
// 引入defineEmit
import { defineProps, reactive, defineEmit, useContext } from 'vue'

// 2. 属性定义
defineProps({
  msg: String
})

// 4. 获取上下文
const ctx = useContext();
  console.log(ctx);
  ctx.expose({
    someMethod(){
      console.log('这是一个向外暴露的方法');
    }
  })

// 3.定义事件,返回一个用来派发事件的emit
const emit = defineEmit(['myclick'])

const onclick = () => {
  // emit('myclick')
  ctx.emit('myclick')
}

const state = reactive({ count: 0 })

// 请求 mock api
fetch('/api/getUsers').then(res => res.json()).then(data => {
  console.log('data', data);
})
</script>