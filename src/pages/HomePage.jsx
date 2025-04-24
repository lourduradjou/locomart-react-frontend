import React, { useEffect, useState } from "react";
import ProductFeed from "../components/ui/ProductFeed";
import ProductService from "../services/productService";
import Loader from "../components/ui/Loader";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // to show loading state

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await ProductService.getAllProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };
    getProducts();
  }, []);

  // Grouping products by type (category)
  const groupedProducts =
    products.length > 0
      ? products.reduce((acc, product) => {
          if (!acc[product.type]) {
            acc[product.type] = [];
          }
          acc[product.type].push(product);
          return acc;
        }, {})
      : {};

  return (
    <main>
      <div className="max-w-[1200px] mx-auto mt-6">
        <h1 className="text-4xl font-bold text-black">Home</h1>

        {loading ? (
          <Loader />
        ) : (
          Object.keys(groupedProducts).map((category) => (
            <ProductFeed
              key={category}
              products={groupedProducts[category]}
              category={category}
            />
          ))
        )}
      </div>
    </main>
  );
};

export default HomePage;
