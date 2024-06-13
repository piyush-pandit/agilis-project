import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="card mb-3">
      <div className="card-header text-end">${product.price}</div>
      <div className='py-3 px-3 text-center'>
        <img src={product.image} className="card-img-top mx-auto" style={{ height: '200px', width: '200px' }}  alt={product.name} />
      </div>
      <div className="card-body px-3 py-3">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <button className="btn btn-primary add__cart">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
