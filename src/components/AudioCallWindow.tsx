import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Mic, MicOff, PhoneOff } from 'lucide-react';
import { User } from '../types';

interface AudioCallWindowProps {
  isOpen: boolean;
  onClose: () => void;
  caller: User;
  receiver: User;
}

const AudioCallWindow: React.FC<AudioCallWindowProps> = ({
  isOpen,
  onClose,
  caller,
  receiver
}) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

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

        <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 w-full max-w-sm mx-auto rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col items-center">
              <img
                src={receiver.avatar}
                alt={receiver.name}
                className="w-32 h-32 rounded-full border-4 border-white/20 object-cover"
              />
              <h2 className="mt-4 text-2xl font-bold text-white">{receiver.name}</h2>
              <p className="mt-2 text-white/80">{formatDuration(callDuration)}</p>
            </div>

            <div className="mt-12 flex justify-center space-x-6">
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

export default AudioCallWindow;