import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import ProfileCard from '../components/ui/ProfileCard';
import OrderCard from '../components/ui/OrderCard';
import '../components/css/ProfilePage.css';
import ProfileService from '../services/ProfileService';

const ProfilePage = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [ordersFetched, setOrdersFetched] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await ProfileService.getUserData();
        setUser(userData);
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleToggleOrders = async () => {
    if (!ordersFetched) {
      try {
        const ordersData = await ProfileService.getOrdersData();
        setOrders(ordersData);
        setOrdersFetched(true);
      } catch (error) {
        console.error('Failed to load orders:', error);
      }
    }
    setShowOrders(prev => !prev);
  };

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  // Handle logout
  const handleLogout = () => {
    // Perform logout logic here, such as clearing tokens or user data
    localStorage.removeItem('authToken'); // Example: remove auth token
    navigate('/'); // Redirect to the homepage after logout
  };

  if (!user) return <div className="profile-container">Loading profile...</div>;

  return (
    <div className="profile-container">
      <ProfileCard user={user} onProfileUpdate={handleProfileUpdate} />

      {/* Button to toggle orders */}
      <button className="btn" onClick={handleToggleOrders}>
        {showOrders ? 'Hide Orders' : 'My Orders'}
      </button>

      {/* Show orders if toggle is enabled */}
      {showOrders && (
        <div className="orders-section">
          <h3>Order History</h3>
          {orders.length > 0 ? (
            orders.map(order => <OrderCard key={order.id} order={order} />)
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      )}

      {/* Logout Button */}
      <button className="btn logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
