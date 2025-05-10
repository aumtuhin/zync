import React, { useRef, useEffect, useState } from 'react';
import { Chat, User, Theme } from '../types';
import ProfileHeader from './ProfileHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { Phone, Video, MoreVertical, Trash2 } from 'lucide-react';
import StatusDot from './StatusDot';
import { formatUserLastSeen } from '../utils/dateUtils';
import DeleteChatDialog from './DeleteChatDialog';

interface ChatAreaProps {
  chat: Chat | null;
  users: User[];
  currentUser: User;
  onSendMessage: (content: string) => void;
  onDeleteChat: (chatId: string) => void;
  theme: Theme;
}

const ChatArea: React.FC<ChatAreaProps> = ({ 
  chat, 
  users, 
  currentUser, 
  onSendMessage,
  onDeleteChat,
  theme
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages]);

  if (!chat) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-[#f0f0f0] dark:bg-gray-850">
        <div className="text-center p-8 max-w-md">
          <div className="w-48 h-48 mx-auto mb-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <img 
              src="https://images.pexels.com/photos/4144179/pexels-photo-4144179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="WhatsApp" 
              className="w-32 h-32 object-cover rounded-full opacity-50"
            />
          </div>
          <h2 className="text-2xl font-medium text-gray-800 dark:text-white mb-2">WhatsApp Web</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Select a chat to start messaging or create a new one.
          </p>
        </div>
      </div>
    );
  }

  const otherParticipant = chat.isGroup 
    ? undefined 
    : users.find(user => 
        chat.participants.includes(user.id) && user.id !== currentUser.id
      );

  const chatBackgroundStyle = theme.chatBackground
    ? {
        backgroundImage: `url(${theme.chatBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.2
      }
    : {
        backgroundColor: '#f0f0f0',
        opacity: 0.1
      };

  const handleDeleteChat = () => {
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="h-full flex flex-col bg-[#e5e5e5] dark:bg-gray-850 relative">
      <div 
        className="absolute inset-0 pointer-events-none"
        style={chatBackgroundStyle}
      />
      
      <ProfileHeader 
        user={otherParticipant || { 
          id: chat.id, 
          name: chat.groupName || '', 
          avatar: chat.groupAvatar || '',
          status: 'online'
        }}
        actions={
          <div className="flex items-center space-x-4">
            {otherParticipant && (
              <div className="flex items-center mr-2">
                <StatusDot status={otherParticipant.status} />
                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                  {otherParticipant.status === 'online' 
                    ? 'online' 
                    : otherParticipant.lastSeen 
                      ? formatUserLastSeen(otherParticipant.lastSeen) 
                      : 'offline'}
                </span>
              </div>
            )}
            <button className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full">
              <Video size={20} />
            </button>
            <button className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full">
              <Phone size={20} />
            </button>
            <button 
              onClick={handleDeleteChat}
              className="text-red-500 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full"
            >
              <Trash2 size={20} />
            </button>
            <button className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full">
              <MoreVertical size={20} />
            </button>
          </div>
        }
      />
      
      <div className="flex-1 overflow-y-auto p-4 z-10">
        {chat.messages.map((message, index) => {
          const isCurrentUser = message.sender === currentUser.id;
          const sender = users.find(user => user.id === message.sender);
          
          const prevMessage = index > 0 ? chat.messages[index - 1] : null;
          const isConsecutive = prevMessage && prevMessage.sender === message.sender;
          
          return (
            <MessageBubble 
              key={message.id}
              message={message}
              isCurrentUser={isCurrentUser}
              sender={sender}
              isConsecutive={isConsecutive}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      
      <MessageInput onSendMessage={onSendMessage} />

      <DeleteChatDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => onDeleteChat(chat.id)}
        chatName={otherParticipant?.name || chat.groupName || ''}
      />
    </div>
  );
};

export default ChatArea;