import { useEffect } from 'react'
import socket from '../../lib/socket.lib'
import { SendMessageResponse, Message } from '../../types/index'
import { useConversationStore } from '../../store/useConversations'

export const useMessageSocket = (onMessageReceived: (response: SendMessageResponse) => void) => {
  const { updateMessageStatus } = useConversationStore((state) => state)

  useEffect(() => {
    socket.on('receive_message', onMessageReceived)
    socket.on('message_status_updated', (response: Message) => {
      console.log('Message status updated:', response)
      if (!response || !response._id) return
      updateMessageStatus(response)
    })

    return () => {
      socket.off('receive_message', onMessageReceived)
      socket.off('message_status_updated')
    }
  }, [onMessageReceived, updateMessageStatus])
}
