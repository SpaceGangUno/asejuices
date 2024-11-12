import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
  addDoc,
  FirestoreError
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { User, Order, Product } from '../types/models';

const handleFirestoreError = (error: FirestoreError, operation: string) => {
  console.error(`Firestore ${operation} error:`, error);
  throw error;
};

// User Services
export const createUser = async (userId: string, userData: Partial<User>) => {
  try {
    const userRef = doc(db, 'users', userId);
    const now = Timestamp.now();
    
    await setDoc(userRef, {
      ...userData,
      points: 0,
      createdAt: now,
      updatedAt: now
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error as FirestoreError, 'createUser');
  }
};

export const getUser = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() as User : null;
  } catch (error) {
    handleFirestoreError(error as FirestoreError, 'getUser');
    return null;
  }
};

export const updateUser = async (userId: string, userData: Partial<User>) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    handleFirestoreError(error as FirestoreError, 'updateUser');
  }
};

// Order Services
export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const now = Timestamp.now();
    const orderRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      createdAt: now,
      updatedAt: now
    });
    return orderRef.id;
  } catch (error) {
    handleFirestoreError(error as FirestoreError, 'createOrder');
    return null;
  }
};

export const getOrder = async (orderId: string) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    const orderSnap = await getDoc(orderRef);
    return orderSnap.exists() ? orderSnap.data() as Order : null;
  } catch (error) {
    handleFirestoreError(error as FirestoreError, 'getOrder');
    return null;
  }
};

export const getUserOrders = async (userId: string) => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[];
  } catch (error) {
    handleFirestoreError(error as FirestoreError, 'getUserOrders');
    return [];
  }
};

export const updateOrder = async (orderId: string, orderData: Partial<Order>) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      ...orderData,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    handleFirestoreError(error as FirestoreError, 'updateOrder');
  }
};

// Product Services
export const getAllProducts = async () => {
  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('inStock', '==', true));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    handleFirestoreError(error as FirestoreError, 'getAllProducts');
    return [];
  }
};