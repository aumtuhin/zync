import React, { useState } from 'react';
import { Smile, Paperclip, Mic, Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  
  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div className="px-4 py-3 bg-gray-100 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700 z-10">
      <div className="flex items-center space-x-2">
        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <Smile size={22} />
        </button>
        
        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <Paperclip size={22} />
        </button>
        
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message"
            className="w-full px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none resize-none min-h-[40px] max-h-[120px]"
            rows={1}
            style={{ overflowY: message.includes('\n') ? 'auto' : 'hidden' }}
          />
        </div>
        
        {message.trim() ? (
          <button 
            onClick={handleSend}
            className="text-white bg-green-500 hover:bg-green-600 p-2 rounded-full"
          >
            <Send size={22} />
          </button>
        ) : (
          <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <Mic size={22} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageInput;