import { apiClient } from './client'

export const createConversation = (recipientId: string, content: string) => {
  return apiClient.post('chat/create', { recipientId, content })
}

export const getConversations = () => {
  return apiClient.get('chat/conversations')
}
