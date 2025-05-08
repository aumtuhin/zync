import React from 'react';
import { Message, User } from '../types';
import { formatMessageTime } from '../utils/dateUtils';
import MessageStatus from './MessageStatus';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  sender?: User;
  isConsecutive: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  isCurrentUser, 
  sender,
  isConsecutive
}) => {
  return (
    <div className={`flex mb-1 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`relative max-w-[65%] px-3 py-2 rounded-lg ${
          isCurrentUser 
            ? 'bg-[#dcf8c6] dark:bg-green-700 text-gray-800 dark:text-white ml-12' 
            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white mr-12'
        } ${isConsecutive ? 'mt-1' : 'mt-4'}`}
      >
        {!isCurrentUser && !isConsecutive && sender && (
          <div className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">
            {sender.name}
          </div>
        )}
        
        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        
        <div className="flex items-center justify-end mt-1 space-x-1">
          <span className="text-[10px] text-gray-500 dark:text-gray-400">
            {formatMessageTime(message.timestamp)}
          </span>
          {isCurrentUser && <MessageStatus status={message.status} size={14} />}
        </div>
        
        {/* Chat bubble tail */}
        {!isConsecutive && (
          <div 
            className={`absolute ${
              isCurrentUser ? '-right-2 top-0' : '-left-2 top-0'
            }`}
          >
            <div 
              className={`w-3 h-3 transform rotate-45 ${
                isCurrentUser 
                  ? 'bg-[#dcf8c6] dark:bg-green-700' 
                  : 'bg-white dark:bg-gray-700'
              }`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;