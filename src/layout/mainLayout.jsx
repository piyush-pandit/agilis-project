import React, { useEffect, useState } from 'react';
import Head from '../components/head';
import Header from '../components/header';

const MainLayout = ({ children }) => {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLoggedIn"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLogin(localStorage.getItem("isLoggedIn"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    setIsLogin(localStorage.getItem("isLoggedIn"));
  }, []);

  return (
    <>
      {isLogin && (
        <div>
          <Head />
          <Header />
        </div>
      )}
      <main className='container max-auto p-4 full-height'>
        {children}
      </main>
    </>
  );
};

export default MainLayout;
