import React, { useRef, useEffect, useState } from 'react'
import ProfileHeader from './ProfileHeader'
import MessageBubble from './MessageBubble'
import MessageInput from './MessageInput'
import { Phone, Video, Trash2, Search } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'

// import StatusDot from './StatusDot'
import DeleteChatDialog from './DeleteChatDialog'
import MessageSearchDialog from './MessageSearchDialog'
import DeleteMessageDialog from './DeleteMessageDialog'
import AudioCallWindow from './AudioCallWindow'
import VideoCallWindow from './VideoCallWindow'

import { useMessages } from '../hooks/queries/useMessages'

// import { formatUserLastSeen } from '../utils/dateUtils'
import { getOtherParticipant } from '../utils/conversation.utils'
import { getContactById } from '../utils/user.utils'
import { Conversation } from '../types/index'
import { User, Theme } from '../types'
import { User as ZUser, Message } from '../types/index'

import ringtone from '../assets/ringtone.mp3'

import { mockChats } from '../data/mockData'
import { useContactsStore } from '../store/useContacts'
const mockChat = mockChats[0]

interface ChatAreaProps {
  activeConversation: Conversation
  users: User[]
  currentUser: ZUser
  onSendMessage: (content: string) => void
  newMessage: Message | undefined
  onDeleteChat: (chatId: string) => void
  onDeleteMessage: (messageId: string, deleteForEveryone: boolean) => void
  theme: Theme
}

const ChatArea: React.FC<ChatAreaProps> = ({
  activeConversation,
  users,
  currentUser,
  onSendMessage,
  newMessage,
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
  const [messages, setMessages] = useState<Message[]>([])

  const { contacts } = useContactsStore((state) => state)

  console.log(contacts)

  const { data: messagesResponse, isPending } = useMessages(activeConversation._id)

  useEffect(() => {
    if (messagesResponse?.success) {
      setMessages(messagesResponse.data.messages)
    }
  }, [messagesResponse?.success, messagesResponse?.data.messages])

  useEffect(() => {
    if (newMessage && activeConversation._id === newMessage.conversation) {
      setMessages((prevMessages) => [...prevMessages, newMessage])
    }
  }, [newMessage, activeConversation._id])

  const audioRef = useRef(new Audio(ringtone))

  const playRingtone = () => audioRef.current.play()
  const stopRingtone = () => {
    audioRef.current.pause()
    audioRef.current.currentTime = 0
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'instant' })
  }, [messages])

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

  if (!mockChat) return

  const otherParticipant = getOtherParticipant(activeConversation, currentUser._id)
  const contact = getContactById(contacts, otherParticipant?._id)

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

      {otherParticipant && (
        <ProfileHeader
          user={otherParticipant}
          nickname={contact?.nickname || otherParticipant?.fullName}
          actions={
            <div className="flex items-center space-x-4">
              {otherParticipant.status && (
                <div className="flex items-center mr-2">{otherParticipant.status}</div>
              )}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full"
              >
                <Search size={20} />
              </button>
              <button
                onClick={() => {
                  playRingtone()
                  setIsVideoCallOpen(true)
                }}
                className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full"
              >
                <Video size={20} />
              </button>
              <button
                onClick={() => {
                  playRingtone()
                  setIsAudioCallOpen(true)
                }}
                className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full"
              >
                <Phone size={20} />
              </button>
              <button
                onClick={() => {
                  stopRingtone()
                  setIsDeleteDialogOpen(true)
                }}
                className="text-red-500 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full"
              >
                <Trash2 size={20} />
              </button>
              <button className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full"></button>
            </div>
          }
        />
      )}

      <div className="flex-1 overflow-y-auto p-4 z-10">
        {!isPending &&
          messages &&
          messages.map((message, index) => {
            const isCurrentUser = message.sender._id === currentUser._id
            const sender = otherParticipant

            const prevMessage = index > 0 ? messages[index - 1] : null
            const isConsecutive = prevMessage && prevMessage.sender._id === message.sender._id

            return (
              <div
                key={message._id}
                ref={(el) => {
                  if (el) messageRefs.current[message._id] = el
                }}
                className="transition-colors duration-500"
              >
                <AnimatePresence initial={false}>
                  <MessageBubble
                    message={message}
                    isCurrentUser={isCurrentUser}
                    sender={sender}
                    isConsecutive={isConsecutive}
                    onDelete={() => handleMessageDelete(message)}
                  />
                </AnimatePresence>
              </div>
            )
          })}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSendMessage={onSendMessage} />

      <DeleteChatDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => onDeleteChat(mockChat.id)}
        chatName={otherParticipant?.fullName || mockChat.groupName || ''}
      />

      <MessageSearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        messages={mockChat.messages}
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
            onDeleteMessage(selectedMessage._id, deleteForEveryone)
          }
          setIsDeleteMessageDialogOpen(false)
          setSelectedMessage(null)
        }}
      />

      {otherParticipant && (
        <>
          <AudioCallWindow
            isOpen={isAudioCallOpen}
            onClose={() => {
              stopRingtone()
              setIsAudioCallOpen(false)
            }}
            caller={currentUser}
            receiver={otherParticipant}
          />

          <VideoCallWindow
            isOpen={isVideoCallOpen}
            onClose={() => {
              stopRingtone()
              setIsVideoCallOpen(false)
            }}
            caller={currentUser}
            receiver={otherParticipant}
          />
        </>
      )}
    </div>
  )
}

export default ChatArea
