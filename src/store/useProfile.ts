import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { User } from '../types/index'

type State = {
  user: User
}

type Actions = {
  loadUser: (user: User) => void
  updateStatus: (userId: string, status: string) => void
}

const initialState: State = {
  user: {
    _id: '',
    email: '',
    phone: '',
    fullName: '',
    avatar: '',
    contacts: [],
    isProfileCompleted: false,
    isVerified: true,
    username: '',
    lastActiveConversation: {
      _id: '',
      participants: [],
      messages: [],
      unreadCount: 0,
      lastMessage: ''
    },
    status: '',
    lastSeen: new Date()
  }
}

export const useProfileStore = create<State & Actions>()(
  immer((set) => ({
    ...initialState,
    loadUser: (user: User) =>
      set((state) => {
        state.user = user
      }),
    updateStatus: (userId: string, status: string) =>
      set((state) => {
        if (state.user._id === userId) {
          state.user.status = status
        }
      })
  }))
)
