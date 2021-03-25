import {reactive, computed} from 'vue'
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

export function useFilter(todos){
  const filterState = reactive({
    filtersValue: [
      {label: 'ALL', value: 'all'},
      {label: 'Active', value: 'active'},
      {label: 'Completed', value: 'completed'},
    ],
    visibility: 'all',
    filtersTodos: computed(() => {
      return filters[filterState.visibility](todos.value)
    })
  })

  return filterState
}