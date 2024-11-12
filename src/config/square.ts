import { Client, Environment } from 'square';

export const squareClient = new Client({
  accessToken: import.meta.env.VITE_SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox // Change to Production for live payments
});