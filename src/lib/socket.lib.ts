import { io } from 'socket.io-client'
import { tokenStorage } from '../utils/auth.utils'

const SOCKET_URL = 'https://node-auth-o7rd.onrender.com'

console.log('Socket URL:', SOCKET_URL)

const token = tokenStorage.getToken()

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  auth: { token },
  withCredentials: true
})

export default socket
