<template>
  <img alt="Vue logo" height="1000" src="./assets/logo.png" />
  <!-- 传统写法 -->
  <p @click="$store.commit('add')">{{$store.state.counter}}</p>
  <!-- composition 写法 -->
  <p @click="$store.commit('add')">{{state.counter}}</p>
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
import {useStore} from 'vuex'

const hw = ref(null)

const {state} = useStore();

const onmyclick = () => {
  console.log('这是从HelloWorld组件派发的事件');
  hw.value.someMethod()
}



// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>
