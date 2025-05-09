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