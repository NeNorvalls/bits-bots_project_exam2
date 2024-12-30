import React, { createContext, useContext, useState, useEffect } from "react";

const CART_STORAGE_KEY = "cartItems";

const CartContext = createContext();

export const CartProvider = ({ children, initialCart }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem(CART_STORAGE_KEY);
    return savedCartItems ? JSON.parse(savedCartItems) : initialCart || [];
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existingCartItem = cartItems.find((item) => item.id === product.id);

    if (existingCartItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
  };

  const handleIncrement = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const handleDecrement = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const calculateTotal = () => {
    let total = 0;

    for (const item of cartItems) {
      if (item && item.acf && item.acf.price && item.quantity) {
        const price = parseFloat(item.acf.price);
        const quantity = parseInt(item.quantity, 10);

        if (isNaN(price) || isNaN(quantity)) {
          console.error("Invalid price or quantity:", price, quantity);
          continue;
        }

        total += price * quantity;
      } else {
        console.error("Missing information:", item);
      }
    }

    return total;
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        handleIncrement,
        handleDecrement,
        cartQuantity,
        clearCart,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
