<template>
<!-- 直接写$emit事件，来触发值的变化 -->
    <div @click="$emit('update:counter', counter + 1)">
        counter: {{counter}}
    </div>
</template>

<script>
export default {
    props: {
        // 可以自定义名称,$emit事件中和显示上的值也要改为counter,同时父组件也要变化为v-model:counter
        counter: {
            type: Number,
            default: 0
        }
    }

}
</script>

<style lang="scss" scoped>

</style>