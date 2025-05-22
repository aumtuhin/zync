// src/lib/socket.ts
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:8000';

let socket: Socket;

export const initSocket = () => {
  socket = io(SOCKET_URL, {
    // auth: { token },
    transports: ['websocket']
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) throw new Error('Socket not initialized');
  return socket;
};