import React from 'react';
import { Dialog } from '@headlessui/react';
import { Camera, Bell, Lock, Key, Shield, UserCircle, X } from 'lucide-react';
import { User } from '../types';

interface ProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const ProfileDialog: React.FC<ProfileDialogProps> = ({ isOpen, onClose, user }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative bg-white dark:bg-gray-800 w-full max-w-2xl mx-auto rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-green-400 to-blue-500">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="relative px-6 pb-6">
            <div className="relative -top-16 flex justify-center">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-750"
                />
                <button className="absolute bottom-0 right-0 bg-gray-100 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Camera size={20} className="text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
              <p className="text-gray-500 dark:text-gray-400">Online</p>
            </div>

            <div className="space-y-6">
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Settings</h2>
                <div className="space-y-4">
                  <button className="w-full flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <UserCircle className="text-gray-500 dark:text-gray-400" size={24} />
                    <span className="ml-3 text-gray-700 dark:text-gray-200">Edit Profile</span>
                  </button>
                  <button className="w-full flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <Bell className="text-gray-500 dark:text-gray-400" size={24} />
                    <span className="ml-3 text-gray-700 dark:text-gray-200">Notifications</span>
                  </button>
                  <button className="w-full flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <Lock className="text-gray-500 dark:text-gray-400" size={24} />
                    <span className="ml-3 text-gray-700 dark:text-gray-200">Privacy</span>
                  
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security</h2>
                <div className="space-y-4">
                  <button className="w-full flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <Key className="text-gray-500 dark:text-gray-400" size={24} />
                    <span className="ml-3 text-gray-700 dark:text-gray-200">Change Password</span>
                  </button>
                  <button className="w-full flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <Shield className="text-gray-500 dark:text-gray-400" size={24} />
                    <span className="ml-3 text-gray-700 dark:text-gray-200">Two-Factor Authentication</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProfileDialog;