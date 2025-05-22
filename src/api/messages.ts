import { apiClient } from './client'

export const sendMessage = (recipientId: string, content: string) => {
  return apiClient.post('/messages', { recipientId, content })
}

export const getMessages = (conversationId?: string) => {
  return apiClient.get(`/messages/${conversationId}`)
}
