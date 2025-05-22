import React from 'react'
import { Dialog } from '@headlessui/react'
import { Eye, Users, Clock, Shield, X } from 'lucide-react'
import { User } from '../types/index'

interface PrivacyDialogProps {
  isOpen: boolean
  onClose: () => void
  user: User
}

const PrivacyDialog: React.FC<PrivacyDialogProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative bg-white dark:bg-gray-800 w-full max-w-2xl mx-auto rounded-lg shadow-lg overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
              Privacy Settings
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Last Seen and Online
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="text-gray-500 dark:text-gray-400" size={24} />
                      <span className="ml-3 text-gray-700 dark:text-gray-200">Show last seen</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Eye className="text-gray-500 dark:text-gray-400" size={24} />
                      <span className="ml-3 text-gray-700 dark:text-gray-200">
                        Show online status
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Profile Photo
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="text-gray-500 dark:text-gray-400" size={24} />
                      <span className="ml-3 text-gray-700 dark:text-gray-200">
                        Who can see my profile photo
                      </span>
                    </div>
                    <select className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg px-3 py-1">
                      <option>Everyone</option>
                      <option>Contacts</option>
                      <option>Nobody</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Read Receipts
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="text-gray-500 dark:text-gray-400" size={24} />
                      <span className="ml-3 text-gray-700 dark:text-gray-200">
                        Send read receipts
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Blocked Contacts
                </h2>
                <button className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                  Manage blocked contacts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default PrivacyDialog
