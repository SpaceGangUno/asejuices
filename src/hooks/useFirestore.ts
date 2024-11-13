import { useState, useCallback } from 'react';
import * as firestoreService from '../services/firestore';
import { User, Product, Order } from '../types/models';

interface FirestoreError {
  code: string;
  message: string;
}

export function useFirestore() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FirestoreError | null>(null);

  // User operations
  const createUser = useCallback(async (userId: string, userData: User) => {
    setLoading(true);
    setError(null);
    try {
      await firestoreService.createUser(userId, userData);
    } catch (err: any) {
      setError({ code: err.code || 'unknown', message: err.message });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getUser = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const user = await firestoreService.getUser(userId);
      return user;
    } catch (err: any) {
      setError({ code: err.code || 'unknown', message: err.message });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (userId: string, updates: Partial<User>) => {
    setLoading(true);
    setError(null);
    try {
      await firestoreService.updateUser(userId, updates);
    } catch (err: any) {
      setError({ code: err.code || 'unknown', message: err.message });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Product operations
  const getProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const products = await firestoreService.getProducts();
      return products;
    } catch (err: any) {
      setError({ code: err.code || 'unknown', message: err.message });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addProduct = useCallback(async (productData: Omit<Product, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const productId = await firestoreService.addProduct(productData);
      return productId;
    } catch (err: any) {
      setError({ code: err.code || 'unknown', message: err.message });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProduct = useCallback(async (productId: string, updates: Partial<Product>) => {
    setLoading(true);
    setError(null);
    try {
      await firestoreService.updateProduct(productId, updates);
    } catch (err: any) {
      setError({ code: err.code || 'unknown', message: err.message });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProduct = useCallback(async (productId: string) => {
    setLoading(true);
    setError(null);
    try {
      await firestoreService.deleteProduct(productId);
    } catch (err: any) {
      setError({ code: err.code || 'unknown', message: err.message });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Order operations
  const createOrder = useCallback(async (orderData: Omit<Order, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const orderId = await firestoreService.createOrder(orderData);
      return orderId;
    } catch (err: any) {
      setError({ code: err.code || 'unknown', message: err.message });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getOrders = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const orders = await firestoreService.getOrders(userId);
      return orders;
    } catch (err: any) {
      setError({ code: err.code || 'unknown', message: err.message });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getOrderById = useCallback(async (orderId: string) => {
    setLoading(true);
    setError(null);
    try {
      const order = await firestoreService.getOrderById(orderId);
      return order;
    } catch (err: any) {
      setError({ code: err.code || 'unknown', message: err.message });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOrder = useCallback(async (orderId: string, updates: Partial<Order>) => {
    setLoading(true);
    setError(null);
    try {
      await firestoreService.updateOrder(orderId, updates);
    } catch (err: any) {
      setError({ code: err.code || 'unknown', message: err.message });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    // State
    loading,
    error,
    
    // User operations
    createUser,
    getUser,
    updateUser,
    
    // Product operations
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    
    // Order operations
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
  };
}
