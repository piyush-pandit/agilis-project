import React from 'react';
import { Helmet } from 'react-helmet';

const Head = () => {
  return (
    <Helmet>
      <title>My Product</title>
      <meta name="description" content="This is my app" />
    </Helmet>
  );
};

export default Head;