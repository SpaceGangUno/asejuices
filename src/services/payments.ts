import { v4 as uuidv4 } from 'uuid';

const SQUARE_APP_ID = import.meta.env.VITE_SQUARE_APP_ID;
const SQUARE_LOCATION_ID = import.meta.env.VITE_SQUARE_LOCATION_ID;
const SQUARE_ACCESS_TOKEN = import.meta.env.VITE_SQUARE_ACCESS_TOKEN;

interface PaymentRequest {
  amount: number;
  currency: string;
  idempotencyKey: string;
}

export async function initializePayment(amount: number): Promise<void> {
  try {
    const payments = await window.Square.payments(SQUARE_APP_ID, SQUARE_LOCATION_ID);
    const card = await payments.card();
    await card.attach('#card-container');

    const paymentRequest: PaymentRequest = {
      amount,
      currency: 'USD',
      idempotencyKey: uuidv4(),
    };

    const response = await fetch('/api/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(paymentRequest),
    });

    if (!response.ok) {
      throw new Error('Payment creation failed');
    }

    const result = await card.tokenize();
    if (result.status === 'OK') {
      // Process payment with token
      console.log('Payment successful:', result.token);
    } else {
      throw new Error(result.errors[0].message);
    }
  } catch (error) {
    console.error('Payment initialization error:', error);
    throw error;
  }
}