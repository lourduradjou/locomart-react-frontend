import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

import './index.css'
import HomePage from './pages/HomePage'
import CategoryProduct from './pages/CategoryProduct'
import Layout from './components/ui/Layout'
import Navbar from './components/ui/Navbar.jsx'
import Toast from './components/ui/Toast'
import AllProductsInCategory from './pages/AllProductsInCategory.jsx'
import OrdersPage from './pages/ProfileOrder'
import PaymentsPage from './pages/ProfilePayment'
import ProfilePage from './pages/ProfilePage'
import CartPage from './pages/CartPage'
import VendorPage from './pages/VendorPage'

function App() {
	const [cart,setCart]=useState([]);
	return (
		<Provider store={store}>
			<Router>
				<main className='bg-white min-h-screen'>
					<Routes>
						<Route element={<Layout />}>
							<Route path='/' element={<HomePage />} />
							<Route path='/product/:id' element={<CategoryProduct />} />
							<Route path='/product/category/:category' element={<AllProductsInCategory />} />
							<Route path='/profile' element={<ProfilePage/>} />
							<Route path='/cart' element={<CartPage/>} />
							<Route path="/profile/orders" element={<OrdersPage />} />
							<Route path="/profile/payments" element={<PaymentsPage />} />
							<Route path='/vendor' element={<VendorPage/>} />
						</Route>
					</Routes>
					<Toast />
				</main>
			</Router>
		</Provider>
	)
}

export default App