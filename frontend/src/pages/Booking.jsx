import React from 'react'
import MapComponent from '../components/MapComponent'
import '../styles/Booking.css'

const Booking = () => {
  const [pickup, setPickup] = React.useState('')
  const [dropoff, setDropoff] = React.useState('')
  const [fare, setFare] = React.useState(0)

  const handleLocationSelect = (location) => {
    console.log('Selected location:', location)
  }

  const handleBooking = (e) => {
    e.preventDefault()
    console.log('Booking submitted:', { pickup, dropoff })
    // API call to backend
  }

  return (
    <div className="booking-container">
      <h1>Book Your Taxi</h1>
      
      <div className="booking-map">
        <MapComponent onLocationSelect={handleLocationSelect} />
      </div>

      <form className="booking-form" onSubmit={handleBooking}>
        <div className="form-group">
          <label>Pickup Location</label>
          <input
            type="text"
            placeholder="Enter pickup address"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Dropoff Location</label>
          <input
            type="text"
            placeholder="Enter destination address"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            required
          />
        </div>

        <div className="fare-info">
          <p>Estimated Fare: <strong>${fare.toFixed(2)}</strong></p>
        </div>

        <button type="submit" className="book-btn">
          Book Now
        </button>
      </form>
    </div>
  )
}

export default Booking
