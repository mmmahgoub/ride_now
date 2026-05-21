# 🚕 Taxi Booking Platform

A full-stack taxi booking application featuring real-time location tracking, distance calculation, and instant booking capabilities.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [Running with Docker](#running-with-docker)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## ✨ Features

### User Features
- 📱 User authentication (registration/login)
- 🗺️ Interactive map with real-time location
- 📍 Search and select pickup/dropoff locations
- 💰 Real-time fare calculation
- 📊 Booking history and past rides
- ⭐ Rate and review drivers
- 💳 Multiple payment methods (card, wallet, cash)
- 🔔 Notifications for ride updates

### Driver Features
- 👨‍✈️ Driver registration and verification
- 🟢 Go online/offline status
- 🗺️ Real-time location tracking
- 📬 Accept/reject ride requests
- 📍 Navigate to pickup and dropoff
- 💵 Earnings tracking
- ⭐ View ratings and feedback

### Admin Features
- 📊 Dashboard with analytics
- 👥 User management
- 👨‍💼 Driver management and verification
- 📈 Revenue and booking statistics
- 🔧 System configuration
- 📋 Booking and transaction history

## 🛠️ Tech Stack

### Frontend
- **React 18+** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Google Maps API** - Map integration
- **Socket.io Client** - Real-time communication
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Socket.io** - WebSocket for real-time updates
- **JWT** - Authentication
- **Stripe** - Payment processing
- **bcryptjs** - Password hashing

### DevTools
- **ESLint** - Code linting
- **Jest** - Testing framework
- **Nodemon** - Development server auto-reload

## 📁 Project Structure

```
taxi-booking-platform/
├── backend/                     # Node.js API server (Port 5000)
│   ├── src/
│   │   ├── index.js            # Main server file
│   │   ├── models/             # MongoDB schemas
│   │   │   ├── User.js
│   │   │   ├── Driver.js
│   │   │   └── Booking.js
│   │   ├── routes/             # API routes
│   │   ├── controllers/        # Business logic
│   │   ├── middleware/         # Custom middleware
│   │   └── config/             # Configuration files
│   └── package.json
│
├── frontend/                    # User booking app (Port 5173)
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   └── MapComponent.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Booking.jsx
│   │   │   ├── BookingHistory.jsx
│   │   │   └── Profile.jsx
│   │   ├── store/              # Redux store
│   │   ├── styles/             # CSS files
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── driver-app/                 # Driver app (Port 5174)
│   ├── src/
│   │   ├── pages/
│   │   │   └── DriverDashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── admin-dashboard/            # Admin panel (Port 5175)
│   ├── src/
│   │   ├── pages/
│   │   │   └── AdminDashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── shared/                     # Shared utilities and constants
│   ├── src/
│   │   ├── constants.js        # Global constants
│   │   ├── utils.js            # Utility functions
│   │   └── index.js
│   └── package.json
│
├── package.json                # Root package.json (workspaces)
├── .env.example               # Environment variables template
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **MongoDB** (local or cloud instance)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taxi-booking-platform
   ```

2. **Install dependencies for all packages**
   ```bash
   npm run install:all
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your configuration:
   - MongoDB URI
   - Google Maps API Key
   - JWT Secret
   - Payment gateway keys
   - Email configuration

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

## ⚙️ Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Backend Configuration
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taxi-booking
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Google Maps API
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Payment Gateway (Stripe)
STRIPE_PUBLIC_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Frontend URLs
FRONTEND_URL=http://localhost:5173
DRIVER_APP_URL=http://localhost:5174
ADMIN_URL=http://localhost:5175
```

## 🏃‍♂️ Running the Application

### Option 1: Run All Services Together

```bash
npm run dev:all
```

This will start:
- Backend API on `http://localhost:5000`
- User Frontend on `http://localhost:5173`
- Driver App on `http://localhost:5174`
- Admin Dashboard on `http://localhost:5175`

### Option 2: Run Services Individually

```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend

# Terminal 3 - Driver App
npm run dev:driver

# Terminal 4 - Admin Dashboard
npm run dev:admin
```

### Build for Production

```bash
npm run build:all
```

## � Running with Docker

### Quick Start with Docker

1. **Setup environment**
   ```bash
   cp .env.docker .env
   ```

2. **Start all services**
   ```bash
   docker-compose up -d --build
   ```

3. **Access applications**
   - User: http://localhost:5173
   - Driver: http://localhost:5174
   - Admin: http://localhost:5175
   - API: http://localhost:5000

### Docker Helper Script

Use the convenient helper script for common tasks:

```bash
./docker-helper.sh up              # Start services
./docker-helper.sh down            # Stop services
./docker-helper.sh logs backend    # View backend logs
./docker-helper.sh ps              # Show running containers
./docker-helper.sh clean           # Remove containers & volumes
./docker-helper.sh rebuild         # Rebuild images
./docker-helper.sh shell backend   # Access container shell
```

### Docker Compose Services

- **MongoDB** - Database (Port 27017)
- **Backend** - API Server (Port 5000)
- **Frontend** - User App (Port 5173)
- **Driver App** - Driver App (Port 5174)
- **Admin Dashboard** - Admin Panel (Port 5175)

All services are orchestrated with persistent volumes and health checks.

For detailed Docker documentation, see [DOCKER_SETUP.md](DOCKER_SETUP.md)

## �📡 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh-token` - Refresh JWT token

### User Endpoints

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/bookings` - Get user bookings
- `POST /api/users/payment-method` - Add payment method

### Booking Endpoints

- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking
- `GET /api/bookings` - Get all bookings
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `POST /api/bookings/:id/rate` - Rate a ride

### Driver Endpoints

- `POST /api/drivers/register` - Driver registration
- `PUT /api/drivers/:id/location` - Update driver location
- `PUT /api/drivers/:id/status` - Update driver status
- `GET /api/drivers/earnings` - Get driver earnings
- `GET /api/drivers/rides` - Get driver rides

## 🧪 Testing

```bash
npm test
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- CORS protection
- Input validation
- Rate limiting
- SQL injection prevention
- XSS protection

## 🚀 Deployment

### Deploy Backend (e.g., Heroku)

```bash
cd backend
heroku create your-app-name
heroku config:set MONGODB_URI=your_mongodb_uri
git push heroku main
```

### Deploy Frontend (e.g., Vercel)

```bash
cd frontend
npm run build
vercel deploy
```

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support, email support@taxibooking.com or open an issue on GitHub.

## 🎯 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] AI-powered surge pricing
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Accessibility improvements
- [ ] Offline mode
- [ ] Video call between user and driver
- [ ] Safety features (emergency contacts, ride sharing)

---

**Developed by ServicePro Team**
