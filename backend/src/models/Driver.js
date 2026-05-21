import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  profileImage: String,
  licenseNumber: {
    type: String,
    required: true,
    unique: true
  },
  licenseExpiry: Date,
  vehicle: {
    registrationNumber: {
      type: String,
      required: true,
      unique: true
    },
    model: String,
    color: String,
    year: Number,
    capacity: {
      type: Number,
      default: 4
    },
    vehicleImage: String
  },
  currentLocation: {
    latitude: Number,
    longitude: Number,
    updatedAt: Date
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  acceptanceRate: {
    type: Number,
    default: 100,
    min: 0,
    max: 100
  },
  rating: {
    type: Number,
    default: 5,
    min: 0,
    max: 5
  },
  totalRides: {
    type: Number,
    default: 0
  },
  bankAccount: {
    accountHolder: String,
    accountNumber: String,
    bankName: String,
    ifscCode: String
  },
  earnings: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  documents: [{
    type: String,
    url: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Driver = mongoose.model('Driver', driverSchema);
