<template>
    <div>
        <h1>{{msg}}</h1>
        <p>Edit <code>components/HelloWorld1.vue</code> to test hot module</p>
        <p>Hello, vite!!!</p>
        <p>counter: {{counter}}</p>
        <p>doubleCounter: {{doubleCounter}}</p>
        <p ref="desc">123</p>
        <!-- ModalButton -->
    </div>
    <modal-button />
    <!-- 实例方法定义组件,全局的组件，可以直接使用 -->
    <comp></comp>
    <!-- v-model 的使用 -->
    <vmodel-test v-model="counter"></vmodel-test>
    <!-- 自定义的model名称 -->
    <vmodel-test2 v-model:counter="counter"></vmodel-test2>
</template>

<script>
import {computed, onUnmounted, reactive, onMounted, ref, toRefs, watch} from 'vue'
import ModalButton from './ModalButton.vue'
import VmodelTest from './VmodelTest.vue'
import VmodelTest2 from './VmodelTest2.vue'

export default {
    name: 'HelloWorld1',
    props: {
        msg: String,
    },
    components: {
        ModalButton,
        VmodelTest,
        VmodelTest2
    },
    // 1. setup中没有created 和 beforeCreate钩子
    setup () {
        // toRefs 可以把对象的每个key，都变成响应式，这样就可以用对象解构来处理返回的对象
        const {counter, doubleCounter} = useCounter()

        // 创建单值响应式
        const msg2 = ref('some message')

        // 使用元素的引用, 要从setup中返回这个对象，才能和模版中的ref对应上
        const desc = ref(null)
        console.log('desc', desc);

        // 侦听器
        watch(counter, (val, oldVal) => {
            const p = desc.value
            console.log('p', p);
            p.textContent = `counter change from ${oldVal} to ${val}`
        })

        return {counter,doubleCounter, msg2, desc}
    }
}
  function useCounter(){
        const data = reactive({
            counter: 1,
            doubleCounter: computed(() => data.counter * 2)
        })
        let timer

        onMounted(() => {
            timer = setInterval(() => {
                data.counter++
            }, 1000)
        })

        onUnmounted(() => {
            clearInterval(timer)
        })

        return toRefs(data)
    }
</script>

<style lang="scss" scoped>

</style>