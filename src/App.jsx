import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Products from "./components/product/ProductCard";
import ProtectedRoute from "./components/protectedRoute";
import MainLayout from "./layout/mainLayout";
import Logout from "./components/logout";
import Cart from './components/cart'

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products" element={<ProtectedRoute />}>
            <Route index element={<Products />} />
            <Route index element={<Cart />} />
          </Route>
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;