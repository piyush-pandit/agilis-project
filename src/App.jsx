import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa';
import LoginComponent from './pages/Login';
import ProductList from './component/product/ProductList';
import dummyData from './dumyData.json';
// import Logout from './logout/LogoutComponent';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState(dummyData.products);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, [])

  const handleLogin = (username, password) => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
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
                <div>
                  <div className="d-flex justify-content-end align-items-center mt-3">
                    <FaPowerOff style={{ cursor: 'pointer', color: 'red', marginRight: '5px' }} onClick={handleLogout} />
                    <span className="ml-2" onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span>
                  </div>
                  <ProductList products={products} />
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          {/* <Route path="/logout" element={<Logout onLogout={handleLogout} />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
