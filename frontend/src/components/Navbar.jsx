import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi'
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🚕 Taxi Booking
        </Link>

        <div className="navbar-toggle" onClick={toggleMenu}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>

        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/booking" className="nav-link">Book Taxi</Link>
          <Link to="/history" className="nav-link">History</Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="nav-link">
                <FiUser /> Profile
              </Link>
              <button className="nav-btn logout-btn">
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <button className="nav-btn login-btn">Login</button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
