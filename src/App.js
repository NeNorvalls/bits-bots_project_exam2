import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ScrollToTop from "./utils/ScrollTop/ScrollTop";
import Footer from "./components/Footer/Footer";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import BrowsePage from "./pages/BrowsePage/BrowsePage.jsx";
import CartPage from "./pages/CartPage/Cart.jsx";
import CheckoutPage from "./pages/CheckoutPage/Checkout.jsx";
import Logout from "./auth/Logout/Logout.jsx";
import LoginForm from "./auth/Login/Login";
import RegisterForm from "./auth/Register/Register";
import { CartProvider } from "./utils/CartContext/cartContext";
import "./App.scss";
import Modal from "react-modal";

const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

const App = () => {
  Modal.setAppElement("#root");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <CartProvider initialCart={initialCart}>
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route
            path="/"
            element={<LandingPage setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/login"
            element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/logout"
            element={<Logout setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
        <ScrollToTop />
        <Footer />
      </CartProvider>
    </Router>
  );
};

export default App;
