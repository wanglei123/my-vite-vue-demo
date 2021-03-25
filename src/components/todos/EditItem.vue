<template>
  <li  :class="{completed: todo.completed, editing: todo === editedTodo}">
        <!-- 绑定完成状态 -->
        <div class="view">
          <input type="checkbox" v-model="todo.completed" />
          <label @dblclick="editTodo(todo)">{{todo.title}}</label>
          <button @click="removeTodo(todo)">X</button>
        </div>
        <!-- 编辑待办 -->
        <EditTodo
        v-model="todo.title"
        v-todo-focus="todo === editedTodo"
        class="edit"
        @blur="doneEdit(todo)"
        @keyup.enter="doneEdit(todo)"
        @keyup.escape="cancelEdit(todo)"
        autofocus />
      </li>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
export default {
  props: {
    todo: {
      type: Object,
      required: true
    },
    editedTodo: Object
  },
  emits: ['remove-todo', 'update:edited-todo'],
  setup (props, {emit}) {
      const state = reactive({
        beforeEditCache: ''
      });
        const editTodo = (todo) => {
          state.beforeEditCache = todo.title;
          emit('update:edited-todo', todo)
      }

      const cancelEdit = (todo) => {
        todo.title = state.beforeEditCache;
        emit('update:edited-todo', null)
      }

      const doneEdit = (todo) => {
        emit('update:edited-todo', null)
      }

      const removeTodo = (todo) => {
        emit('remove-todo', todo)
      }
    

    return {
      ...toRefs(state),
      editTodo,
      cancelEdit,
      doneEdit,
      removeTodo
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

<style lang="scss" scoped>
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

</style>