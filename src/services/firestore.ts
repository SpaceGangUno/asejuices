import { 
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  addDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { User, Order, Product } from '../types/models';

// Collections
const USERS_COLLECTION = 'users';
const ORDERS_COLLECTION = 'orders';
const PRODUCTS_COLLECTION = 'products';

// Helper function to convert Timestamp to Date
const convertTimestamps = (data: any) => {
  const result = { ...data };
  for (const [key, value] of Object.entries(result)) {
    if (value instanceof Timestamp) {
      result[key] = value.toDate();
    }
  }
  return result;
};

// User operations
export async function createUser(userId: string, userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, userId);
  const timestamp = serverTimestamp();
  await setDoc(userRef, {
    ...userData,
    points: userData.points || 0,
    createdAt: timestamp,
    updatedAt: timestamp
  });
}

export async function getUser(userId: string): Promise<User | null> {
  const userRef = doc(db, USERS_COLLECTION, userId);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    return null;
  }
  
  return { 
    id: userSnap.id, 
    ...convertTimestamps(userSnap.data())
  } as User;
}

export async function updateUser(userId: string, updates: Partial<User>): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, userId);
  await updateDoc(userRef, {
    ...updates,
    updatedAt: serverTimestamp()
  });
}

// Order operations
export async function createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const ordersRef = collection(db, ORDERS_COLLECTION);
  const timestamp = serverTimestamp();
  const newOrder = {
    ...orderData,
    status: orderData.status || 'pending',
    createdAt: timestamp,
    updatedAt: timestamp
  };
  
  const docRef = await addDoc(ordersRef, newOrder);
  return docRef.id;
}

export async function getOrders(userId: string): Promise<Order[]> {
  const ordersRef = collection(db, ORDERS_COLLECTION);
  const q = query(ordersRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...convertTimestamps(doc.data())
  })) as Order[];
}

// Product operations
export async function getProducts(): Promise<Product[]> {
  const productsRef = collection(db, PRODUCTS_COLLECTION);
  const querySnapshot = await getDocs(productsRef);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...convertTimestamps(doc.data())
  })) as Product[];
}

export async function addProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const productsRef = collection(db, PRODUCTS_COLLECTION);
  const timestamp = serverTimestamp();
  const newProduct = {
    ...productData,
    createdAt: timestamp,
    updatedAt: timestamp
  };
  
  const docRef = await addDoc(productsRef, newProduct);
  return docRef.id;
}

export async function updateProduct(productId: string, updates: Partial<Product>): Promise<void> {
  const productRef = doc(db, PRODUCTS_COLLECTION, productId);
  await updateDoc(productRef, {
    ...updates,
    updatedAt: serverTimestamp()
  });
}

export async function deleteProduct(productId: string): Promise<void> {
  const productRef = doc(db, PRODUCTS_COLLECTION, productId);
  await deleteDoc(productRef);
}

// Additional helper functions
export async function getOrderById(orderId: string): Promise<Order | null> {
  const orderRef = doc(db, ORDERS_COLLECTION, orderId);
  const orderSnap = await getDoc(orderRef);
  
  if (!orderSnap.exists()) {
    return null;
  }
  
  return { 
    id: orderSnap.id, 
    ...convertTimestamps(orderSnap.data())
  } as Order;
}

export async function updateOrder(orderId: string, updates: Partial<Order>): Promise<void> {
  const orderRef = doc(db, ORDERS_COLLECTION, orderId);
  await updateDoc(orderRef, {
    ...updates,
    updatedAt: serverTimestamp()
  });
}

export async function getProductById(productId: string): Promise<Product | null> {
  const productRef = doc(db, PRODUCTS_COLLECTION, productId);
  const productSnap = await getDoc(productRef);
  
  if (!productSnap.exists()) {
    return null;
  }
  
  return { 
    id: productSnap.id, 
    ...convertTimestamps(productSnap.data())
  } as Product;
}
