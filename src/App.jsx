import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

import './index.css'
import HomePage from './pages/HomePage'
import CategoryProduct from './pages/CategoryProduct'
import Layout from './components/ui/Layout'
import Navbar from './components/ui/Navbar.jsx'
import Toast from './components/ui/Toast'
import AllProductsInCategory from './pages/AllProductsInCategory'
import OrdersPage from './pages/ProfileOrder'
import PaymentsPage from './pages/ProfilePayment'
import ProfilePage from './pages/ProfilePage'
import CartPage from './pages/CartPage'
import VendorPage from './pages/VendorPage'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'
import cartService from './services/CartService.js'
// import Login from "./components/auth/Login";
// import SignUp from "./components/auth/SignUp";

function App() {
    const [cartId, setCartId] = useState(null)

    useEffect(() => {
        const getCartId = async () => {
            try {
                const response = await cartService.createNewCart(1)
                setCartId(response.id)
            } catch (error) {
                console.error('Error creating new cart:', error)
            }
        }
        getCartId()
    }, [])

    useEffect(() => {
        if (cartId) {
            localStorage.setItem('cartId', cartId)
        }
    }, [cartId])

    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route element={<Layout />}>
                        {/* <Route path="/login" element={<Login />} /> */}
                        {/* <Route path="/register" element={<SignUp />} /> */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/product/:id" element={<CategoryProduct />} />
                        <Route
                            path="/product/category/:category"
                            element={<AllProductsInCategory />}
                        />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/profile/orders" element={<OrdersPage />} />
                        <Route path="/profile/payments" element={<PaymentsPage />} />
                        <Route path="/vendor" element={<VendorPage />} />
                    </Route>
                </Routes>
                <Toast />
            </Router>
        </Provider>
    )
}

export default App
