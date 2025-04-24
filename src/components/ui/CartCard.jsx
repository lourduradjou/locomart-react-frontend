import React, { useState } from 'react'

const CartCard = ({ item, onUpdateQuantity, onRemoveItem }) => {
    const [quantity, setQuantity] = useState(item.quantity)

    // Handle quantity change
    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value)

        if (newQuantity >= 1) {
            setQuantity(newQuantity)
            onUpdateQuantity({ ...item, quantity: newQuantity }) // Update cart item quantity in parent
        }
    }

    // Handle remove item click
    const handleRemoveClick = () => {
        onRemoveItem(item.id) // Remove item from cart using its ID
    }

    // Increment quantity
    const incrementQuantity = () => {
        setQuantity((prevQuantity) => {
            const newQuantity = prevQuantity + 1
            onUpdateQuantity({ ...item, quantity: newQuantity })
            return newQuantity
        })
    }

    // Decrement quantity
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => {
                const newQuantity = prevQuantity - 1
                onUpdateQuantity({ ...item, quantity: newQuantity })
                return newQuantity
            })
        }
    }

    return (
        <div className="cart-card">
            <div className="cart-card-details">
                <h3>{item.item}</h3>
                <p>Category: {item.category}</p>
                <p>Price per unit: ₹{item.pricePerUnit}</p>
                <p>Total: ₹{item.pricePerUnit * quantity}</p>
            </div>

            <div className="cart-card-actions">
                <div className="quantity-control">
                    <button onClick={decrementQuantity}>-</button>
                    <input
                        type="number"
                        id="quantity"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                    <button onClick={incrementQuantity}>+</button>
                </div>

                <button className="remove-item-btn" onClick={handleRemoveClick}>
                    Remove
                </button>
            </div>
        </div>
    )
}

export default CartCard
