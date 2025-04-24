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

    useEffect(() => {
        const fetchVendorDetails = async () => {
            if (product?.vendor_id) {
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
        <main className="max-w-6xl mx-auto px-4 py-8">
            {loading || !product ? (
                <div className="flex justify-center items-center h-60">
                    <p className="text-lg font-medium text-gray-600">Loading products...</p>
                </div>
            ) : (
                <>
                    {/* Product Info */}
                    <div className="bg-white shadow-md rounded-xl p-6 mb-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <img
                            src={productimg}
                            alt={product.name}
                            className="w-50 h-50 object-cover rounded-lg"
                        />
                        <div className="flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    {product.name}
                                </h2>
                                <p className="text-gray-600 mb-1">
                                    <strong>Quantity:</strong> {product.quantity}
                                </p>
                                <p className="text-gray-600 mb-4">
                                    <strong>Price:</strong>{' '}
                                    <span className="text-green-600 font-semibold">
                                        ₹{product.price}
                                    </span>
                                </p>
                            </div>
                            <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="bg-white shadow-md rounded-xl p-6 mb-10">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Product Details
                        </h2>
                        <p className="text-gray-700">
                            {product.description || 'No description available.'}
                        </p>
                    </div>

                    {/* Vendor Info */}
                    {vendor && (
                        <div className="bg-white shadow-md rounded-xl p-6 mb-10">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Vendor Details
                            </h2>
                            <p className="text-gray-700">
                                Shop name: <strong>{vendor.shop_name}</strong>
                            </p>
                            <p className="text-gray-700">
                                Email: <strong>{vendor.email}</strong>
                            </p>
                            <p className="text-gray-700">
                                Contact Number: <strong>{vendor.phone_number}</strong>
                            </p>
                            <p className="text-gray-700">{vendor.city}</p>
                        </div>
                    )}

                    {/* More Products */}
                    <div className="bg-white shadow-md rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            More products in this category
                        </h2>
                        <ProductFeed products={categorizedProducts} category={product.type} />
                    </div>
                </>
            )}
        </main>
    )
}

export default CategoryProduct
