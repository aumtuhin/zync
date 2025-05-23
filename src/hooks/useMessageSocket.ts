import { useEffect } from 'react'
import socket from '../lib/socket.lib'
import { Message } from '../types/index'

export const useMessageSocket = (onMessageReceived: (msg: Message) => void) => {
  useEffect(() => {
    socket.on('receive_message', onMessageReceived)

    return () => {
      socket.off('receive_message', onMessageReceived)
    }
  }, [onMessageReceived])
}
