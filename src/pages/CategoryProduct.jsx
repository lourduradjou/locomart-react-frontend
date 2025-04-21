import React, { useState, useEffect } from 'react';
import ProductService from '../services/productService';
import { useParams } from 'react-router-dom';
import productimg from '../assets/product.jpeg';
import ProductFeed from '../components/ui/ProductFeed';
import '../components/css/CategoryProduct.css'

const CategoryProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [categorizedProducts, setCategorizedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductAndSimilar = async () => {
      try {
        // Get the current product by ID
        const fetchedProduct = await ProductService.getProductById(id);
        setProduct(fetchedProduct);

        //  Get all products and filter by same type
        const allProducts = await ProductService.getAllProducts();
        const filtered = allProducts.filter(
          (item) => item.type === fetchedProduct.type && item.id !== fetchedProduct.id
        );
        setCategorizedProducts(filtered);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndSimilar();
  }, [id]);

  return (
    <main className="category-product-page">
      {loading ? (
        <p className="loading">Loading products...</p>
      ) : (
        <>
          <div className="product-main-info">
            <img
              src={productimg}
              alt="product"
              className="product-image"
            />
            <div className="product-details">
              <h2 className="product-name">{product.name}</h2>
              <p><strong>Quantity:</strong> {product.quantity}</p>
              <p><strong>Price:</strong> ₹{product.price}</p>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>
          </div>

          <div className="product-description">
            <h2><strong>Product Details</strong></h2>
            <p>{product.description || "No description available."}</p>
          </div>

          <div className="more-products">
            <h2><strong>More products in this category</strong></h2>
            <ProductFeed
              products={categorizedProducts}
              category={product.type}
            />
          </div>
        </>
      )}
    </main>
  );
};

export default CategoryProduct;
