import { apiClient } from './client'

export const completeProfile = (fullName: string, username: string) => {
  return apiClient.post('user/complete-profile', { fullName, username })
}

export const getProfile = () => {
  return apiClient.get('user/profile')
}
