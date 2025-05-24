import React from 'react'

interface StatusDotProps {
  status: string
  className?: string
}

const StatusDot: React.FC<StatusDotProps> = ({ status, className = '' }) => {
  console.log('StatusDot', status)
  return (
    <div className={`${className}`}>
      <div
        className={`w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
          status.toLocaleLowerCase() == 'online' ? 'bg-green-500' : 'bg-gray-400'
        }`}
      />
    </div>
  )
}

export default StatusDot
