import { useMutation } from '@tanstack/react-query'
import { requestEmailOTP, requestSmsOTP, verifyEmailOTP, verifySmsOTP } from '../api/auth'

export const useRequestEmailOTP = () => {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const response = await requestEmailOTP(email)
      return response.data
    }
  })
}

export const useRequestSmsOTP = () => {
  return useMutation({
    mutationFn: async ({ phone }: { phone: string }) => {
      const response = await requestSmsOTP(phone)
      return response.data
    }
  })
}

export const useVerifyEmailOTP = () => {
  return useMutation({
    mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
      const response = await verifyEmailOTP(email, otp)
      return response.data
    }
  })
}

export const useVerifySmsOTP = () => {
  return useMutation({
    mutationFn: async ({ phone, otp }: { phone: string; otp: string }) => {
      const response = await verifySmsOTP(phone, otp)
      return response.data
    }
  })
}
