import React from 'react'
import '../styles/Profile.css'

const Profile = () => {
  const [profile] = React.useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    profileImage: null
  })

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-image">
            {profile.profileImage ? (
              <img src={profile.profileImage} alt={profile.name} />
            ) : (
              <div className="avatar">👤</div>
            )}
          </div>
          <div className="profile-info">
            <h2>{profile.name}</h2>
            <p>{profile.email}</p>
            <p>{profile.phone}</p>
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
