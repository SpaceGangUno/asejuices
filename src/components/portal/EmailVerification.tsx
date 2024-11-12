import React, { useState } from 'react';
import { Mail, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { sendEmailVerification } from 'firebase/auth';

export default function EmailVerification() {
  const { user } = useAuth();
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!user || user.emailVerified) return null;

  const handleResendVerification = async () => {
    try {
      setSending(true);
      setMessage(null);
      await sendEmailVerification(user);
      setMessage({
        type: 'success',
        text: 'Verification email sent! Please check your inbox.'
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to send verification email. Please try again later.'
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-amber-50 rounded-xl p-6 mb-6">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-amber-800">
            Please verify your email address
          </h3>
          <p className="mt-2 text-sm text-amber-700">
            To ensure the security of your account and access all features, please verify your email address.
            We've sent a verification link to {user.email}.
          </p>
          <div className="mt-4">
            <button
              onClick={handleResendVerification}
              disabled={sending}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-amber-700 bg-amber-100 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mail className="h-4 w-4 mr-2" />
              {sending ? 'Sending...' : 'Resend verification email'}
            </button>
          </div>
          {message && (
            <div className={`mt-4 flex items-center space-x-2 text-sm ${
              message.type === 'success' ? 'text-green-600' : 'text-red-600'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertTriangle className="h-4 w-4" />
              )}
              <span>{message.text}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}