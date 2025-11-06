"use client";

import { useState, useEffect, useCallback } from 'react';
import { localStorageCart, LocalCartItem } from '@/lib/localStorage';

export interface CartItem extends LocalCartItem {
  // Common properties for local storage items
  isLocal?: boolean;
}

export function useCart() {
  const [localCart, setLocalCart] = useState<LocalCartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load local cart items
  const loadLocalCart = useCallback(() => {
    const items = localStorageCart.getItems();
    setLocalCart(items);
  }, []);

  // Initialize cart on mount
  useEffect(() => {
    loadLocalCart();
  }, [loadLocalCart]);

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      loadLocalCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, [loadLocalCart]);

  // Add item to cart
  const addToCart = useCallback(async (product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    imageUrl: string;
  }, quantity: number = 1) => {
    setLoading(true);
    try {
      // Add to local storage
      const updatedItems = localStorageCart.addItem(product, quantity);
      setLocalCart(updatedItems);
      
      // Dispatch cart updated event
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Add to cart error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update item quantity
  const updateQuantity = useCallback(async (slug: string, quantity: number) => {
    if (quantity < 1) return;

    // Update local storage
    const updatedItems = localStorageCart.updateQuantity(slug, quantity);
    setLocalCart(updatedItems);
    
    // Dispatch cart updated event
    window.dispatchEvent(new Event("cartUpdated"));
  }, []);

  // Remove item from cart
  const removeItem = useCallback(async (slug: string) => {
    // Remove from local storage
    const updatedItems = localStorageCart.removeItem(slug);
    setLocalCart(updatedItems);
    
    // Dispatch cart updated event
    console.log('Dispatching cartUpdated event after local remove');
    window.dispatchEvent(new Event("cartUpdated"));
  }, []);

  // Get combined cart items
  const getCartItems = useCallback((): CartItem[] => {
    // Return local cart items with isLocal flag
    return localCart.map(item => ({
      ...item,
      isLocal: true,
    }));
  }, [localCart]);

  // Get total items count
  const getTotalItems = useCallback((): number => {
    const count = localStorageCart.getTotalItems();
    return count;
  }, [localCart]);

  // Get total price
  const getTotalPrice = useCallback((): number => {
    const count = localStorageCart.getTotalPrice();
    return count;
  }, [localCart]);

  // Check if item exists in cart
  const hasItem = useCallback((slug: string): boolean => {
    return localStorageCart.hasItem(slug);
  }, []);

  // Clear cart
  const clearCart = useCallback(() => {
    localStorageCart.clearCart();
    setLocalCart([]);
  }, []);

  return {
    cartItems: getCartItems(),
    totalItems: getTotalItems(),
    totalPrice: getTotalPrice(),
    loading,
    isLoggedIn: false, // Always false since we removed authentication
    addToCart,
    updateQuantity,
    removeItem,
    hasItem,
    clearCart,
    refreshCart: loadLocalCart,
  };
}
