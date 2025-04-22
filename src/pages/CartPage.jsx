import React, { useEffect, useState } from 'react';
import CartCard from '../components/ui/CartCard';  // Assuming you have a CartCard component
import cartService from '../services/CartService';
import '../components/css/CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch cart data on component mount
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const data = await cartService.getCartData();
        console.log(data);
        setCartItems(data);  // Ensure it's an array if 'data.cart' is undefined
        calculateTotalPrice(data);  // Calculate total price with an empty array fallback
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, []);

  // Calculate the total price of all items in the cart
  const calculateTotalPrice = (items) => {
    if (Array.isArray(items)) {
      const total = items.reduce((sum, item) => sum + (item.pricePerUnit * item.quantity), 0);
      console.log(total);
      setTotalPrice(total); // Update the total price
    }
  };

  // Handle quantity update
  const handleUpdateQuantity = (updatedItem) => {
    setCartItems((prevItems) => prevItems.map((item) => 
      item.id === updatedItem.id ? updatedItem : item
    ));
    calculateTotalPrice(cartItems);  // Recalculate the total price after update
  };

  // Handle item removal
  const handleRemoveItem = async (itemId) => {
    try {
      await cartService.removeCartItem(itemId);
      setCartItems(cartItems.filter(item => item.id !== itemId));  // Remove item from state
      calculateTotalPrice(cartItems);  // Recalculate the total price
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <CartCard
              key={item.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          ))
        )}
      </div>
      <div className="cart-total">
        <p>Total Price: ₹{totalPrice}</p>
      </div>
    </div>
  );
};

export default CartPage;
