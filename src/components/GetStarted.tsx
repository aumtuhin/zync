/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Phone, Mail, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  useRequestEmailOTP,
  useRequestSmsOTP,
  useVerifyEmailOTP,
  useVerifySmsOTP
} from '../hooks/queries/useOTP'
import { useProfile } from '../hooks/queries/useProfile'
import { isTokenValid, tokenStorage } from '../utils/auth.utils'

const GetStarted: React.FC = () => {
  const { mutate: mutateRequestEmailOtp } = useRequestEmailOTP()
  const { mutate: mutateRequestSmsOtp } = useRequestSmsOTP()
  const { mutate: mutateVerifyEmailOtp, isPending: isVerifyEmailOtpPending } = useVerifyEmailOTP()
  const { mutate: mutateVerifySmsOtp } = useVerifySmsOTP()
  const { data: response } = useProfile()

  const navigate = useNavigate()
  const [method, setMethod] = useState<'email' | 'phone'>('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [step, setStep] = useState<'input' | 'otp'>('input')
  const [error, setError] = useState('')

  const userData = response?.data?.user

  useEffect(() => {
    const token = isTokenValid()
    if (token && !userData?.isProfileCompleted) {
      navigate('/complete-profile')
      return
    }
    if (token && userData?.isProfileCompleted) {
      navigate('/chat')
      return
    }
  }, [response, step])

  const otpRefs = Array(6)
    .fill(0)
    .map(() => React.createRef<HTMLInputElement>())

  // Focus first OTP input when step changes to 'otp'
  useEffect(() => {
    if (step === 'otp') {
      otpRefs[0].current?.focus()
    }
  }, [step])

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validatePhone = (phone: string) => {
    return /^\+?[\d\s-]{10,}$/.test(phone)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (method === 'email' && !validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    if (method === 'email') {
      mutateRequestEmailOtp(
        { email },
        {
          onSuccess: () => {
            setError('')
            setStep('otp')
          },
          onError: () => {
            setError('Something went wrong! Please try again.')
          }
        }
      )
    }

    if (method === 'phone' && !validatePhone(phone)) {
      setError('Please enter a valid phone number')
      return
    }

    if (method === 'phone') {
      mutateRequestSmsOtp(
        { phone },
        {
          onSuccess: () => {
            setError('')
            setStep('otp')
          },
          onError: () => {
            setError('Something went wrong! Please try again.')
          }
        }
      )
    }
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0]

    setOtp((prev) => {
      const newOtp = [...prev]
      newOtp[index] = value
      if (index === 5 && value) {
        const otpValue = newOtp.join('')
        if (method === 'email') {
          mutateVerifyEmailOtp(
            { email, otp: otpValue },
            {
              onSuccess: (response: any) => {
                if (response) {
                  setError('')
                  tokenStorage.setToken(response.data.token as string)
                  if (response.data.user.isProfileCompleted) {
                    navigate('/chat')
                    return
                  } else {
                    navigate('/complete-profile')
                    return
                  }
                } else {
                  setError('Something went wrong. Please try again.')
                }
              },
              onError: (error: any) => {
                setError(error.response.data.message)
              }
            }
          )
        } else if (method === 'phone') {
          mutateVerifySmsOtp(
            { phone, otp: otpValue },
            {
              onSuccess: (response: any) => {
                if (response) {
                  tokenStorage.setToken(response.data.token as string)
                  setError('')
                  if (response.data.user.isProfileCompleted) {
                    navigate('/chat')
                    return
                  } else {
                    navigate('/complete-profile')
                    return
                  }
                } else {
                  setError('Something went wrong. Please try again.')
                }
              }
            }
          )
        }
      }
      return newOtp
    })

    // Move to next input if value is entered
    if (value && index < 5) {
      otpRefs[index + 1].current?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      // If current input is empty OR we're deleting the last character
      if (!otp[index] && index > 0) {
        // Focus previous input
        otpRefs[index - 1].current?.focus()
        // Optional: Clear the previous input value
        setOtp((prev) => {
          const newOtp = [...prev]
          newOtp[index - 1] = ''
          return newOtp
        })
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold text-white">Zync</h2>
          <p className="mt-2 text-sm text-white/80">
            {step === 'input'
              ? 'Enter your email or phone number to get started'
              : step === 'otp'
                ? 'Enter the verification code we sent you'
                : 'Complete your profile'}
          </p>
        </div>

        {step === 'input' ? (
          <form
            className="mt-8 space-y-6 bg-white/10 backdrop-blur-lg p-8 rounded-2xl"
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => setMethod('email')}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                    method === 'email'
                      ? 'bg-white text-purple-600 shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Mail size={20} className="mr-2" />
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('phone')}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                    method === 'phone'
                      ? 'bg-white text-purple-600 shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Phone size={20} className="mr-2" />
                  Phone
                </button>
              </div>

              <div>
                <label htmlFor="contact" className="sr-only">
                  {method === 'email' ? 'Email address' : 'Phone number'}
                </label>
                <input
                  id="contact"
                  name="contact"
                  type={method === 'email' ? 'email' : 'phone'}
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-white/20 placeholder-white/60 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent sm:text-sm bg-white/10 backdrop-blur-lg"
                  placeholder={method === 'email' ? 'Email address' : 'Phone number'}
                  value={method === 'email' ? email : phone}
                  onChange={(e) =>
                    method === 'email' ? setEmail(e.target.value) : setPhone(e.target.value)
                  }
                />
              </div>
            </div>

            {error && <p className="text-red-300 text-sm text-center">{error}</p>}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-purple-600 bg-white hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 transition-all shadow-lg"
              >
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </form>
        ) : (
          step === 'otp' && (
            <div className="mt-8 space-y-6 bg-white/10 backdrop-blur-lg p-8 rounded-2xl">
              <div className="flex justify-center space-x-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={otpRefs[index]}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 text-center text-xl border-2 rounded-lg focus:border-white/50 focus:outline-none bg-white/10 text-white backdrop-blur-lg"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  />
                ))}
              </div>

              {error && <p className="text-red-300 text-sm text-center">{error}</p>}
              {isVerifyEmailOtpPending && (
                <p className="text-white/80 text-sm text-center">Verifying...</p>
              )}

              <div className="flex justify-between items-center text-sm">
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="text-white/80 hover:text-white"
                >
                  Change {method}
                </button>
                <button type="button" className="text-white/80 hover:text-white">
                  Resend code
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default GetStarted
