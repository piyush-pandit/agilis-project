import React, { useState, useEffect } from 'react';
import '../styles/Product.css';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {cart.length > 0 ? cart.map((product, index) => (
        <div key={index} className="col">
          <div className="card">
            <h4 className="card-header text-end">${product.price}</h4>
            <div className='py-3 px-3 text-center' style={{ height: '200px', overflow: 'hidden' }}>
              <img src={product.thumbnail} className="card-img-top mx-auto img-fluid" alt={product.title} style={{ height: '100%', width: 'auto', objectFit: 'contain' }} />
            </div>
            <div className="card-body px-3 py-3">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <button className="btn btn-primary add__cart">BUY NOW</button>
            </div>
          </div>
        </div>
      )) : (
        <div className="col">
          <h4>Your cart is empty</h4>
        </div>
      )}
    </div>
  );
};

export default Cart;
