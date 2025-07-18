import { useState } from 'react'
import { User } from '../types/index'
import ContactDetailsDialog from './ContactDetailsDialog'

interface ProfileHeaderProps {
  nickname?: string
  user: User
  actions?: React.ReactNode
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, nickname, actions }) => {
  const [isContactDetailsOpen, setIsContactDetailsOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 dark:from-indigo-900/30 dark:to-purple-900/30 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div
            className="relative group cursor-pointer"
            onClick={() => setIsContactDetailsOpen(true)}
          >
            <img
              src={user.avatar}
              alt={nickname || user.fullName}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/50 transition-all duration-300 group-hover:ring-4"
            />
            <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
          </div>
          <div className="ml-3">
            <h2 className="text-sm font-medium text-gray-900 dark:text-white">
              {nickname || user.fullName}
            </h2>
          </div>
        </div>

        {actions}
      </div>

      <ContactDetailsDialog
        isInContacts={false}
        isOpen={isContactDetailsOpen}
        onClose={() => setIsContactDetailsOpen(false)}
        user={user}
        onAddContact={() => console.log('add')}
      />
    </>
  )
}

export default ProfileHeader
