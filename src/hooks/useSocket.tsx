// useSocket.ts
import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { tokenStorage } from '../utils/auth.utils'

const SOCKET_URL = 'http://localhost:8000'

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    const token = tokenStorage.getToken()

    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      auth: { token },
      withCredentials: true
    })

    socketRef.current = socket

    socket.on('connect', () => console.log('Connected to socket'))
    socket.on('disconnect', () => console.log('Disconnected from socket'))
    socket.on('error', (err) => console.error('Socket error:', err))

    return () => {
      socket.disconnect()
    }
  }, [])

  return socketRef.current
}
