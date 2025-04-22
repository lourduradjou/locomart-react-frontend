import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ui/ProfileCard';
import '../components/css/ProfilePage.css';
import ProfileService from '../services/ProfileService';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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
    navigate('/profile/orders');  // Navigate to OrdersPage
  };

  const handlePaymentsClick = () => {
    navigate('/profile/payments');  // Navigate to PaymentsPage
  };

  if (!user) {
    return <div className="profile-container">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <section className="profile-section">
        <ProfileCard user={user} onProfileUpdate={handleProfileUpdate} />
      </section>

      <section className="orders-toggle">
        <button className="btn" onClick={handleOrdersClick}>
          My Orders
        </button>
      </section>

      <section className="payments-toggle">
        <button className="btn" onClick={handlePaymentsClick}>
          Payment History
        </button>
      </section>

      <section className="logout-section">
        <button className="btn logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </section>
    </div>
  );
};

export default ProfilePage;
