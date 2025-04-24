import React from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const ProductFeed = ({ products, category }) => {
  return (
    <>
      <div className="bg-green-200">
        <div className="flex justify-between px-6 pt-6">
          <h2 className="productCategory text-black capitalize">{category}</h2>
          {products.length > 5 ? (
            <h2 className="seeAll">
              <Link to={`/product/category/${category}`}>See All &rarr;</Link>
            </h2>
          ) : (
            ""
          )}
        </div>
      </div>

      <ul className="flex overflow-x-auto whitespace-nowrap scroll-smooth bg-red-200">
        {products.slice(0, 5).map((product, index) => (
          // <Link to={`/product/${product.id}`} key={product.id}>
          <li key={index}>
            <ProductCard product={product} />
          </li>
          // </Link>
        ))}
      </ul>
    </>
  );
};

export default ProductFeed;
