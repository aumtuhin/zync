import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Mic, MicOff, PhoneOff, Minus, X } from 'lucide-react'
import { User } from '../types/index'

interface AudioCallWindowProps {
  isOpen: boolean
  onClose: () => void
  caller: User
  receiver: User
}

const AudioCallWindow: React.FC<AudioCallWindowProps> = ({ isOpen, onClose, receiver }) => {
  const [callDuration, setCallDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [position, setPosition] = useState({ x: window.innerWidth - 420, y: 20 })
  const dragRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isOpen) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isOpen])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (dragRef.current) {
      setIsDragging(true)
      dragStart.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      }
    }
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging && dragRef.current) {
        const newX = e.clientX - dragStart.current.x
        const newY = e.clientY - dragStart.current.y

        // Keep window within viewport bounds
        const maxX = window.innerWidth - dragRef.current.offsetWidth
        const maxY = window.innerHeight - dragRef.current.offsetHeight

        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY))
        })
      }
    },
    [isDragging]
  )

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [handleMouseMove, isDragging])

  if (!isOpen) return null

  return (
    <div className="fixed z-50" style={{ left: position.x, top: position.y }}>
      <div
        ref={dragRef}
        className={`bg-gradient-to-br from-indigo-600 to-purple-700 rounded-lg shadow-2xl overflow-hidden transition-all ${
          isMinimized ? 'w-64' : 'w-96'
        }`}
      >
        <div
          className="flex items-center justify-between p-2 bg-black/20 cursor-move"
          onMouseDown={handleMouseDown}
        >
          <span className="text-white font-medium">Audio Call</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/20 rounded"
            >
              <Minus className="text-white" size={16} />
            </button>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded">
              <X className="text-white" size={16} />
            </button>
          </div>
        </div>

        <div className={`transition-all ${isMinimized ? 'h-16' : 'p-6'}`}>
          {isMinimized ? (
            <div className="flex items-center p-2">
              <img
                src={receiver.avatar}
                alt={receiver.fullName}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <p className="text-white text-sm font-medium">{receiver.fullName}</p>
                <p className="text-white/80 text-xs">{formatDuration(callDuration)}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center">
                <img
                  src={receiver.avatar}
                  alt={receiver.fullName}
                  className="w-24 h-24 rounded-full border-4 border-white/20"
                />
                <h2 className="mt-4 text-xl font-bold text-white">{receiver.fullName}</h2>
                <p className="mt-2 text-white/80">{formatDuration(callDuration)}</p>
              </div>

              <div className="mt-8 flex justify-center space-x-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-full ${
                    isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'
                  } transition-colors`}
                >
                  {isMuted ? (
                    <MicOff className="text-white" size={20} />
                  ) : (
                    <Mic className="text-white" size={20} />
                  )}
                </button>

                <button
                  onClick={onClose}
                  className="p-3 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                >
                  <PhoneOff className="text-white" size={20} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AudioCallWindow
