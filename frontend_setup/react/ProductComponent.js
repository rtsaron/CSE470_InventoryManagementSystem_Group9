import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductComponent() {
  const [products, setProducts] = useState([]);
  const [quantityChange, setQuantityChange] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState('');

  useEffect(() => {
    // Fetch products initially and set up a real-time update mechanism
    const fetchProducts = async () => {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    };
    fetchProducts();
    // Implement real-time fetching logic here, e.g., WebSocket connection or polling
  }, []);

  const handleQuantityChange = async () => {
    await axios.post('/api/products/update-quantity', {
      productId: selectedProductId,
      changeInQuantity: quantityChange,
    });
    // After updating, fetch products again or implement real-time updates
  };

  return (
    <div>
      <select onChange={(e) => setSelectedProductId(e.target.value)}>
        {products.map((product) => (
          <option key={product._id} value={product._id}>{product.name}</option>
        ))}
      </select>
      <input type="number" value={quantityChange} onChange={(e) => setQuantityChange(e.target.value)} />
      <button onClick={handleQuantityChange}>Update Quantity</button>
    </div>
  );
}

export default ProductComponent;
