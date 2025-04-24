import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductService from '../services/productService'
import Loader from '../components/ui/Loader'
import ProductCard from '../components/ui/ProductCard'
import { Link } from 'react-router-dom'

const AllProductsInCategory = () => {
    const { category } = useParams()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true) // to show loading state

    useEffect(() => {
        const getProducts = async () => {
            const fetchedProducts = await ProductService.getAllProducts()
            setProducts(fetchedProducts)
            setLoading(false)
        }
        getProducts()
    }, [])

    // Grouping products by type (category)
    const groupedProducts =
        products.length > 0 ? products.filter((product) => product.type === category) : {}

    return (
        <main>
            <div className="products-dashboard">
                <h1>{category} Products</h1>
                {loading ? (
                    <Loader />
                ) : (
                    <div className="product-grid">
                        {groupedProducts.map((product) => (
                            <Link to={`/product/${product.id}`} key={product.id}>
                                <ProductCard key={product.id} product={product} />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}

export default AllProductsInCategory
