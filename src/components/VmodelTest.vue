<template>
<!-- 直接写$emit事件，来触发值的变化 -->
    <div @click="$emit('update:modelValue', modelValue + 1)">
        counter: {{modelValue}}
    </div>
</template>

<script>
export default {
    props: {
        // 默认传进来的属性名是modelValue
        modelValue: {
            type: Number,
            default: 0
        },
    }

}
</script>

<style lang="scss" scoped>

</style>