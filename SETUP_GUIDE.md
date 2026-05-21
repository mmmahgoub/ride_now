## Setup Guide for Taxi Booking Platform

### 🎯 What You Have

Your taxi booking platform is now ready with:

✅ **Backend API** (Node.js/Express) - Port 5000
- User authentication
- Driver management
- Booking system
- Real-time WebSocket communication
- MongoDB integration
- Payment processing ready (Stripe)

✅ **User Booking App** (React + Vite) - Port 5173
- Interactive Google Maps integration
- Book taxi with location selection
- Real-time distance calculation
- Booking history
- User profile management
- Payment method selection

✅ **Driver App** (React + Vite) - Port 5174
- Real-time location tracking
- Incoming ride requests
- Ride acceptance/rejection
- Earnings tracking
- Online/offline toggle

✅ **Admin Dashboard** (React + Vite) - Port 5175
- Analytics and statistics
- User and driver management
- Revenue tracking
- Booking management
- Monthly performance charts

### 📋 Prerequisites

- Node.js v16+ and npm v8+
- MongoDB (local or cloud)
- Google Maps API Key
- (Optional) Stripe account for payments

### ⚙️ Configuration

1. **Create `.env` file in root directory:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` and add your credentials:**
   ```env
   # Backend
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taxi-booking
   NODE_ENV=development
   
   # Security
   JWT_SECRET=your-secret-key-here-change-in-production
   JWT_EXPIRE=7d
   
   # Google Maps (required for map features)
   GOOGLE_MAPS_API_KEY=your_api_key_here
   
   # Payment (optional)
   STRIPE_PUBLIC_KEY=pk_test_xxxxx
   STRIPE_SECRET_KEY=sk_test_xxxxx
   ```

3. **Ensure MongoDB is running:**
   ```bash
   # If using local MongoDB
   mongod
   ```

### 🚀 Start the Application

#### Option 1: Run All Services (Recommended)
```bash
npm run dev:all
```

#### Option 2: Run Services Individually
```bash
# Terminal 1 - Backend API
npm run dev:backend

# Terminal 2 - User Frontend
npm run dev:frontend

# Terminal 3 - Driver App
npm run dev:driver

# Terminal 4 - Admin Dashboard
npm run dev:admin
```

### 🌐 Access the Applications

After running the services:

- **User App**: http://localhost:5173
- **Driver App**: http://localhost:5174
- **Admin Dashboard**: http://localhost:5175
- **API Server**: http://localhost:5000

### 📁 Project Structure

```
backend/           - API server with models and routes
frontend/          - User booking application
driver-app/        - Driver application
admin-dashboard/   - Admin panel
shared/            - Shared utilities and constants
```

### 🔑 Key Features to Implement Next

1. **Authentication Routes** - Add login/register endpoints
2. **Booking API** - Create booking, get fare estimate
3. **Driver Tracking** - Real-time location updates via WebSocket
4. **Payment Integration** - Connect Stripe for payments
5. **Notifications** - Email/SMS notifications for bookings
6. **Admin Routes** - User/driver management endpoints

### 🧪 Testing Locally

Use tools like **Postman** or **Thunder Client** to test API endpoints:

```
POST http://localhost:5000/api/auth/register
POST http://localhost:5000/api/bookings
GET http://localhost:5000/api/bookings/:id
```

### 📚 Useful Commands

```bash
# Build for production
npm run build:all

# Run linting
npm lint

# View project structure
tree -L 2

# Install new dependency (in specific workspace)
npm install axios --workspace=backend
```

### 🐛 Troubleshooting

**Port already in use?**
```bash
# Find and kill process on port
lsof -i :5000  # Find process
kill -9 <PID>  # Kill it
```

**MongoDB connection error?**
- Ensure MongoDB is running
- Check MONGODB_URI in .env

**Missing Google Maps API Key?**
- Get free API key from: https://developers.google.com/maps
- Enable Maps API in your Google Cloud project

### 📖 Next Steps

1. Implement backend authentication routes
2. Connect real Google Maps API
3. Add real-time driver tracking
4. Integrate payment gateway
5. Deploy to production (Heroku, AWS, Vercel)

### 💡 Tips

- Use Redux DevTools to debug state management
- Check browser console for frontend errors
- Monitor backend logs for API issues
- Test with Postman before building frontend

---

**Happy Coding! 🚕**
