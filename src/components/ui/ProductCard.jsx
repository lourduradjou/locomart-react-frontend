import React from 'react'
import '../css/ProductCard.css'
import productimg from '../../assets/product.jpeg'

const ProductCard = ({ product }) => {
  return (
    <div className='productCard'>
      <img className='productImage' src={productimg} alt="image"></img>
      <p className='productName'>
          {product.name.length > 16 ? product.name.slice(0, 12) + '...' : product.name}
      </p>
      <div className="productDetails">
        <p className='quantity'><strong>Qnty:</strong> {product.quantity}</p>
        <div className='productBottom'>
          <p className='price'><strong>₹</strong> {product.price}</p>
          <button className='addButton'>ADD</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
