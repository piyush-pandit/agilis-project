import React from 'react';
import Head from '../components/head';
import Header from '../components/header';

const MainLayout = ({ children }) => {
  return (
    <>
      <Head />
      <Header />
      <main className='container max-auto p-4'>
        {children}
      </main>
    </>
  );
};

export default MainLayout;