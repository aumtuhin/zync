export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: Date;
}

export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  textPrimary: string;
  textSecondary: string;
  chatBackground: string;
}

export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

export interface Chat {
  id: string;
  participants: string[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
  isGroup?: boolean;
  groupName?: string;
  groupAvatar?: string;
}

export const predefinedBackgrounds = [
  'https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg',
  'https://images.pexels.com/photos/7130474/pexels-photo-7130474.jpeg',
  'https://images.pexels.com/photos/7130554/pexels-photo-7130554.jpeg',
  'https://images.pexels.com/photos/7130544/pexels-photo-7130544.jpeg',
  'https://images.pexels.com/photos/7130552/pexels-photo-7130552.jpeg',
  'https://images.pexels.com/photos/7130553/pexels-photo-7130553.jpeg'
];