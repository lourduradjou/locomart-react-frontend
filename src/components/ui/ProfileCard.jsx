import React, { useState } from 'react';
import '../../components/css/ProfileCard.css';
import ProfileService from '../../services/ProfileService';

const ProfileCard = ({ user, onProfileUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const updatedUser = await ProfileService.updateUserData(formData);
      onProfileUpdate(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className="profile-card">
      <img src={user.image} alt="Profile" className="profile-img" />
      {isEditing ? (
        <>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.address}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </>
      )}
    </div>
  );
};

export default ProfileCard;
