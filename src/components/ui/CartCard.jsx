import React, { useState } from 'react'

const CartCard = ({ item, onUpdateQuantity, onRemoveItem }) => {
    const [quantity, setQuantity] = useState(item.quantity)

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value)
        if (newQuantity >= 1) {
            setQuantity(newQuantity)
            onUpdateQuantity({ ...item, quantity: newQuantity })
        }
    }

    const handleRemoveClick = () => {
        onRemoveItem(item.id)
    }

    const incrementQuantity = () => {
        setQuantity((prev) => {
            const newQuantity = prev + 1
            onUpdateQuantity({ ...item, quantity: newQuantity })
            return newQuantity
        })
    }

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => {
                const newQuantity = prev - 1
                onUpdateQuantity({ ...item, quantity: newQuantity })
                return newQuantity
            })
        }
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-between bg-white p-5 rounded-2xl shadow-md border hover:shadow-xl transition-shadow duration-200">
            <div className="w-full md:w-2/3 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">{item.item}</h3>
                <p className="text-sm text-gray-500">Category: {item.category}</p>
                <p className="text-sm text-gray-500">Price per unit: ₹{item.pricePerUnit}</p>
                <p className="text-base font-medium text-gray-700">
                    Total: ₹{item.pricePerUnit * quantity}
                </p>
            </div>

            <div className="w-full md:w-1/3 mt-4 md:mt-0 flex flex-col items-center md:items-end gap-4">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={decrementQuantity}
                        className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold text-xl"
                    >
                        –
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-14 text-center border border-gray-300 rounded-md py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        min="1"
                    />
                    <button
                        onClick={incrementQuantity}
                        className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold text-xl"
                    >
                        +
                    </button>
                </div>

                <button
                    onClick={handleRemoveClick}
                    className="text-red-500 hover:text-red-700 font-medium text-sm transition duration-150"
                >
                    Remove
                </button>
            </div>
        </div>
    )
}

export default CartCard
