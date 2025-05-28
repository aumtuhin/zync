import { Conversation, User } from '../types/index'
import { formatMessageTime } from '../utils/dateUtils'
import StatusDot from './StatusDot'
import MessageStatus from './MessageStatus'

interface ChatListItemProps {
  conversation: Conversation
  recipient?: User
  nickname?: string
  isActive: boolean
  onClick: () => void
}

const ChatListItem = ({
  recipient,
  conversation,
  nickname,
  isActive,
  onClick
}: ChatListItemProps) => {
  const displayName = nickname || recipient?.fullName || recipient?.email || recipient?.phone
  const avatar = recipient?.avatar
  const lastMessage = conversation.lastMessage
  const timeStamp = new Date()
  const status = recipient?.status?.toString().toLocaleLowerCase()

  return (
    <div
      className={`flex items-center px-4 py-3 cursor-pointer border-b border-gray-100 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-750 transition-colors ${
        isActive ? 'bg-gray-200 dark:bg-gray-750' : ''
      }`}
      onClick={onClick}
    >
      <div className="relative">
        <img src={avatar} alt={nickname} className="w-12 h-12 rounded-full object-cover" />
        {status && <StatusDot status={status} className="absolute bottom-0 right-0" />}
      </div>

      <div className="flex-1 min-w-0 ml-3">
        <div className="flex justify-between items-baseline">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {displayName}
          </h3>
          {lastMessage && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatMessageTime(timeStamp)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
            {lastMessage ? lastMessage : 'No messages yet'}
          </p>
          <div className="flex items-center space-x-1">
            {conversation.unreadCount && (
              <span className="flex items-center justify-center bg-green-500 text-white text-xs rounded-full h-5 w-5 min-w-5">
                {conversation.unreadCount}
              </span>
            )}
            <MessageStatus status="read" size={14} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatListItem
