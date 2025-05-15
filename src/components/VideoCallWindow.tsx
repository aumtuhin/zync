import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { Mic, MicOff, Camera, CameraOff, PhoneOff, Minus, X } from 'lucide-react';
import { User } from '../types';

interface VideoCallWindowProps {
  isOpen: boolean;
  onClose: () => void;
  caller: User;
  receiver: User;
}

const VideoCallWindow: React.FC<VideoCallWindowProps> = ({
  isOpen,
  onClose,
  caller,
  receiver
}) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 720, y: 20 });
  const dragRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (dragRef.current && e.target === dragRef.current) {
      isDragging.current = true;
      dragStart.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.current) {
      const newX = e.clientX - dragStart.current.x;
      const newY = e.clientY - dragStart.current.y;
      
      // Keep window within viewport bounds
      const maxX = window.innerWidth - (dragRef.current?.offsetWidth || 0);
      const maxY = window.innerHeight - (dragRef.current?.offsetHeight || 0);
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed z-50"
      style={{ left: position.x, top: position.y }}
    >
      <div 
        ref={dragRef}
        onMouseDown={handleMouseDown}
        className={`bg-gradient-to-br from-indigo-600 to-purple-700 rounded-lg shadow-2xl overflow-hidden transition-all ${
          isMinimized ? 'w-64' : 'w-[640px]'
        }`}
      >
        <div className="flex items-center justify-between p-2 bg-black/20 cursor-move">
          <span className="text-white font-medium">Video Call</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/20 rounded"
            >
              <Minus className="text-white" size={16} />
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded"
            >
              <X className="text-white" size={16} />
            </button>
          </div>
        </div>

        <div className={`transition-all ${isMinimized ? 'h-16' : ''}`}>
          {isMinimized ? (
            <div className="flex items-center p-2">
              <img
                src={receiver.avatar}
                alt={receiver.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <p className="text-white text-sm font-medium">{receiver.name}</p>
                <p className="text-white/80 text-xs">{formatDuration(callDuration)}</p>
              </div>
            </div>
          ) : (
            <div className="relative">
              {/* Main video (receiver) */}
              <div className="aspect-video bg-black">
                {!isVideoOff && (
                  <img
                    src={receiver.avatar}
                    alt={receiver.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Small video (caller) */}
              <div className="absolute bottom-4 right-4 w-40 aspect-video bg-black rounded-lg overflow-hidden border-2 border-white/20">
                <img
                  src={caller.avatar}
                  alt={caller.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Call duration */}
              <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-full">
                <p className="text-white text-sm">{formatDuration(callDuration)}</p>
              </div>

              {/* Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-full ${
                    isMuted 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-white/20 hover:bg-white/30'
                  } transition-colors`}
                >
                  {isMuted ? (
                    <MicOff className="text-white" size={20} />
                  ) : (
                    <Mic className="text-white" size={20} />
                  )}
                </button>

                <button
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`p-3 rounded-full ${
                    isVideoOff 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-white/20 hover:bg-white/30'
                  } transition-colors`}
                >
                  {isVideoOff ? (
                    <CameraOff className="text-white" size={20} />
                  ) : (
                    <Camera className="text-white" size={20} />
                  )}
                </button>
                
                <button
                  onClick={onClose}
                  className="p-3 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                >
                  <PhoneOff className="text-white" size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCallWindow;