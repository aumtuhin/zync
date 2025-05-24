import { useEffect } from 'react'
import socket from '../../lib/socket.lib'

export const useStatusUpdate = (
  onStatusUpdate: ({
    userId,
    recipientId,
    status
  }: {
    userId: string
    recipientId: string
    status: string
  }) => void
) => {
  useEffect(() => {
    socket.on('user_status_update', onStatusUpdate)
    return () => {
      socket.off('user_status_update', onStatusUpdate)
    }
  }, [onStatusUpdate])
}
