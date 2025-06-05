import React from 'react'
import { Dialog } from '@headlessui/react'
import { X, UserPlus } from 'lucide-react'
import { User } from '../types/index'

interface ContactDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  user: User
  isInContacts: boolean
  onAddContact: (userId: string) => void
}

const ContactDetailsDialog: React.FC<ContactDetailsDialogProps> = ({
  isOpen,
  onClose,
  user,
  isInContacts,
  onAddContact
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative bg-white dark:bg-gray-800 w-full max-w-md mx-auto rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-40 bg-gradient-to-r from-purple-500 to-indigo-500">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative -top-14 px-6 pb-6">
            <div className="relative flex justify-center">
              <img
                src={user.avatar}
                alt={user.fullName}
                className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-750"
              />
            </div>

            <div className="text-center mt-2 mb-6">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{user.fullName}</h1>
              <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Contact Info
              </h2>
              <p className="text-gray-700 dark:text-gray-300 break-words">No bio available.</p>
            </div>

            {!isInContacts && (
              <div className="mt-6">
                <button
                  onClick={() => onAddContact('')}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  <UserPlus size={20} /> Add to Contacts
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default ContactDetailsDialog
