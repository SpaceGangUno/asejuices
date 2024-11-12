import React, { useEffect, useState } from 'react';
import { initializePayment } from '../services/payments';

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export default function PaymentForm({ amount, onSuccess, onError }: PaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadSquareScript = async () => {
      try {
        const script = document.createElement('script');
        script.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = async () => {
          try {
            await initializePayment(amount);
          } catch (error) {
            onError(error as Error);
          }
        };
      } catch (error) {
        onError(error as Error);
      }
    };

    loadSquareScript();
  }, [amount, onError]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await initializePayment(amount);
      onSuccess();
    } catch (error) {
      onError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div id="card-container" className="min-h-[100px] border rounded-lg p-4"></div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
      >
        {isLoading ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
      </button>
    </form>
  );
}