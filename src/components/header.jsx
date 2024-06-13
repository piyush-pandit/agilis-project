import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiLogOut } from 'react-icons/fi';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="leftContainer">
      <Link to="/products" className="icon">
      <h1 className="title">My Product</h1>
        </Link>
        
      </div>
      <div className="rightContainer">
        <Link to="/cart" className="icon">
          <FiShoppingCart size={24} />
        </Link>
        <Link to="/logout" className="icon">
          <FiLogOut size={24} />
        </Link>
      </div>
    </header>
  );
};

export default Header;