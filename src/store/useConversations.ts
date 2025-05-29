import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { Conversation } from '../types/index'

type State = {
  conversations: Conversation[]
}

type Actions = {
  loadConversations: (conversations: Conversation[]) => void
}

const initialState: State = {
  conversations: []
}

export const useConversationStore = create<State & Actions>()(
  immer((set) => ({
    ...initialState,
    loadConversations: (conversations: Conversation[]) =>
      set((state) => {
        state.conversations = conversations
      })
  }))
)
