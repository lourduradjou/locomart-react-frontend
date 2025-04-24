import React, { useState } from 'react'
import ProfileService from '../../services/ProfileService'

const ProfileCard = ({ user, onProfileUpdate }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState(user)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSave = async () => {
        try {
            const updatedUser = await ProfileService.updateUserData(formData)
            onProfileUpdate(updatedUser)
            setIsEditing(false)
        } catch (error) {
            console.error('Failed to update profile:', error)
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = async () => {
                const updatedUser = { ...user, image: reader.result }
                setFormData(updatedUser)
                try {
                    await ProfileService.updateUserData(updatedUser)
                    onProfileUpdate(updatedUser)
                } catch (error) {
                    console.error('Failed to update profile image:', error)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="profile-card">
            <div className="profile-img-container">
                <img
                    src={formData.image}
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
                <div className="profile-form">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="profile-input"
                        placeholder="Full Name"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="profile-input"
                        placeholder="Email"
                    />
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="profile-input"
                        placeholder="Address"
                    />
                    <button onClick={handleSave} className="profile-button full-width">
                        Save Changes
                    </button>
                </div>
            ) : (
                <div className="profile-info">
                    <h2 className="profile-name">{user.name}</h2>
                    <p className="profile-email">{user.email}</p>
                    <p className="profile-address">{user.address}</p>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="profile-button full-width"
                    >
                        Edit Profile
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfileCard
