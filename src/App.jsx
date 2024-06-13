import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa';
import LoginComponent from './login/LoginComponent';
import ProductList from './product/ProductList';
import dummyData from './dumyData.json';
import Logout from './logout/LogoutComponent';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState(dummyData.products);

  const handleLogin = (username, password) => {
    // Implement authentication logic here
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/products" /> : <LoginComponent onLogin={handleLogin} />
            }
          />
          <Route
            path="/products"
            element={
              isLoggedIn ? (
                <>
                  <div className="d-flex justify-content-end align-items-center mt-3">
                    <FaPowerOff style={{ cursor: 'pointer' }} onClick={handleLogout} />
                    <span className="ml-2" onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span>
                  </div>
                  <ProductList products={products} />
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
