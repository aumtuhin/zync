import React, { useRef, useEffect, useState } from 'react'
import { Chat, User, Theme, Message } from '../types'
import ProfileHeader from './ProfileHeader'
import MessageBubble from './MessageBubble'
import MessageInput from './MessageInput'
import { Phone, Video, MoreVertical, Trash2, Search } from 'lucide-react'
import StatusDot from './StatusDot'
import { formatUserLastSeen } from '../utils/dateUtils'
import DeleteChatDialog from './DeleteChatDialog'
import MessageSearchDialog from './MessageSearchDialog'
import DeleteMessageDialog from './DeleteMessageDialog'
import AudioCallWindow from './AudioCallWindow'
import VideoCallWindow from './VideoCallWindow'
import { Conversation } from '../types/index'
import { useMessages } from '../hooks/queries/useMessages'

interface ChatAreaProps {
  chat: Chat | null
  activeConversation: Conversation
  users: User[]
  currentUser: User
  onSendMessage: (content: string) => void
  onDeleteChat: (chatId: string) => void
  onDeleteMessage: (messageId: string, deleteForEveryone: boolean) => void
  theme: Theme
}

const ChatArea: React.FC<ChatAreaProps> = ({
  chat,
  activeConversation,
  users,
  currentUser,
  onSendMessage,
  onDeleteChat,
  onDeleteMessage,
  theme
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messageRefs = useRef<{ [key: string]: HTMLDivElement }>({})
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isDeleteMessageDialogOpen, setIsDeleteMessageDialogOpen] = useState(false)
  const [isAudioCallOpen, setIsAudioCallOpen] = useState(false)
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false)

  console.log('chat area rendered')

  console.log(activeConversation._id)

  const { data: messagesResponse, isPending } = useMessages(activeConversation._id)

  console.log('messagesResponse', isPending, messagesResponse?.data)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat?.messages])

  const handleMessageDelete = (message: Message) => {
    setSelectedMessage(message)
    setIsDeleteMessageDialogOpen(true)
  }

  const scrollToMessage = (messageId: string) => {
    const messageElement = messageRefs.current[messageId]
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      messageElement.classList.add('bg-yellow-100', 'dark:bg-yellow-900')
      setTimeout(() => {
        messageElement.classList.remove('bg-yellow-100', 'dark:bg-yellow-900')
      }, 2000)
    }
  }

  if (!chat) return

  const otherParticipant = chat.isGroup
    ? undefined
    : users.find((user) => chat.participants.includes(user.id) && user.id !== currentUser.id)

  const chatBackgroundStyle = theme.chatBackground
    ? {
        backgroundImage: `url(${theme.chatBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.2
      }
    : {
        backgroundImage:
          'linear-gradient(to bottom right, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.05), rgba(236, 72, 153, 0.05))',
        opacity: 1
      }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-850 relative">
      <div className="absolute inset-0 pointer-events-none" style={chatBackgroundStyle} />

      <ProfileHeader
        user={
          otherParticipant || {
            id: chat.id,
            name: chat.groupName || '',
            avatar: chat.groupAvatar || '',
            status: 'online'
          }
        }
        actions={
          <div className="flex items-center space-x-4">
            {otherParticipant && (
              <div className="flex items-center mr-2">
                <StatusDot status={otherParticipant.status} />
                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                  {otherParticipant.status === 'online'
                    ? 'online'
                    : otherParticipant.lastSeen
                      ? formatUserLastSeen(otherParticipant.lastSeen)
                      : 'offline'}
                </span>
              </div>
            )}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setIsVideoCallOpen(true)}
              className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full"
            >
              <Video size={20} />
            </button>
            <button
              onClick={() => setIsAudioCallOpen(true)}
              className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full"
            >
              <Phone size={20} />
            </button>
            <button
              onClick={() => setIsDeleteDialogOpen(true)}
              className="text-red-500 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full"
            >
              <Trash2 size={20} />
            </button>
            <button className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full">
              <MoreVertical size={20} />
            </button>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 z-10">
        {chat.messages.map((message, index) => {
          const isCurrentUser = message.sender === currentUser.id
          const sender = users.find((user) => user.id === message.sender)

          const prevMessage = index > 0 ? chat.messages[index - 1] : null
          const isConsecutive = prevMessage && prevMessage.sender === message.sender

          return (
            <div
              key={message.id}
              ref={(el) => {
                if (el) messageRefs.current[message.id] = el
              }}
              className="transition-colors duration-500"
            >
              <MessageBubble
                message={message}
                isCurrentUser={isCurrentUser}
                sender={sender}
                isConsecutive={isConsecutive}
                onDelete={() => handleMessageDelete(message)}
              />
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSendMessage={onSendMessage} />

      <DeleteChatDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => onDeleteChat(chat.id)}
        chatName={otherParticipant?.name || chat.groupName || ''}
      />

      <MessageSearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        messages={chat.messages}
        users={users}
        onScrollToMessage={scrollToMessage}
      />

      <DeleteMessageDialog
        isOpen={isDeleteMessageDialogOpen}
        onClose={() => {
          setIsDeleteMessageDialogOpen(false)
          setSelectedMessage(null)
        }}
        onConfirm={(deleteForEveryone) => {
          if (selectedMessage) {
            onDeleteMessage(selectedMessage.id, deleteForEveryone)
          }
          setIsDeleteMessageDialogOpen(false)
          setSelectedMessage(null)
        }}
      />

      {otherParticipant && (
        <>
          <AudioCallWindow
            isOpen={isAudioCallOpen}
            onClose={() => setIsAudioCallOpen(false)}
            caller={currentUser}
            receiver={otherParticipant}
          />

          <VideoCallWindow
            isOpen={isVideoCallOpen}
            onClose={() => setIsVideoCallOpen(false)}
            caller={currentUser}
            receiver={otherParticipant}
          />
        </>
      )}
    </div>
  )
}

export default ChatArea
