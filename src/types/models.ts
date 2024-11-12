export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  deliveryDate?: Date;
  deliveryTime?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  benefits: string[];
  ingredients: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fiber: number;
  };
  tags: string[];
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}