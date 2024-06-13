import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  return (
    <div className="row container">
      {products.map((product, index) => (
        <div key={index} className="col-md-4">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;

