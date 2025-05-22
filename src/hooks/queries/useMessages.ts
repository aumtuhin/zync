import { useMutation, useQuery } from '@tanstack/react-query'
import { sendMessage, getMessages } from '../../api/messages'
import { MessageResponse } from '../../types/index'

interface ApiError extends Error {
  status?: number
}

export const useSendMessage = () => {
  return useMutation({
    mutationFn: async ({ recipientId, content }: { recipientId: string; content: string }) => {
      const response = await sendMessage(recipientId, content)
      return response.data
    }
  })
}

export const useMessages = (conversationId?: string) => {
  return useQuery<MessageResponse, ApiError>({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      const response = await getMessages(conversationId)
      return response.data
    },
    retry: false,
    enabled: !!conversationId
  })
}
