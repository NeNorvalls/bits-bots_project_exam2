import React from "react";
import "./Cart.scss";
import { useCart } from "../../utils/CartContext/cartContext";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    handleIncrement,
    handleDecrement,
    clearCart,
    calculateTotal
  } = useCart();
  const navigate = useNavigate();
  const total = calculateTotal(cartItems);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      <Card className="cart">
        <div className="cart__body">
          <div className="cart__title">
            <h4>
              <b>Your Cart</b>
            </h4>
          </div>
          <div className="row">
            {cartItems.map((item) => (
              <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <Card className="cart-item">
                  <div className="cart-item__image">
                    <img
                      src={item.game_image_url}
                      className="cart-item__image img-fluid"
                      alt={item.title.rendered}
                    />
                  </div>
                  <div className="cart-item__details">
                    <span className="cart-item__name">
                      {item.title.rendered}
                    </span>
                    <div className="cart-item-quantity">
                      <Button
                        variant="outline-primary"
                        className="cart-item-quantity__btn"
                        onClick={() => handleDecrement(item.id)}
                      >
                        -
                      </Button>
                      {item.quantity}
                      <Button
                        variant="outline-primary"
                        className="cart-item-quantity__btn"
                        onClick={() => handleIncrement(item.id)}
                      >
                        +
                      </Button>
                    </div>
                    <div className="cart-item__price">
                      Price: ${item.acf.price}
                    </div>
                    <div className="cart-item__subtotal">
                      Subtotal: ${(item.acf.price * item.quantity).toFixed(2)}
                    </div>
                    <Button
                      variant="danger"
                      className="cart-item-remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="cart-summary__total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="cart-summary__actions">
              <Button
                variant="secondary"
                className="cart-summary__clear-btn"
                onClick={clearCart}
              >
                Clear
              </Button>
              <Button
                variant="primary"
                className="cart-summary__confirm-btn"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Cart;
