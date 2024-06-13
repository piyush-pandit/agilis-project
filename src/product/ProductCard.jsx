import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="card mb-3">
      <div className="card-header text-end">${product.price}</div>
      <img src={product.image} className="card-img-top mx-auto" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <button className="btn btn-primary">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
