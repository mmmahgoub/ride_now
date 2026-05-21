import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    default: null
  },
  pickupLocation: {
    address: String,
    latitude: Number,
    longitude: Number,
    required: true
  },
  dropoffLocation: {
    address: String,
    latitude: Number,
    longitude: Number,
    required: true
  },
  distance: Number, // in km
  fare: Number, // calculated fare
  paymentMethod: {
    type: String,
    enum: ['card', 'wallet', 'cash'],
    default: 'cash'
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  scheduledTime: Date,
  pickupTime: Date,
  dropoffTime: Date,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  review: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Booking = mongoose.model('Booking', bookingSchema);
