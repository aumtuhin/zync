import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { Contact } from '../types/index'

type State = {
  contacts: Contact[]
}

type Actions = {
  loadContacts: (contacts: Contact[]) => void
  addContact: (contact: Contact) => void
  searchContacts: (query: string) => void
  updateContactStatus: (contactId: string, status: string) => void
}

const initialState: State = {
  contacts: []
}

export const useContactsStore = create<State & Actions>()(
  immer((set) => ({
    ...initialState,
    loadContacts: (contacts: Contact[]) =>
      set((state) => {
        state.contacts = contacts
      }),
    addContact: (contact: Contact) =>
      set((state) => {
        state.contacts.push(contact)
      }),
    searchContacts: (query: string) =>
      set((state) => {
        const filteredContacts = state.contacts.filter((contact) =>
          contact.nickname?.toLowerCase().includes(query.toLowerCase())
        )
        state.contacts = filteredContacts
      }),
    updateContactStatus: (contactId: string, status: string) =>
      set((state) => ({
        contacts: state.contacts.map((contact) => {
          if (contact.recipient._id === contactId) {
            return {
              ...contact,
              recipient: {
                ...contact.recipient,
                status
              }
            }
          }
          return contact
        })
      }))
  }))
)
