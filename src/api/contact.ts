import { apiClient } from './client'

export const addContact = (fullName: string, email?: string, phone?: string) => {
  return apiClient.post('user/contacts/add-contact', { fullName, email, phone })
}

export const getContacts = () => {
  return apiClient.get('user/contacts')
}
