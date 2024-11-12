import React, { useState } from 'react';
import { X } from 'lucide-react';
import PaymentForm from './PaymentForm';
import { useAuth } from '../../context/AuthContext';
import GuestCheckoutForm from './GuestCheckoutForm';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { user } = useAuth();
  const [guestInfo, setGuestInfo] = useState<{
    email: string;
    name: string;
    phone: string;
    address: string;
  } | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 transform transition-all">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h2>
          
          {!user && !guestInfo ? (
            <GuestCheckoutForm onSubmit={setGuestInfo} />
          ) : (
            <PaymentForm 
              onSuccess={onClose} 
              guestInfo={guestInfo}
            />
          )}
        </div>
      </div>
    </div>
  );
}