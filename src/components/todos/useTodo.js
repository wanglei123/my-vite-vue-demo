import {ref, watchEffect} from 'vue'
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

export function useTodos(state){

  const todos = ref(todoStorage.fetch());

  const addTodo = () => {
    todos.value.push({
      id: todos.value.length + 1,
      title: state.newTodo,
      completed: false
    })
    state.newTodo = ''
  }

  const removeTodo = (todo) => {
    todos.value.splice(todos.value.indexOf(todo), 1)
  }
  // todos变化，就触发
  watchEffect(() => {
    todoStorage.save(todos.value) 
  })

  return {
    todos,
    addTodo,
    removeTodo,
  }

};