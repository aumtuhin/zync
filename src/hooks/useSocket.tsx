// useSocket.ts
import { useEffect } from 'react'
import socket from '../lib/socket.lib'

export const useSocket = () => {
  useEffect(() => {
    const handleConnect = () => console.log('Connected to socket')
    const handleDisconnect = () => console.log('Disconnected from socket')
    const handleReconnect = () => console.log('Reconnected to socket')
    const handleError = (err: Error) => console.error('Socket error:', err)

    socket.on('connect', handleConnect)
    socket.on('reconnect', handleReconnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('error', handleError)

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('reconnect', handleReconnect)
      socket.off('error', handleError)
    }
  }, [])
}
