import { useMutation, useQuery } from '@tanstack/react-query'
import { addContact, getContacts } from '../../api/contact'

export const useAddContact = () => {
  return useMutation({
    mutationFn: async ({
      fullName,
      email,
      phone
    }: {
      fullName: string
      email?: string
      phone?: string
    }) => {
      const response = await addContact(fullName, email, phone)
      return response.data
    }
  })
}

export const useContacts = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const response = await getContacts()
      return response.data
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30
  })
}
