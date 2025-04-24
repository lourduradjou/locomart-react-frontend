import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

function LoginVendor() {
    const [shopName, setShopName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post('/login/vendor', {
                shop_name: shopName,
                password: password,
            })
            localStorage.setItem('access', res.data.access_token)
            navigate('/') // Or wherever the vendor goes
        } catch (error) {
            alert('Invalid credentials or server error')
            console.error(error)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Vendor Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700">Shop Name</label>
                        <input
                            type="text"
                            value={shopName}
                            onChange={(e) => setShopName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginVendor
