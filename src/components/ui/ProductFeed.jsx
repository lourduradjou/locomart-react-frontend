import React from 'react'
import ProductCard from './ProductCard'
import '../css/ProductFeed.css'
import {Link} from 'react-router-dom'

const ProductFeed = ({ products,category }) => {
  return (
    <>
     <div className="productFeedHeader">
        <h2 className='productCategory'>{category}</h2>  
          { products.length>5?
            <h2 className='seeAll'>
              <Link to={`/product/category/${category}`}>See All &rarr;</Link>
            </h2>:''
            }
      </div>

      <ul className='productFeed'>
          { (products.slice(0,5)).map((product, index) => (
            <Link to={`/product/${product.id}`} key={product.id}>
            <li key={index}>
              <ProductCard product={product} />
            </li>
            </Link>
          ))}
      </ul>
    </>
  )
}

export default ProductFeed