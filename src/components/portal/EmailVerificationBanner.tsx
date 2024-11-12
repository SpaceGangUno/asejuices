import React, { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function EmailVerificationBanner() {
  const { user, sendVerificationEmail } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!user || user.emailVerified || !isVisible) return null;

  const handleResend = async () => {
    try {
      setSending(true);
      await sendVerificationEmail();
      setMessage('Verification email sent! Please check your inbox.');
    } catch (error) {
      setMessage('Failed to send verification email. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-xl relative">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-amber-600 hover:text-amber-700"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-amber-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-amber-800">
            Please verify your email address to access all features.
            {message && (
              <span className="block mt-1 font-medium">{message}</span>
            )}
          </p>
          <button
            onClick={handleResend}
            disabled={sending}
            className="mt-2 text-sm font-medium text-amber-800 hover:text-amber-900 underline disabled:opacity-50"
          >
            {sending ? 'Sending...' : 'Resend verification email'}
          </button>
        </div>
      </div>
    </div>
  );
}