export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastSeen?: Date;
}

export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  attachments?: {
    type: 'image' | 'file' | 'audio';
    url: string;
    name?: string;
  }[];
}

export interface Chat {
  id: string;
  participants: string[];
  messages: Message[];
  unreadCount?: number;
  lastMessage?: Message;
  isGroup?: boolean;
  groupName?: string;
  groupAvatar?: string;
}

export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  textPrimary: string;
  textSecondary: string;
  chatBackground?: string;
}

export const predefinedBackgrounds = [
  'https://images.pexels.com/photos/7130498/pexels-photo-7130498.jpeg',
  'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg',
  'https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg',
  'https://images.pexels.com/photos/4585185/pexels-photo-4585185.jpeg',
  'https://images.pexels.com/photos/7914471/pexels-photo-7914471.jpeg'
];