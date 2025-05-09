import React, { useState } from 'react';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import { Chat, Message, User, Theme } from './types';
import { mockChats, mockUsers, currentUser } from './data/mockData';

function App() {
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>({
    primary: '#25D366',
    secondary: '#128C7E',
    background: '#FFFFFF',
    textPrimary: '#000000',
    textSecondary: '#667781',
    chatBackground: 'https://images.pexels.com/photos/7130498/pexels-photo-7130498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  });

  const handleSendMessage = (content: string) => {
    if (!activeChat) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      sender: currentUser.id,
      timestamp: new Date(),
      status: 'sent',
    };

    const updatedChats = chats.map(chat => {
      if (chat.id === activeChat.id) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: newMessage,
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setActiveChat(updatedChats.find(chat => chat.id === activeChat.id) || null);
  };

  const handleChatSelect = (chatId: string) => {
    const selected = chats.find(chat => chat.id === chatId) || null;
    if (selected && selected.unreadCount) {
      const updatedChats = chats.map(chat => 
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      );
      setChats(updatedChats);
      setActiveChat({ ...selected, unreadCount: 0 });
    } else {
      setActiveChat(selected);
    }
  };

  const handleCreateChat = (userId: string) => {
    const existingChat = chats.find(chat => 
      !chat.isGroup && 
      chat.participants.includes(userId) && 
      chat.participants.includes(currentUser.id)
    );

    if (existingChat) {
      setActiveChat(existingChat);
      return;
    }

    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      participants: [currentUser.id, userId],
      messages: [],
      unreadCount: 0,
    };

    setChats([newChat, ...chats]);
    setActiveChat(newChat);
  };

  const handleDeleteChat = (chatId: string) => {
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    if (activeChat?.id === chatId) {
      setActiveChat(null);
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.style.setProperty('--color-primary', newTheme.primary);
    document.documentElement.style.setProperty('--color-secondary', newTheme.secondary);
    document.documentElement.style.setProperty('--color-background', newTheme.background);
    document.documentElement.style.setProperty('--color-text-primary', newTheme.textPrimary);
    document.documentElement.style.setProperty('--color-text-secondary', newTheme.textSecondary);
    document.documentElement.style.setProperty('--chat-background', `url(${newTheme.chatBackground})`);
  };

  return (
    <div className={`h-screen ${darkMode ? 'dark' : ''}`} style={{ backgroundColor: theme.background }}>
      <Layout 
        sidebar={
          <Sidebar 
            chats={chats} 
            users={mockUsers} 
            currentUser={currentUser} 
            onChatSelect={handleChatSelect}
            activeChat={activeChat}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onCreateChat={handleCreateChat}
            onDeleteChat={handleDeleteChat}
            theme={theme}
            onThemeChange={handleThemeChange}
          />
        }
        content={
          <ChatArea 
            chat={activeChat} 
            users={mockUsers}
            currentUser={currentUser}
            onSendMessage={handleSendMessage}
            onDeleteChat={handleDeleteChat}
            theme={theme}
          />
        }
      />
    </div>
  );
}

export default App;