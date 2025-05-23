import React, { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { Search, X, ArrowDown } from 'lucide-react'
import { Message, User } from '../types'
import { formatMessageTime } from '../utils/dateUtils'

interface MessageSearchDialogProps {
  isOpen: boolean
  onClose: () => void
  messages: Message[]
  users: User[]
  onScrollToMessage: (messageId: string) => void
}

const MessageSearchDialog: React.FC<MessageSearchDialogProps> = ({
  isOpen,
  onClose,
  messages,
  users,
  onScrollToMessage
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([])

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = messages.filter((message) =>
        message.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredMessages(filtered)
    } else {
      setFilteredMessages([])
    }
  }, [searchQuery, messages])

  const highlightText = (text: string) => {
    if (!searchQuery.trim()) return text

    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'))
    return parts.map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={index} className="bg-yellow-200 dark:bg-yellow-600">
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative bg-white dark:bg-gray-800 w-full max-w-md mx-auto rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
              Search Messages
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search in conversation"
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400"
                size={18}
              />
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredMessages.map((message) => {
                const sender = users.find((user) => user.id === message.sender)
                return (
                  <button
                    key={message.id}
                    onClick={() => {
                      onScrollToMessage(message.id)
                      onClose()
                    }}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors group"
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {sender?.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatMessageTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {highlightText(message.content)}
                    </p>
                    <ArrowDown
                      className="hidden group-hover:block absolute right-2 bottom-2 text-gray-400"
                      size={16}
                    />
                  </button>
                )
              })}
              {searchQuery && filteredMessages.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400">No messages found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default MessageSearchDialog
