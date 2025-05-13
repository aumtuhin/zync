import React, { useState, useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Moon, Sun, Bell, Lock, UserCircle, Palette, Image, Upload } from 'lucide-react';
import { User, Theme, predefinedBackgrounds } from '../types';
import ProfilePage from './ProfilePage';
import PrivacyPage from './PrivacyPage';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const defaultTheme: Theme = {
  primary: '#25D366',
  secondary: '#128C7E',
  background: '#FFFFFF',
  textPrimary: '#000000',
  textSecondary: '#667781',
  chatBackground: ''
};

type Page = 'settings' | 'theme' | 'profile' | 'privacy';

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  isOpen,
  onClose,
  currentUser,
  darkMode,
  setDarkMode,
  theme = defaultTheme,
  onThemeChange,
}) => {
  const [currentPage, setCurrentPage] = useState<Page>('settings');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleColorChange = (key: keyof Theme, value: string) => {
    onThemeChange({ ...theme, [key]: value });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleColorChange('chatBackground', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetBackground = () => {
    handleColorChange('chatBackground', '');
  };

  if (currentPage === 'profile') {
    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />
          <div className="relative bg-white dark:bg-gray-800 w-full h-full">
            <ProfilePage user={currentUser} onClose={() => setCurrentPage('settings')} />
          </div>
        </div>
      </Dialog>
    );
  }

  if (currentPage === 'privacy') {
    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />
          <div className="relative bg-white dark:bg-gray-800 w-full h-full">
            <PrivacyPage user={currentUser} onClose={() => setCurrentPage('settings')} />
          </div>
        </div>
      </Dialog>
    );
  }

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
              {currentPage === 'theme' ? 'Theme Customization' : 'Settings'}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>

          {currentPage === 'theme' ? (
            <div className="p-4 space-y-4">
              <button
                onClick={() => setCurrentPage('settings')}
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Chat Background
                  </label>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {predefinedBackgrounds.map((bg, index) => (
                        <button
                          key={index}
                          onClick={() => handleColorChange('chatBackground', bg)}
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                            theme.chatBackground === bg ? 'border-blue-500' : 'border-transparent'
                          }`}
                        >
                          <img src={bg} alt={`Background ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <Upload size={20} />
                        Upload Custom Background
                      </button>
                      <button
                        onClick={handleResetBackground}
                        className="w-full py-2 px-4 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                
                        Remove Background
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
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
                <button 
                  onClick={() => setCurrentPage('profile')}
                  className="w-full flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <UserCircle className="text-gray-500 dark:text-gray-400" size={20} />
                  <span className="ml-3 text-gray-800 dark:text-white">Profile</span>
                </button>

                <button className="w-full flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Bell className="text-gray-500 dark:text-gray-400" size={20} />
                  <span className="ml-3 text-gray-800 dark:text-white">Notifications</span>
                </button>

                <button 
                  onClick={() => setCurrentPage('privacy')}
                  className="w-full flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Lock className="text-gray-500 dark:text-gray-400" size={20} />
                  <span className="ml-3 text-gray-800 dark:text-white">Privacy</span>
                </button>

                <button
                  onClick={() => setCurrentPage('theme')}
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