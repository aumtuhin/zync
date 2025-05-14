import React, { useState } from 'react';
import { Phone, Mail, ArrowRight, User, AtSign } from 'lucide-react';

interface GetStartedProps {
  onComplete: () => void;
}

const GetStarted: React.FC<GetStartedProps> = ({ onComplete }) => {
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [value, setValue] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState<'input' | 'otp' | 'profile'>('input');
  const [error, setError] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  
  const otpRefs = Array(6).fill(0).map(() => React.createRef<HTMLInputElement>());

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\+?[\d\s-]{10,}$/.test(phone);
  };

  const validateUsername = (username: string) => {
    return /^[a-zA-Z0-9_]{3,15}$/.test(username);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (method === 'email' && !validateEmail(value)) {
      setError('Please enter a valid email address');
      return;
    }

    if (method === 'phone' && !validatePhone(value)) {
      setError('Please enter a valid phone number');
      return;
    }

    setStep('otp');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    
    setOtp(prev => {
      const newOtp = [...prev];
      newOtp[index] = value;
      return newOtp;
    });

    if (value && index < 5) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (!validateUsername(username)) {
      setError('Username must be 3-15 characters long and can only contain letters, numbers, and underscores');
      return;
    }

    onComplete();
  };

  const verifyOtp = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      setStep('profile');
    } else {
      setError('Please enter a valid OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold text-white">
            ChatterBox
          </h2>
          <p className="mt-2 text-sm text-white/80">
            {step === 'input' 
              ? 'Enter your email or phone number to get started'
              : step === 'otp'
              ? 'Enter the verification code we sent you'
              : 'Complete your profile'}
          </p>
        </div>

        {step === 'input' ? (
          <form className="mt-8 space-y-6 bg-white/10 backdrop-blur-lg p-8 rounded-2xl" onSubmit={handleSubmit}>
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
                  type={method === 'email' ? 'email' : 'tel'}
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-white/20 placeholder-white/60 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent sm:text-sm bg-white/10 backdrop-blur-lg"
                  placeholder={method === 'email' ? 'Email address' : 'Phone number'}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <p className="text-red-300 text-sm text-center">{error}</p>
            )}

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
        ) : step === 'otp' ? (
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

            {error && (
              <p className="text-red-300 text-sm text-center">{error}</p>
            )}

            <div className="flex justify-between items-center text-sm">
              <button 
                type="button"
                onClick={() => setStep('input')}
                className="text-white/80 hover:text-white"
              >
                Change {method}
              </button>
              <button 
                type="button"
                className="text-white/80 hover:text-white"
              >
                Resend code
              </button>
            </div>

            <button
              onClick={verifyOtp}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-purple-600 bg-white hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 transition-all shadow-lg"
            >
              Verify
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        ) : (
          <form className="mt-8 space-y-6 bg-white/10 backdrop-blur-lg p-8 rounded-2xl" onSubmit={handleProfileSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="sr-only">Full Name</label>
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
                <label htmlFor="username" className="sr-only">Username</label>
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

            {error && (
              <p className="text-red-300 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-purple-600 bg-white hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 transition-all shadow-lg"
            >
              Complete Setup
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default GetStarted;