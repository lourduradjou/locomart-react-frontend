import React, { useEffect, useState } from 'react'
import CartCard from '../components/ui/CartCard'
import cartService from '../services/CartService'

const user = {
    name: 'John Doe',
    email: 'john@example.com',
    contact: '9999999999',
}

const CartPage = () => {
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [paymentSuccess, setPaymentSuccess] = useState(null)

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const data = await cartService.getCartData()
                setCartItems(data)
                calculateTotalPrice(data)
            } catch (error) {
                console.error('Error fetching cart data:', error)
            }
        }

        fetchCartData()
    }, [])

    const calculateTotalPrice = (items) => {
        if (Array.isArray(items)) {
            const total = items.reduce((sum, item) => sum + item.pricePerUnit * item.quantity, 0)
            setTotalPrice(total)
        }
    }

    const handleUpdateQuantity = (updatedItem) => {
        const updatedCart = cartItems.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
        )
        setCartItems(updatedCart)
        calculateTotalPrice(updatedCart)
    }

    const handleRemoveItem = async (itemId) => {
        try {
            await cartService.removeCartItem(itemId)
            const updatedCart = cartItems.filter((item) => item.id !== itemId)
            setCartItems(updatedCart)
            calculateTotalPrice(updatedCart)
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
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-3">
                Your Shopping Cart
            </h2>

            <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                    {cartItems.length === 0 ? (
                        <div className="text-center text-gray-500 text-lg">
                            Your cart is currently empty.
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <CartCard
                                key={item.id}
                                item={item}
                                onUpdateQuantity={handleUpdateQuantity}
                                onRemoveItem={handleRemoveItem}
                            />
                        ))
                    )}
                </div>

                <div className="sticky top-6 h-fit bg-white p-6 shadow-xl rounded-2xl border border-gray-200 space-y-6">
                    <h3 className="text-2xl font-semibold text-gray-800">Order Summary</h3>

                    <ul className="divide-y divide-gray-200">
                        {cartItems.map((item) => (
                            <li
                                key={item.id}
                                className="flex justify-between py-3 text-sm text-gray-700"
                            >
                                <span>
                                    {item.name} × {item.quantity}
                                </span>
                                <span>₹{item.pricePerUnit * item.quantity}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-between text-lg font-semibold text-gray-900 pt-4 border-t">
                        <span>Total:</span>
                        <span>₹{totalPrice}</span>
                    </div>

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
