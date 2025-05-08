import React from 'react';
import { Chat, User } from '../types';
import { formatMessageTime } from '../utils/dateUtils';
import StatusDot from './StatusDot';
import MessageStatus from './MessageStatus';

interface ChatListItemProps {
  chat: Chat;
  user?: User;
  isActive: boolean;
  onClick: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chat, user, isActive, onClick }) => {
  const displayName = chat.isGroup ? chat.groupName : user?.name;
  const avatar = chat.isGroup ? chat.groupAvatar : user?.avatar;
  const lastMessage = chat.lastMessage;
  
  return (
    <div 
      className={`flex items-center px-4 py-3 cursor-pointer border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors ${
        isActive ? 'bg-gray-100 dark:bg-gray-750' : ''
      }`}
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={avatar} 
          alt={displayName} 
          className="w-12 h-12 rounded-full object-cover"
        />
        {!chat.isGroup && user?.status === 'online' && (
          <StatusDot status="online" className="absolute bottom-0 right-0" />
        )}
      </div>
      
      <div className="flex-1 min-w-0 ml-3">
        <div className="flex justify-between items-baseline">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {displayName}
          </h3>
          {lastMessage && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatMessageTime(lastMessage.timestamp)}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
            {lastMessage?.content || "No messages yet"}
          </p>
          <div className="flex items-center space-x-1">
            {chat.unreadCount ? (
              <span className="flex items-center justify-center bg-green-500 text-white text-xs rounded-full h-5 w-5 min-w-5">
                {chat.unreadCount}
              </span>
            ) : lastMessage?.sender !== 'user-1' ? null : (
              <MessageStatus status={lastMessage?.status || 'sent'} size={14} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;