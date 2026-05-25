import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth, getDemoBookings } from '../AuthContext'
import '../styles/BookingHistory.css'

const BookingHistory = () => {
  const { currentUser, isLoggedIn } = useAuth()
  const bookings = isLoggedIn ? getDemoBookings(currentUser.phone) : []

  if (!isLoggedIn) {
    return (
      <div className="history-container">
        <h1>Booking History</h1>
        <p>Please <Link to="/login">login</Link> to view your demo booking history.</p>
      </div>
    )
  }

  return (
    <div className="history-container">
      <h1>Booking History</h1>
      <div className="bookings-list">
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <div className="booking-header">
              <span className="date">{booking.date}</span>
              <span className={`status ${booking.status}`}>{booking.status}</span>
            </div>
            <div className="booking-details">
              <p><strong>From:</strong> {booking.pickup}</p>
              <p><strong>To:</strong> {booking.dropoff}</p>
              <p><strong>Driver:</strong> {booking.driver}</p>
              <p><strong>Fare:</strong> ${booking.fare}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookingHistory
