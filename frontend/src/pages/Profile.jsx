import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import '../styles/Profile.css'

const Profile = () => {
  const { currentUser, isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return (
      <div className="profile-container">
        <h1>My Profile</h1>
        <div className="profile-card">
          <p>Please <Link to="/login">login</Link> to view your demo profile.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-image">
            <div className="avatar">👤</div>
          </div>
          <div className="profile-info">
            <h2>{currentUser.name}</h2>
            <p>{currentUser.email}</p>
            <p>{currentUser.phone}</p>
          </div>
        </div>
        <div className="profile-actions">
          <button className="edit-btn">Edit Profile</button>
          <button className="password-btn">Change Password</button>
        </div>
      </div>
    </div>
  )
}

export default Profile
