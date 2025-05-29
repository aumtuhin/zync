import { useEffect } from 'react'
import socket from '../../lib/socket.lib'
import { Message, SendMessageResponse } from '../../types/index'

export const useMessageSocket = (
  onMessageReceived: (response: SendMessageResponse) => void,
  onMessageStatusUpdated: (message: Message) => void
) => {
  useEffect(() => {
    socket.on('receive_message', onMessageReceived)
    socket.on('message_status_updated', onMessageStatusUpdated)

    return () => {
      socket.off('receive_message', onMessageReceived)
      socket.off('message_status_updated', onMessageStatusUpdated)
    }
  }, [onMessageReceived, onMessageStatusUpdated])
}
