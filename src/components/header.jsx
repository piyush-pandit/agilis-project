import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiLogOut } from 'react-icons/fi';
import '../styles/Header.css';

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  return (
    <header className="header">
      <div className="leftContainer">
        <Link to="/products" className="icon">
          <h1 className="title">Agilis Product</h1>
        </Link>
      </div>
      <div className="rightContainer">
        <Link to="/cart" className="icon">
          <FiShoppingCart size={24} />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
        <Link to="/logout" className="icon">
          <FiLogOut size={24} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
