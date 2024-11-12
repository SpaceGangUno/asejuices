import React, { useEffect, useState } from 'react';
import { X, Loader } from 'lucide-react';
import { createPaymentRequest } from '../services/payments';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onPaymentComplete: () => void;
}

export default function CheckoutModal({ isOpen, onClose, total, onPaymentComplete }: CheckoutModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentRequest, setPaymentRequest] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    if (isOpen) {
      initializePayment();
    }

    async function initializePayment() {
      try {
        setIsLoading(true);
        setError(null);
        const request = await createPaymentRequest(total);
        if (mounted) {
          setPaymentRequest(request);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Payment initialization error:', err);
        if (mounted) {
          setError('Failed to initialize payment form. Please try again.');
          setIsLoading(false);
        }
      }
    }

    return () => {
      mounted = false;
      if (paymentRequest?.card) {
        paymentRequest.card.destroy();
      }
    };
  }, [isOpen, total]);

  const handlePayment = async () => {
    if (!paymentRequest) {
      setError('Payment form not initialized');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const { token, orderId } = await paymentRequest.tokenize();
      
      // Here you would send the token to your server
      console.log('Payment token:', token, 'Order ID:', orderId);
      
      onPaymentComplete();
    } catch (err) {
      console.error('Payment error:', err);
      setError('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Secure Checkout</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="mb-6">
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Total Amount:</span>
            <span className="font-bold text-emerald-600">${total.toFixed(2)}</span>
          </div>

          <div id="card-container" className={`mb-4 p-4 border rounded-lg ${isLoading ? 'opacity-50' : ''}`} />

          <button
            onClick={handlePayment}
            disabled={isLoading || !!error}
            className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin h-5 w-5 mr-2" />
                Processing...
              </>
            ) : (
              'Pay Now'
            )}
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Secured by Square Payment Systems. Your payment information is encrypted and secure.
        </p>
      </div>
    </div>
  );
}