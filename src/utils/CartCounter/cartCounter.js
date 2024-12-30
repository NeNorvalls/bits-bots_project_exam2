import React from "react";
import { useCart } from "../CartContext/cartContext";
import "./CartCounter.css";

function CartCounter() {
  const { cart } = useCart();

  return <span className="cart-counter">{cart.length}</span>;
}

export default CartCounter;
