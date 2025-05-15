import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Mic, MicOff, Camera, CameraOff, PhoneOff } from 'lucide-react';
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

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black/70" />

        <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 w-full max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden">
          <div className="aspect-video relative">
            {/* Main video (receiver) */}
            <div className="absolute inset-0 bg-black">
              {!isVideoOff && (
                <img
                  src={receiver.avatar}
                  alt={receiver.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Small video (caller) */}
            <div className="absolute bottom-4 right-4 w-48 aspect-video bg-black rounded-lg overflow-hidden border-2 border-white/20">
              <img
                src={caller.avatar}
                alt={caller.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Call duration */}
            <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-full">
              <p className="text-white">{formatDuration(callDuration)}</p>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-full ${
                  isMuted 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-white/20 hover:bg-white/30'
                } transition-colors`}
              >
                {isMuted ? (
                  <MicOff className="text-white" size={24} />
                ) : (
                  <Mic className="text-white" size={24} />
                )}
              </button>

              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-4 rounded-full ${
                  isVideoOff 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-white/20 hover:bg-white/30'
                } transition-colors`}
              >
                {isVideoOff ? (
                  <CameraOff className="text-white" size={24} />
                ) : (
                  <Camera className="text-white" size={24} />
                )}
              </button>
              
              <button
                onClick={onClose}
                className="p-4 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
              >
                <PhoneOff className="text-white" size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default VideoCallWindow;