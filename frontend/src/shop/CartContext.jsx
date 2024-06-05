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
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id && cartItem.name === item.name);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, cartQuantity: cartItem.cartQuantity + 1 } : cartItem
        );
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
