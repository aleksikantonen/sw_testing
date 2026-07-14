import NavItem from './NavItem'
import activeState from '../../state/activeState'
import userState from '../../state/userState'
import { Icon } from '@iconify-icon/solid'
import ShareTodoListForm from '../forms/ShareTodoListForm'
import { Show } from 'solid-js'
import dialogUtil from '../../util/dialogUtil'

const TodoListItems = () => {
  const [user, _setUser] = userState
  const [active, setActive] = activeState // not needed in restful version (TODO remove when/if done)

  const loggedInIcon = (
    <Icon class="mr-1 align-bottom text-2xl" icon="fluent:home-20-filled" />
  )

  const loggedOutIcon = (
    <Icon
      class="mr-1 align-bottom text-2xl"
      icon="fluent:person-accounts-20-filled"
    />
  )

  const shareModalId = 'share-modal'

  return (
    <div>
      <Show
        when={user.username}
        fallback={
          <NavItem
            label={
              <>
                {loggedOutIcon}
                Login or sign up to get started
              </>
            }
          />
        }
      >
        <NavItem
          label={
            <>
              {loggedInIcon}
              My todo lists
            </>
          }
          href="/"
        />
      </Show>
      <Show when={active.todoList}>
        <>
          <NavItem
            label={
              <>
                <Icon
                  class="align-bottom text-2xl"
                  icon="fluent:task-list-20-regular"
                />
                <Icon
                  class="-ml-1 mr-1 align-bottom"
                  icon="fluent:edit-20-regular"
                />
                {active.todoList?.name ?? 'Could not fetch todo list info'}
              </>
            }
          />
          <NavItem
            label={
              <>
                <Icon
                  class="align-bottom text-2xl"
                  // icon="fluent:task-list-20-regular"
                  icon="fluent:share-20-regular"
                />
                <Icon
                  class="-ml-1 mr-1 align-bottom"
                  // icon="fluent:task-list-20-regular"
                  icon="fluent:person-12-regular"
                />
                Share
              </>
            }
            onClick={() => dialogUtil.open(shareModalId)}
          />
          <ShareTodoListForm
            todoList={active.todoList!}
            dialogId={shareModalId}
            onClose={() => dialogUtil.close(shareModalId)}
            onSuccess={(newMembers) => {
              setActive('todoList', {
                ...active.todoList!,
                members: newMembers,
              })
            }}
          />
        </>
      </Show>
    </div>
  )
}

export default TodoListItems
