import { makePersisted } from '@solid-primitives/storage'
import { createStore } from 'solid-js/store'
import { type TodoList } from './todoListState'

// Because we don't have a restful api
export type ActiveState = {
  todoList: TodoList | null
}

const initState: ActiveState = {
  todoList: null,
}

const store = makePersisted(createStore<ActiveState>(initState), {
  name: 'activeData',
})

export const clearActiveState = () => {
  const [, setStore] = store
  setStore({ todoList: null })
}

export default store
