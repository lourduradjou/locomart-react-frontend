import React, { useEffect, useState } from 'react';
import CartCard from '../components/ui/CartCard';
import cartService from '../services/CartService';
import '../components/css/CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const data = await cartService.getCartData();
        setCartItems(data);
        calculateTotalPrice(data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, []);

  const calculateTotalPrice = (items) => {
    if (Array.isArray(items)) {
      const total = items.reduce(
        (sum, item) => sum + item.pricePerUnit * item.quantity,
        0
      );
      setTotalPrice(total);
    }
  };

  const handleUpdateQuantity = (updatedItem) => {
    const updatedCart = cartItems.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setCartItems(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await cartService.removeCartItem(itemId);
      const updatedCart = cartItems.filter((item) => item.id !== itemId);
      setCartItems(updatedCart);
      calculateTotalPrice(updatedCart);
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  const handleCheckout = () => {
    // You can replace this with navigation to a payment/delivery page
    alert('Proceeding to checkout...');
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

        {cartItems.length > 0 && (
          <button className="checkout-button" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default CartPage;
