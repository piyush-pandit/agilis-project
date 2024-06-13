import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useAuthMiddleware = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn && location.pathname === '/login') {
      navigate('/products');
    } else if (!isLoggedIn && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [navigate, location]);
};