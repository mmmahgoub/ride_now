import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import './DriverDashboard.css'

const DriverDashboard = () => {
  const [isOnline, setIsOnline] = useState(false)
  const [currentLocation, setCurrentLocation] = useState({
    lat: 25.2854,
    lng: 55.3641
  })
  const [rides, setRides] = useState([])
  const [activeRide, setActiveRide] = useState(null)
  const socket = React.useRef(null)

  useEffect(() => {
    // Initialize socket connection
    socket.current = io(import.meta.env.VITE_API_URL || 'http://localhost:5000')

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        setCurrentLocation(location)
        // Emit location to server
        socket.current.emit('driver-location', location)
      })
    }

    // Listen for ride requests
    socket.current.on('ride-request', (ride) => {
      setRides(prev => [...prev, ride])
    })

    return () => socket.current?.disconnect()
  }, [])

  const handleAcceptRide = (ride) => {
    setActiveRide(ride)
    socket.current.emit('ride-accepted', ride.id)
  }

  const containerStyle = {
    width: '100%',
    height: '400px'
  }

  return (
    <div className="driver-dashboard">
      <h1>Driver Dashboard</h1>
      
      <div className="status-section">
        <button 
          className={`toggle-btn ${isOnline ? 'online' : 'offline'}`}
          onClick={() => setIsOnline(!isOnline)}
        >
          {isOnline ? '🟢 Online' : '🔴 Offline'}
        </button>
        <p>Earnings Today: $150.00</p>
      </div>

      <div className="map-section">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap mapContainerStyle={containerStyle} center={currentLocation} zoom={13}>
            <MarkerF position={currentLocation} title="Your Location" />
          </GoogleMap>
        </LoadScript>
      </div>

      <div className="rides-section">
        <h2>Incoming Ride Requests</h2>
        {rides.length === 0 ? (
          <p className="no-rides">No ride requests at the moment</p>
        ) : (
          <div className="rides-list">
            {rides.map((ride) => (
              <div key={ride.id} className="ride-card">
                <p><strong>Pickup:</strong> {ride.pickup}</p>
                <p><strong>Dropoff:</strong> {ride.dropoff}</p>
                <p><strong>Fare:</strong> ${ride.fare}</p>
                <button 
                  className="accept-btn"
                  onClick={() => handleAcceptRide(ride)}
                >
                  Accept Ride
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {activeRide && (
        <div className="active-ride">
          <h2>Current Ride</h2>
          <p>Passenger: {activeRide.passengerName}</p>
          <p>Destination: {activeRide.dropoff}</p>
          <button className="complete-btn">Complete Ride</button>
        </div>
      )}
    </div>
  )
}

export default DriverDashboard
