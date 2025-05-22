import { useMutation, useQuery } from '@tanstack/react-query'
import { sendMessage, getMessages } from '../../api/messages'

export const useSendMessage = () => {
  return useMutation({
    mutationFn: async ({
      conversationId,
      content
    }: {
      conversationId: string
      content: string
    }) => {
      const response = await sendMessage(conversationId, content)
      return response.data
    }
  })
}

export const useMessages = (conversationId?: string) => {
  console.log('useMessages', conversationId)
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      const response = await getMessages(conversationId)
      return response.data
    },
    retry: false,
    enabled: !!conversationId
  })
}
