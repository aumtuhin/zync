import React, { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Search, X } from 'lucide-react'
import StatusDot from './StatusDot'
import { Contact, User } from '../types/index'

interface NewChatDialogProps {
  isOpen: boolean
  onClose: () => void
  contacts: Contact[]
  onCreateChat: (recipient: User) => void
}

const NewChatDialog: React.FC<NewChatDialogProps> = ({
  isOpen,
  onClose,
  contacts,
  onCreateChat
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [userContacts, setUserContacts] = useState(contacts)

  useEffect(() => {
    setUserContacts(contacts)
  }, [contacts])

  const onSearchContacts = (query: string) => {
    const filteredContacts = contacts.filter((contact) =>
      contact.nickname?.toLowerCase().includes(query.toLowerCase())
    )
    setUserContacts(filteredContacts)
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative bg-white dark:bg-gray-800 w-full max-w-md mx-auto rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
              New Chat
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
                placeholder="Search contacts"
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  onSearchContacts(e.target.value)
                }}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400"
                size={18}
              />
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {userContacts.map((contact) => (
                <button
                  key={contact?._id}
                  onClick={() => {
                    onCreateChat(contact.recipient)
                    onClose()
                  }}
                  className="w-full flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <div className="relative">
                    <img
                      src={contact.recipient.avatar}
                      alt={contact.nickname}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <StatusDot status="offline" className="absolute bottom-0 right-0" />
                  </div>
                  <div className="ml-3 text-left">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {contact.nickname || contact.recipient.fullName}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">offline</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default NewChatDialog
