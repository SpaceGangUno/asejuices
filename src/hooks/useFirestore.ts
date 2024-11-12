import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import * as firestoreService from '../services/firestore';
import type { Order, Product, User } from '../types/models';

export function useUserData() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      if (!user?.uid) return;
      
      try {
        const data = await firestoreService.getUser(user.uid);
        setUserData(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [user]);

  return { userData, loading, error };
}

export function useOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      if (!user?.uid) return;
      
      try {
        const data = await firestoreService.getUserOrders(user.uid);
        setOrders(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  return { orders, loading, error };
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await firestoreService.getAllProducts();
        setProducts(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { products, loading, error };
}