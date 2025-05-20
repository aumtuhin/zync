import { jwtDecode } from 'jwt-decode'

type AuthToken = string | null

// Token storage keys
const AUTH_TOKEN_KEY = 'authToken'

// Utility functions
export const tokenStorage = {
  getToken: (): AuthToken => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(AUTH_TOKEN_KEY)
  },

  setToken: (token: string): void => {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
  },

  clearTokens: (): void => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  }
}

interface JwtPayload {
  exp: number
}

export const isTokenValid = (): boolean => {
  const token = tokenStorage.getToken()
  if (!token) return false
  try {
    const { exp } = jwtDecode<JwtPayload>(token)
    return Date.now() / 1000 < exp // token still valid
  } catch {
    return false
  }
}
