// Local storage utilities for cart management when user is not logged in

export interface LocalCartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  addedAt: string;
}

const CART_STORAGE_KEY = 'ecommerce_cart';

export const localStorageCart = {
  // Get all cart items from local storage
  getItems(): LocalCartItem[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading cart from localStorage:', error);
      return [];
    }
  },

  // Add or update item in local storage
  addItem(product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    imageUrl: string;
  }, quantity: number = 1): LocalCartItem[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const items = this.getItems();
      const existingItemIndex = items.findIndex(item => item.slug === product.slug);
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        const newItem: LocalCartItem = {
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          quantity,
          imageUrl: product.imageUrl,
          addedAt: new Date().toISOString(),
        };
        items.push(newItem);
      }
      
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      return items;
    } catch (error) {
      console.error('Error adding item to localStorage cart:', error);
      return this.getItems();
    }
  },

  // Update item quantity in local storage
  updateQuantity(slug: string, quantity: number): LocalCartItem[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const items = this.getItems();
      const itemIndex = items.findIndex(item => item.slug === slug);
      
      if (itemIndex >= 0) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or negative
          items.splice(itemIndex, 1);
        } else {
          // Update quantity
          items[itemIndex].quantity = quantity;
        }
        
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      }
      
      return items;
    } catch (error) {
      console.error('Error updating quantity in localStorage cart:', error);
      return this.getItems();
    }
  },

  // Remove item from local storage
  removeItem(slug: string): LocalCartItem[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const items = this.getItems();
      const filteredItems = items.filter(item => item.slug !== slug);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(filteredItems));
      return filteredItems;
    } catch (error) {
      console.error('Error removing item from localStorage cart:', error);
      return this.getItems();
    }
  },

  // Clear all items from local storage
  clearCart(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing localStorage cart:', error);
    }
  },

  // Get total number of items in cart
  getTotalItems(): number {
    const items = this.getItems();
    return items.reduce((total, item) => total + item.quantity, 0);
  },

  // Get total price of all items in cart
  getTotalPrice(): number {
    const items = this.getItems();
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  // Check if item exists in cart
  hasItem(slug: string): boolean {
    const items = this.getItems();
    return items.some(item => item.slug === slug);
  },

  // Get item by slug
  getItem(slug: string): LocalCartItem | null {
    const items = this.getItems();
    return items.find(item => item.slug === slug) || null;
  }
};

