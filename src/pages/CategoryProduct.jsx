import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductService from '../services/productService'
import VendorService from '../services/VendorService'
import productimg from '../assets/product.jpeg'
import ProductFeed from '../components/ui/ProductFeed'

const CategoryProduct = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [categorizedProducts, setCategorizedProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [vendor, setVendor] = useState(null)

    // Assuming you have a way to get customerId, e.g., from localStorage or context
    const customerId = localStorage.getItem('customerId')

    useEffect(() => {
        const fetchProductAndSimilar = async () => {
            try {
                const fetchedProduct = await ProductService.getProductById(id)
                setProduct(fetchedProduct)

                const allProducts = await ProductService.getAllProducts()
                const filtered = allProducts.filter(
                    (item) => item.type === fetchedProduct.type && item.id !== fetchedProduct.id
                )
                setCategorizedProducts(filtered)
            } catch (error) {
                console.error('Error fetching product data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProductAndSimilar()
    }, [id])

    // Then fetch vendor once product is loaded
    useEffect(() => {
        const fetchVendorDetails = async () => {
            if (product && product.vendor_id) {
                try {
                    const vendorData = await VendorService.getVendorById(product.vendor_id)
                    setVendor(vendorData)
                } catch (error) {
                    console.error('Error fetching vendor data:', error)
                }
            }
        }

        fetchVendorDetails()
    }, [product])

    return (
        <main className="category-product-page">
            {loading || !product ? (
                <p className="loading">Loading products...</p>
            ) : (
                <>
                    <div className="product-main-info">
                        <img src={productimg} alt="product" className="product-image" />
                        <div className="product-details">
                            <h2 className="product-name">{product.name}</h2>
                            <p>
                                <strong>Quantity:</strong> {product.quantity}
                            </p>
                            <p>
                                <strong>Price:</strong> ₹{product.price}
                            </p>
                            <button className="add-to-cart-btn">Add to Cart</button>
                        </div>
                    </div>

                    <div className="product-description">
                        <h2>
                            <strong>Product Details</strong>
                        </h2>
                        <p>{product.description || 'No description available.'}</p>
                    </div>

                    {vendor && (
                        <div className="vendor-description">
                            <h2>
                                <strong>Vendor Details</strong>
                            </h2>
                            <p>{vendor.shopname}</p>
                            <p>{vendor.email}</p>
                            <p>{vendor.address}</p>
                            <p>{vendor.city}</p>
                        </div>
                    )}

                    <div className="more-products">
                        <h2>
                            <strong>More products in this category</strong>
                        </h2>
                        <ProductFeed products={categorizedProducts} category={product.type} />
                    </div>
                </>
            )}
        </main>
    )
}

export default CategoryProduct
