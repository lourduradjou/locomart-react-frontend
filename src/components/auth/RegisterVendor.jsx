import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

function RegisterVendor() {
    const [formData, setFormData] = useState({
        shop_name: '',
        name: '',
        phone_number: '',
        email: '',
        password: '',
        address: '',
        city: '',
        state_region: '',
        postal_code: '',
    })

    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const validate = () => {
        const newErrors = {}
        if (!formData.phone_number.match(/^\d{10}$/)) {
            newErrors.phone_number = 'Phone number must be 10 digits'
        }
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            newErrors.email = 'Invalid email address'
        }
        if (formData.password.length < 6 || formData.password.length > 12) {
            newErrors.password = 'Password must be 6-12 characters long'
        }
        if (formData.password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return

        try {
            await api.post('/vendors', {
                ...formData,
                rating: 0,
                active_status: true,
            })
            navigate('/login/vendor')
        } catch (err) {
            alert(`Exception while doing something: ${err}`)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center">Register Vendor</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        { label: 'Shop Name', name: 'shop_name' },
                        { label: 'Your Name', name: 'name' },
                        { label: 'Phone Number', name: 'phone_number' },
                        { label: 'Email', name: 'email', type: 'email' },
                        { label: 'Password', name: 'password', type: 'password' },
                        { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
                        { label: 'Address', name: 'address' },
                        { label: 'City', name: 'city' },
                        { label: 'State/Region', name: 'state_region' },
                        { label: 'Postal Code', name: 'postal_code' },
                    ].map(({ label, name, type = 'text' }) => (
                        <div key={name}>
                            <label className="block text-sm font-medium text-gray-700">
                                {label}
                            </label>
                            <input
                                type={type}
                                name={name}
                                value={
                                    name === 'confirmPassword'
                                        ? confirmPassword
                                        : formData[name] || ''
                                }
                                onChange={
                                    name === 'confirmPassword'
                                        ? (e) => setConfirmPassword(e.target.value)
                                        : handleChange
                                }
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                            />
                            {errors[name] && (
                                <p className="text-sm text-red-500 mt-1">{errors[name]}</p>
                            )}
                        </div>
                    ))}

                    <div className="flex items-center">
                        <input type="checkbox" id="terms" required className="mr-2" />
                        <label htmlFor="terms" className="text-sm text-gray-600">
                            I agree to the Terms and Conditions
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Sign Up
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-indigo-600 hover:underline">
                            Login here
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default RegisterVendor
