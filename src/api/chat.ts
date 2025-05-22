import { apiClient } from './client'

export const createConversation = (recipientId: string) => {
  return apiClient.post('chat/create', { recipientId })
}

export const getConversations = () => {
  return apiClient.get('chat/conversations')
}
