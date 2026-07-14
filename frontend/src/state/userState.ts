import { makePersisted } from '@solid-primitives/storage'
import { createStore } from 'solid-js/store'

export type User = {
  userId: number | null
  username: string | null
  accessToken: string | null
  refreshToken: string | null
}

const initState: User = {
  userId: null,
  username: null,
  accessToken: null,
  refreshToken: null,
}

const store = makePersisted(createStore<User>(initState), { name: 'userData' })

export const clearUserState = () => {
  const [_, setUser] = store
  setUser({
    userId: null,
    username: null,
    accessToken: null,
    refreshToken: null,
  })
}

export default store
