import { Conversation } from '../types/index'

export const getConversationById = (conversations: Conversation[], conversationId: string) => {
  return conversations.find((conversation) => conversation._id === conversationId)
}

export const getOtherParticipant = (conversation: Conversation, currentUserId: string) => {
  return conversation.participants.find((participant) => participant._id !== currentUserId)
}

export const isConversationExisting = (conversations: Conversation[], conversationId: string) => {
  return conversations.some((conversation) => conversation._id === conversationId)
}
