import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
  onlineStatus: string
  isShowingStatus: boolean
  lastSeen: boolean
}

type Actions = {
  loadOnlineStatus: (status: string) => void
  hideOrShowStatus: (status: boolean) => void
  changeLastSeen: (status: boolean) => void
}

const initialState: State = {
  onlineStatus: 'offline',
  isShowingStatus: true,
  lastSeen: false
}

export const usePreferencesStore = create<State & Actions>()(
  immer((set) => ({
    ...initialState,
    hideOrShowStatus: (status: boolean) =>
      set((state) => {
        state.isShowingStatus = status
      }),
    changeLastSeen: (status: boolean) =>
      set((state) => {
        state.lastSeen = status
      }),
    loadOnlineStatus: (status: string) =>
      set((state) => {
        state.onlineStatus = status
      })
  }))
)
