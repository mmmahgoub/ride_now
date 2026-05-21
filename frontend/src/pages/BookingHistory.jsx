import React from 'react'
import '../styles/BookingHistory.css'

const BookingHistory = () => {
  const [bookings] = React.useState([
    {
      id: 1,
      date: '2024-01-15',
      pickup: 'Downtown Mall',
      dropoff: 'Airport Terminal',
      fare: 45.50,
      status: 'completed',
      driver: 'Ahmed Khan'
    },
    {
      id: 2,
      date: '2024-01-14',
      pickup: 'City Center',
      dropoff: 'Hotel XYZ',
      fare: 32.75,
      status: 'completed',
      driver: 'Mohammed Ali'
    }
  ])

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
