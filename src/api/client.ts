import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { tokenStorage } from '../utils/auth.utils'

const BASE_URL = 'http://localhost:8000/api/v1'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

// List of endpoints that DON'T require auth
const PUBLIC_ENDPOINTS = [
  '/otp/request-email',
  '/otp/request-sms',
  '/otp/verify-email',
  '/otp/verify-sms',
  '/auth/login',
  '/auth/refresh-token'
]

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Skip auth header for public endpoints
  if (config.url && PUBLIC_ENDPOINTS.some((endpoint) => config.url?.startsWith(endpoint))) {
    return config
  }

  const token = tokenStorage.getToken()
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response Interceptor – handle 401 and attempt refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // If 401 error and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Attempt refresh
        const refreshResponse = await apiClient.post('/auth/refresh-token')

        const newToken = (refreshResponse.data as { token: string }).token

        // Save new access token and retry original request
        tokenStorage.setToken(newToken)
        originalRequest.headers = originalRequest.headers || {}
        originalRequest.headers.Authorization = `Bearer ${newToken}`

        return apiClient(originalRequest)
      } catch (refreshError) {
        if (refreshError instanceof AxiosError) tokenStorage.clearTokens()
      }
    }

    return Promise.reject(error)
  }
)
