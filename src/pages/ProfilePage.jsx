import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ui/ProfileCard';
import '../components/css/ProfilePage.css';
import ProfileService from '../services/ProfileService';
import OrdersPage from '../pages/ProfileOrder';  // Import OrdersPage
import PaymentsPage from '../pages/ProfilePayment';  // Import PaymentsPage

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showOrders, setShowOrders] = useState(false);  // State to toggle orders visibility
  const [showPayments, setShowPayments] = useState(false);  // State to toggle payments visibility

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

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');  // Navigate to home or login page
  };

  const handleOrdersClick = () => {
    setShowOrders(!showOrders);  // Toggle orders visibility
    setShowPayments(false);  // Hide payments if orders are being shown
  };

  const handlePaymentsClick = () => {
    setShowPayments(!showPayments);  // Toggle payments visibility
    setShowOrders(false);  // Hide orders if payments are being shown
  };

  if (!user) {
    return <div className="profile-container">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="sidebar">
      <div className="profile-avatar">
         <img
            src={user.image || 'https://via.placeholder.com/100'} // Fallback image
            alt="Profile"
            className="sidebar-profile-img"
            onClick={() => document.getElementById('image-upload').click()}
        />
      </div>

        <div className="profile-name">{user.name}</div>
        <div className="sidebar-nav">
          <a href="#" onClick={handleOrdersClick}>My Orders</a>
          <a href="#" onClick={handlePaymentsClick}>Payment History</a>
          <a href="#" onClick={handleLogout}>Logout</a>
        </div>
      </div>

      <div className="main-content">
        <div className="top-bar">
          <h2>Profile</h2>
          
        </div>
        <ProfileCard user={user} onProfileUpdate={handleProfileUpdate} />
        {showOrders && <OrdersPage userId={user.id} />}  
        {showPayments && <PaymentsPage userId={user.id} />}  
      </div>
    </div>
  );
};

export default ProfilePage;
