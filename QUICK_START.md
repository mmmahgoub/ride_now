# 🚀 Quick Start

## Start All Services (One Command)
```bash
npm run dev:all
```

## 🐳 Or Run with Docker (Recommended)

```bash
# Build and start all services
docker-compose up -d --build

# Or use the helper script
./docker-helper.sh up
```

## Access Points
- **User App**: http://localhost:5173
- **Driver App**: http://localhost:5174  
- **Admin Dashboard**: http://localhost:5175
- **Backend API**: http://localhost:5000

## First-Time Setup

1. **Copy environment template**
   ```bash
   cp .env.example .env
   ```

2. **Add your Google Maps API Key to `.env`**
   ```
   GOOGLE_MAPS_API_KEY=your_key_here
   ```

3. **For Docker:** Add to `.env.docker` or use the `.env` file

4. **Ensure MongoDB is running** (or it's handled by Docker)
   ```bash
   mongod  # if local (not needed with Docker)
   ```

5. **Start the app**
   ```bash
   npm run dev:all          # Local
   # OR
   docker-compose up -d     # Docker
   ```

## Project Structure
```
├── backend/          API server (Express + MongoDB)
├── frontend/         User booking app (React)
├── driver-app/       Driver application (React)
├── admin-dashboard/  Admin panel (React)
└── shared/          Shared utilities
```

## Individual Commands
```bash
npm run dev:backend    # Backend only
npm run dev:frontend   # User app only
npm run dev:driver     # Driver app only
npm run dev:admin      # Admin dashboard only
npm run build:all      # Build for production
npm run lint           # Lint code
```

## Docker Helper Commands
```bash
./docker-helper.sh up              # Start all
./docker-helper.sh down            # Stop all
./docker-helper.sh logs backend    # View logs
./docker-helper.sh ps              # Show services
./docker-helper.sh clean           # Clean up
./docker-helper.sh rebuild         # Rebuild
./docker-helper.sh shell backend   # Access shell
```

## Get Google Maps API Key
1. Go to: https://developers.google.com/maps
2. Create a new project
3. Enable Maps API
4. Create API key
5. Add to `.env` as `GOOGLE_MAPS_API_KEY`

## Default Ports
- Backend: 5000
- Frontend: 5173
- Driver App: 5174
- Admin: 5175
- MongoDB: 27017 (Docker only)

## Need Help?
- See `README.md` for full documentation
- See `SETUP_GUIDE.md` for detailed setup
- See `DOCKER_SETUP.md` for Docker details
- Check `backend/src/index.js` for API info

---

**You're all set! Start coding! 🎉**
