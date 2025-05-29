import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { User } from '../types/index'

type State = {
  user: User
}

type Actions = {
  loadUser: (user: User) => void
  updateUserStatus: (userId: string, status: string) => void
}

const initialState: State = {
  user: {} as User
}

export const useProfileStore = create<State & Actions>()(
  immer((set) => ({
    ...initialState,
    loadUser: (user: User) =>
      set((state) => {
        state.user = user
      }),
    updateUserStatus: (userId: string, status: string) =>
      set((state) => {
        if (state.user._id === userId) {
          state.user.status = status
        }
      })
  }))
)
