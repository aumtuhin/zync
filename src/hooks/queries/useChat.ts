import { useMutation, useQuery } from '@tanstack/react-query'
import { createConversation, getConversations } from '../../api/chat'
import { ConversationResponse } from '../../types/index'

export const useCreateConversation = () => {
  return useMutation({
    mutationFn: async ({ recipientId, content }: { recipientId: string; content: string }) => {
      const response = await createConversation(recipientId, content)
      return response.data
    }
  })
}

interface ApiError extends Error {
  status?: number
}

export const useConversations = () => {
  return useQuery<ConversationResponse, ApiError>({
    queryKey: ['user-conversations'],
    queryFn: async () => {
      const response = await getConversations()
      return response.data
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30
  })
}
