import { useMutation, useQuery } from '@tanstack/react-query'
import { completeProfile, getProfile } from '../api/profile'

export const useCompleteProfile = () => {
  return useMutation({
    mutationFn: ({ fullName, username }: { fullName: string; username: string }) =>
      completeProfile(fullName, username)
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

export const useProfile = () => {
  return useQuery<ProfileResponse, ApiError>({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const response = await getProfile()
      return response.data
    },
    retry: (failureCount, error) => {
      if (error?.status === 401 || error?.status === 403) return false // No retry on 401/403
      return failureCount < 3 // Retry others
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30
  })
}
