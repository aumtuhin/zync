import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Moon, Sun, Bell, Lock, UserCircle, Palette } from 'lucide-react';
import { User, Theme } from '../types';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  isOpen,
  onClose,
  currentUser,
  darkMode,
  setDarkMode,
  theme,
  onThemeChange,
}) => {
  const [showThemeCustomization, setShowThemeCustomization] = useState(false);

  const handleColorChange = (key: keyof Theme, value: string) => {
    onThemeChange({ ...theme, [key]: value });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative bg-white dark:bg-gray-800 w-full max-w-md mx-auto rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
              {showThemeCustomization ? 'Theme Customization' : 'Settings'}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>

          {showThemeCustomization ? (
            <div className="p-4 space-y-4">
              <button
                onClick={() => setShowThemeCustomization(false)}
                className="text-blue-500 mb-4"
              >
                ← Back to Settings
              </button>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Primary Color
                  </label>
                  <input
                    type="color"
                    value={theme.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Secondary Color
                  </label>
                  <input
                    type="color"
                    value={theme.secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Background Color
                  </label>
                  <input
                    type="color"
                    value={theme.background}
                    onChange={(e) => handleColorChange('background', e.target.value)}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Primary Text Color
                  </label>
                  <input
                    type="color"
                    value={theme.textPrimary}
                    onChange={(e) => handleColorChange('textPrimary', e.target.value)}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Secondary Text Color
                  </label>
                  <input
                    type="color"
                    value={theme.textSecondary}
                    onChange={(e) => handleColorChange('textSecondary', e.target.value)}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-750 rounded-lg">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {currentUser.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Online
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <button className="w-full flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <UserCircle className="text-gray-500 dark:text-gray-400" size={20} />
                  <span className="ml-3 text-gray-800 dark:text-white">Profile</span>
                </button>

                <button className="w-full flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Bell className="text-gray-500 dark:text-gray-400" size={20} />
                  <span className="ml-3 text-gray-800 dark:text-white">Notifications</span>
                </button>

                <button className="w-full flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Lock className="text-gray-500 dark:text-gray-400" size={20} />
                  <span className="ml-3 text-gray-800 dark:text-white">Privacy</span>
                </button>

                <button
                  onClick={() => setShowThemeCustomization(true)}
                  className="w-full flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Palette className="text-gray-500 dark:text-gray-400" size={20} />
                  <span className="ml-3 text-gray-800 dark:text-white">Theme</span>
                </button>

                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    {darkMode ? (
                      <Moon className="text-gray-500 dark:text-gray-400" size={20} />
                    ) : (
                      <Sun className="text-gray-500 dark:text-gray-400" size={20} />
                    )}
                    <span className="ml-3 text-gray-800 dark:text-white">
                      {darkMode ? 'Dark Mode' : 'Light Mode'}
                    </span>
                  </div>
                  <div className="relative">
                    <div className={`w-10 h-6 rounded-full ${darkMode ? 'bg-green-500' : 'bg-gray-300'}`}>
                      <div
                        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transform transition-transform ${
                          darkMode ? 'translate-x-4' : ''
                        }`}
                      />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default SettingsDialog;