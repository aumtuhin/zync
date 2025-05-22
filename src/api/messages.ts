import { apiClient } from './client'

export const sendMessage = (conversationId: string, content: string) => {
  return apiClient.post('/messages', { conversationId, content })
}

export const getMessages = (conversationId?: string) => {
  return apiClient.get(`/messages/${conversationId}`)
}
