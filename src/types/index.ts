export interface Conversation {
  _id: string
  participants: User[]
  messages: unknown[]
  unreadCount?: number | null
  lastMessage?: string
}

export interface User {
  _id: string
  email: string
  phone?: string
  fullName: string
  avatar: string
  isProfileCompleted: boolean
  isVerified: boolean
  username: string
  contacts: Contact[]
  lastActiveConversation?: Conversation
  status?: string
  lastSeen?: Date
}

export interface Contact {
  _id: string
  isFavorite?: boolean
  nickname?: string
  status?: string
  labels: string[]
  recipient: User
}

export interface Message {
  _id: string
  conversation: string
  sender: User
  content: string
  status: 'sent' | 'delivered' | 'read' | 'failed'
  readBy: string[] // Array of user IDs who read the message
  deletedFor: string[] // Array of user IDs the message is deleted for
  createdAt: Date
  updatedAt: Date
  __v: number
  timestamp: string | Date
}

export interface ProfileResponse {
  success: boolean
  data: {
    message: string
    user: User
    contacts: Contact[]
    conversations: Conversation[]
  }
}

export interface ConversationResponse {
  success: boolean
  data: {
    messages?: unknown[]
    conversations: Conversation[]
  }
}

export interface MessageResponse {
  success: boolean
  data: {
    messages: Message[]
    conversation?: Conversation
  }
}

export interface SendMessageResponse {
  message: Message
  conversation?: Conversation
}
