import React, { useState, useEffect } from 'react';
import OrderCard from '../components/ui/OrderCard';
import ProfileService from '../services/ProfileService';
import '../components/css/ProfileOrder.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await ProfileService.getOrdersData();
        setOrders(ordersData);
      } catch (error) {
        console.error('Failed to load orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h2>Order History</h2>
      {loading ? (
        <p className="loader">Loading orders...</p>
      ) : orders.length > 0 ? (
        <div className="orders-container">
          {orders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className="no-orders-message">No orders found.</p>
      )}
    </div>
  );
};

export default OrdersPage;
