// Mock types
interface User {
  id: string;
  email: string;
  name: string;
}

interface Order {
  id: string;
  userId: string;
  items: any[];
  total: number;
  status: string;
  createdAt: Date;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

// Mock data store
const mockUsers: { [key: string]: User } = {};
const mockOrders: Order[] = [];
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Sample Product 1',
    price: 29.99,
    description: 'A sample product description'
  },
  {
    id: '2',
    name: 'Sample Product 2',
    price: 39.99,
    description: 'Another sample product description'
  }
];

// Mock Firestore functions
export async function createUser(userId: string, userData: User): Promise<void> {
  mockUsers[userId] = userData;
}

export async function getUser(userId: string): Promise<User | null> {
  return mockUsers[userId] || null;
}

export async function createOrder(orderData: Omit<Order, 'id'>): Promise<string> {
  const orderId = `order-${Date.now()}`;
  const order: Order = {
    ...orderData,
    id: orderId
  };
  mockOrders.push(order);
  return orderId;
}

export async function getOrders(userId: string): Promise<Order[]> {
  return mockOrders.filter(order => order.userId === userId);
}

export async function getProducts(): Promise<Product[]> {
  return mockProducts;
}

export async function updateUser(userId: string, updates: Partial<User>): Promise<void> {
  if (mockUsers[userId]) {
    mockUsers[userId] = {
      ...mockUsers[userId],
      ...updates
    };
  }
}
