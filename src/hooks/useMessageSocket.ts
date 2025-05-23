import { useEffect } from 'react'
import socket from '../lib/socket.lib'
import { SendMessageResponse } from '../types/index'

export const useMessageSocket = (onMessageReceived: (response: SendMessageResponse) => void) => {
  useEffect(() => {
    socket.on('receive_message', onMessageReceived)

    return () => {
      socket.off('receive_message', onMessageReceived)
    }
  }, [onMessageReceived])
}
