<template>
  <img alt="Vue logo" height="1000" src="./assets/logo.png" />
  <!-- <router-view></router-view> -->
  <router-view v-slot="{Component}">
        <keep-alive>
            <component :is="Component" />
        </keep-alive>
    </router-view>
  <!-- <HelloWorld msg="Hello Vue 3 + Vite"  @myclick="onmyclick" ref="hw"/> -->
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
import {ref} from 'vue'

const hw = ref(null)

const onmyclick = () => {
  console.log('这是从HelloWorld组件派发的事件');
  hw.value.someMethod()
}

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>
