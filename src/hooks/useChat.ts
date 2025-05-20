import { useMutation, useQuery } from '@tanstack/react-query'
import { createConversation, getConversations } from '../api/chat'

export const useCreateConversation = () => {
  return useMutation({
    mutationFn: async ({ contactId }: { contactId: string }) => {
      const response = await createConversation(contactId)
      return response
    }
  })
}

export interface User {
  _id: string
  email: string
  fullName: string
  avatar: string
  isProfileCompleted: boolean
  isVerified: boolean
  username: string
  contacts: unknown[]
}

// Type your API response
export interface ProfileResponse {
  success: boolean
  data: {
    message: string
    user: User
  }
}

interface ApiError extends Error {
  status?: number
}

export const useConversations = () => {
  return useQuery<ProfileResponse, ApiError>({
    queryKey: ['user-conversations'],
    queryFn: async () => {
      const response = await getConversations()
      return response.data
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30
  })
}
