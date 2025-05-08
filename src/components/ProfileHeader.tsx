import React from 'react';
import { User } from '../types';

interface ProfileHeaderProps {
  user: User;
  actions?: React.ReactNode;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, actions }) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <img 
          src={user.avatar} 
          alt={user.name} 
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3">
          <h2 className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</h2>
        </div>
      </div>
      
      {actions}
    </div>
  );
};

export default ProfileHeader;