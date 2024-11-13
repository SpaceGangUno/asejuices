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
  stock: number;
  category: string;
}

// Mock data store
const mockUsers: { [key: string]: User } = {};
const mockOrders: Order[] = [];
let mockProducts: Product[] = [
  {
    id: '1',
    name: 'Green Detox Juice',
    price: 29.99,
    description: 'A refreshing blend of green vegetables and fruits',
    stock: 50,
    category: 'Detox'
  },
  {
    id: '2',
    name: 'Immunity Booster',
    price: 34.99,
    description: 'Packed with vitamin C and antioxidants',
    stock: 45,
    category: 'Immunity'
  },
  {
    id: '3',
    name: 'Energy Blend',
    price: 32.99,
    description: 'Natural energy boost with superfoods',
    stock: 30,
    category: 'Energy'
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

// Product CRUD operations
export async function getProducts(): Promise<Product[]> {
  return mockProducts;
}

export async function addProduct(productData: Omit<Product, 'id'>): Promise<string> {
  const productId = `product-${Date.now()}`;
  const newProduct: Product = {
    ...productData,
    id: productId
  };
  mockProducts.push(newProduct);
  return productId;
}

export async function updateProduct(productId: string, updates: Partial<Product>): Promise<void> {
  mockProducts = mockProducts.map(product => 
    product.id === productId ? { ...product, ...updates } : product
  );
}

export async function deleteProduct(productId: string): Promise<void> {
  mockProducts = mockProducts.filter(product => product.id !== productId);
}

export async function updateUser(userId: string, updates: Partial<User>): Promise<void> {
  if (mockUsers[userId]) {
    mockUsers[userId] = {
      ...mockUsers[userId],
      ...updates
    };
  }
}
