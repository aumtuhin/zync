import { Contact, User } from '../types/index'

export const getContactNickname = (contact: Contact) => {
  return contact
}

export const getOtherParticipant = (participants: User[], currentUserId: string) => {
  const participant = participants.find((participant) => participant._id !== currentUserId)
  return participant
}

export const getContactById = (contacts: Contact[], contactId?: string) => {
  return contacts.find((contact) => contact._id === contactId)
}
