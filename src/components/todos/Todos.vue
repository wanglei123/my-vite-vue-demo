<template>
  <div>
    <!-- 新增todo -->
    <EditTodo
     v-model="newTodo"
     @keyup.enter="addTodo"
     placeholder="新增今日待办"
     autocomplete="off"
     autofocus />
    <!-- todo列表 -->
    <ul>
      <edit-item v-for="todo in filtersTodos" :key=todo.id :todo="todo" v-model:edited-todo="editedTodo" @remove-todo="removeTodo" />
    </ul>
    <!-- 过滤 -->
    <filters-todo :items="filtersValue" v-model="visibility" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import EditItem from './EditItem.vue';
import FiltersTodo from './FiltersTodo.vue';
import {useTodos} from './useTodo'
import {useFilter} from './useFilter'


export default
  {
    components: { EditItem, FiltersTodo },
    setup() {
      const todoState = reactive({
        newTodo: '',
        editedTodo: null,
        
      })
      const {todos, addTodo, removeTodo} = useTodos(todoState)
      const filterState = useFilter(todos)


      return {
        ...toRefs(todoState),
        ...toRefs(filterState),
        todos,
        addTodo,
        removeTodo
      }
    },

}
</script>

