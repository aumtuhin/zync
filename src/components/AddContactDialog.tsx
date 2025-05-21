import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { X, User, Mail, Phone } from 'lucide-react'

interface AddContactDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddContact: (fullName: string, email?: string, phone?: string) => void
  contactError: string
  contactSuccess: string
}

const AddContactDialog: React.FC<AddContactDialogProps> = ({
  isOpen,
  onClose,
  onAddContact,
  contactError,
  contactSuccess
}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handleSave = () => {
    onAddContact(name, email, phone)
    setName('')
    setEmail('')
    setPhone('')
  }

  const isFormValid = name.trim() !== '' && (email.trim() !== '' || phone.trim() !== '')

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative bg-white dark:bg-gray-800 w-full max-w-md mx-auto rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
              Add Contact
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  contactError = ''
                  contactSuccess = ''
                }}
              />
              <User
                className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400"
                size={18}
              />
            </div>

            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
              <Mail
                className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400"
                size={18}
              />
            </div>

            <div className="relative">
              <span className="text-gray-400 p-1">Or</span>
            </div>

            <div className="relative">
              <input
                type="tel"
                placeholder="Phone"
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                }}
              />
              <Phone
                className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400"
                size={18}
              />
            </div>
          </div>

          {contactError && (
            <div className="p-4 text-red-600 dark:text-red-400">
              <p>{contactError}</p>
            </div>
          )}
          {contactSuccess && (
            <div className="p-4 text-green-600 dark:text-green-400">
              <p>Contact added successfully!</p>
            </div>
          )}

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSave}
              disabled={!isFormValid}
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] hover:shadow-lg"
            >
              Save Contact
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default AddContactDialog
