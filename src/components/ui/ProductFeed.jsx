import React from 'react'
import ProductCard from './ProductCard'
import '../css/ProductFeed.css'

const ProductFeed = ({ products,category }) => {
  return (
    <>
      <h2 className='productCategory'>{category}</h2>
      <ul className='productFeed'>
        { products.map((product, index) => (
          <li key={index}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ProductFeed
