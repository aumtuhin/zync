import { Chat, Message, User } from '../types';

export const currentUser: User = {
  id: 'user-1',
  name: 'John Doe',
  avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  status: 'online'
};

export const mockUsers: User[] = [
  currentUser,
  {
    id: 'user-2',
    name: 'Alice Smith',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    status: 'online'
  },
  {
    id: 'user-3',
    name: 'Bob Johnson',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    status: 'offline',
    lastSeen: new Date(Date.now() - 3600000) // 1 hour ago
  },
  {
    id: 'user-4',
    name: 'Emma Wilson',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    status: 'online'
  },
  {
    id: 'user-5',
    name: 'Michael Brown',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    status: 'offline',
    lastSeen: new Date(Date.now() - 86400000) // 1 day ago
  },
  {
    id: 'user-6',
    name: 'Tech Team',
    avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    status: 'online'
  }
];

const createMessage = (id: string, content: string, sender: string, timestamp: Date, status: 'sent' | 'delivered' | 'read'): Message => ({
  id,
  content,
  sender,
  timestamp,
  status
});

const now = new Date();
const oneMinuteAgo = new Date(now.getTime() - 60000);
const fiveMinutesAgo = new Date(now.getTime() - 300000);
const tenMinutesAgo = new Date(now.getTime() - 600000);
const oneHourAgo = new Date(now.getTime() - 3600000);
const threeDaysAgo = new Date(now.getTime() - 259200000);

export const mockChats: Chat[] = [
  {
    id: 'chat-1',
    participants: ['user-1', 'user-2'],
    messages: [
      createMessage('msg-1', 'Hey there! How are you?', 'user-2', tenMinutesAgo, 'read'),
      createMessage('msg-2', 'I\'m good, thanks for asking! How about you?', 'user-1', fiveMinutesAgo, 'read'),
      createMessage('msg-3', 'Doing well! Just wanted to check in. We still on for tomorrow?', 'user-2', oneMinuteAgo, 'read'),
    ],
    unreadCount: 0,
  },
  {
    id: 'chat-2',
    participants: ['user-1', 'user-3'],
    messages: [
      createMessage('msg-4', 'Did you see the latest project updates?', 'user-3', oneHourAgo, 'read'),
      createMessage('msg-5', 'Yes, looks great! I\'ll review the code tonight.', 'user-1', fiveMinutesAgo, 'delivered'),
    ],
    unreadCount: 0,
  },
  {
    id: 'chat-3',
    participants: ['user-1', 'user-4'],
    messages: [
      createMessage('msg-6', 'Hey! Are you coming to the meeting?', 'user-4', threeDaysAgo, 'read'),
      createMessage('msg-7', 'Yes, I\'ll be there. What time was it again?', 'user-1', threeDaysAgo, 'read'),
      createMessage('msg-8', '3 PM in the main conference room.', 'user-4', threeDaysAgo, 'read'),
      createMessage('msg-9', 'Got it, thanks!', 'user-1', threeDaysAgo, 'read'),
    ],
    unreadCount: 0,
  },
  {
    id: 'chat-4',
    participants: ['user-1', 'user-5'],
    messages: [
      createMessage('msg-10', 'Can you help me with this bug?', 'user-5', oneHourAgo, 'read'),
      createMessage('msg-11', 'Sure, what\'s the issue?', 'user-1', fiveMinutesAgo, 'delivered'),
    ],
    unreadCount: 0,
  },
  {
    id: 'chat-5',
    isGroup: true,
    groupName: 'Tech Team',
    groupAvatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    participants: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'],
    messages: [
      createMessage('msg-12', 'Team standup at 10 AM tomorrow.', 'user-2', tenMinutesAgo, 'read'),
      createMessage('msg-13', 'I\'ll be there!', 'user-3', fiveMinutesAgo, 'read'),
      createMessage('msg-14', 'See you all tomorrow.', 'user-1', oneMinuteAgo, 'delivered'),
    ],
    unreadCount: 2,
  }
];

// Update lastMessage for each chat
mockChats.forEach(chat => {
  if (chat.messages.length > 0) {
    chat.lastMessage = chat.messages[chat.messages.length - 1];
  }
});