import { io } from 'socket.io-client'
import { tokenStorage } from '../utils/auth.utils'

const socketUrl = import.meta.env.VITE_SOCKET_URL

const token = tokenStorage.getToken()

const socket = io(socketUrl, {
  transports: ['websocket'],
  auth: { token },
  withCredentials: true
})

export default socket
