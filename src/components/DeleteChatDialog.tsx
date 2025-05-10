import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  chatName: string;
}

const DeleteChatDialog: React.FC<DeleteChatDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  chatName,
}) => {
  const [countdown, setCountdown] = useState(5);
  const [isDeleting, setIsDeleting] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isDeleting && countdown > 0) {
      const id = setTimeout(() => setCountdown(countdown - 1), 1000);
      setTimeoutId(id);
      return () => clearTimeout(id);
    } else if (isDeleting && countdown === 0) {
      onConfirm();
      onClose();
    }
  }, [countdown, isDeleting, onConfirm, onClose]);

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const handleUndo = () => {
    setIsDeleting(false);
    setCountdown(5);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        if (!isDeleting) onClose();
      }}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative bg-white dark:bg-gray-800 w-full max-w-md mx-auto rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
              <AlertTriangle className="text-red-500 mr-2" size={24} />
              Delete Chat
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Are you sure you want to delete your chat with <strong>{chatName}</strong>? This action cannot be undone.
            </p>

            {isDeleting ? (
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Deleting in {countdown} seconds...
                </p>
                <button
                  onClick={handleUndo}
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Undo
                </button>
              </div>
            ) : (
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteChatDialog;