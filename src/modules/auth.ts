import { reactive, toRefs } from 'vue'
import { config } from '@/config'
import { User, AuthState, LoginPayload } from '@/interfaces'

const authKey = <string>config.authKey

const state = reactive<AuthState>({
  // TODO: usually we would verify the user on every request via a cookie holding the user data that's encrypted by secret on the server
  user: JSON.parse(window.localStorage.getItem(authKey) || 'null'),
})

export const useAuth = () => {
  const login = async (payload: LoginPayload): Promise<User | undefined> => {
    // TODO: this should be removed as soon as a real API can be used
    if (import.meta.env.DEV) {
      state.user = {
        id: '1',
        name: 'Max Mustermann',
        authenticated: true,
      } as User
      window.localStorage.setItem(authKey, JSON.stringify(state.user))

      return state.user
    }

    const response = await fetch('v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      const result = await response.json()

      state.user = {
        ...result,
        authenticated: true,
      } as User
      window.localStorage.setItem(authKey, JSON.stringify(state.user))
    }

    return state.user
  }

  const logout = async (): Promise<void> => {
    const response = await fetch('v1/logout')

    if (response.ok) {
      console.info('Successfully logged out')
    } else {
      console.error('Logout failed')
    }
    window.localStorage.removeItem(authKey)
    state.user = undefined
  }

  return { login, logout, ...toRefs(state) }
}
