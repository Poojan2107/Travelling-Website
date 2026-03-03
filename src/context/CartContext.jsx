import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Load from local storage on initial render
    const savedCart = localStorage.getItem('travelAppCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save to local storage whenever cart changes
  useEffect(() => {
    localStorage.setItem('travelAppCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.name === item.name);
      if (existingItem) {
        // Increment quantity
        return prevItems.map(i => 
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      // Add new item with quantity 1
      return [...prevItems, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true); // Auto open cart when adding
  };

  const removeFromCart = (itemName) => {
    setCartItems(prevItems => prevItems.filter(i => i.name !== itemName));
  };

  const updateQuantity = (itemName, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemName);
      return;
    }
    setCartItems(prevItems => 
      prevItems.map(i => 
        i.name === itemName ? { ...i, quantity: newQuantity } : i
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const toggleCart = () => setIsCartOpen(prev => !prev);
  const closeCart = () => setIsCartOpen(false);

  const value = {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    toggleCart,
    closeCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
