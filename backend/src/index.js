import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import http from 'http';

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL, process.env.DRIVER_APP_URL, process.env.ADMIN_URL],
    credentials: true
  }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/taxi-booking')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection failed:', err));

// Routes
app.use('/api/auth', (req, res) => res.json({ message: 'Auth routes' }));
app.use('/api/users', (req, res) => res.json({ message: 'User routes' }));
app.use('/api/bookings', (req, res) => res.json({ message: 'Booking routes' }));
app.use('/api/drivers', (req, res) => res.json({ message: 'Driver routes' }));
app.use('/api/payments', (req, res) => res.json({ message: 'Payment routes' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Socket.io for real-time tracking
io.on('connection', (socket) => {
  console.log('👤 User connected:', socket.id);

  socket.on('driver-location', (data) => {
    io.emit('driver-location-update', data);
  });

  socket.on('disconnect', () => {
    console.log('👤 User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export { io };
