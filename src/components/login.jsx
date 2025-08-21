// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { Mail, Lock, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('email'); // 'email' or 'otp'
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const [success, setSuccess] = useState('');

  const { sendOTP, verifyOTP, error, clearError } = useAuth();

  const handleSendOTP = async () => {
    if (!email || !email.includes('@')) {
      setLocalError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setLocalError('');
    setSuccess('');
    clearError();

    const result = await sendOTP(email);
    
    if (result.success) {
      setSuccess('OTP sent successfully to your email!');
      setStep('otp');
    } else {
      setLocalError(result.error);
    }
    
    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length < 4) {
      setLocalError('Please enter a valid OTP');
      return;
    }

    setLoading(true);
    setLocalError('');
    clearError();

    const result = await verifyOTP(email, otp);
    
    if (!result.success) {
      setLocalError(result.error);
    }
    
    setLoading(false);
  };

  const handleBackToEmail = () => {
    setStep('email');
    setOtp('');
    setLocalError('');
    setSuccess('');
    clearError();
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">School Admin Panel</h1>
          <p className="text-gray-300">
            {step === 'email' 
              ? 'Enter your email to receive OTP' 
              : 'Enter the OTP sent to your email'
            }
          </p>
        </div>

        {/* Error Message */}
        {displayError && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-4 flex items-center">
            <AlertCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
            <p className="text-red-200 text-sm">{displayError}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 mb-4 flex items-center">
            <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
            <p className="text-green-200 text-sm">{success}</p>
          </div>
        )}

        {/* Email Step */}
        {step === 'email' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleSendOTP)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 outline-none"
                  placeholder="admin@school.com"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              onClick={handleSendOTP}
              disabled={loading || !email}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 disabled:transform-none"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </div>
        )}

        {/* OTP Step */}
        {step === 'otp' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Enter OTP
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  onKeyPress={(e) => handleKeyPress(e, handleVerifyOTP)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 outline-none text-center text-2xl tracking-widest"
                  placeholder="****"
                  maxLength="4"
                  disabled={loading}
                />
              </div>
              <p className="text-sm text-gray-400 mt-2 text-center">
                OTP sent to: <span className="text-blue-400">{email}</span>
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleVerifyOTP}
                disabled={loading || otp.length < 4}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 disabled:transform-none"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              
              <button
                onClick={handleBackToEmail}
                disabled={loading}
                className="w-full bg-gray-600/50 hover:bg-gray-600 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
              >
                Back to Email
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Secure admin access with OTP verification
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;