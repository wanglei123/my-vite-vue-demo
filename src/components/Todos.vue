<template>
  <div>
    <!-- 新增todo -->
    <input type="text" v-model="newTodo" @keyup.enter="addTodo" placeholder="新增今日待办" autocomplete="off" autofocus />
    <!-- todo列表 -->
    <ul>
      <li v-for="todo in todos" :key=todo.id>
        <label for="">{{todo.title}}</label>
        <button @click="removeTodo(todo)">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
import {reactive, toRefs } from 'vue';
export default {    
    setup() {
      const state = reactive({
        newTodo: '',
        todos: []
      })

      const addTodo = () => {
        state.todos.push({
          id: state.todos.length + 1,
          title: state.newTodo,
          complete: false
        })
        state.newTodo = ''
      }

      const removeTodo = (todo) => {
        state.todos.splice(state.todos.indexOf(todo), 1)
      }

      return {
        ...toRefs(state),
        addTodo,
        removeTodo
      }
    }

}
</script>

