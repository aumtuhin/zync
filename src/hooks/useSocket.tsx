// Example React hook
import { useEffect, useState } from 'react'
import { initSocket, getSocket } from '../libs/socket.lib'

export const useSocket = () => {
  const [socket, setSocket] = useState<ReturnType<typeof getSocket>>()

  useEffect(() => {
    const newSocket = initSocket()
    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [])

  return socket
}
