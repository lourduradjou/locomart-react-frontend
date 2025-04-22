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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const updatedUser = { ...user, image: reader.result }; // Base64 encoded image
        setFormData(updatedUser);
        
        // Optionally update the image on the server
        try {
          await ProfileService.updateUserData(updatedUser); // Assuming backend updates the image
          onProfileUpdate(updatedUser);
        } catch (error) {
          console.error('Failed to update profile image on the server:', error);
        }
      };
      reader.readAsDataURL(file); // Convert image file to base64 string
    }
  };

  return (
    <div className="profile-card">
      <div className="profile-img-container">
        <img
          src={user.image}
          alt="Profile"
          className="profile-img"
          onClick={() => document.getElementById('image-upload').click()}
        />
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </div>

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
