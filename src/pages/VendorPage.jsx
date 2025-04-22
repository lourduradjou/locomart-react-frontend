import React, { useState, useEffect } from 'react';
import VendorService from '../services/VendorService1';
import '../components/css/VendorPage.css';

const VendorPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productName: '',
    description: '',
    expiryDate: '',
    quantity: '',
    price: '',
    countryOfOrigin: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await VendorService.getAllProducts();
    setProducts(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await VendorService.addProduct(form);
    setForm({
      productName: '',
      description: '',
      expiryDate: '',
      quantity: '',
      price: '',
      countryOfOrigin: ''
    });
    fetchProducts();
  };

  return (
    <div className="vendor-container">
      <h2>Add Product</h2>
      <form className="vendor-form" onSubmit={handleSubmit}>
        <input type="text" name="productName" placeholder="Product Name" value={form.productName} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
        <input type="number" step="0.01" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input type="text" name="countryOfOrigin" placeholder="Country of Origin" value={form.countryOfOrigin} onChange={handleChange} required />
        <button type="submit">Add Product</button>
      </form>

      <h3>Vendor Products</h3>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.productName}</strong> - {product.description}<br />
            <span>Expires: {product.expiryDate} | Qty: {product.quantity} | Price: ${product.price} | Origin: {product.countryOfOrigin}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorPage;
