import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.trim().startsWith("__Secure-") ? `${c}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict;` : `${c}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    navigate('/login');
  }, [navigate]);

  return null;
};

export default Logout;