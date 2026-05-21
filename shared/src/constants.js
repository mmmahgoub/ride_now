// API configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

// Google Maps configuration
export const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

// Socket.io configuration
export const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000'

// Application settings
export const BOOKING_SETTINGS = {
  MINIMUM_FARE: 5,
  PRICE_PER_KM: 1.5,
  PRICE_PER_MINUTE: 0.25,
  WAITING_CHARGE: 0.5
}

// Status constants
export const BOOKING_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
}

export const DRIVER_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  BUSY: 'busy'
}
