import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    onLogout();
    navigate('/');
  }, [onLogout, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
