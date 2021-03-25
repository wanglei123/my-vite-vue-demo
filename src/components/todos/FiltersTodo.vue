<template>
<p>
  <span v-for="item in items" :key="item.value" @click="handleClick(item)" :class="{selected: item.value === modelValue}">{{item.label}}</span>
</p>
  
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  props: {
    items: {
      type: Array,
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  methods: {
    handleClick(item){
      this.$emit('update:modelValue', item.value)
    }
  }
}
</script>

<style lang="scss" scoped>
p > span {
  padding:3px;
  margin-right: 4px;;
  border: 1px solid transparent;
}
p > span.selected{
  border-color: royalblue;
}

</style>