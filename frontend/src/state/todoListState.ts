import { createStore } from 'solid-js/store'
import type { UserDto } from '../http-actions/userActions'
import type { TodoListMemberDto } from '../http-actions/todoActions'

export type TodoItem = {
  id: number
  todo_list_id: number
  author_id: number
  description: string
  completed: boolean
  created: string
  updated: string
}

export type TodoList = {
  id: number
  name: string
  author: UserDto
  role: string
  description: string
  members?: TodoListMemberDto[]
  todos?: TodoItem[]
}

const store = createStore<TodoList[]>([])

export const clearTodoListState = () => {
  const [_, setTodoLists] = store
  setTodoLists([])
}

export default store
