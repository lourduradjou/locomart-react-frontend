import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

function LoginCustomer() {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('access')
        if (token) {
            navigate('/') // or home page
        }
    }, [navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post('/login/customer', {
                phone_number: phone,
                password: password,
            })
            const token = res.data.access_token
            localStorage.setItem('access', token)
            navigate('/')
        } catch (error) {
            alert(error.response?.data?.detail || 'Login failed')
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-gray-100">
            <div className="w-full max-w-md bg-white bg-opacity-80 p-8 rounded-lg shadow-lg backdrop-blur-sm">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-900 flex justify-center items-center w-full">
                        LocoMart Customer Login
                    </h2>
                    <div className="text-center mb-2 text-sm text-gray-600">
                        Connect with your regional network
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <label className="block text-gray-700 ml-2 my-1">Phone Number</label>
                        <input
                            type="text"
                            placeholder="Enter your phone number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            maxLength={15}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-gray-700 ml-2 my-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={6}
                            maxLength={12}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginCustomer
