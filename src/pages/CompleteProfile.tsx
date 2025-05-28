/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRight, AtSign, User } from 'lucide-react'
import { useCompleteProfile, useProfile } from '../hooks/queries/useProfile'
import { Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function CompleteProfile() {
  const { data: response, error: fetchError } = useProfile()
  const { mutate: mutateCompleteProfile } = useCompleteProfile()
  const user = response?.data?.user

  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState<string>('')

  if (fetchError) {
    navigate('/oops', {
      state: {
        fromError: true,
        message: 'Something went wrong while fetching data.'
      }
    })
  }

  if (!user) {
    return
  }

  if (user.isProfileCompleted) {
    return <Navigate to="/chat" replace />
  }

  const validateUsername = (username: string) => {
    return /^[a-zA-Z0-9_]{3,15}$/.test(username)
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!fullName.trim()) {
      setError('Please enter your full name')
      return
    }

    if (!validateUsername(username)) {
      setError(
        'Username must be 3-15 characters long and can only contain letters, numbers, and underscores'
      )
      return
    }

    mutateCompleteProfile(
      { fullName, username },
      {
        onSuccess: (data: any) => {
          setError('')
          if (data.data.success) navigate('/chat')
        },
        onError: (error: any) => {
          console.error('Error completing profile:', error.response.data.message)
          setError(error.response.data.message)
        }
      }
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h4 className="mt-6 text-2xl font-bold text-white">Please complete your profile</h4>
        </div>
        <form
          className="mt-8 space-y-6 bg-white/10 backdrop-blur-lg p-8 rounded-2xl"
          onSubmit={handleProfileSubmit}
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="sr-only">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-white/60" size={20} />
                <input
                  id="fullName"
                  type="text"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-white/20 placeholder-white/60 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent sm:text-sm bg-white/10 backdrop-blur-lg"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <div className="relative">
                <AtSign className="absolute left-3 top-2.5 text-white/60" size={20} />
                <input
                  id="username"
                  type="text"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-white/20 placeholder-white/60 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent sm:text-sm bg-white/10 backdrop-blur-lg"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
          </div>

          {error && <p className="text-red-300 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-purple-600 bg-white hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 transition-all shadow-lg"
          >
            Complete Setup
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  )
}
