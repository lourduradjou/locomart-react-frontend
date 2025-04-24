[3:54 AM, 4/25/2025] Arun Kumar: import React, { useEffect, useState } from 'react'
import ProductService from '../../services/productService'

const CartCard = ({ item, onUpdateQuantity, onRemoveItem }) => {
    const [quantity, setQuantity] = useState(item.quantity)
    const [currentItem, setCurrentItem] = useState(null)

    useEffect(() => {
        if (quantity !== item.quantity) {
            onUpdateQuantity({ ...item, quantity })
        }
    }, [quantity])

    useEffect(() => {
        const fetchItem = async () => {
            const data = await ProductService.getProductById(item.product_id)
            setCurrentItem(data)
        }
        fetchItem()
    }, [item.product_id])

    // Handle quantity change
    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value)
        if (newQuantity >= 1) {
            setQuantity(newQuantity)
        }
    }

    // Handle remove item click
    const handleRemoveClick = () => {
        onRemoveItem(item.product_id) // Remove item from cart using its ID
    }

    // Increment quantity
    const incrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1)
    }

    // Decrement quantity
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1)
        }
    }

    if (!currentItem) {
        return <div className="cart-card">Loading...</div>
    } else {
        return (
            <div className="cart-card flex flex-col md:flex-row justify-between items-center gap-6 p-4 bg-white rounded-xl shadow-md border">
                <div className="cart-card-details w-full md:w-2/3 space-y-1">
                    <h3 className="text-lg font-semibold text-gray-800">{currentItem.name}</h3>
                    <p className="text-gray-600">
                        Category: <span className="font-medium">{currentItem.type}</span>
                    </p>
                    <p className="text-gray-600">Price per unit: ₹{currentItem.price}</p>
                    <p className="text-gray-800 font-semibold">
                        Total: ₹{currentItem.price * quantity}
                    </p>
                </div>

                <div className="cart-card-actions flex flex-col md:flex-row items-center gap-4">
                    <div className="quantity-control flex items-center gap-2">
                        <button
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            onClick={decrementQuantity}
                        >
                            -
                        </button>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="w-16 text-center border border-gray-300 rounded px-2 py-1"
                        />
                        <button
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            onClick={incrementQuantity}
                        >
                            +
                        </button>
                    </div>

                    <button
                        className="remove-item-btn text-red-600 hover:text-red-800 font-medium"
                        onClick={handleRemoveClick}
                    >
                        Remove
                    </button>
                </div>
            </div>
        )
    }
}

export default CartCard
[3:54 AM, 4/25/2025] Arun Kumar: import React, { useEffect, useState } from 'react'
import CartCard from '../components/ui/CartCard'
import cartService from '../services/CartService'
import ProductService from '../services/productService'

const CartPage = () => {
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const cartId = localStorage.getItem('cartId')
    const [paymentSuccess, setPaymentSuccess] = useState(null)

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const data = await cartService.getCartData(cartId)
                setCartItems(data)
                calculateTotalPrice(data)
            } catch (error) {
                console.error('Error fetching cart data:', error)
            }
        }

        fetchCartData()
    }, [cartItems])

    const calculateTotalPrice = async (items) => {
        const productPromises = await items.map((item) =>
            ProductService.getProductById(item.product_id)
        )
        const products = await Promise.all(productPromises)

        const total = items.reduce((sum, item, idx) => {
            return sum + products[idx].price * item.quantity
        }, 0)

        setTotalPrice(total)
    }

    const handleUpdateQuantity = async (updatedItem) => {
        const response = cartService.updateCartItem(cartId, updatedItem)
        const updatedCart = cartItems.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
        )
        setCartItems(updatedCart)
        calculateTotalPrice(updatedCart)
    }

    const handleRemoveItem = async (itemId) => {
        try {
            await cartService.removeCartItem(cartId, itemId)
            const updatedCart = cartItems.filter((item) => item.id !== itemId)
            setCartItems(updatedCart)
            calculateTotalPrice(updatedCart)
            fetchCartData()
        } catch (error) {
            console.error('Error removing cart item:', error)
        }
    }

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = 'https://checkout.razorpay.com/v1/checkout.js'
            script.onload = () => resolve(true)
            script.onerror = () => resolve(false)
            document.body.appendChild(script)
        })
    }

    const handlePayment = async () => {
        const res = await loadRazorpayScript()
        if (!res) {
            alert('Failed to load Razorpay SDK. Please try again later.')
            return
        }

        const options = {
            key: 'rzp_test_yyiv7GJ99HNJQB',
            amount: totalPrice * 100,
            currency: 'INR',
            name: 'Freelancer Hub',
            description: 'Cart Checkout',
            handler: function (response) {
                setPaymentSuccess(response)
            },
            prefill: {
                name: user.name,
                email: user.email,
                contact: user.contact,
            },
            theme: {
                color: '#1f2937',
            },
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    return (
        <div>
            <div className="cart-page px-4 py-8 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>

                <div className="cart-items space-y-4">
                    {cartItems.length === 0 ? (
                        <p className="text-gray-500 text-lg">Your cart is empty.</p>
                    ) : (
                        cartItems.map((item, index) => (
                            <CartCard
                                key={index} // ✅ fix the key warning
                                item={item}
                                onUpdateQuantity={handleUpdateQuantity}
                                onRemoveItem={handleRemoveItem}
                            />
                        ))
                    )}
                </div>

                <div className="cart-total mt-8 p-4 border rounded-lg shadow-md bg-white">
                    <p className="text-xl font-semibold text-gray-700">
                        Total Price: ₹{totalPrice}
                    </p>

                    {cartItems.length > 0 && (
                        <button
                            className="w-full py-3 text-lg bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-200"
                            onClick={handlePayment}
                        >
                            Pay Now
                        </button>
                    )}
                </div>
            </div>

            {paymentSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full space-y-5 text-center">
                        <h3 className="text-2xl font-bold text-green-600">Payment Successful</h3>
                        <p className="text-gray-700 text-sm">
                            Your order has been confirmed and a receipt has been sent to your email.
                        </p>

                        <div className="bg-gray-50 p-5 rounded-xl border text-left space-y-2 text-sm">
                            <p>
                                <span className="font-semibold">Payment ID:</span>{' '}
                                {paymentSuccess.razorpay_payment_id}
                            </p>
                            <p>
                                <span className="font-semibold">Name:</span> {user.name}
                            </p>
                            <p>
                                <span className="font-semibold">Email:</span> {user.email}
                            </p>
                            <p>
                                <span className="font-semibold">Contact:</span> {user.contact}
                            </p>
                            <p>
                                <span className="font-semibold">Amount Paid:</span> ₹{totalPrice}
                            </p>
                            <p>
                                <span className="font-semibold">Payment Method:</span> Razorpay
                            </p>
                            <p>
                                <span className="font-semibold">Date & Time:</span>{' '}
                                {new Date().toLocaleString()}
                            </p>
                        </div>

                        <button
                            className="mt-4 px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
                            onClick={() => {
                                setCartItems([])
                                setPaymentSuccess(null)
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartPage