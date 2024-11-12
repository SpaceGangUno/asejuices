import React, { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { createPayment } from '../../services/payments';

declare global {
  interface Window {
    Square: any;
  }
}

interface PaymentFormProps {
  onSuccess?: () => void;
  guestInfo?: {
    email: string;
    name: string;
    phone: string;
    address: string;
  } | null;
}

export default function PaymentForm({ onSuccess, guestInfo }: PaymentFormProps) {
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [card, setCard] = useState<any>(null);
  const [payments, setPayments] = useState<any>(null);

  useEffect(() => {
    initializeSquare();
  }, []);

  const initializeSquare = async () => {
    if (!window.Square) {
      setError('Square.js failed to load');
      return;
    }

    try {
      const paymentsInstance = await window.Square.payments(
        import.meta.env.VITE_SQUARE_APP_ID,
        import.meta.env.VITE_SQUARE_LOCATION_ID
      );

      const cardInstance = await paymentsInstance.card();
      await cardInstance.attach('#card-container');

      setCard(cardInstance);
      setPayments(paymentsInstance);
    } catch (error) {
      console.error('Square initialization error:', error);
      setError('Failed to initialize payment form');
    }
  };

  const handlePayment = async () => {
    if (!card) {
      setError('Payment form not initialized');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await card.tokenize();
      if (result.status === 'OK') {
        await createPayment({
          items,
          total,
          sourceId: result.token
        });

        clearCart();
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setError('Failed to process payment');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <div id="card-container" className="min-h-[100px] p-3 border rounded-md"></div>

      <div className="border-t pt-4">
        <div className="flex justify-between text-lg font-semibold mb-4">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader className="h-5 w-5 animate-spin mr-2" />
              Processing...
            </>
          ) : (
            'Pay Now'
          )}
        </button>
      </div>
    </div>
  );
}