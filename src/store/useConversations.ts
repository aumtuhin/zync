import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { Conversation, Message } from '../types/index'

type State = {
  conversations: Conversation[]
  messages: Message[]
}

type Actions = {
  loadConversations: (conversations: Conversation[]) => void
  loadMessages: (messages: Message[]) => void
  addNewMessage: (newMessage: Message) => void
  updateMessageStatus: (newMessage: Message) => void
}

const initialState: State = {
  conversations: [],
  messages: []
}

export const useConversationStore = create<State & Actions>()(
  immer((set) => ({
    ...initialState,
    loadConversations: (conversations: Conversation[]) =>
      set((state) => {
        state.conversations = conversations
      }),
    loadMessages: (messages: Message[]) =>
      set((state) => {
        state.messages = messages
      }),
    addNewMessage: (newMessage: Message) =>
      set((state) => {
        state.messages.push(newMessage)
      }),
    updateMessageStatus: (newMessage: Message) =>
      set((state) => ({
        messages: state.messages.map((msg) => (msg._id === newMessage._id ? newMessage : msg))
      }))
  }))
)
