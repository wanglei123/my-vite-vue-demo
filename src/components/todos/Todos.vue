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
    <button @click="backToDashborad">dashborad</button>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from 'vue';
import EditItem from './EditItem.vue';
import FiltersTodo from './FiltersTodo.vue';
import {useTodos} from './useTodo'
import {useFilter} from './useFilter'
import {onBeforeRouteLeave, useRoute, useRouter} from 'vue-router'


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
      // vue-router新特性： 获取vue-router实例
      const router = useRouter()
      const backToDashborad = () => {
        router.push('/');
      }

      // vue-router新特性：因为是响应式的，可监控其变化
      const route = useRoute();
      console.log('useRoute', route.query);

      watch(() => route.query, (query) => {
        console.log(123, query)
      })

      // 守卫
      onBeforeRouteLeave((to, from) => {
        const answer = window.confirm('您确定离开该页面吗');
        if (!answer){
          return false;
        }

      })


      return {
        ...toRefs(todoState),
        ...toRefs(filterState),
        todos,
        addTodo,
        removeTodo,
        backToDashborad
      }
    },

}
</script>

