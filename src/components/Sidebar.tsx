import React, { useState } from 'react';
import { Chat, User, Theme } from '../types';
import { Search, PlusCircle, Settings, Sun, Moon } from 'lucide-react';
import ChatListItem from './ChatListItem';
import ProfileHeader from './ProfileHeader';
import NewChatDialog from './NewChatDialog';
import SettingsDialog from './SettingsDialog';

interface SidebarProps {
  chats: Chat[];
  users: User[];
  currentUser: User;
  activeChat: Chat | null;
  onChatSelect: (chatId: string) => void;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  onCreateChat: (userId: string) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  chats, 
  users, 
  currentUser, 
  activeChat, 
  onChatSelect,
  darkMode,
  setDarkMode,
  onCreateChat,
  theme,
  onThemeChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const filteredChats = searchQuery 
    ? chats.filter(chat => {
        const otherParticipant = chat.isGroup 
          ? chat.groupName 
          : users.find(user => 
              chat.participants.includes(user.id) && user.id !== currentUser.id
            )?.name;
        return otherParticipant?.toLowerCase().includes(searchQuery.toLowerCase());
      })
    : chats;

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      <ProfileHeader 
        user={currentUser} 
        actions={
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full"
            >
              <Settings size={20} />
            </button>
          </div>
        }
      />
      
      <div className="px-4 py-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg pl-10 pr-4 py-2 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400" size={18} />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map(chat => {
          const otherParticipant = chat.isGroup 
            ? undefined 
            : users.find(user => 
                chat.participants.includes(user.id) && user.id !== currentUser.id
              );
          
          return (
            <ChatListItem 
              key={chat.id}
              chat={chat}
              user={otherParticipant}
              isActive={activeChat?.id === chat.id}
              onClick={() => onChatSelect(chat.id)}
            />
          );
        })}
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button 
          onClick={() => setIsNewChatOpen(true)}
          className="flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors"
        >
          <PlusCircle size={18} className="mr-2" />
          <span>New Chat</span>
        </button>
      </div>

      <NewChatDialog
        isOpen={isNewChatOpen}
        onClose={() => setIsNewChatOpen(false)}
        users={users}
        currentUser={currentUser}
        onCreateChat={onCreateChat}
      />

      <SettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentUser={currentUser}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        theme={theme}
        onThemeChange={onThemeChange}
      />
    </div>
  );
};

export default Sidebar;