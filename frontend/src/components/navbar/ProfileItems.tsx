import NavItem from './NavItem'
import userState, { clearUserState } from '../../state/userState'
import { clearTodoListState } from '../../state/todoListState'
import { clearActiveState } from '../../state/activeState'
import { Show } from 'solid-js'
import { Icon } from '@iconify-icon/solid'

const ProfileItems = () => {
  const [user, _setUser] = userState
  console.log('user:', user)
  console.log('username:', user.username)

  const handleLogout = () => {
    // TODO: FIX
    clearTodoListState()
    clearActiveState()
    clearUserState()
  }

  return (
    <Show when={user.username}>
      <div>
        <NavItem
          label={
            <>
              <Icon
                class="mr-1 align-bottom text-2xl"
                icon="fluent:person-circle-20-regular"
              />
              {user.username}{' '}
            </>
          }
        />
        <NavItem label="Logout" href="/login" onClick={handleLogout} />
      </div>
    </Show>
  )
}

export default ProfileItems
