import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    return storedCartItems || [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.name === item.name
      );
  
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          cartQuantity: updatedItems[existingItemIndex].cartQuantity + 1,
        };
        return updatedItems;
      } else {
        return [...prevItems, { ...item, cartQuantity: 1, cartId: Date.now() }];
      }
    });
  };
  const removeFromCart = (cartId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.cartId !== cartId));
  };

  const increaseQuantity = (cartId) => {
    setCartItems((prevItems) => {
      return prevItems.map(item =>
        item.cartId === cartId ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
      );
    });
  };
  
  const decreaseQuantity = (cartId) => {
    setCartItems((prevItems) => {
      return prevItems.map(item =>
        item.cartId === cartId && item.cartQuantity > 1
        ? { ...item, cartQuantity: item.cartQuantity - 1 }
        : item
      );
    });
  };
  
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
