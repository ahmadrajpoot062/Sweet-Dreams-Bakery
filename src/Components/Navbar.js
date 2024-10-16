import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  // Function to update cart count from cookies
  const updateCartCount = () => {
    const cart = Cookies.get('cart'); // Use js-cookie to get cart cookie
    const cartItems = cart ? JSON.parse(cart) : [];
    setCartCount(cartItems.length); // Set the cart count based on the number of items
  };

  // useEffect to fetch cart items when component mounts or cart changes
  useEffect(() => {
    updateCartCount(); // Fetch the cart count when the component mounts

    // Listen for cart updates using a custom event
    const handleCartUpdate = () => {
      updateCartCount(); // Update the cart count when event is triggered
    };

    window.addEventListener('cartUpdated', handleCartUpdate); // Listen to cartUpdated event

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate); // Clean up the event listener
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow fixed-top">
      <div className="container">
        <NavLink className="navbar-brand text-white fw-bold" to="/">
          <i className="fas fa-egg"></i>
          Sweet Dreams Bakery
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" exact activeClassName="active">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products" activeClassName="active">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" activeClassName="active">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact" activeClassName="active">
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Cart icon with dynamic cart count */}
          <Link to="/cart" className="position-relative">
            <i className="fa-solid fa-cart-shopping mt-3 mt-lg-0 ms-3 ms-lg-5" id="shopping-cart"></i>
            <span className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
