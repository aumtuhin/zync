import React, { useState } from 'react';
import { Phone, Mail, ArrowRight } from 'lucide-react';

interface GetStartedProps {
  onComplete: () => void;
}

const GetStarted: React.FC<GetStartedProps> = ({ onComplete }) => {
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [value, setValue] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [error, setError] = useState('');
  
  const otpRefs = Array(6).fill(0).map(() => React.createRef<HTMLInputElement>());

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\+?[\d\s-]{10,}$/.test(phone);
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

    // Simulate OTP sending
    setStep('otp');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    
    setOtp(prev => {
      const newOtp = [...prev];
      newOtp[index] = value;
      return newOtp;
    });

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const verifyOtp = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      // Simulate OTP verification
      onComplete();
    } else {
      setError('Please enter a valid OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome to WhatsApp
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {step === 'input' 
              ? 'Enter your email or phone number to get started'
              : 'Enter the verification code we sent you'}
          </p>
        </div>

        {step === 'input' ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => setMethod('email')}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    method === 'email'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Mail size={20} className="mr-2" />
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('phone')}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    method === 'phone'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
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
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-700"
                  placeholder={method === 'email' ? 'Email address' : 'Phone number'}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={otpRefs[index]}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-xl border-2 rounded-lg focus:border-green-500 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="flex justify-between items-center text-sm">
              <button 
                type="button"
                onClick={() => setStep('input')}
                className="text-green-600 hover:text-green-500"
              >
                Change {method}
              </button>
              <button 
                type="button"
                className="text-green-600 hover:text-green-500"
              >
                Resend code
              </button>
            </div>

            <button
              onClick={verifyOtp}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Verify
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetStarted;