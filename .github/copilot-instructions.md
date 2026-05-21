# Taxi Booking Platform - Project Instructions

## Project Overview
Full-stack taxi booking application with:
- **Backend**: Node.js/Express API with MongoDB
- **User Frontend**: React web app for booking taxis
- **Driver App**: React app for drivers to accept/manage rides
- **Admin Dashboard**: React dashboard for admin management
- **Features**: User auth, real-time tracking, distance calculation, payments, booking history

## Tech Stack
- Frontend: React 18+ with TypeScript, Vite
- Backend: Node.js with Express
- Database: MongoDB
- Maps: Google Maps API
- State Management: Redux (frontend)
- Authentication: JWT + bcrypt

## Getting Started
1. Install dependencies: `npm run install:all`
2. Configure environment variables in `.env` files
3. Start dev servers: `npm run dev:all`

## Project Structure
```
├── backend/                 # Node.js API server
├── frontend/               # User booking app
├── driver-app/            # Driver mobile-friendly app
├── admin-dashboard/       # Admin management panel
└── shared/               # Shared utilities and types
```
