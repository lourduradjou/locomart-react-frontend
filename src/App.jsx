import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

import './index.css'
import HomePage from './pages/HomePage'
import CategoryProduct from './pages/CategoryProduct'
import Layout from './components/ui/Layout'

import Toast from './components/ui/Toast'

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
					</Routes>
				</Router>
				<Toast />
			</main>
		</Provider>
	)
}

export default App
