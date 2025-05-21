import { useMutation, useQuery } from '@tanstack/react-query'
import { completeProfile, getProfile } from '../../api/profile'
import { ProfileResponse } from '../../types/index'

export const useCompleteProfile = () => {
  return useMutation({
    mutationFn: ({ fullName, username }: { fullName: string; username: string }) =>
      completeProfile(fullName, username)
  })
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
