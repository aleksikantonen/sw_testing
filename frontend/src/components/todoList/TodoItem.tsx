import { IconButton } from '../common/IconButton'
import type { TodoItem as TodoItemType } from '../../state/todoListState'
import EditTodoItemForm, { type TodoItemEditState } from '../forms/EditTodoItemForm'


type TodoItemProps = {
  todoItem: TodoItemType
  index: number
  editState: TodoItemEditState | undefined
  ws: WebSocket | undefined
  toggleComplete: (id: number) => void
  updateEditState: (index: number, newEditState: TodoItemEditState | undefined) => void
  update: (id: number, todoItem: TodoItemType) => void
  delete: (id: number) => void
  clone: (id: number) => void
}

const TodoItem = (props: TodoItemProps) => {
   const { todoItem } = props

  return (
    <div
      class="mt-2 flex max-w-full items-center justify-between border-t-2 border-gray-200 pb-4 pt-4"
      style={{
        'text-decoration': todoItem.completed ? 'line-through' : 'none',
      }}
    >
      {props.editState ? (
        <EditTodoItemForm
          todoItemIndex={props.index}
          todoItem={todoItem}
          editState={props.editState}
          onSuccess={(updatedTodoItem) => {
            props.update(props.index, updatedTodoItem)
          }}
          onInput={(value) => props.updateEditState(props.index, {description: value})}
          onClose={() => props.updateEditState(props.index, undefined)}
        />
      ) : (
        <>
          <span
            class="scroll-ms-4 overflow-x-auto whitespace-pre-wrap text-xl width-full cursor-pointer flex-grow"
            onClick={() => props.toggleComplete(props.index)}
          >
            {todoItem.description}
          </span>
          <div class="flex">
            <IconButton
              icon="fluent:copy-20-regular"
              iconClass="text-sky-700"
              onClick={() => props.clone(props.index)}
            />
            <IconButton
              icon="fluent:edit-20-regular"
              iconClass="text-yellow-600"
              onClick={() => props.updateEditState(props.index, {description: todoItem.description})}
            />
            <IconButton
              icon="fluent:delete-20-regular"
              iconClass="text-orange-800"
              onClick={() => props.delete(props.index)}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default TodoItem
