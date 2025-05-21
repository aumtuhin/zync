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
}

export interface Contact {
  _id: string
  isFavorite?: boolean
  nickname?: string
  status?: string
  labels: string[]
  recipient: User
}

export interface Conversation {
  _id: string
  participants: User[]
  messages: unknown[]
  unreadCount?: number | null
  lastMessage?: string
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
