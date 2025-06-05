import React, { useState } from 'react'
import { Theme } from '../types'
import { Conversation, User } from '../types/index'
import { PlusCircle, Settings, Sun, Moon, UserPlus } from 'lucide-react'
import ChatListItem from './ChatListItem'
import NewChatDialog from './NewChatDialog'
import SettingsDialog from './SettingsDialog'
import AddContactDialog from './AddContactDialog'
import { getOtherParticipant } from '../utils/user.utils'
import { SearchConversation } from './SearchConversation'
import { useProfileStore } from '../store/useProfile'
import { useContactsStore } from '../store/useContacts'

interface SidebarProps {
  activeConversation?: Conversation
  onChatSelect: (chatId: string) => void
  darkMode: boolean
  contactError: string
  contactSuccess: string
  conversations: Conversation[]
  isPendingCreateConv: boolean
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
  onAddContact: (fullName: string, email?: string, phone?: string) => void
  onSearchContacts: (query: string) => void
  onCreateChat: (recipient: User) => void
  onDeleteChat: (chatId: string) => void
  theme: Theme
  onThemeChange: (theme: Theme) => void
}

const Sidebar = ({
  conversations,
  activeConversation,
  isPendingCreateConv,
  onChatSelect,
  darkMode,
  setDarkMode,
  onCreateChat,
  onAddContact,
  theme,
  contactError,
  contactSuccess,
  onThemeChange
}: SidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isNewChatOpen, setIsNewChatOpen] = useState(false)
  const [isAddContactOpen, setIsAddContactOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const { user } = useProfileStore((state) => state)

  const { contacts } = useContactsStore((state) => state)

  const searchConversations = (query: string) => {
    // todo: implement search conversations properly
    setSearchQuery(query)
    const matchingRecipientIds = contacts
      .filter((contact) => contact.nickname?.toLowerCase().includes(query.toLocaleLowerCase()))
      .map((contact) => contact.recipient?._id)
      .filter(Boolean)

    const filteredConv = conversations.filter((conversation) =>
      conversation.participants.some((p) => matchingRecipientIds.includes(p._id))
    )
    return filteredConv
  }

  if (!user) {
    return
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="relative group cursor-pointer">
            <img
              src={user.avatar}
              alt={user.fullName}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/50 transition-all duration-300 group-hover:ring-4"
            />
            <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{user.fullName}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.status ? user.status : 'Away'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>

      {conversations.length > 0 && (
        <SearchConversation
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchConversations={searchConversations}
        />
      )}

      <div className="flex-1 overflow-y-auto">
        {isPendingCreateConv && <div className="loading">Creating...</div>}
        {conversations.map((conversation) => {
          const otherParticipant = getOtherParticipant(conversation.participants, user._id)

          const contact = contacts.find(
            (contact) => contact.recipient._id === otherParticipant?._id
          )

          return (
            <ChatListItem
              isActive={activeConversation?._id === conversation._id}
              key={conversation._id}
              conversation={conversation}
              recipient={contact?.recipient || otherParticipant}
              nickname={contact?.nickname}
              onClick={() => onChatSelect(conversation._id)}
            />
          )
        })}

        {conversations.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400">No conversations found</p>{' '}
          </div>
        )}
      </div>

      <div className="p-4">
        <button
          onClick={() => setIsAddContactOpen(true)}
          className="mb-2 flex items-center justify-center w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] hover:shadow-lg"
        >
          <UserPlus size={20} className="mr-2" />
          <span className="font-medium">Add Contact</span>
        </button>

        <button
          onClick={() => setIsNewChatOpen(true)}
          className="flex items-center justify-center w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] hover:shadow-lg"
        >
          <PlusCircle size={20} className="mr-2" />
          <span className="font-medium">New Chat</span>
        </button>
      </div>

      <NewChatDialog
        isOpen={isNewChatOpen}
        onClose={() => setIsNewChatOpen(false)}
        contacts={contacts}
        onCreateChat={onCreateChat}
      />

      <AddContactDialog
        isOpen={isAddContactOpen}
        onClose={() => setIsAddContactOpen(false)}
        onAddContact={onAddContact}
        contactError={contactError}
        contactSuccess={contactSuccess}
      />

      <SettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentUser={user}
        user={user}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        theme={theme}
        onThemeChange={onThemeChange}
      />
    </div>
  )
}

export default Sidebar
