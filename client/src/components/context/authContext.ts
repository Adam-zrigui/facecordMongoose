import {AuthResponse} from '@/components/interfaces'
import {User} from '@/components/interfaces'
import {getItemFromLocalStorage} from '@/components/utils/localS'
import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'

interface AuthContext {
  user: User | null
  isAuthenticated: boolean
  jwt: string | null
  login: (response: AuthResponse) => void
  logout: () => void
}

const useAuthContext = create<AuthContext>()(
  devtools(
    immer((set) => ({
      user: getItemFromLocalStorage('user') ?? null,
      isAuthenticated: getItemFromLocalStorage('jwt') ?? null,
      jwt: getItemFromLocalStorage('isAuthenticated') ?? false,
      login: ({user, jwt}: AuthResponse) =>
        set(
          (state) => {
            state.jwt = jwt
            state.user = user
            state.isAuthenticated = true
          },
          false,
          {type: 'auth/login'}
        ),
      logout: () => {
        set(
          (state) => {
            state.isAuthenticated = false
            state.user = null
            state.jwt = null
          },
          false,
          {type: 'auth/logout'}
        )
      },
    })),
    {name: 'authContext'}
  )
)

export default useAuthContext