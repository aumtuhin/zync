import { io } from 'socket.io-client'
import { tokenStorage } from '../utils/auth.utils'

const SOCKET_URL = import.meta.env.SOCKET_URL

console.log('Socket URL:', SOCKET_URL)

const token = tokenStorage.getToken()

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  auth: { token },
  withCredentials: true
})

export default socket
