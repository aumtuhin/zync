import React from 'react';

interface StatusDotProps {
  status: 'online' | 'offline';
  className?: string;
}

const StatusDot: React.FC<StatusDotProps> = ({ status, className = '' }) => {
  return (
    <div className={`${className}`}>
      <div 
        className={`w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
          status === 'online' ? 'bg-green-500' : 'bg-gray-400'
        }`}
      />
    </div>
  );
};

export default StatusDot;