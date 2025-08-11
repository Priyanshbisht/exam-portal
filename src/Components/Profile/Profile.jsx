import React, { useState } from 'react';
import './Profile.css';
import { FaUserCircle } from 'react-icons/fa';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    address: '123 Main Street, Springfield'
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-heading">👤 Profile</h2>
      <div className="profile-top">
        <FaUserCircle size={80} />
        <div className="profile-email">{user.email}</div>
      </div>

      <div className="profile-info">
        <label>Name:</label>
        {isEditing ? (
          <input name="name" value={user.name} onChange={handleChange} />
        ) : (
          <p>{user.name}</p>
        )}

        <label>Address:</label>
        {isEditing ? (
          <input name="address" value={user.address} onChange={handleChange} />
        ) : (
          <p>{user.address}</p>
        )}

        <button className="edit-btn" onClick={handleEditToggle}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

export default Profile;
