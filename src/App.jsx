import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

import './index.css'
import HomePage from './pages/HomePage'
import CategoryProduct from './pages/CategoryProduct'
import Layout from './components/ui/Layout'
import OrdersPage from './pages/ProfileOrder'
import PaymentsPage from './pages/ProfilePayment'
import Toast from './components/ui/Toast'
import ProfilePage from './pages/ProfilePage'
import CartPage from './pages/CartPage'
import VendorPage from './pages/VendorPage'

function App() {
	return (
		<Provider store={store}>
			<main className='bg-black min-h-screen'>
				<Router>
					<Routes>
						 <Route element={<Layout />}>
							<Route path='/' element={<HomePage />} />
							<Route
								path='/product/:id'
								element={<CategoryProduct />}
							/>
						</Route>
						<Route path='/profile' element={<ProfilePage/>} />
						<Route path='/cart' element={<CartPage/>} />
						<Route path="/profile/orders" element={<OrdersPage />} />
						<Route path="/profile/payments" element={<PaymentsPage />} />
						<Route path='/vendor' element={<VendorPage/>} />
					</Routes>
				</Router>
				<Toast />
			</main>
		</Provider>
	)
}

export default App
