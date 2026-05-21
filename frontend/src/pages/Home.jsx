import React from 'react'
import '../styles/Home.css'

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to Taxi Booking Platform</h1>
        <p>Book your ride in seconds with real-time tracking</p>
        <button className="hero-btn">Book Now</button>
      </section>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">📍</span>
            <h3>Real-time Tracking</h3>
            <p>Track your taxi in real-time on the map</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💰</span>
            <h3>Fair Pricing</h3>
            <p>Transparent pricing with no hidden charges</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">👨‍✈️</span>
            <h3>Verified Drivers</h3>
            <p>All drivers are background verified</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">⭐</span>
            <h3>5-Star Ratings</h3>
            <p>High-quality service with ratings</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
