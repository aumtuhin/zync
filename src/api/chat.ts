import { apiClient } from './client'

export const createConversation = (contactId: string) => {
  return apiClient.post('chat/create', { contactId })
}

export const getConversations = () => {
  return apiClient.get('chat/conversations')
}
