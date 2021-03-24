<template>
  <div>
    <!-- 新增todo -->
    <input type="text" v-model="newTodo" @keyup.enter="addTodo" placeholder="新增今日待办" autocomplete="off" autofocus />
    <!-- todo列表 -->
    <ul>
      <li v-for="todo in filtersTodos" :key=todo.id :class="{completed: todo.completed, editing: todo === editedTodo}">
        <!-- 绑定完成状态 -->
        <div class="view">
          <input type="checkbox" v-model="todo.completed" />
          <label @dblclick="editTodo(todo)">{{todo.title}}</label>
          <button @click="removeTodo(todo)">X</button>
        </div>
        <!-- 编辑待办 -->
        <input type="text" v-todo-focus="todo === editedTodo" class="edit" v-model="todo.title" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.escape="cancelEdit(todo)" />  
      </li>
    </ul>
    <!-- 过滤 -->
    <p>
      <span @click="visibility = 'all'" :class="{selected: visibility === 'all'}">ALL</span>
      <span @click="visibility = 'active'" :class="{selected: visibility === 'active'}">Active</span>
      <span @click="visibility = 'completed'" :class="{selected: visibility === 'completed'}">Complete</span>
    </p>
  </div>
</template>

<script>
import {computed, reactive, toRefs, watch, watchEffect } from 'vue';

// 过滤操作
const filters = {
  all(todos){
    return todos;
  },
  active(todos){
    return todos.filter(item => !item.completed)
  },
  completed(todos){
    return todos.filter(item => item.completed)
  }
}

// 缓存操作
const todoStorage = {
  fetch(){
    const todos = JSON.parse(localStorage.getItem('vue3-todos') || '[]')
    todos.forEach((item,index) => {
      item.id = index + 1
    })
    return todos;
  },
  save(todos){
    localStorage.setItem('vue3-todos',JSON.stringify(todos))
  }

}
export default {    
    setup() {
      const state = reactive({
        newTodo: '',
        todos: todoStorage.fetch(),
        beforeEditCache: '', // 缓存编辑之前的title
        editedTodo: null, // 正在编辑的todo
        visibility: 'all',
        filtersTodos: computed(() => {
          return filters[state.visibility](state.todos)
        })
      })

      const addTodo = () => {
        state.todos.push({
          id: state.todos.length + 1,
          title: state.newTodo,
          completed: false
        })
        state.newTodo = ''
      }

      const editTodo = (todo) => {
        state.beforeEditCache = todo.title;
        state.editedTodo = todo
      }

      const cancelEdit = (todo) => {
        todo.title = state.beforeEditCache;
        state.editedTodo = null
      }

      const doneEdit = (todo) => {
        state.editedTodo = null
      }

      const removeTodo = (todo) => {
        state.todos.splice(state.todos.indexOf(todo), 1)
      }
      // todos变化，就触发
      watchEffect(() => {
        todoStorage.save(state.todos) 
      })

      return {
        ...toRefs(state),
        addTodo,
        removeTodo,
        cancelEdit,
        doneEdit,
        editTodo,
      }
    },
    directives: {
      "todo-focus": (el,binding) => {
        if(binding.value){
          el.focus()
        }
      }
    }

}
</script>
<style scoped>

.completed label{
  text-decoration: line-through;
}
.edit,
.editing .view{
  display: none;
}
.view,
.editing .edit{
  display: block;
}

p > span {
  padding:3px;
  margin-right: 4px;;
  border: 1px solid transparent;
}
p > span.selected{
  border-color: royalblue;
}
</style>

