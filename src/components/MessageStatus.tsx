import React from 'react'
import { Check } from 'lucide-react'

interface MessageStatusProps {
  status: 'sent' | 'delivered' | 'read' | 'failed'
  size?: number
}

const MessageStatus: React.FC<MessageStatusProps> = ({ status, size = 16 }) => {
  if (status === 'sent') {
    return <Check size={size} className="text-white dark:text-gray-400" />
  } else if (status === 'delivered') {
    return (
      <div className="relative flex">
        <Check size={size} className="text-gray-300 dark:text-gray-400 absolute" />
        <Check size={size} className="text-gray-300 dark:text-gray-400 ml-[2px] mt-0.3" />
      </div>
    )
  } else {
    return (
      <div className="relative flex">
        <Check size={size} className="text-blue-500 absolute" />
        <Check size={size} className="text-blue-500 ml-[2px]" />
      </div>
    )
  }
}

export default MessageStatus
