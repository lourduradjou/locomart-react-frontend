import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import SignUp from '@/assets/login_illustrations/SignUpBg.png'

function RegisterCustomer() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        address: '',
        city: '',
        state_region: '',
        postal_code: '',
        password: '',
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await api.post('/customer', formData)
            alert('Registration successful! Please login.')
            navigate('/login/customer')
        } catch (error) {
            alert(error.response?.data?.detail || 'Registration failed')
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-gray-100">
            <div className="flex">
                <div>
                    <img src={SignUp} width={'600px'} height={'auto'} alt="Sign_Up_Bg" />
                </div>
                <div className="w-full max-w-2xl p-8 rounded-lg shadow-md bg-gradient-to-r from-violet-600 to-indigo-600  bg-opacity-80">
                    <h2 className="text-2xl font-bold text-center mb-6 text-white">
                        LocoMart Customer Registration
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { label: 'Full Name', name: 'name' },
                            { label: 'Email', name: 'email', type: 'email' },
                            { label: 'Phone Number', name: 'phone_number' },
                            { label: 'Address', name: 'address' },
                            { label: 'City', name: 'city' },
                            { label: 'State / Region', name: 'state_region' },
                            { label: 'Postal Code', name: 'postal_code' },
                            { label: 'Password', name: 'password', type: 'password' },
                        ].map(({ label, name, type = 'text' }) => (
                            <div key={name}>
                                <label className="block tracking-wider font-montserrat text-sm font-medium text-white mb-1">
                                    {label}
                                </label>
                                <input
                                    type={type}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100"
                                />
                            </div>
                        ))}

                        <div className="md:col-span-2 font-montserrat font-lg">
                            <button
                                type="submit"
                                className="w-full  bg-white text-black font-medium text-lg py-3  hover:bg-gray-400 transition duration-300"
                            >
                                Register as Customer
                            </button>
                        </div>
                    </form>
                    <div className="md:col-span-2 font-montserrat font-lg mt-4">
                        <button
                            type="submit"
                            className="w-full  bg-white text-black font-medium text-lg py-3  hover:bg-gray-400 transition duration-300"
                        >
                            <Link to="/login/customer">Login as Customer</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterCustomer
