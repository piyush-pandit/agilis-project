import { useEffect, useState, useCallback } from 'react';
import ApiCaller from '../../services/apiService';
import '../../styles/Product.css';

const apiService = ApiCaller();

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 10;
  const [loading, setLoading] = useState(false);

  const getProductData = useCallback(async (newSkip) => {
    if (loading) return;
    setLoading(true);
    try {
      const productUrl = `https://dummyjson.com/products?limit=${limit}&skip=${newSkip}`;
      const response = await apiService.apiCall("get", productUrl);
      const newProducts = response.data.products;
      setProducts(prevProducts => [...prevProducts, ...newProducts]);
      setTotal(response.data.total);
    } catch (error) {
      console.log("product error", error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    getProductData(skip);
  }, [skip, getProductData]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && products.length < total && !loading) {
      setSkip(prevSkip => prevSkip + limit);
    }
  }, [products, total, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 " style={{ marginTop: '4%'}}>
      {products?.map((product, index) => (
        <div key={index} className="col">
          <div className="card">
            <h4 className="card-header text-end">${product.price}</h4>
            <div className='py-3 px-3 text-center' style={{ height: '200px', overflow: 'hidden' }}>
              <img src={product.thumbnail} className="card-img-top mx-auto img-fluid" alt={product.title} style={{ height: '100%', width: 'auto', objectFit: 'contain' }} />
            </div>
            <div className="card-body px-3 py-3">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <button className="btn btn-primary add__cart" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
