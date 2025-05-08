import React, { useRef, useEffect } from 'react';
import { Chat, User } from '../types';
import ProfileHeader from './ProfileHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { Phone, Video, MoreVertical, Trash2 } from 'lucide-react';
import StatusDot from './StatusDot';
import { formatUserLastSeen } from '../utils/dateUtils';

interface ChatAreaProps {
  chat: Chat | null;
  users: User[];
  currentUser: User;
  onSendMessage: (content: string) => void;
  onDeleteChat: (chatId: string) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({ 
  chat, 
  users, 
  currentUser, 
  onSendMessage,
  onDeleteChat
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
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

  return (
    <div className="h-full flex flex-col bg-[#e5e5e5] dark:bg-gray-850 relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-repeat" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z' /%3E%3C/g%3E%3C/svg%3E")` 
           }}
      ></div>
      
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
              onClick={() => onDeleteChat(chat.id)}
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
    </div>
  );
};

export default ChatArea;