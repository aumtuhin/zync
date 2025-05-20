import { apiClient } from './client'

export const requestEmailOTP = (email: string) => {
  return apiClient.post('/otp/request-email', { email })
}

export const requestSmsOTP = (phone: string) => {
  return apiClient.post('/otp/request-sms', { phone })
}

export const verifyEmailOTP = (email: string, otp: string) => {
  return apiClient.post('/otp/verify-email', { email, otp })
}

export const verifySmsOTP = (phone: string, otp: string) => {
  return apiClient.post('/otp/verify-sms', { phone, otp })
}
